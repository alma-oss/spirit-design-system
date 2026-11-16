import { assertNoA11yViolations, getWcagConfig, retryPageGoto, waitForPageLoad, WEB_REACT_SERVER_URL } from '../../helpers';
import { test } from '../../helpers/fixtures';

test.describe('Homepage Accessibility', () => {
  const testUrl = WEB_REACT_SERVER_URL;
  const a11yConfig = getWcagConfig();

  test('Web React homepage has no a11y violations', async ({ page, pageRetries }) => {
    await retryPageGoto(page, testUrl, { retries: pageRetries });
    await waitForPageLoad(page);
    await assertNoA11yViolations(page, a11yConfig);
  });
});
