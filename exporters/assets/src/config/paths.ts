import path from 'node:path';

import { ConfigError } from '../errors';

export const assertRelativeOutputPath = (out: string): void => {
  const posixPath = out.replaceAll('\\', '/');

  if (path.isAbsolute(out) || path.win32.isAbsolute(out)) {
    throw new ConfigError('Config target "out" must be a relative path.');
  }

  if (posixPath.split('/').includes('..')) {
    throw new ConfigError('Config target "out" must not contain "..".');
  }
};
