import '@testing-library/jest-dom';
import { createRequire } from 'module';
import { TextEncoder, TextDecoder } from 'util';
import ResizeObserverPolyfill from 'resize-observer-polyfill';
import { registerA11yMatchers } from '../matchers/index.js';

const require = createRequire(import.meta.url);

if (typeof document !== 'undefined') {
  require('jest-axe/extend-expect');
}

/**
 * Maybe we can just mock the ResizeObserver
 *
 * @see { link https://github.com/carbon-design-system/carbon/blob/main/config/jest-config-carbon/setup/setup.js#L38-L46 }
 */
global.ResizeObserver = ResizeObserverPolyfill;

registerA11yMatchers();

/**
 * @todo Place here the content of the `packages/web-react/config/jest/setupTestingLibrary.ts`
 * @see { @link https://github.com/alma-oss/spirit-design-system/issues/1413 }
 *
 * Here should be the setup of the general mocks like one for console.log, etc.
 * Also consider better patching of the Console.
 * @see { @link https://github.com/carbon-design-system/carbon/blob/main/config/jest-config-carbon/setup/setupAfterEnv.js }
 */

/**
 * While it should be bundled with jsdom, it isn't with jsdom 16.
 */
Object.assign(global, { TextDecoder, TextEncoder });
