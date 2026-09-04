import type {
  SnapshotCollection,
  SnapshotEffectStyle,
  SnapshotPaintStyle,
  SnapshotTextStyle,
  SnapshotVariable,
} from '../snapshot/types';

export interface FigmaCaptureApi {
  fileKey: string;
  fileName: string;
  now?: () => string;
  getLocalVariableCollectionsAsync: () => Promise<SnapshotCollection[]>;
  getLocalVariablesAsync: () => Promise<SnapshotVariable[]>;
  getLocalTextStylesAsync: () => Promise<SnapshotTextStyle[]>;
  getLocalPaintStylesAsync: () => Promise<SnapshotPaintStyle[]>;
  getLocalEffectStylesAsync: () => Promise<SnapshotEffectStyle[]>;
  getVariableByIdAsync: (id: string) => Promise<SnapshotVariable | null>;
}
