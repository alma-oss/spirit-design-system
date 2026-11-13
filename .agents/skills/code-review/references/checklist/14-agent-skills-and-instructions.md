# 14. Agent Skills and Instructions (`.agents/`, `AGENTS.md`)

- **Trigger description** (important) — `description` says what the skill does and "Use when …".
- **Tool-agnostic** (important) — No tool-specific calls (`AskUserQuestion`), no assumed binaries
  (`ripgrep`, Python); `yarn` not `npx`; works in Claude Code and Cursor.
- **Single responsibility** (minor) — Skills reference each other instead of duplicating content;
  related skills are updated together (for example `stabilize-component` with `component-deprecation`).
- **Current API** (important) — Examples match the current major (v5 classes, `rem` units).
