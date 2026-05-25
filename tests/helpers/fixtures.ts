import { test as base } from '@playwright/test';

const PAGE_RETRIES_FALLBACK = 3;

/**
 * Custom fixture types for extended test functionality.
 */
interface CustomFixtures {
  /**
   * Number of retries for page navigation operations.
   * Configured via PW_PAGE_RETRIES environment variable (default: 3).
   */
  pageRetries: number;
}

/**
 * Extended test object with custom fixtures.
 *
 * This provides type-safe access to custom fixtures in test functions.
 * Example usage:
 *
 * ```typescript
 * import { test } from '../fixtures';
 *
 * test('my test', async ({ page, pageRetries }) => {
 *   // pageRetries is properly typed as number
 * });
 * ```
 */
export const test = base.extend<CustomFixtures>({
  pageRetries: [PAGE_RETRIES_FALLBACK, { option: true }],
});

// Re-export expect for convenience (so tests can import from this file)
export { expect, type Page } from '@playwright/test';
