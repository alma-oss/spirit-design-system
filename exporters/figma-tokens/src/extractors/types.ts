import type { SnapshotV1 } from '../snapshot/types';

/**
 * Transport boundary for SnapshotV1. The plugin JSON extractor is the first
 * implementation. A later Enterprise REST extractor must emit the same schema.
 */
export interface SnapshotExtractor {
  extract: () => Promise<SnapshotV1>;
}
