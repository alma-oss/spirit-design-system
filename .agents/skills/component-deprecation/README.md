# Component Deprecation Skill

Standard workflow for deprecating and removing deprecations in Spirit across both packages:

- `web-react` (React)
- `web` (SCSS + vanilla JS)

The skill is designed to stay valid over time, so it focuses on **patterns** and **git-history-backed workflow**, not static file references.

## Usage

```text
/spirit:component-deprecation
```

Use when you need to:

- Deprecate a full component (or subcomponents)
- Deprecate a prop or prop value
- Mark a currently optional API as required in next major
- Remove previously deprecated APIs in a breaking release

## What It Covers

1. Runtime warnings strategy (`useDeprecationMessage` in `web-react`, optional guarded `warning` in `web`)
2. Package-level `DEPRECATIONS.md` updates
3. Component README deprecation notice and migration wording
4. Props deprecation variants:
   - rename prop
   - remove prop
   - rename prop value
   - contract/behavior changes with custom messaging
5. Major-release cleanup checklist (remove warnings/docs/aliases/tests drift)

## Historical Anchors

The skill references proven commit patterns from repository history (component deprecation, props deprecation, and major removal), so behavior is based on what was actually done in Spirit.

## Recommended Flow

1. Search current codebase for existing deprecation patterns.
2. Inspect relevant historical commits for the same migration type.
3. Implement runtime + docs updates in both packages (when applicable).
4. Update demos/stories/API docs to push consumers toward the new API.
5. Run focused lint/tests and smoke-check warning behavior.

## Output Quality Checklist

- Warning text clearly states **removal in next major**
- Migration path is explicit (replacement component/prop/value)
- No duplicate warnings caused by wrapper components
- README + DEPRECATIONS list are consistent
- Breaking-release cleanup removes all stale deprecation references
