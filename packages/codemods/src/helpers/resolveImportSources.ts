export const resolveImportSources = (argv: string[], parsed?: string): string | undefined => {
  if (parsed) {
    return parsed;
  }

  const equalForm = argv.find((arg) => arg.startsWith('--import-sources='));

  if (equalForm) {
    return equalForm.slice('--import-sources='.length);
  }

  const flagIndex = argv.findIndex((arg) => arg === '-s' || arg === '--import-sources');

  if (flagIndex !== -1) {
    const next = argv[flagIndex + 1];

    if (next && !next.startsWith('-')) {
      return next;
    }

    // zsh may leave a scoped package as a loose token when `-s @org/pkg` is not quoted
    const scopedPackage = argv.slice(flagIndex + 1).find((arg) => /^@[^/]+\/.+/.test(arg));

    if (scopedPackage) {
      return scopedPackage;
    }
  }

  return undefined;
};
