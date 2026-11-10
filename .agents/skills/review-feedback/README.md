# Spirit Review Feedback Loop

Keeps [`spirit:code-review`][code-review] current. Human review comments on merged PRs are mined,
clustered into themes, and logged in the [`REVIEW-FEEDBACK.md`][review-md]. After a release (the cadence may
become less frequent over time), stable themes are promoted into the code review checklist.

## How to Run

```text
/spirit:review-feedback
```

The skill runs without questions, so it works for both interactive and non-interactive runs. A scheduled run is
not set up yet; keep this section in sync with the workflow once it exists.

Requires an authenticated GitHub CLI (`gh auth status`).

## The Loop

```text
merged PRs ──mine──▶ REVIEW-FEEDBACK.md ──promote──▶ code-review checklist
                          ▲                                         │
                          └──────────── reviews surface gaps ◀──────┘
```

| Step    | How often        | Result                                                        |
| ------- | ---------------- | ------------------------------------------------------------- |
| Gather  | After merged PRs | New themes and updated counts in `REVIEW-FEEDBACK.md`         |
| Promote | After a release  | Stable themes become checklist items; enforced ones are moved |

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

- [`spirit:code-review`][code-review] — reads `REVIEW-FEEDBACK.md` from the base branch and the checklist.
- [`spirit:address-review-comments`][address-review-comments] — responding to review feedback as the author.

[address-review-comments]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/address-review-comments/README.md
[code-review]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/README.md
[review-md]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/REVIEW-FEEDBACK.md
