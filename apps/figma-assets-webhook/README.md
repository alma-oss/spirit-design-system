# Figma Assets Webhook

This Netlify Function receives `LIBRARY_PUBLISH` events from the Figma Assets file and dispatches the repository's
**Sync Figma Assets** GitHub Actions workflow. The dedicated Netlify project isolates webhook deployment, logs, and
secrets from the documentation applications.

The public endpoint is `/webhooks/figma-assets`. It accepts JSON `POST` requests only.

## Security Model

Figma webhooks use a passcode echoed in the request body; Figma does not sign webhook payloads. The receiver therefore:

- compares a dedicated high-entropy passcode using fixed-length hashes and a timing-safe comparison;
- accepts only the configured webhook ID, Assets file key, and `LIBRARY_PUBLISH` event;
- rejects event timestamps older than four hours or more than five minutes in the future;
- atomically claims each delivery fingerprint in a strongly consistent Netlify Blob store before dispatching it;
- limits request bodies to 64 KiB and validates their content type and shape;
- mints a short-lived GitHub App installation token scoped to this repository and `contents: write`;
- sends requests only to the hard-coded `api.github.com` repository endpoint;
- returns generic errors and never logs request bodies or credentials.

Repeated deliveries are acknowledged without dispatching another workflow. Failed GitHub dispatches release the claim
so Figma can retry. The GitHub workflow also serializes runs, and the asset sync produces no commit when Figma and the
repository already match.

## Netlify Configuration

Create the `spirit-figma-assets-webhook` project in the Alma Career Netlify team from this repository and use
`apps/figma-assets-webhook/netlify.toml` as its configuration file.

Set these variables only for the production deploy context:

- `FIGMA_WEBHOOK_PASSCODE`: at least 32 random bytes, for example generated locally with `openssl rand -hex 32`;
- `FIGMA_ASSETS_FILE_KEY`: `UMd06VnGrAE5xheb4C8QEg`;
- `FIGMA_WEBHOOK_ID`: the numeric ID returned when the Figma webhook is created;
- `GH_APP_CLIENT_ID`: client ID of the existing `almaoss-spirit-design-system` GitHub App;
- `GH_APP_PRIVATE_KEY`: a private key for that GitHub App;
- `GH_APP_INSTALLATION_ID`: the App installation ID for the Alma OSS organization;
- `GITHUB_REPOSITORY`: `alma-oss/spirit-design-system`.

The GitHub App must be installed only on the intended repository and have `Contents: Read and write`. Do not expose
these variables to deploy previews. Keep `FIGMA_ACCESS_TOKEN`, which reads and exports assets during synchronization,
in GitHub Actions rather than Netlify.

## Registering the Figma Webhook

Figma has no webhook management UI. Use a short-lived setup token from the shared Figma account with the
`webhooks:write` scope. The account must be allowed to create a webhook on the Assets file.

Deploy the receiver with all Netlify variables except `FIGMA_WEBHOOK_ID`, then register the webhook:

```shell
read -r -s FIGMA_SETUP_TOKEN
read -r -s FIGMA_WEBHOOK_PASSCODE
export FIGMA_SETUP_TOKEN FIGMA_WEBHOOK_PASSCODE
export FIGMA_WEBHOOK_ENDPOINT='https://spirit-figma-assets-webhook.netlify.app/webhooks/figma-assets'

curl --fail-with-body \
  --request POST \
  --header "X-Figma-Token: ${FIGMA_SETUP_TOKEN}" \
  --header 'Content-Type: application/json' \
  --data "$(jq --null-input \
    --arg endpoint "${FIGMA_WEBHOOK_ENDPOINT}" \
    --arg passcode "${FIGMA_WEBHOOK_PASSCODE}" \
    '{
      event_type: "LIBRARY_PUBLISH",
      context: "file",
      context_id: "UMd06VnGrAE5xheb4C8QEg",
      endpoint: $endpoint,
      passcode: $passcode,
      description: "Sync Spirit assets to GitHub"
    }')" \
  https://api.figma.com/v2/webhooks
```

Figma immediately sends a `PING`; the receiver can authenticate it before the webhook ID is known. Copy the numeric
`id` from the response into the production-only `FIGMA_WEBHOOK_ID` variable and redeploy. Do not store the setup token
or passcode in shell history, documentation, or the repository. Access to Figma webhook delivery history is
secret-equivalent because request payloads contain the passcode.

## Verification and Operations

After configuration:

1. Confirm the automatic `PING` returned `200`.
2. Publish a controlled update to the Figma Assets library.
3. Confirm Netlify returned `200` and GitHub started **Sync Figma Assets**.
4. Confirm the workflow opened or updated the managed asset pull request.
5. Review Figma's delivery history:

```shell
curl --fail-with-body \
  --header "X-Figma-Token: ${FIGMA_SETUP_TOKEN}" \
  "https://api.figma.com/v2/webhooks/${FIGMA_WEBHOOK_ID}/requests"
```

Figma retries non-`200` deliveries after approximately 5 minutes, 30 minutes, and 3 hours. The four-hour freshness
window accepts all scheduled retries. A `502` from the receiver means delivery-state storage, GitHub authentication, or
dispatch failed and should be investigated before the final retry.

To rotate the passcode without accepting events under mismatched secrets, pause the webhook with
`PUT /v2/webhooks/{webhook_id}`, update the production Netlify secret, update the Figma webhook passcode, and reactivate
it. Rotate GitHub App private keys by adding the new key to Netlify before revoking the old key.

Pause a webhook with `PUT /v2/webhooks/{webhook_id}` and `"status": "PAUSED"`. Remove it permanently with
`DELETE /v2/webhooks/{webhook_id}`.

## Development

Run all checks, including enforced 100% line, branch, and function coverage:

```shell
yarn workspace @alma-oss/spirit-figma-assets-webhook test
```

Run the Netlify project locally:

```shell
yarn netlify dev --filter @alma-oss/spirit-figma-assets-webhook
```
