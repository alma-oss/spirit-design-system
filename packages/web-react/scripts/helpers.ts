import { glob } from 'glob';
import * as path from 'path';
import * as recast from 'recast';
import * as parser from 'recast/parsers/babel';

export const distDir = path.resolve(__dirname, '..', 'dist');

export async function eachFile(dir: string, callback: (absPath: string, relPath: string) => unknown) {
  const promises: Promise<unknown>[] = [];

  try {
    const files = await glob(`${dir}/**/*.js`);

    files.sort().forEach((file: string) => {
      const relPath = path.relative(dir, file);

      // Outside the distDir, somehow.
      if (relPath.startsWith('../')) return;

      // Avoid re-transforming CommonJS bundle files.
      if (relPath.endsWith('.cjs.js')) return;
      if (relPath.endsWith('.cjs')) return;

      // Avoid re-transforming CommonJS bundle files.
      if (relPath.endsWith('.min.js')) return;

      // Avoid re-transforming UMD bundle files.
      if (relPath.endsWith('.umd.js')) return;

      // Avoid re-transforming stories files.
      if (relPath.endsWith('.stories.js')) return;

      // This file is not meant to be imported or processed.
      if (relPath.endsWith('invariantErrorCodes.js')) return;

      promises.push(
        new Promise((resolve) => {
          resolve(callback(file, relPath));
        }),
      );
    });

    Promise.all(promises);
  } catch (error) {
    // eslint-disable-next-line no-console -- This is a CLI tool.
    console.error(error);
  }
}

export function reparse(source: string) {
  return recast.parse(source, { parser });
}

export function reprint(ast: ReturnType<typeof reparse>) {
  return recast.print(ast).code;
}
