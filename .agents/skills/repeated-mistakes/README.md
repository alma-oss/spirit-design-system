# Repeated Mistakes Skill

A running list of CI and commit failures an agent has already caused, and the action that stops each one.

## Usage

```text
/spirit:repeated-mistakes
```

The agent also applies it before a commit, a fixup, a generated file, or a push, and when a pull request check fails.

## What It Produces

No separate report. The agent follows the entries in `SKILL.md`, then adds a new entry there when a check fails for a reason that is not listed yet.

## Setup

None.

## How to Extend It

Add one entry under `Repeated failures` in `SKILL.md` in the same change that fixes the failure. State the check name, the exact error, and the prevention. Do not record product bugs.
