# 13. CI Workflows (`.github/`)

- **Injection safety** (blocking) — Inputs and matrix values reach `run:` via `env:`, not inline
  `${{ }}` interpolation.
- **Status functions** (important) — `if:` conditions that should run after failure use an explicit
  status function (`!cancelled()`).
- **Permissions and checkout** (question) — Removed permissions and sparse checkouts are checked
  against every step that needs them (for example `.yarn/plugins`, `nx-cache-save`).
