import dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from a `.env` file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: '.env.local.playwright', quiet: true });

/**
 * Parses a string value into a number for worker configuration.
 *
 * @param value - The string value to parse (e.g., from an environment variable).
 * @returns The parsed number, or `undefined` if the value is not a valid number.
 */
const parseNumber = (value: string | undefined): number | undefined => {
  const parsed = parseInt(value ?? '', 10);

  return Number.isNaN(parsed) ? undefined : parsed;
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Number of retries: use PW_RETRIES if set, default to 2 on CI, otherwise set to 0. */
  retries: parseNumber(process.env.PW_RETRIES) ?? (process.env.CI ? 2 : 0),
  /* Configure workers: use PW_WORKERS if set, default to 1 on CI, otherwise Playwright's default. */
  workers: parseNumber(process.env.PW_WORKERS) ?? (process.env.CI ? 1 : undefined),
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.WEBSITE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Individual action timeout in ms: default to 10 seconds for better granularity than test timeout. */
    actionTimeout: parseNumber(process.env.PW_ACTION_TIMEOUT) ?? 10000,

    /* Navigation timeout in ms: default to 30 seconds for page.goto() operations. */
    navigationTimeout: parseNumber(process.env.PW_NAVIGATION_TIMEOUT) ?? 30000,

    /* Custom option: page navigation retries (can be configured via PW_PAGE_RETRIES environment variable). */
    pageRetries: parseNumber(process.env.PW_PAGE_RETRIES) ?? 3,
  } as any,

  /* Timeout configuration in ms: use PW_TIMEOUT if set, otherwise default to 120 000 ms (2 minutes). */
  timeout: parseNumber(process.env.PW_TIMEOUT) ?? 120000,

  /* Configure expect() to use in tests */
  expect: {
    /* Use PW_TIMEOUT if set, otherwise default to 120 000 ms (2 minutes). */
    timeout: parseNumber(process.env.PW_TIMEOUT) ?? 120000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], ignoreHTTPSErrors: true },
    },
  ],
});
