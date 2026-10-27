const MISSING_ERROR_CODES = new Set(['ENOENT', 'MODULE_NOT_FOUND']);

/**
 * Returns true when the error means the requested file or module does not exist
 * (`fs` ENOENT, or a failed dynamic `import()`), as opposed to a real failure while loading it.
 *
 * @param error
 */
export const isMissingModuleError = (error: unknown): boolean => {
  if (!(error instanceof Error)) {
    return false;
  }

  const { code } = error as NodeJS.ErrnoException;

  return (code !== undefined && MISSING_ERROR_CODES.has(code)) || /Cannot find module/i.test(error.message);
};
