---
name: spirit:repeated-mistakes
description: >-
  Prevents Spirit CI and commit failures that have already happened: commitlint body line length,
  Prettier on generated JSON, and the fixup merge check. Use before every commit, fixup, generated
  file, or push, and whenever a pull request check fails. Add each new recurring agent failure to
  this skill in the same change that fixes it.
---

# Repeated Mistakes

Before committing or pushing, apply every entry below. When a pull request check fails for a new
agent mistake, fix it and add one entry here in that same change. An entry is the check name, the
exact error, and the action that prevents it. Do not add product bugs or one-off logic mistakes.
If the entry is already here, follow it instead of adding a duplicate.

## Repeated Failures

### Commitlint Body Line Length

Check: `🚦 Git Checks / 🧾 Commit Lint`

Error: `body's lines must not be longer than 100 characters [body-max-line-length]`

- Wrap every body line at 100 characters. The subject line is included in the 100-character header limit.
- A message that fails commitlint cannot be repaired by `git commit --fixup`. Reword it.
- Before pushing, run `yarn commitlint --from <merge-base with main> --to HEAD --verbose`.

### Prettier on Generated JSON

Check: `🔍 Code Quality Checks / 💅 Code Formatting`

Error: `yarn format:check` (`prettier --check ./`) reports the generated file.

- `JSON.stringify` is not Prettier's layout. A generated JSON file that is committed, or rewritten by `next dev` or `next build`, must be formatted with `yarn prettier --write -- <file>` inside the writer.
- Formatting the file once by hand is not enough. The next build overwrites it.
- Before pushing, run `yarn prettier --check --` on every file the change adds or edits.

### Fixup Commits Block the Pull Request

Check: `🚦 Git Checks / 🚫 Merge Blocked by Git Fixup`

Error: the check lists every `fixup!` subject and ends with `failing...`

- Any `fixup!` commit on the branch fails this check, including `fixup! fixup!`.
- When the user asks to make the pull request checks pass, autosquash onto the base branch and reword any commitlint failure in that same rebase. Do not add another fixup for a bad message.
- Leave fixup commits only when the user asked for fixups and did not ask for the checks to pass.

### Remark Heading Capitalization

Check: `📄 Docs Reviews / 📝 Linting Markdown`, and `🔍 Code Quality Checks / 📐 Code Linting` because `yarn lint` runs the same Markdown check.

Error: `Heading capitalization error. Expected: 'Repeated Mistakes' found: 'Repeated mistakes'`

- `yarn lint:markdown` is `remark ./ --quiet --frail`, so a capitalization warning fails the check.
- Write Markdown headings in the title case Remark expects. Small words such as "on" stay lowercase.
- Before pushing a Markdown change, run `yarn remark <files> --quiet --frail`.

### Lookup on a Plain Object by a User-Controlled Key

Found in code review, not by CI: `index[slug]` on an object literal returns a prototype member for `constructor`, `toString`, or `__proto__`, and the next call on it throws, so a request gets 500 instead of 404.

- Read request-controlled keys with `Object.hasOwn(obj, key)` or from a `Map`.
- Add a test with `constructor` and `__proto__` for every such lookup.

### Config-Time Code Reads `process.cwd()`

Found in code review: code that `next.config.ts` runs at load time and that calls `getRepoRoot()` breaks when the build starts from another directory, and the whole config fails to load.

- Derive the root from the config file's own location (`pathDir`) and pass it in.
- Keep `next.config.ts` free of `@local` imports. Its loader does not resolve them, so use relative paths.
- Jest cannot load the `prettier` package (`ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING_FLAG`). Import it lazily in a module that tests do not import.

### New Commit Instead of a Fixup on a Pull Request Branch

Found by the user: after review fixes the agent made `fix(...)` and `docs(...)` commits, although `.cursor/rules/fixup-commits.mdc` requires `git commit --fixup`.

- Read `.cursor/rules/fixup-commits.mdc` before every commit. A plan line that says "new commit" does not override it.
- Find the target per file with `git log -1 --format='%H %s' main..HEAD -- <file>`, then one `git commit --fixup <hash>` per target.
- A file that no commit on the branch changed gets no invented fixup. Ask the user where it goes.
- Commit only when the user asks. Do not push without asking.

### Internal Links to a Page That Now Returns 404

Found in review: the catalog card linked to `/components/<slug>`, which became 404 for components without Guidelines.

- When a change makes a reachable URL return 404, search every internal link to it (cards, hero, navigation) and either redirect or relink.

### Copying a Helper That Already Exists

Found in review: `resolveDocFile` and `isDocSection` copied `resolveComponentTabFile` and `isComponentDocTab`.

- Before writing a path or type-guard helper, run `rg` for the same `join(...)` or `.includes(` pattern.
- If the existing helper cannot be imported (for example by `next.config.ts`), move it to a small module both sides import, and do not create a second copy or reuse a name that exists elsewhere.
