import { test } from '../../helpers/fixtures';
import { assertNoA11yViolations, getWCAG2AAConfig, retryPageGoto, waitForPageLoad, WEB_REACT_SERVER_URL } from '../../helpers';

test.describe('Homepage Accessibility', () => {
  const testUrl = WEB_REACT_SERVER_URL;
  const a11yConfig = getWCAG2AAConfig();

  test('Web React homepage has no a11y violations', async ({ page, pageRetries }) => {
    await retryPageGoto(page, testUrl, { retries: pageRetries });
    await waitForPageLoad(page);
    await assertNoA11yViolations(page, a11yConfig);
  });
});
