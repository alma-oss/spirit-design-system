/* eslint-disable no-console -- we need to log retry attempts for debugging */
import { type Page, errors } from '@playwright/test';
import { NetworkError } from './errors';

/**
 * Network error patterns that should trigger a retry.
 * These are transient errors that may succeed on the next attempt.
 */
const NETWORK_ERROR_PATTERNS = [
  'ERR_ABORTED',
  'ERR_CONNECTION_REFUSED',
  'ERR_CONNECTION_RESET',
  'ERR_CONNECTION_TIMEOUT',
  'ERR_FAILED',
  'ERR_PROXY_CONNECTION_FAILED',
  'ERR_TUNNEL_CONNECTION_FAILED',
  'ERR_TEMPORARILY_THROTTLED',
  'net::ERR_',
  'net::ERROR_',
];

/**
 * Checks if an error is a network-related error that should trigger a retry.
 */
function isNetworkError(error: unknown): boolean {
  const errorMessage = String(error);

  return NETWORK_ERROR_PATTERNS.some((pattern) => errorMessage.includes(pattern));
}

/**
 * Calculates exponential backoff delay in milliseconds.
 * @param attemptNumber - The attempt number (1-based)
 * @returns Delay in milliseconds (1000, 2000, 4000, etc.)
 */
function getBackoffDelay(attemptNumber: number): number {
  return 1000 * Math.pow(2, attemptNumber - 1);
}

interface RetryPageGotoOptions {
  /**
   * Number of times to retry on network errors. Default: 3
   */
  retries?: number;

  /**
   * Wait strategy. Default: 'networkidle'
   * Options: 'load', 'domcontentloaded', 'networkidle', 'commit'
   */
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';

  /**
   * Timeout in milliseconds. If not set, uses Playwright's default.
   */
  timeout?: number;
}

/**
 * Navigates to a URL with automatic retry logic for network errors.
 *
 * This helper wraps `page.goto()` with retry logic to handle transient network issues.
 * On network errors, it will retry up to the specified number of times with exponential
 * backoff between attempts.
 *
 * @param page - Playwright page object
 * @param url - URL to navigate to
 * @param options - Retry and navigation options
 * @returns Response object from successful navigation
 * @throws NetworkError - If all retries fail with network errors
 * @throws TimeoutError - If the operation exceeds the timeout
 * @throws Other errors - For non-network failures
 *
 * @example
 * ```typescript
 * await retryPageGoto(page, 'https://example.com', { retries: 3 });
 * ```
 */
export async function retryPageGoto(
  page: Page,
  url: string,
  options: RetryPageGotoOptions = {},
) {
  const { retries = 3, waitUntil = 'domcontentloaded', timeout } = options;

  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const gotoOptions: Parameters<Page['goto']>[1] = {
        waitUntil,
      };

      if (timeout) {
        gotoOptions.timeout = timeout;
      }

      const response = await page.goto(url, gotoOptions);

      if (attempt > 1) {
        console.log(`✓ Successfully navigated to ${url} on attempt ${attempt}`);
      }

      return response;
    } catch (error) {
      lastError = error as Error;

      // If it's not a network error or Timeout, rethrow immediately
      if (
        !isNetworkError(error) &&
        !(error instanceof errors.TimeoutError)
      ) {
        throw error;
      }

      // If this is the last attempt, wrap in NetworkError
      if (attempt === retries) {
        console.error(
          `✗ Failed to navigate to ${url} after ${retries} attempts with network error: ${error}`,
        );

        throw new NetworkError(`Failed to navigate to ${url} after ${retries} retries`, lastError);
      }

      // Calculate backoff and log retry
      const backoffMs = getBackoffDelay(attempt);
      console.warn(
        `⚠ Network error on attempt ${attempt}/${retries} for ${url}: ${error}. ` +
          `Retrying in ${backoffMs}ms...`,
      );

      // Wait before retrying
      await page.waitForTimeout(backoffMs);

      // Reset page to clean state before retry
      try {
        await page.goto('about:blank', { waitUntil: 'domcontentloaded' });
      } catch {
        // ignore cleanup errors
      }
    }
  }

  // This should not be reached due to the throw in the loop, but TypeScript needs it
  throw lastError || new Error(`Failed to navigate to ${url}`);
}
