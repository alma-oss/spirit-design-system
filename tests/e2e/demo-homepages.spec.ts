import { isTesting } from '@alma-oss/spirit-common/constants/environments';
import { SERVERS, getDevelopmentEndpointUri } from '@alma-oss/spirit-common/constants/servers';
import { test } from '../helpers/fixtures';
import { hideFromVisualTests, retryPageGoto, takeScreenshot, waitForPageLoad } from '../helpers';

test.describe('Demo Homepages', () => {
  const demos = [
    {
      url: isTesting() ? SERVERS.TESTING.web : getDevelopmentEndpointUri('web', { isDocker: true }),
      package: 'web',
    },
    {
      url: isTesting() ? SERVERS.TESTING['web-react'] : getDevelopmentEndpointUri('web-react', { isDocker: true }),
      package: 'web-react',
    },
  ];

  for (const demo of demos) {
    test(`test demo homepage ${demo.package}`, async ({ page, pageRetries }) => {
      await retryPageGoto(page, demo.url, { retries: pageRetries });
      await waitForPageLoad(page);
      await hideFromVisualTests(page);
      await takeScreenshot(page, demo.package, { fullPage: true });
    });
  }
});
