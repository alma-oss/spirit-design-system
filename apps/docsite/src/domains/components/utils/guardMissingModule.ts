import { notFound } from 'next/navigation';
import { isMissingModuleError } from './isMissingModuleError';

/**
 * Renders the 404 page when the error means the requested file or module does not exist.
 * Any other error is left untouched so the caller can log and rethrow it.
 *
 * @param error
 */
export const guardMissingModule = (error: unknown): void => {
  if (isMissingModuleError(error)) {
    notFound();
  }
};
