# Transitioning a DS Issue to Done

Everything the `Done` transition needs on `jira.almacareer.tech` (Jira Server/DC, REST API v2).
`JIRA_PERSONAL_TOKEN` is in the shell environment; the scheme is `Bearer`, not `Token`.

## Resolve the Transition by Target Status

Transition IDs are workflow-specific — never reuse one from a previous run. `jira_get_transitions`
lists names without their target statuses, so go through REST:

```bash
curl -s -H "Authorization: Bearer $JIRA_PERSONAL_TOKEN" \
  "https://jira.almacareer.tech/rest/api/2/issue/DS-XXXX/transitions" \
  | python3 -c "import sys,json; [print(t['id'], t['name'], '->', t['to']['name']) for t in json.load(sys.stdin)['transitions']]"
```

The one to use is named **`Done`**, targeting status **`Done`** — id `111` on the DS component
workflow as observed 2026-09-15. There is no status called "To Accept"; `Done` is where acceptation
happens.

## The Quality-Gate Validator

The transition validates the quality-gate fields. A gate flagged required with an empty status fails
the whole call, naming one gate at a time:

```text
HTTP 400 — "Code review is required but status is not set (in Set quality status action)"
```

Read the gates first:

```bash
curl -s -H "Authorization: Bearer $JIRA_PERSONAL_TOKEN" \
  "https://jira.almacareer.tech/rest/api/2/issue/DS-XXXX?fields=status,customfield_10224,customfield_10225,customfield_10306,customfield_10305,customfield_10222,customfield_10223,customfield_10226,customfield_10227,customfield_11550,customfield_11552,customfield_18257,customfield_18258"
```

| Gate                | Required flag       | Status (`Passed`/`Failed`) | Done by             |
| ------------------- | ------------------- | -------------------------- | ------------------- |
| Code review         | `customfield_10224` | `customfield_10225`        | `customfield_10401` |
| Manual tests        | `customfield_10306` | `customfield_10305`        | `customfield_10402` |
| Functional tests    | `customfield_10222` | `customfield_10223`        | `customfield_10400` |
| Unit tests          | `customfield_10226` | `customfield_10227`        | `customfield_10403` |
| UX tests            | `customfield_11550` | `customfield_11552`        | `customfield_11551` |
| Accessibility tests | `customfield_18257` | `customfield_18258`        | `customfield_18260` |

For every gate whose required flag is `y` and whose status is empty, ask before filling it, and bring
whatever evidence exists:

- **Code review** — `reviewDecision: APPROVED` plus the approving logins is real evidence. Offer
  `Passed` as the recommended option and name the approvers.
- **Manual, UX, accessibility, functional** — nothing in this workflow observes them. Offer `Passed`,
  "leave empty and attempt the transition anyway" (another gate may surface), and "clear the required
  flag", and say plainly which you cannot vouch for.

Leave the "done by" pickers empty unless the user names someone — a wrong value is worse than none.
Say in the final report that they stayed empty.

## Transition

Send the gate statuses with the transition, in one call:

```bash
cat > /tmp/handoff-transition.json <<'JSON'
{
  "transition": { "id": "111" },
  "fields": {
    "customfield_10225": { "value": "Passed" },
    "customfield_10305": { "value": "Passed" }
  }
}
JSON
curl -s -w 'HTTP %{http_code}\n' -X POST \
  -H "Authorization: Bearer $JIRA_PERSONAL_TOKEN" -H "Content-Type: application/json" \
  --data-binary @/tmp/handoff-transition.json \
  "https://jira.almacareer.tech/rest/api/2/issue/DS-XXXX/transitions"
```

`HTTP 204` with no body means success. A `400` returns the validator's message, which names the
failing gate. Nothing is applied when a transition fails, so a rejected attempt is safe to retry with
more fields.

## Verify

Status codes are not proof — re-read the issue:

```bash
curl -s -H "Authorization: Bearer $JIRA_PERSONAL_TOKEN" \
  "https://jira.almacareer.tech/rest/api/2/issue/DS-XXXX?fields=status,customfield_10225,customfield_10305,comment"
```
