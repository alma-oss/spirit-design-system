import { normalizeUrl } from '@alma-oss/spirit-common/utilities/url';
import {
  assertNoA11yViolations,
  getWCAG2AAConfig,
  retryPageGoto,
  waitForPageLoad,
  WEB_REACT_COMPONENTS_URI,
  WEB_REACT_SERVER_URL,
} from '../../helpers';
import { test } from '../../helpers/fixtures';

test.describe('Modal Accessibility', () => {
  const testUrl = normalizeUrl(WEB_REACT_SERVER_URL, WEB_REACT_COMPONENTS_URI, 'Modal');
  const a11yConfig = getWCAG2AAConfig();

  test('Modal component (closed state) has no a11y violations', async ({ page, pageRetries }) => {
    await retryPageGoto(page, testUrl, { retries: pageRetries });
    await waitForPageLoad(page);
    await assertNoA11yViolations(page, a11yConfig);
  });

  test('Modal component (open state) has no a11y violations', async ({ page, pageRetries }) => {
    await retryPageGoto(page, testUrl, { retries: pageRetries });
    await waitForPageLoad(page);

    const openButton = page.locator('[data-test-id="modal-basic"]');
    await openButton.click();

    await page.waitForSelector('dialog[open]', { state: 'visible' });
    // Axe reads the blended color while the open transition is running, which skews the contrast ratio.
    await page.waitForFunction(() => document.getAnimations().every((animation) => animation.playState === 'finished'));

    await assertNoA11yViolations(page, a11yConfig);
  });
});
