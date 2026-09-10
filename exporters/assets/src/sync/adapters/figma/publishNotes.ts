const firstNonEmptyNote = (...values: unknown[]): string => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return '';
};

export const extractPublishNotesFromDispatch = (payload: unknown): string => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return '';
  }

  const record = payload as Record<string, unknown>;

  return firstNonEmptyNote(record.description, record.label);
};

export const extractPublishNotesFromVersions = (payload: unknown): string => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return '';
  }

  const { versions } = payload as { versions?: unknown };

  if (!Array.isArray(versions)) {
    return '';
  }

  for (const version of versions) {
    if (!version || typeof version !== 'object' || Array.isArray(version)) {
      continue;
    }

    const record = version as Record<string, unknown>;
    const note = firstNonEmptyNote(record.description, record.label);

    if (note) {
      return note;
    }
  }

  return '';
};
