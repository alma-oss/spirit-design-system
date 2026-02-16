/* eslint-disable no-console -- we want to log when test fails */
import { test, Page } from '@playwright/test';
import { formatPackageName, getServerUrl, hideFromVisualTests, waitForPageLoad, takeScreenshot } from '../../helpers';
import { normalizeUrl } from '@alma-oss/spirit-common/utilities/url';

type TestConfig = {
  componentsDir: string;
  packageName: string;
  componentName: string;
};

const runComponentCompareTests = ({ componentsDir, packageName, componentName }: TestConfig): void => {
  if (!packageName) return;

  const formattedPackageName = formatPackageName(packageName);

  test.describe('Test Tooltip with focus trigger', () => {
    test(`Test ${componentName} component focus trigger in ${formattedPackageName} package`, async ({
      page,
    }: {
      page: Page;
    }) => {
      try {
        const url = getServerUrl(packageName);
        await page.goto(normalizeUrl(url, componentsDir, componentName));
        await waitForPageLoad(page);
        await hideFromVisualTests(page);
        await runTooltipTests(page, componentName, packageName);
      } catch (error) {
        console.error(`Test for demo ${formattedPackageName} component ${componentName} failed. ${error}`);
        throw error;
      }
    });
  });
};

const runTooltipTests = async (page: Page, componentName: string, packageName: string): Promise<void> => {
  // Test focus trigger - focus button and take screenshot of tooltip
  // First, click somewhere at the top to ensure we start from a known position
  await page.click('body', { position: { x: 0, y: 0 } });
  await page.waitForTimeout(100);

  // Find the button with focus trigger
  const focusButtonSelector = packageName === 'web' ? '#button-focus' : 'button:has-text("Focus me")';

  // Focus the button directly
  await page.focus(focusButtonSelector);

  // Wait for tooltip to appear - use fixed timeout like other tests
  await page.waitForTimeout(500);

  // Take screenshot of tooltip opened via focus
  await takeScreenshot(page, `${componentName}-focus-trigger`);

  // Test blur - move focus away
  await page.keyboard.press('Tab');
  await page.waitForTimeout(300);

  // Test all triggers button (hover, click, focus) - verify it works with focus too
  const allTriggersButtonSelector = packageName === 'web' ? '#button-all' : 'button:has-text("All triggers")';

  await page.focus(allTriggersButtonSelector);

  // Wait for tooltip to appear
  await page.waitForTimeout(500);

  // Take screenshot of all triggers tooltip opened via focus
  await takeScreenshot(page, `${componentName}-all-triggers-focus`);

  // Move focus away
  await page.keyboard.press('Tab');
  await page.waitForTimeout(200);
};

const componentName = 'Tooltip';

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
