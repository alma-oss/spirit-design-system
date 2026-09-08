# Figma Assets Sync

Date: 2026-08-04

Status: accepted

## Context

Figma is the source of truth for Spirit icons, but icons were delivered to the repository through a Supernova Assets
Exporter. This added an intermediary to the workflow and made automated delivery dependent on Supernova.

The Figma Asset File defines icon component sets with Brand variants. Spirit, Práce, and Jobs consume different variants
in different repositories, so the synchronization mechanism needs to support multiple Brand and output-directory
pairings without coupling the implementation to one product.

Supernova already pulled the last tagged Pulsar assets exporter, so that plugin can be replaced in this repository.

## Decision

We synchronize assets directly from the Figma REST API with the `@alma-oss/spirit-assets-exporter` CLI.

Figma is a source adapter. Core CLI, configuration, and disk mirroring stay independent of Figma so another source can
replace it later.

The Pulsar `exporters/assets` plugin is retired in this repository because Supernova already has the last tagged copy.
SVG color transformations remain in the existing icon build pipeline.

Supernova remains in place for design-token export and documentation publishing until those workflows are replaced
separately.

## Consequences

- Icon delivery no longer depends on the Supernova Assets Exporter.
- Repository automation owns Figma authentication, synchronization failures, and pull-request delivery.
- Removing an icon in Figma removes its SVG in the generated pull request.
- The first direct synchronization may replace most SVG markup even when rendered icons are unchanged.
