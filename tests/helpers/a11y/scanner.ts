import AxeBuilder from '@axe-core/playwright';
import { Page } from '@playwright/test';
import { formatViolations, formatViolationError } from './formatters';
import { type A11yScanOptions, type A11yScanResult } from './types';

/**
 * Runs an accessibility scan on the current page
 *
 * @param page - Playwright Page object
 * @param options - Configuration options for the scan
 * @returns Promise resolving to scan results
 *
 * @example
 * ```typescript
 * const results = await runA11yScan(page, {
 *   exclude: ['.hide-from-visual-tests'],
 *   withTags: ['wcag2aa']
 * });
 * ```
 */
export const runA11yScan = async (page: Page, options: A11yScanOptions = {}): Promise<A11yScanResult> => {
  const builder = new AxeBuilder({ page });

  if (options.exclude) {
    const excludeSelectors = Array.isArray(options.exclude) ? options.exclude : [options.exclude];
    excludeSelectors.forEach((selector) => builder.exclude(selector));
  }

  if (options.disableRules) {
    builder.disableRules(options.disableRules);
  }

  if (options.withTags) {
    builder.withTags(options.withTags);
  }

  if (options.withRules) {
    builder.withRules(options.withRules);
  }

  const results = await builder.analyze();

  return {
    violations: formatViolations(results.violations),
    violationCount: results.violations.length,
    url: results.url,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Asserts that a page has no accessibility violations
 * Throws an error with formatted violation details if any are found
 *
 * @param page - Playwright Page object
 * @param options - Configuration options for the scan
 * @throws Error with formatted violation details
 *
 * @example
 * ```typescript
 * await assertNoA11yViolations(page, {
 *   exclude: ['.hide-from-visual-tests']
 * });
 * ```
 */
export const assertNoA11yViolations = async (page: Page, options: A11yScanOptions = {}): Promise<void> => {
  const results = await runA11yScan(page, options);

  if (results.violations.length > 0) {
    const errorMessage = formatViolationError(results);
    throw new Error(errorMessage);
  }
};
