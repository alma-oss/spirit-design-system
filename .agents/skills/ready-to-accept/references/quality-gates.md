# Transitioning a DS Issue to Done

Everything the `Done` transition needs on `almacareer.atlassian.net` (Jira Cloud), through the Atlassian
MCP. Operations that are not primary tools (`listJiraIssueTransitions`) run via `executeRead` with
`cloudId: almacareer.atlassian.net`; `transitionJiraIssue` is a primary tool.

## Who Can Transition

The responsible person moves an issue from `Testing` (the board column may be called `QA`) to `Done`;
from there it waits for acceptance. The `Done` transition is hidden from everyone else, so a user who is
not responsible sees no `Done` in the default list — that is a workflow condition, not a missing
transition.

## Resolve the Transition by Target Status

Transition IDs are workflow-specific — never reuse one from a previous run. List them with
`listJiraIssueTransitions` and pick the one whose **target status** is `Done`:

```text
listJiraIssueTransitions { issueIdOrKey: "DS-XXXX", expand: "transitions.fields" }
```

The result gives `id`, `name`, `to.name`, `isAvailable` and, with `expand`, the fields on the transition
screen (`name`, `allowedValues`). The transition is named `Done`; resolve its id every time.

If no `Done` transition is listed, ask again with `includeUnavailableTransitions: true`. When `Done`
shows `isAvailable: false`, the user is not the responsible person (or the issue is not in `Testing`).
Say so and stop; offer the `Take responsibility` transition only if the user asks for it — it changes who
owns the issue.

## The Quality-Gate Validator

The `Done` transition validates the quality gates. A failing validator names the gate that is missing,
one at a time. The screen of the transition carries, per gate, a status select (`Passed` / `Failed`), a
comment, a "done by" user picker, and a "required" text field. Resolve every field by its **name** from
`transitions.fields`, not by `customfield_*` ID — the IDs are site-specific and change between instances:

| Gate                | Status field (name)          | Done-by field (name)          |
| ------------------- | ---------------------------- | ----------------------------- |
| Code review         | `Code review status`         | `Code review done by`         |
| Manual tests        | `Manual tests status`        | `Manual tests done by`        |
| Functional tests    | `Functional tests status`    | `Functional tests done by`    |
| Unit tests          | `Unit tests status`          | `Unit tests done by`          |
| UX tests            | `UX tests status`            | `UX tests done by`            |
| Accessibility tests | `Accessibility tests status` | `Accessibility tests done by` |
| Other tests         | `Other tests status`         | `Other tests done by`         |

Read the current values with `getJiraIssue` and the field IDs from the screen. For every gate that is
empty and that the validator asks for, ask before filling it, and bring whatever evidence exists:

- **Code review** — `reviewDecision: APPROVED` plus the approving logins is real evidence. Offer
  `Passed` as the recommended option and name the approvers.
- **Manual, UX, accessibility, functional** — nothing in this workflow observes them. Offer `Passed`,
  "leave empty and attempt the transition anyway" (another gate may surface), and say plainly which you
  cannot vouch for.

Leave the "done by" pickers empty unless the user names someone — a wrong value is worse than none.
Say in the final report that they stayed empty.

## Transition

Send the gate statuses with the transition, in one call:

```text
transitionJiraIssue {
  issueIdOrKey: "DS-XXXX",
  transitionId: "<id resolved above>",
  fields: { "<Code review status field id>": { "value": "Passed" } }
}
```

The call returns the status the issue landed in. A rejected transition applies nothing, so it is safe to
retry with more fields.

## Verify

Re-read the issue with `getJiraIssue` and check that the status is `Done` and that the gate fields hold
what you sent. A returned status is not proof the fields were stored.
