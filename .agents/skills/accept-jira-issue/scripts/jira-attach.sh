#!/usr/bin/env bash
# jira-attach.sh — Attach one or more files to a Jira issue via REST.
#
# Usage: jira-attach.sh <ISSUE-KEY> <file> [file ...]
#
# Environment:
#   JIRA_EMAIL           required — the email of your Atlassian account
#   JIRA_API_TOKEN       required — an Atlassian API token. Provide it however you store
#                        secrets (shell profile, .env file, or a secret manager that injects env vars).
#   JIRA_URL             optional — must equal https://almacareer.atlassian.net (anything else is rejected,
#                        so the token cannot be sent to another host)

set -euo pipefail

TRUSTED_JIRA_URL="https://almacareer.atlassian.net"
JIRA_URL="${JIRA_URL:-$TRUSTED_JIRA_URL}"
JIRA_URL="${JIRA_URL%/}"

if [[ "$JIRA_URL" != "$TRUSTED_JIRA_URL" ]]; then
  echo "Error: JIRA_URL must be $TRUSTED_JIRA_URL (got '$JIRA_URL')." >&2
  exit 1
fi

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <ISSUE-KEY> <file> [file ...]" >&2
  exit 1
fi

if [[ -z "${JIRA_EMAIL:-}" || -z "${JIRA_API_TOKEN:-}" ]]; then
  echo "Error: JIRA_EMAIL and JIRA_API_TOKEN must be set. Export your Atlassian email and an API token and retry." >&2
  exit 1
fi

issue_key="$1"
shift

if [[ ! "$issue_key" =~ ^[A-Z]+-[0-9]+$ ]]; then
  echo "Error: '$issue_key' is not a Jira issue key (expected e.g. DS-1234)." >&2
  exit 1
fi

form_args=()
for file in "$@"; do
  if [[ ! -f "$file" ]]; then
    echo "Error: file not found: $file" >&2
    exit 1
  fi
  form_args+=(-F "file=@${file}")
done

response_file="$(mktemp)"
trap 'rm -f "$response_file"' EXIT

status="$(curl -sS -o "$response_file" -w '%{http_code}' \
  -X POST \
  -u "${JIRA_EMAIL}:${JIRA_API_TOKEN}" \
  -H "X-Atlassian-Token: no-check" \
  "${form_args[@]}" \
  "${JIRA_URL}/rest/api/2/issue/${issue_key}/attachments")"

if [[ "$status" != "200" ]]; then
  echo "Error: Jira returned HTTP $status" >&2
  cat "$response_file" >&2
  exit 1
fi

echo "Attached $# file(s) to ${issue_key}: ${JIRA_URL}/browse/${issue_key}"
