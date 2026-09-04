# Figma to Code

**`/spirit:figma-to-code`** converts a Figma design into production React using
[`@alma-oss/spirit-web-react`][web-react].

**Who it's for** — engineers (and AI agents) implementing UI from a Figma node, URL, or selection.

**What it does** — reads the design via Figma MCP, maps it onto current Spirit Web React APIs, and
requires TypeScript, accessibility, and rendered comparison before treating the work as done.

This skill tracks **this repository’s current main / latest v5 APIs**. It does not snapshot a past
release. When a public component name, prop, default, export, or composition changes, update the
skill in the same change.

## Usage

```text
/spirit:figma-to-code
```

Use when the requested output is React code and a Figma design is available.

Do **not** use this skill for:

| Task                                               | Use instead                                     |
| -------------------------------------------------- | ----------------------------------------------- |
| Pre-handoff DS review of a Figma frame             | `/spirit:review-figma-design`                   |
| Authoring or updating Code Connect mappings        | Figma Code Connect docs and `*.figma.tsx` files |
| Building or editing designs **in** Figma from code | Figma code-to-design workflow                   |
| Vanilla HTML/SCSS in `packages/web`                | Component READMEs in that package               |

Install from [skills.sh][skills-sh]:

```bash
npx skills add https://github.com/alma-oss/spirit-design-system --skill figma-to-code
```

The directory name stays `figma-to-code`; the slash command is `/spirit:figma-to-code`.

## Prerequisites

- **Figma MCP** configured in the agent. A node URL (`fileKey` + `node-id`) or a desktop selection
  the MCP can read. Load the Figma design-to-code skill before `get_design_context` when that skill
  is available.
- **`@alma-oss/spirit-web-react`** in the target app, or this monorepo checked out.
- For work **in this repository**: Vite on `http://localhost:3456/` (`make start` or `yarn start`)
  and Playwright MCP for rendered checks. Suite runs use Docker Make targets (`make test-e2e`,
  `make test-e2e-a11y`).

## Output

React that uses current Spirit components, tokens, and composition contracts. The agent must report
whether validation was **verified** or **unverified** (and which gates were skipped).

## Source of Truth

1. Spirit implementation, public types, and `packages/web-react/DEPRECATIONS.md`
2. Component READMEs (consumer semantics; types win if they disagree)
3. Figma Code Connect (component identity and variants, then normalized to current APIs)
4. Figma design context, variables, and assets (visuals)
5. Product requirements (behavior, copy, routes, accessible names)

Do not keep exhaustive prop tables in this skill. Link to source and document only conversion
heuristics that need judgment.

## Maintenance

When you change a public web-react API that this skill names:

1. Search `.agents/skills/figma-to-code/` for the old name, prop, default, or example.
2. Update `SKILL.md` and the matching file under `references/`.
3. Confirm examples still type-check against current components.
4. Keep `.claude/skills` as a symlink to `.agents/skills`. Cursor’s copy under
   `.cursor/skills/skills/figma-to-code` must also point at the canonical `.agents` skill — do not
   maintain a second Markdown tree. Recreate that symlink if it still points at `figma-to-spirit`.

See also `/spirit:breaking-change-checklist`.

[skills-sh]: https://skills.sh/alma-oss/spirit-design-system/figma-to-code
[web-react]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web-react
