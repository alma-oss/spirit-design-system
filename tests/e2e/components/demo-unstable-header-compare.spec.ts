/* eslint-disable no-console -- we want to log when test fails */
import { test, expect, type Page } from '../../helpers/fixtures';
import { formatPackageName, getServerUrl, hideFromVisualTests, waitForPageLoad, takeScreenshot, retryPageGoto } from '../../helpers';
import { normalizeUrl } from '@alma-oss/spirit-common/utilities/url';

type TestConfig = {
  componentsDir: string;
  packageName: string;
  componentName: string;
};

const runComponentCompareTests = ({ componentsDir, packageName, componentName }: TestConfig): void => {
  if (!packageName) return;

  const formattedPackageName = formatPackageName(packageName);

  test.describe('Test opened UNSTABLE_Header', () => {
    test(`Test ${componentName} component in ${formattedPackageName} package`, async ({ page, pageRetries }) => {
      try {
        const url = getServerUrl(packageName);
        await page.setViewportSize({ width: 375, height: 812 });
        await retryPageGoto(page, normalizeUrl(url, componentsDir, componentName), { retries: pageRetries });
        await waitForPageLoad(page);
        await hideFromVisualTests(page);
        await runHeaderTests(page, componentName);
      } catch (error) {
        console.error(`Test for demo ${formattedPackageName} component ${componentName} failed. ${error}`);
        throw error;
      }
    });
  });
};

const runHeaderTests = async (page: Page, componentName: string): Promise<void> => {
  // open drawer for 'With Navigation'
  await page.click('[id="drawer-navigation-open-button"]');
  await takeScreenshot(page, `${componentName}-with-navigation`);
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.locator('body').click({ position: { x: 0, y: 0 } });
  await expect(page.getByRole('dialog')).not.toBeVisible();

  // open drawer for 'With Pill Navigation'
  await page.click('[id="drawer-navigation-pill-open-button"]');
  await takeScreenshot(page, `${componentName}-with-pill-navigation`);
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.locator('body').click({ position: { x: 0, y: 0 } });
  await expect(page.getByRole('dialog')).not.toBeVisible();

  // open drawer for 'With Navigation and Nested Items'
  await page.click('[id="drawer-navigation-expanded-open-button"]');
  await takeScreenshot(page, `${componentName}-with-navigation-and-nested-items`);
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.locator('body').click({ position: { x: 0, y: 0 } });
  await expect(page.getByRole('dialog')).not.toBeVisible();
};

const componentName = 'UNSTABLE_Header';

const testConfigs: TestConfig[] = [
  {
    componentName,
    componentsDir: '/src/scss/components',
    packageName: 'web',
  },
  {
    componentName,
    componentsDir: '/src/components',
    packageName: 'web-react',
  },
];

testConfigs.forEach(runComponentCompareTests);
