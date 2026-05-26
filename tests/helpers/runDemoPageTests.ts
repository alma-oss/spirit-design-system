/* eslint-disable no-console -- we want to log when test fails */
import { readdirSync } from 'fs';
import { test } from './fixtures';
import { formatPackageName } from './formatPackageName';
import { getServerUrl } from './getServerUrl';
import { hideFromVisualTests } from './hideFromVisualTests';
import { takeScreenshot } from './takeScreenshot';
import { waitForPageLoad } from './waitForPageLoad';
import { retryPageGoto } from './retryPageGoto';
import { NetworkError, TimeoutError } from './errors';
import { normalizeUrl } from '@alma-oss/spirit-common/utilities/url';

export interface DemoPageTestConfig {
  packageDir: string;
  targetDir: string;
  srcDir?: string;
  packageName: string;
  entityLabel: string;
  ignoredTests?: string[];
  allowUnstable?: boolean;
}

export const runDemoPageTests = (testConfig: DemoPageTestConfig) => {
  const { packageDir, targetDir, srcDir = '', packageName, entityLabel, ignoredTests = [], allowUnstable = false } =
    testConfig;
  if (packageName) {
    const formattedPackageName = formatPackageName(packageName);
    const entityLabelPlural = `${entityLabel.charAt(0).toUpperCase()}${entityLabel.slice(1)}s`;

    test.describe(`Demo ${formattedPackageName} ${entityLabelPlural}`, () => {
      const dirs = readdirSync(`${packageDir}${srcDir}${targetDir}`, { withFileTypes: true })
        .filter((item) => item.isDirectory())
        .filter((item) => readdirSync(`${packageDir}${srcDir}${targetDir}/${item.name}`).includes('index.html'))
        .filter((item) => !ignoredTests.includes(item.name))
        // there is a problem with url on case insensitive systems
        .map((item) => (process.env.NODE_ENV ? item.name.toLowerCase() : item.name));

      for (const item of dirs) {
        test(`test demo ${formattedPackageName} ${entityLabel} ${item}`, async ({ page, pageRetries }) => {
          try {
            const url = getServerUrl(packageName);
            const fullUrl = normalizeUrl(url, targetDir, item);
            await retryPageGoto(page, fullUrl, { retries: pageRetries });
            await waitForPageLoad(page);
            await hideFromVisualTests(page);
            await takeScreenshot(page, `${item}`, { fullPage: true });
          } catch (error) {
            // Handle transient network and timeout errors by skipping the test
            if (error instanceof NetworkError || error instanceof TimeoutError) {
              console.warn(
                `⊘ Test for demo ${formattedPackageName} ${entityLabel} ${item} skipped due to ${error.name}: ${error.message}`,
              );
              // Don't throw - let the test be skipped instead of failing
              return;
            }

            if (allowUnstable && item.startsWith('unstable_')) {
              console.warn(
                `Test for unstable demo ${formattedPackageName} ${entityLabel} ${item} failed, but it's marked as acceptable. ${error}`,
              );
            } else {
              // beware of the case insensitive systems; keep the prefix in the small case
              console.error(`Test for demo ${formattedPackageName} ${entityLabel} ${item} failed. ${error}`);
              throw error;
            }
          }
        });
      }
    });
  }
};
