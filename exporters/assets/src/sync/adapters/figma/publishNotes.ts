import { FIGMA_API_URL, requestJson } from './client';

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

export interface ResolvePublishNotesOptions {
  description?: string;
  fetch?: typeof fetch;
  fileKey?: string;
  logError?: (message: string) => void;
  token?: string;
}

export const resolvePublishNotes = async ({
  description,
  fetch: fetchImplementation = fetch,
  fileKey,
  logError = () => undefined,
  token,
}: ResolvePublishNotesOptions): Promise<string> => {
  const dispatchNotes = extractPublishNotesFromDispatch({ description });

  if (dispatchNotes) {
    return dispatchNotes;
  }

  if (!fileKey?.trim() || !token?.trim()) {
    return '';
  }

  try {
    const versions = await requestJson<unknown>(
      fetchImplementation,
      `${FIGMA_API_URL}/files/${encodeURIComponent(fileKey)}/versions`,
      token,
    );

    return extractPublishNotesFromVersions(versions);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    logError(
      `Figma versions API request failed: ${detail}. Grant file_versions:read on FIGMA_ACCESS_TOKEN, or forward the library publish description as repository_dispatch client_payload.description.`,
    );

    return '';
  }
};
