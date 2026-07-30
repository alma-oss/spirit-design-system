# Conventional Comments

Opt-in [Conventional Comments](https://conventionalcomments.org/) label vocabulary for Spirit reviews.

## Purpose

Defines the labels (issue, suggestion, todo, question, thought, note, chore, praise), decorations,
and output ordering. It is an overlay on the finding format from the code-review methodology — it adds a
`label (decorations):` line and changes nothing else.

## Usage

Loaded (via `cat`) **only** when a review runs with `--conventional-comments`. Off by default,
because the team has not adopted Conventional Comments as a whole and reviewers communicate clearly
without the markings.

## Related Skills

- the code-review methodology — the base finding format this overlays.
- `spirit:code-review` — passes `--conventional-comments` through to reviewers.
