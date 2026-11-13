# Post Release Notes

Creates a Slack Canvas from a `docs/release-notes/<date>.md` file, shares it in a channel and announces it there.
Used by the [Publish Release Notes workflow][publish-release-notes-workflow], which runs when the release notes PR is merged to `main` (or manually for a given file).

## Usage

```bash
yarn workspace @alma-oss/spirit-post-release-notes post-release-notes docs/release-notes/<date>.md --dry
```

- `<date>` is the day of the release in the format `yyyy-mm-dd`,
- `--dry` prints the Canvas title and body without calling Slack. Relative paths are resolved from the repository root.

## When the Canvas Is Posted

The Canvas is posted only after the release notes PR is merged, so it always shows the reviewed text.
The [Publish Release Notes workflow][publish-release-notes-workflow] runs on a push to `main` that adds a `docs/release-notes/*.md` file
and reads the final file from `main`. The announcement links the merged PR.
Edits made in the PR therefore never need to be repeated in Slack.
Notes changed after the merge are not synced, edit the Canvas by hand or post a new one.

## Failures

The script creates the Canvas first, then shares it and announces it. If a later call fails, the Canvas already exists
(its ID is logged right after it is created). Running the script or the workflow again creates a second Canvas,
so remove or reuse the first one by hand. The workflow can be run manually (`workflow_dispatch`) for a given file.
Slack calls time out after 15 seconds.

## Environment

| Variable               | Description                                                               |
| ---------------------- | ------------------------------------------------------------------------- |
| `SLACK_BOT_TOKEN`      | Bot token with `canvases:write` and `chat:write` scopes                   |
| `SLACK_CHANNEL_ID`     | ID of the channel the Canvas is shared to (the bot must be a member)      |
| `RELEASE_NOTES_PR_URL` | Optional. Link to the release notes PR, added to the announcement message |

[publish-release-notes-workflow]: ../../.github/workflows/publish-release-notes.yaml
