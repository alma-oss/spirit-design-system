# Docsite Composition Skill

Guidance for building and refactoring any docsite page or component under `apps/docsite/src`
with `@alma-oss/spirit-web-react` composition instead of custom CSS or `UNSAFE_className`.

## Usage

```text
/spirit:docsite-composition
```

Use when you need to:

- Add or refactor a docsite page, section, or component in TSX
- Replace custom docsite CSS with Spirit props or composition
- Edit docsite Lottie or logo assets
- Change docsite content, headings, or links

## What It Covers

1. Docsite folder structure (thin routes in `src/app`, domains with `ui/`, the homepage `features/<name>/` and barrel example)
2. The decision order: Spirit prop, composition, own block class, then `UNSAFE_className` for a named gap
3. A table of accepted Spirit patterns and what to avoid for each
4. The Known Spirit Limits for composition (component and prop gaps)
5. Asset rules for Lottie colors and logo SVGs
6. Content rules (one `h1` per page, no dead routes, count-up behavior)
7. The done check, which points to the checks in `apps/docsite/AGENTS.md`

## Setup

None.

## Output Quality Checklist

- No new custom CSS where a Spirit prop or composition works
- Every `UNSAFE_className` maps to a gap named in the Known Spirit Limits
- No local substitute for a missing Spirit component; the gap is named and raised with the user
- `UNSTABLE_EyebrowText` always has an explicit `textColor`
- Lint and types pass
