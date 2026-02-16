/* eslint-disable no-console -- we want to log when test fails */
import { test, Page } from '@playwright/test';
import { formatPackageName, getServerUrl, hideFromVisualTests, waitForPageLoad, takeScreenshot } from '../../helpers';
import { normalizeUrl } from '@alma-oss/spirit-common/utilities/url';

type TestConfig = {
  componentsDir: string;
  packageName: string;
  componentName: string;
};

type ModalTestConfig = {
  openSelector: string;
  testName: string;
};

const runComponentCompareTests = ({ componentsDir, packageName, componentName }: TestConfig): void => {
  if (!packageName) return;

  const formattedPackageName = formatPackageName(packageName);

  test.describe(`Test opened Modal`, () => {
    test(`Test ${componentName} component in ${formattedPackageName} package`, async ({ page }: { page: Page }) => {
      try {
        const url = getServerUrl(packageName);
        await page.goto(normalizeUrl(url, componentsDir, componentName));
        await waitForPageLoad(page);
        await hideFromVisualTests(page);
        await runModalTests(page, componentName);
      } catch (error) {
        console.error(`Test for demo ${formattedPackageName} component ${componentName} failed. ${error}`);
        throw error;
      }
    });
  });
};

const runModalTests = async (page: Page, componentName: string): Promise<void> => {
  // open basic modal, close with backdrop click
  await page.click('[data-test-id="modal-basic"]');
  await takeScreenshot(page, `${componentName}-basic`);
  await page.locator('body').click({ position: { x: 0, y: 0 } });

  // open modal and dropdown inside, close with close button
  await page.click('[data-test-id="modal-with-dropdown"]');
  await page.click('dialog[open] .Dropdown button');
  await takeScreenshot(page, `${componentName}-with-dropdown`);
  await page.click('dialog[open] header button');

  // open two stacking modals, close with escape keys, wait for animation to finish
  await page.click('[data-test-id="modal-stacking"]');
  await page.click('dialog[open] footer button');
  await takeScreenshot(page, `${componentName}-stacking`);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);

  // open modal with hidden close button, close with action button
  await page.click('button[data-test-id="modal-with-hidden-close-button"]');
  await takeScreenshot(page, `${componentName}-hidden-close-button`);
  await page.click('dialog[open] footer button');

  // open rest of modals and take screenshots, close with close button
  for (const config of modalTestConfigs) {
    await page.click(`[data-test-id="${config.openSelector}"]`);
    await takeScreenshot(page, `${componentName}-${config.testName}`);
    await page.click('dialog[open] header button');
  }

  // screenshot of closed modals
  await takeScreenshot(page, `${componentName}-closed-modals`, { fullPage: true });
};

const modalTestConfigs: ModalTestConfig[] = [
  {
    openSelector: 'modal-with-form',
    testName: 'with-form',
  },
  {
    openSelector: 'modal-with-long-content',
    testName: 'with-long-content',
  },
  {
    openSelector: 'modal-with-scrolling-inside',
    testName: 'with-scrolling-inside',
  },
  {
    openSelector: 'modal-with-scrollview',
    testName: 'with-scrollview',
  },
  {
    openSelector: 'modal-with-custom-height',
    testName: 'with-custom-height',
  },
  {
    openSelector: 'modal-with-disabled-backdrop-click',
    testName: 'disabled-backdrop-click',
  },
];

const componentName = 'Modal';

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
