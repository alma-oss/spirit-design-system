/* @jest-environment node */

import { dirname, resolve } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { sync } from 'glob';
import { runSass } from 'sass-true';

// Jest runners (VS Code / Cursor) may execute tests with a different CWD than the package root.
// Derive paths from this file location instead of relying on process.cwd().
const currentDir = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(currentDir, '..');

const importers = [
  // Make @tokens work
  {
    findFileUrl(url) {
      if (!url.startsWith('@')) {
        return null;
      }

      return new URL(
        pathToFileURL(resolve(packageRoot, '../../node_modules/@alma-oss/spirit-design-tokens/src/scss', url)),
      );
    },
  },
];

// Suppress @debug messages during tests to avoid flooding test output
// this logger catches any other stray @debug messages
const customLogger = {
  debug: () => {
    // Intentionally empty to suppress @debug output in tests
  },
};

describe('Sass', () => {
  const sassTestFiles = sync(resolve(packageRoot, 'src/**/*.test.scss'));

  sassTestFiles.forEach((file) => runSass({ describe, it }, file, { importers, logger: customLogger }));
});
