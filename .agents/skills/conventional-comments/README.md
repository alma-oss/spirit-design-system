# Conventional Comments

Opt-in [Conventional Comments](https://conventionalcomments.org/) label vocabulary for Spirit reviews.

## Purpose

Defines the labels (issue, suggestion, todo, question, thought, note, chore, praise), decorations,
and output ordering. It is an overlay on the finding format from the code-review methodology — it adds a
`label (decorations):` line and changes nothing else.

## Usage

Loaded (via `cat`) when a review runs with `--conventional-comments`, and in every CI review, where the
`label (decorations):` line is always used. Off by default in the CLI, because the team has not adopted
Conventional Comments as a whole and reviewers communicate clearly without the markings.

## Related Skills

- `spirit:code-review` — the review that loads this overlay when run with `--conventional-comments` and in CI;
  its `references/methodology.md` defines the base finding format.
