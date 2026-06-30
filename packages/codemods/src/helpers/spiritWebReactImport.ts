export const DEFAULT_SPIRIT_WEB_REACT_IMPORT_SOURCES = ['@alma-oss/spirit-web-react'] as const;

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getImportSources = (options?: Record<string, unknown>): string[] => {
  const sources = new Set<string>(DEFAULT_SPIRIT_WEB_REACT_IMPORT_SOURCES);

  if (typeof options?.importSources === 'string' && options.importSources.length > 0) {
    options.importSources.split(',').forEach((source) => {
      const trimmed = source.trim();

      if (trimmed.length > 0) {
        sources.add(trimmed);
      }
    });
  }

  return [...sources];
};

export const isSpiritWebReactImport = (value: string, sources: string[]): boolean =>
  sources.some((source) => {
    const escapedSource = escapeRegExp(source);

    return new RegExp(`^${escapedSource}(\\/.*)?$`).test(value);
  });

export const createImportSourceMatcher =
  (sources: string[]): ((value: string) => boolean) =>
  (value: string) =>
    isSpiritWebReactImport(value, sources);
