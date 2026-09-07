import { SNAPSHOT_SCHEMA_VERSION, type SnapshotV1 } from './types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const requireString = (value: unknown, path: string): string => {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Snapshot ${path} must be a non-empty string.`);
  }

  return value;
};

const requireArray = (value: unknown, path: string): unknown[] => {
  if (!Array.isArray(value)) {
    throw new Error(`Snapshot ${path} must be an array.`);
  }

  return value;
};

export const validateSnapshot = (value: unknown): SnapshotV1 => {
  if (!isRecord(value)) {
    throw new Error('Snapshot must be a JSON object.');
  }

  if (value.schemaVersion !== SNAPSHOT_SCHEMA_VERSION) {
    throw new Error(`Snapshot schemaVersion must be ${SNAPSHOT_SCHEMA_VERSION}.`);
  }

  if (typeof value.capturedAt !== 'string' || Number.isNaN(Date.parse(value.capturedAt))) {
    throw new Error('Snapshot capturedAt must be an ISO timestamp.');
  }

  if (!isRecord(value.file)) {
    throw new Error('Snapshot file must be an object.');
  }

  if (typeof value.file.key !== 'string') {
    throw new Error('Snapshot file.key must be a string.');
  }

  requireString(value.file.name, 'file.name');
  requireArray(value.collections, 'collections');
  requireArray(value.variables, 'variables');
  requireArray(value.styles, 'styles');
  requireArray(value.dependencies, 'dependencies');
  requireArray(value.diagnostics, 'diagnostics');

  return value as unknown as SnapshotV1;
};
