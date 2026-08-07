/* eslint-disable no-console -- we want to log when test fails */
import { test, expect, type Page } from '../../helpers/fixtures';
import {
  formatPackageName,
  getServerUrl,
  hideFromVisualTests,
  waitForPageLoad,
  takeScreenshot,
  retryPageGoto,
} from '../../helpers';
import { normalizeUrl } from '@alma-oss/spirit-common/utilities/url';

type TestConfig = {
  componentsDir: string;
  packageName: string;
  componentName: string;
};

type ComboboxOpenTestConfig = {
  inputId: string;
  testName: string;
};

const INPUT_IDS = {
  web: {
    default: 'combobox-default-input',
    preselected: 'combobox-pre-input',
    searchResults: 'combobox-search-results-input',
    lastSearches: 'combobox-last-searches-input',
    tip: 'combobox-tip-input',
  },
  'web-react': {
    default: 'combobox-demo-combobox-default-input',
    preselected: 'combobox-demo-combobox-preselected-input',
    searchResults: 'combobox-demo-combobox-search-results-input',
    lastSearches: 'combobox-demo-combobox-last-searches-grid-input',
    tip: 'combobox-demo-combobox-custom-content-input',
  },
} as const;

const getComboboxOpenTestConfigs = (packageName: string): ComboboxOpenTestConfig[] => {
  const ids = packageName === 'web' ? INPUT_IDS.web : INPUT_IDS['web-react'];

  return [
    { inputId: ids.default, testName: 'default' },
    { inputId: ids.preselected, testName: 'preselected' },
    { inputId: ids.searchResults, testName: 'search-results' },
    { inputId: ids.lastSearches, testName: 'last-searches-grid' },
    { inputId: ids.tip, testName: 'custom-content' },
  ];
};

const runComponentCompareTests = ({ componentsDir, packageName, componentName }: TestConfig): void => {
  if (!packageName) return;

  const formattedPackageName = formatPackageName(packageName);

  test.describe(`Test opened Combobox`, () => {
    test(`Test ${componentName} component in ${formattedPackageName} package`, async ({ page, pageRetries }) => {
      try {
        // Taller than default Desktop Chrome so tall grid popovers are not clipped.
        await page.setViewportSize({ width: 1280, height: 960 });
        const url = getServerUrl(packageName);
        await retryPageGoto(page, normalizeUrl(url, componentsDir, componentName), { retries: pageRetries });
        await waitForPageLoad(page);
        await hideFromVisualTests(page);
        await runComboboxOpenTests(page, componentName, packageName);
      } catch (error) {
        console.error(`Test for demo ${formattedPackageName} component ${componentName} failed. ${error}`);
        throw error;
      }
    });
  });
};

/**
 * Hide sibling demo sections so the target Combobox sits at the top of the viewport
 * and its downward popover is not clipped by the page length above it.
 */
const isolateComboboxSection = async (page: Page, inputId: string): Promise<() => Promise<void>> => {
  await page.evaluate((id) => {
    const input = document.getElementById(id);
    const section = input?.closest('section');

    if (!section) {
      return;
    }

    document.querySelectorAll('main section, #root > section, body section').forEach((candidate) => {
      if (candidate !== section) {
        (candidate as HTMLElement).dataset.spiritE2eHidden = 'true';
        (candidate as HTMLElement).style.display = 'none';
      }
    });

    window.scrollTo(0, 0);
  }, inputId);

  return async () => {
    await page.evaluate(() => {
      document.querySelectorAll<HTMLElement>('[data-spirit-e2e-hidden="true"]').forEach((el) => {
        el.style.display = '';
        delete el.dataset.spiritE2eHidden;
      });
    });
  };
};

const runComboboxOpenTests = async (page: Page, componentName: string, packageName: string): Promise<void> => {
  for (const config of getComboboxOpenTestConfigs(packageName)) {
    const restoreSections = await isolateComboboxSection(page, config.inputId);
    const input = page.locator(`[id="${config.inputId}"]`);

    await input.click();
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('dialog')).toBeVisible();
    await takeScreenshot(page, `${componentName}-${config.testName}`);
    await page.keyboard.press('Escape');
    await expect(input).toHaveAttribute('aria-expanded', 'false');
    await restoreSections();
    await page.waitForTimeout(300);
  }
};

const componentName = 'UNSTABLE_Combobox';

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
