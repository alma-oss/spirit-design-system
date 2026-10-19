# Post Release Notes

Creates a Slack Canvas from a `docs/release-notes/<date>.md` file, shares it in a channel and announces it there.
Used by the `Release Notes` stage of the [Release workflow](../../.github/workflows/release-notes.yaml).

## Usage

```bash
yarn workspace @alma-oss/spirit-post-release-notes post-release-notes docs/release-notes/2026-10-02.md --dry
```

`--dry` prints the Canvas title and body without calling Slack. Relative paths are resolved from the repository root.

## Environment

| Variable                   | Description                                                               |
| -------------------------- | ------------------------------------------------------------------------- |
| `SLACK_BOT_TOKEN`          | Bot token with `canvases:write` and `chat:write` scopes                   |
| `SLACK_RELEASE_CHANNEL_ID` | ID of the channel the Canvas is shared to (the bot must be a member)      |
| `RELEASE_NOTES_PR_URL`     | Optional. Link to the release notes PR, added to the announcement message |
