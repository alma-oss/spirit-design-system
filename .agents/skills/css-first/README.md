# CSS First Skill

A reusable agent skill for modern, accessible CSS-first implementation advice. It
combines semantic intent analysis, logical properties, progressive enhancement, 78
CSS demos, and live Web Platform Baseline data.

## What Changed

- Baseline labels now use the official WebStatus definitions, never usage-percentage
  buckets.
- `scripts/update_baseline.py` refreshes mapped demo headers and index entries from
  `api.webstatus.dev`.
- The catalog includes author-facing CSS additions from Chrome 148 through 152.
- The functions catalog now includes `random()` and `progress()` with exact
  WebStatus IDs.
- Features without an exact WebStatus record remain explicitly experimental/unknown
  and cite a browser release note or specification.

## Use

Ask an agent to use `$css-first` for CSS implementation, browser support, current
Baseline status, or modern web-platform feature questions.

The skill will:

1. identify the interface intent and repository context;
2. prefer semantic HTML and CSS over unnecessary JavaScript;
3. choose logical, accessible, interoperable primitives;
4. fetch current Baseline data when support matters;
5. provide a fallback for Limited Availability or experimental features;
6. verify browser-facing behavior when a browser is available.

## Baseline Categories

| Label                     | Official meaning                                              |
| ------------------------- | ------------------------------------------------------------- |
| 🟢 Widely Available       | Interoperable in the core browser set for at least 30 months  |
| 🔵 Newly Available        | Interoperable in the core browser set for less than 30 months |
| 🟡 Limited Availability   | Core-browser interoperability is incomplete                   |
| 🟣 Experimental / unknown | No usable WebStatus record; inspect releases and specs        |

Baseline is not a market-share percentage. Project browser targets can still be
stricter than a generic Baseline label.

## Refresh Support Snapshots

```bash
python3 scripts/update_baseline.py --check
python3 scripts/update_baseline.py --write
```

The updater uses the official WebStatus API, validates the response shape, and leaves
unmapped release features for manual review.

## Repository Map

- `SKILL.md` — agent instructions and routing
- `references/live-mdn-fetch.md` — trusted live-data workflow
- `references/rules/` — CSS-first decision rules
- `css-demos/INDEX.md` — full demo catalog
- `css-demos/` — production-oriented CSS examples by category
- `scripts/update_baseline.py` — repeatable Baseline snapshot updater
- `scripts/test_update_baseline.py` — updater regression tests
- `agents/openai.yaml` — Codex UI metadata

## Chrome 148–152 Coverage

The catalog includes name-only and comma-separated container queries, expanded
`@supports`, `revert-rule`, gap decorations, shape improvements, animatable `zoom`,
`text-fit`, modern image values, `background-clip: border-area`, print margin safety,
balanced flex wrapping, overscroll chaining, SVG path length, ruby overhang, media
state pseudo-classes, relative alpha, installed-app drag regions, and accent colors.

See [`css-demos/INDEX.md`](css-demos/INDEX.md) for current labels and source links.

## License

MIT
