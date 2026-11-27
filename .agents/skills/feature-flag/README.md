# Feature Flag Skill

Adds or removes a Spirit Sass feature flag (`$enable-[v<N>-]<component>-<feature>` variable and
`.spirit-feature-enable-*` CSS class) consistently across `web` and `web-react`.

## Usage

```text
/spirit:feature-flag
```

Use when:

- Introducing a breaking visual change that must first ship opt-in in a minor release
- Removing flags while preparing the next major release

For the migration guide of the removal, see `spirit:breaking-change-checklist`.
