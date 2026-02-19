import { test } from '../../helpers/fixtures';
import {
  assertNoA11yViolations,
  getWCAG2AAConfig,
  retryPageGoto,
  waitForPageLoad,
  WEB_REACT_COMPONENTS_URI,
  WEB_REACT_SERVER_URL,
} from '../../helpers';
import { normalizeUrl } from '@alma-oss/spirit-common/utilities/url';

test.describe('Checkbox Accessibility', () => {
  const testUrl = normalizeUrl(WEB_REACT_SERVER_URL, WEB_REACT_COMPONENTS_URI, 'Checkbox');
  // TODO by @dlouhak: Re-enable 'color-contrast' rule once the tokens are updated to meet contrast requirements
  // https://jira.almacareer.tech/browse/DS-2317
  const a11yConfig = { ...getWCAG2AAConfig(), disableRules: ['color-contrast'] };

  test('Checkbox component has no a11y violations', async ({ page, pageRetries }) => {
    await retryPageGoto(page, testUrl, { retries: pageRetries });
    await waitForPageLoad(page);
    await assertNoA11yViolations(page, a11yConfig);
  });
});
