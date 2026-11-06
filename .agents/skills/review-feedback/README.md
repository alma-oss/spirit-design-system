# Spirit Review Feedback Loop

Keeps [`spirit:code-review`][code-review] current. Human review comments on merged PRs are mined,
clustered into themes, and logged in the root [`REVIEW.md`][review-md]. Every month or two, stable
themes are promoted into the code review checklist.

## How to Run

```text
/spirit:review-feedback
```

The skill runs without questions, so it can also run on a schedule.

Requires an authenticated GitHub CLI (`gh auth status`).

## The Loop

```text
merged PRs ──mine──▶ REVIEW.md (feedback log) ──promote──▶ code-review checklist
                          ▲                                         │
                          └──────────── reviews surface gaps ◀──────┘
```

| Step    | How often          | Result                                                        |
| ------- | ------------------ | ------------------------------------------------------------- |
| Gather  | After merged PRs   | New themes and updated counts in `REVIEW.md`                  |
| Promote | Every month or two | Stable themes become checklist items; enforced ones are moved |

A weekly scheduled GitHub Action that runs the gather step is a natural follow-up.

## How It Is Built

```text
.agents/skills/review-feedback/
├── SKILL.md                         # process: gather, cluster, filter, update, promote
├── README.md                        # this file
├── references/
│   └── mining-method.md             # collection method, baseline dataset, validation
└── scripts/
    └── mine-review-history.mjs      # fetches human review feedback from merged PRs
```

## Manual Run

```bash
node .agents/skills/review-feedback/scripts/mine-review-history.mjs --limit 200 --out /tmp/review-history
```

The script writes `prs.json` and `comments.md` to the output directory.

## Related Skills

- [`spirit:code-review`][code-review] — reads `REVIEW.md` and the checklist.
- [`spirit:address-review-comments`][address-review-comments] — responding to review feedback as the author.

[address-review-comments]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/address-review-comments/README.md
[code-review]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/README.md
[review-md]: https://github.com/alma-oss/spirit-design-system/blob/main/REVIEW.md
