# 11. Comments, Naming, and Leftovers (All Code)

- **Explain workarounds** (important) — Hacks, specificity bumps, and non-obvious regexes carry a
  comment saying why, linked to the upstream issue or Jira ticket when temporary.
- **No noise comments** (minor) — Remove comments that restate the code; keep comment style
  consistent within a file.
- **Leftovers** (important) — After a rename or removal, `git grep` both packages, docs, stories,
  fixtures, and skills for the old name. Markup does not reference classes that no longer exist.
- **Dead code** (minor) — Remove unused helpers, tokens, constants, and single-use wrappers.
- **Naming** (minor) — Names say what the code does and follow existing APIs (`isStretched` as in
  `Link`); no `has*` in class modifiers; no `Type` suffix on props (reserved for TS types);
  `UNSTABLE_` only on the public component; no names that clash with Spirit components. File and
  class naming conventions are in `.agents/instructions/code-style.md`.
