/* eslint-disable no-console -- we want to log when test fails */
import { test, Page, expect } from '@playwright/test';
import { formatPackageName, getServerUrl, hideFromVisualTests, waitForPageLoad, takeScreenshot } from '../../helpers';

type TestConfig = {
  componentsDir: string;
  packageName: string;
  componentName: string;
};

const runComponentCompareTests = ({ componentsDir, packageName, componentName }: TestConfig): void => {
  if (!packageName) return;

  const formattedPackageName = formatPackageName(packageName);

  test.describe(`Test opened Drawer`, () => {
    test(`Test ${componentName} component in ${formattedPackageName} package`, async ({ page }: { page: Page }) => {
      try {
        const url = getServerUrl(packageName);
        await page.goto(`${url}${componentsDir}/${componentName}/`);
        await waitForPageLoad(page);
        await hideFromVisualTests(page);
        await runDrawerTests(page, componentName);
      } catch (error) {
        console.error(`Test for demo ${formattedPackageName} component ${componentName} failed. ${error}`);
        throw error;
      }
    });
  });
};

/**
 * Waits for the drawer alignment to be applied after clicking an alignment radio button.
 *
 * This helper is needed because:
 * - web-react: React handles state updates properly, so check() alone would work
 * - web package: The inline JavaScript change event handler doesn't fire reliably
 *   with Playwright's interactions (click/check). Even with check(), the native
 *   change event isn't triggered, so we directly update the class via page.evaluate().
 *
 * Since this test runs for both packages, we need the page.evaluate() workaround
 * to ensure the web package's drawer has the correct alignment class.
 */
const waitForDrawerAlignment = async (page: Page, alignment: 'left' | 'right'): Promise<void> => {
  await expect(page.locator(`[id="drawer-alignment-${alignment}"]`)).toBeChecked();
  await page.evaluate((align) => {
    const drawer = document.getElementById('drawer-example');

    if (drawer) {
      const opposite = align === 'left' ? 'right' : 'left';

      drawer.classList.replace(`Drawer--${opposite}`, `Drawer--${align}`);
    }
  }, alignment);
};

const runDrawerTests = async (page: Page, componentName: string): Promise<void> => {
  // open drawer on the right side, close with backdrop click
  await page.click('[data-testid="drawer-open-button"]');
  await takeScreenshot(page, `${componentName}-right-backdrop-click-`);
  await page.locator('body').click({ position: { x: 0, y: 0 } });
  await expect(page.getByTestId('drawer-panel')).not.toBeVisible();

  // open drawer on the left side, close with backdrop click
  await page.locator('[id="drawer-alignment-left"]').check();
  await waitForDrawerAlignment(page, 'left');
  await page.click('[data-testid="drawer-open-button"]');
  await takeScreenshot(page, `${componentName}-left-backdrop-click`);
  await page.locator('body').click({ position: { x: 400, y: 0 } });
  await expect(page.getByTestId('drawer-panel')).not.toBeVisible();

  // open drawer on the right side, close with close button
  await page.locator('[id="drawer-alignment-right"]').check();
  await waitForDrawerAlignment(page, 'right');
  await page.click('[data-testid="drawer-open-button"]');
  await expect(page.getByTestId('drawer-panel')).toBeVisible();
  await page.click('dialog[open] button');
  await expect(page.getByTestId('drawer-panel')).not.toBeVisible();

  // open drawer on the left side, close with close button
  await page.locator('[id="drawer-alignment-left"]').check();
  await waitForDrawerAlignment(page, 'left');
  await page.click('[data-testid="drawer-open-button"]');
  await expect(page.getByTestId('drawer-panel')).toBeVisible();
  await page.click('dialog[open] button');
  await expect(page.getByTestId('drawer-panel')).not.toBeVisible();

  // open drawer on the right side, close with escape keys
  await page.locator('[id="drawer-alignment-right"]').check();
  await waitForDrawerAlignment(page, 'right');
  await page.click('[data-testid="drawer-open-button"]');
  await expect(page.getByTestId('drawer-panel')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('drawer-panel')).not.toBeVisible();

  // open drawer on the left side, close with escape keys
  await page.locator('[id="drawer-alignment-left"]').check();
  await waitForDrawerAlignment(page, 'left');
  await page.click('[data-testid="drawer-open-button"]');
  await expect(page.getByTestId('drawer-panel')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('drawer-panel')).not.toBeVisible();
};

const componentName = 'Drawer';

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
