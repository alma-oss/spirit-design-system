# Figma Assets Sync

Date: 2026-08-04

Status: accepted

## Context

Figma is the source of truth for Spirit icons, but icons were delivered to the repository through a Supernova Assets
Exporter. This added an intermediary to the workflow and made automated delivery dependent on Supernova.

The Figma Asset File defines icon component sets with Brand variants. Spirit, Práce, and Jobs consume different variants
in different repositories, so the synchronization mechanism needs to support multiple Brand and output-directory
pairings without coupling the implementation to one product.

## Decision

We synchronize icons directly from the Figma REST API with the `@alma-oss/figma-assets` CLI.

Each repository stores a configuration containing the Asset File key and one or more Sync Targets. A Sync Target selects
one Brand, one or more asset types, and one output directory. Brand-specific icons and shared Benefit Icons can be
combined in one target. The output directory is an exact mirror of the combined asset set: synchronization adds,
updates, and removes SVG files.

The Spirit repository runs synchronization through a GitHub Actions workflow. The workflow can be started manually or
by a dedicated Netlify Function when the Figma Assets library publishes. The receiver validates Figma's webhook
passcode, webhook ID, event type, and file key, then authenticates as the organization-owned GitHub App and sends a
repository dispatch. The workflow opens or updates a pull request when generated files change.

A shared Figma account provides a read-only personal access token through the `FIGMA_ACCESS_TOKEN` repository secret.
The webhook setup token with `webhooks:write` is separate and is not needed by the runtime receiver.

SVG color transformations remain in the existing icon build pipeline. The synchronization CLI only downloads Figma SVGs
and normalizes filenames and final newlines.

Supernova remains in place for design-token export and documentation publishing until those workflows are replaced
separately.

## Consequences

- Icon delivery no longer depends on the Supernova Assets Exporter.
- Repository automation owns Figma authentication, synchronization failures, and pull-request delivery.
- The same CLI configuration model can serve the private Práce and Jobs monorepo with separate Sync Targets.
- Removing an icon in Figma removes its SVG in the generated pull request.
- The first direct synchronization may replace most SVG markup even when rendered icons are unchanged.
- Publishing the Figma Assets library automatically invokes the same synchronization workflow as a manual run without
  changing the CLI.
- Webhook delivery depends on a small dedicated Netlify project and production-only Figma and GitHub App secrets.
- Figma webhook authenticity relies on a shared passcode rather than a signed payload, so the receiver additionally
  allowlists the exact webhook, file, event, repository, and GitHub API destination, enforces event freshness, and
  deduplicates delivery fingerprints in strongly consistent Netlify Blob storage.
