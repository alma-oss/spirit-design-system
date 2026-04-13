# Release Notes Skill

Generates a Slack Canvas–ready release notes document after each lerna publish. Reads CHANGELOG.md files, synthesizes a human-readable summary, pulls upcoming work from Jira, and writes the result to `.release-notes/`.

## Usage

```text
/spirit:release-notes
```

Run after a successful `yarn release` / lerna publish. No arguments needed — the skill detects the latest release from git tags automatically.

## Output

The skill writes to `.release-notes/release-notes-YYYY-MM-DD.md` (gitignored). The file uses standard Markdown with:

- `#` / `##` / `###` headers for document structure
- `**bold**` for package names, What's Next headings, and prop names
- `` `backticks` `` for component names, hook names, and npm package names
- `[text](url)` links for commit hashes, Full changelog, Slack channel, and GitHub repo

---

## Pasting Into Slack Canvas

Raw Markdown copied from a text editor pastes as plain text in Slack Canvas — headers, bold, and links won't render. Use one of the two methods below.

### Method 1 — Rendered Paste

Slack Canvas parses **rendered rich text** much better than raw Markdown syntax.

1. Open the `.md` file in a Markdown viewer that shows the rendered output:
   - **VS Code** — open the file, then press `Cmd+Shift+V` to open the Preview pane
   - **Obsidian** — switch to Reading Mode
   - Any browser-based Markdown editor (e.g. StackEdit, Dillinger)
2. In the preview, select all (`Cmd+A`) and copy (`Cmd+C`)
3. Paste into the Slack Canvas — headers, bold, lists, and links will all come through correctly

### Method 2 — Import the `.md` File Directly

Slack can import a `.md` file and convert it to native Canvas blocks automatically.

1. Open your Canvas in Slack
2. Either:
   - Click the **···** (More) icon in the top-right corner of the Canvas, or
   - Type `/` in the Canvas to open the command menu
3. Look for **Import** — or simply **drag and drop** the `.md` file directly into the Canvas
4. Slack will prompt: _"Convert to Canvas content?"_ — click **Yes**

The file will be parsed into native Canvas blocks with proper formatting.

---

## What the Skill Does

| Step | Action                                                                                                    |
| ---- | --------------------------------------------------------------------------------------------------------- |
| 1    | Finds the latest release commit from `git log`                                                            |
| 2    | Reads the latest version section from each of 6 package CHANGELOGs                                        |
| 3    | Keeps only Features and Bug Fixes; warns about notable omissions (breaking changes, public API refactors) |
| 4    | Formats per-package blocks with linked commit hashes                                                      |
| 5    | Synthesizes a multi-paragraph General Changes summary in the team's tone of voice                         |
| 6    | Fetches upcoming work from the active and next Jira sprint (project: DS)                                  |
| 7    | Assembles the full document                                                                               |
| 8    | Writes to `.release-notes/release-notes-YYYY-MM-DD.md`                                                    |

## Symlink Setup

The skill lives in `.agents/skills/release-notes/` (version-controlled) and is symlinked into `~/.claude/skills/` so Claude Code can discover it:

```bash
ln -s "$(pwd)/.agents/skills/release-notes" ~/.claude/skills/release-notes
```
