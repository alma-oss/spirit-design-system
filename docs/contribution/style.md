# Spirit Style Guide

This document outlines the coding and authoring conventions used across the Spirit Design System monorepo. It covers AI tooling.

## Table of Contents

- [Agentic Skills](#agentic-skills)

## Agentic Skills

Skills are Markdown files that extend Agents with project-specific slash commands. They live in `.agents/skills/` (version-controlled).

### Naming

Agents ship with built-in slash commands (e.g. `/release-notes`, `/commit`). A skill whose `name` matches a built-in is silently shadowed. Flat names also risk colliding with skills from other projects installed by other team members.

All Spirit-specific skills use a `spirit:` namespace prefix in their frontmatter `name` field:

```yaml
# Frontmatter — controls the slash command name
name: spirit:release-notes
```

This makes the skill invokable as `/spirit:release-notes` and unambiguously identifies it as Spirit-owned.

The **directory name** does not include the namespace — it stays the plain skill name. Only the frontmatter `name` carries the prefix.

```text
# Directory — plain name, no prefix
.agents/skills/release-notes/
```

### File Structure

Each skill directory contains:

```text
.agents/skills/{skill-name}/
├── SKILL.md      # Required — skill definition loaded by the agent
└── README.md     # Required — human-readable docs, setup, and usage
```

**`SKILL.md`** must have YAML frontmatter with at minimum `name` and `description`:

```yaml
---
name: spirit:{skill-name}
description: One sentence describing when to use this skill.
---
```

The description is what the agent uses to decide whether the skill is relevant — make it specific and action-oriented.

**`README.md`** must cover:

- How to invoke the skill
- What output it produces
- Any setup steps (symlink, MCP servers required, etc.)
- How to use the output (e.g. pasting into Slack Canvas)

### Writing a Skill

- **State a clear trigger condition** in `description` — the agent uses it to match user intent.
- **Be prescriptive, not descriptive.** The skill instructs the agent what to do step by step. Vague instructions produce inconsistent output.
- **Hardcode project constants.** URLs, package scopes, Jira project keys, Slack channel links — put them directly in the skill so agent never has to guess.
- **Specify output format exactly.** Show a complete example of the expected output, not just a schema. Agents match examples more reliably than abstract specs.
- **Warn, don't silently drop.** If the skill filters or omits information, instruct agent to print a warning rather than silently discard it.
