# Figma Assets Sync

Date: 2026-08-04

Status: accepted

## Context

Figma is the source of truth for Spirit icons, but icons reached this repository through a Supernova Assets Exporter.
That extra hop made delivery depend on Supernova and on a Pulsar plugin this repository no longer needs to own.

The Figma Asset File defines icon component sets with Brand variants. Spirit, Práce, and Jobs consume different variants
in different repositories, so one product-specific exporter is not enough.

Supernova already has the last tagged Pulsar assets exporter, so that plugin can leave this repository.

## Decision

- Assets are synchronized from the Figma REST API with a Spirit-owned exporter CLI, not through Supernova.
- Figma is a source adapter. Configuration, CLI, and disk mirroring stay independent of Figma so another source can
  replace it later.
- The public Spirit repository orchestrates synchronization. Other repositories opt in; they do not run the exporter or
  store Figma credentials.
- The Pulsar `exporters/assets` plugin is retired here. SVG color transformations stay in the existing icon build
  pipeline.
- Supernova remains in place for design-token export and documentation publishing until those workflows are replaced.

## Consequences

- Icon delivery no longer depends on the Supernova Assets Exporter.
- Spirit automation owns Figma authentication, synchronization failures, and pull-request delivery.
- Removing an icon in Figma removes its SVG in the generated pull request.
- The first direct synchronization may replace most SVG markup even when rendered icons are unchanged.
- A public orchestrator can still expose repository or Git metadata. Strictly confidential repositories need a private
  orchestrator.
