const MISSING_ERROR_CODES = new Set(['ENOENT', 'MODULE_NOT_FOUND']);

/**
 * Returns true when the error means the requested file or module does not exist
 * (`fs` ENOENT, or a failed dynamic `import()`), as opposed to a real failure while loading it.
 *
 * @param error
 */
export const isMissingModuleError = (error: unknown): boolean => {
  // Duck-typing instead of `instanceof Error`: errors thrown by `fs` can come from another realm in production.
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  const { code, message } = error as { code?: unknown; message?: unknown };

  return (
    (typeof code === 'string' && MISSING_ERROR_CODES.has(code)) ||
    (typeof message === 'string' && /Cannot find module/i.test(message))
  );
};
