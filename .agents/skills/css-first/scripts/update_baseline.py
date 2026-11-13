#!/usr/bin/env python3
"""Refresh mapped CSS demo snapshots from the official WebStatus API."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import ssl
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
API = "https://api.webstatus.dev/v1/features/{}"


def tls_context() -> ssl.SSLContext:
    """Use the platform trust store, with certifi as a macOS Python fallback."""
    try:
        import certifi  # type: ignore[import-not-found]
    except ImportError:
        return ssl.create_default_context()
    return ssl.create_default_context(cafile=certifi.where())

# Map a demo to the feature that controls the demo's Baseline label. Composite
# demos deliberately use the least-interoperable feature demonstrated.
FEATURES = {
    "layout/subgrid.css": "subgrid",
    "layout/has-selector.css": "has",
    "layout/css-nesting.css": "nesting",
    "layout/isolation-stacking.css": "isolation",
    "layout/stretch-keyword.css": "stretch",
    "layout/reading-flow.css": "reading-flow",
    "responsive/media-queries.css": "media-query-range-syntax",
    "responsive/supports-rule.css": "supports-at-rule",
    "responsive/viewport-units.css": "viewport-unit-variants",
    "container/size-queries.css": "container-queries",
    "container/style-queries.css": "container-style-queries",
    "container/scroll-state-queries.css": "container-scroll-state-queries",
    "container/anchored-queries.css": "container-anchor-position-queries",
    "animation/view-transitions.css": "view-transitions-element-scoped",
    "animation/scroll-driven.css": "scroll-driven-animations",
    "animation/starting-style.css": "starting-style",
    "theming/light-dark-function.css": "light-dark",
    "positioning/anchor-positioning.css": "anchor-positioning",
    "interaction/interest-invokers.css": "interest-invokers",
    "interaction/popover.css": "popover",
    "interaction/overscroll-behavior.css": "overscroll-behavior",
    "interaction/target-focus-within.css": "focus-within",
    "interaction/media-state-pseudos.css": "media-pseudos",
    "visual/form-validation.css": "user-pseudos",
    "visual/color-mix.css": "color-mix",
    "visual/gap-decorations.css": "gap-decorations",
    "visual/backdrop-filter.css": "backdrop-filter",
    "visual/relative-colors.css": "relative-color",
    "visual/clip-path-shape.css": "shape-function",
    "visual/mix-blend-mode.css": "mix-blend-mode",
    "visual/corner-shape.css": "corner-shape",
    "visual/border-shape.css": "border-shape",
    "visual/text-box-trim.css": "text-box",
    "visual/text-justify.css": "text-justify",
    "visual/overflow-clip-margin.css": "overflow-clip-margin",
    "visual/shape-outside-functions.css": "path-shape",
    "visual/text-decoration-skip-ink.css": "text-decoration-skip-ink-all",
    "visual/image-rendering.css": "crisp-edges",
    "visual/font-variant-numeric.css": "font-variant-numeric",
    "visual/text-fit.css": "text-fit",
    "visual/background-clip-border-area.css": "background-clip-border-area",
    "visual/css-image-values.css": "light-dark-image",
    "visual/ruby-overhang.css": "ruby-overhang",
    "functions/random-function.css": "random-function",
    "functions/progress-function.css": "progress-function",
    "functions/calc-size.css": "calc-size",
    "functions/css-if-function.css": "if",
    "functions/custom-functions.css": "function",
    "functions/advanced-attr.css": "attr",
    "functions/sibling-functions.css": "sibling-count",
    "functions/trigonometric-functions.css": "trig-functions",
    "functions/contrast-color.css": "contrast-color",
    "specificity/cascade-layers.css": "cascade-layers",
    "specificity/scope-rule.css": "scope",
    "native-customization/customizable-select.css": "customizable-select",
    "accessibility/prefers-reduced-motion.css": "prefers-reduced-transparency",
}

LABELS = {
    "widely": "🟢 Widely Available",
    "newly": "🔵 Newly Available",
    "limited": "🟡 Limited Availability",
}


def fetch_feature(feature_id: str) -> dict | None:
    url = API.format(urllib.parse.quote(feature_id, safe=""))
    request = urllib.request.Request(
        url,
        headers={"Accept": "application/json", "User-Agent": "css-first-skill/1.0"},
    )
    try:
        with urllib.request.urlopen(request, timeout=15, context=tls_context()) as response:
            value = json.load(response)
    except urllib.error.HTTPError as error:
        if error.code == 404:
            return None
        raise RuntimeError(f"WebStatus returned HTTP {error.code} for {feature_id}") from error
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
        raise RuntimeError(f"Could not fetch WebStatus data for {feature_id}: {error}") from error

    if not isinstance(value, dict) or value.get("feature_id") != feature_id:
        return None
    baseline = value.get("baseline")
    if not isinstance(baseline, dict) or baseline.get("status") not in LABELS:
        return None
    implementations = value.get("browser_implementations")
    if implementations is not None and not isinstance(implementations, dict):
        return None
    return value


def support_text(feature: dict) -> str | None:
    names = (("chrome", "Chrome"), ("firefox", "Firefox"), ("safari", "Safari"))
    parts = []
    implementations = feature.get("browser_implementations")
    if not isinstance(implementations, dict):
        return None
    for key, label in names:
        item = implementations.get(key)
        available = isinstance(item, dict) and item.get("status") == "available"
        version = item.get("version") if available else None
        parts.append(f"{label} {version}+" if isinstance(version, str) and version else f"{label} —")
    return ", ".join(parts)


def replace_or_insert_header(
    text: str,
    feature_id: str,
    feature: dict,
    today: str,
) -> str:
    label = LABELS[feature["baseline"]["status"]]
    replacements: dict[str, str] = {
        "WebStatus": feature_id,
        "Baseline": label,
        "Last verified": today,
    }
    support = support_text(feature)
    if support is not None:
        replacements["Support"] = support
    for field, value in replacements.items():
        pattern = rf"(?m)^(\s*\* {re.escape(field)}:).*$"
        replacement = rf"\1 {value}"
        if re.search(pattern, text):
            text = re.sub(pattern, replacement, text, count=1)
        elif field == "WebStatus":
            text = re.sub(r"(?m)^(\s*\* Baseline:)", f" * WebStatus: {value}\n\\1", text, count=1)
        elif field == "Last verified":
            text = re.sub(r"(?m)^(\s*\*/)", f" * Last verified: {value}\n\\1", text, count=1)
    return text


def replace_index_status(text: str, relative_path: str, label: str) -> str:
    file_name = Path(relative_path).name
    heading = f"### [{file_name}]({relative_path})"
    start = text.find(heading)
    if start == -1:
        return text
    next_heading = text.find("\n### ", start + len(heading))
    end = len(text) if next_heading == -1 else next_heading
    section = text[start:end]
    updated = re.sub(r"(?m)^- Baseline:[^\n]*", f"- Baseline: {label}", section, count=1)
    return text[:start] + updated + text[end:]


def main() -> int:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--check", action="store_true", help="report stale snapshots (default)")
    mode.add_argument("--write", action="store_true", help="update snapshots in place")
    args = parser.parse_args()

    today = dt.date.today().isoformat()
    index_path = ROOT / "css-demos" / "INDEX.md"
    index_original = index_path.read_text(encoding="utf-8")
    index_updated = index_original
    changes: list[tuple[Path, str]] = []
    unavailable: list[str] = []

    for relative_path, feature_id in sorted(FEATURES.items()):
        path = ROOT / "css-demos" / relative_path
        if not path.exists():
            unavailable.append(f"missing demo: {relative_path}")
            continue
        try:
            feature = fetch_feature(feature_id)
        except RuntimeError as error:
            unavailable.append(str(error))
            continue
        if feature is None:
            unavailable.append(f"no usable WebStatus record: {feature_id}")
            continue
        original = path.read_text(encoding="utf-8")
        updated = replace_or_insert_header(original, feature_id, feature, today)
        if updated != original:
            changes.append((path, updated))
        index_updated = replace_index_status(
            index_updated, relative_path, LABELS[feature["baseline"]["status"]]
        )

    if index_updated != index_original:
        changes.append((index_path, index_updated))

    if args.write:
        for path, value in changes:
            path.write_text(value, encoding="utf-8")
        print(f"Updated {len(changes)} file(s).")
    elif changes:
        for path, _ in changes:
            print(path.relative_to(ROOT))
        print(f"{len(changes)} file(s) need a Baseline refresh.")
    else:
        print("Baseline snapshots are current.")

    for item in unavailable:
        print(f"warning: {item}", file=sys.stderr)
    return 1 if changes and not args.write else 0


if __name__ == "__main__":
    raise SystemExit(main())
