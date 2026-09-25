import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';

const { warn: logWarning, info: logInfo } = console;

type PackageJson = {
  exports?: Record<string, Record<string, string>>;
  [key: string]: unknown;
};

const PKG_PATH = join(process.cwd(), 'package.json');
const BACKUP_PATH = `${PKG_PATH}.backup`;

/**
 * Removes the `development` export condition from every subpath before packing, so the
 * published `package.json` never advertises a source path that isn't part of the published
 * tarball (`files` only ships `dist`). Mirrors `@alma-oss/spirit-web-react`'s
 * `scripts/exports.ts` `--strip-development`/`--restore-development` pair, wired to `prepack`/
 * `postpack` so it runs automatically around `npm pack`/`npm publish` without touching the
 * working tree otherwise.
 */
function stripDevelopmentExports(): void {
  const pkg: PackageJson = JSON.parse(readFileSync(PKG_PATH, 'utf-8'));
  writeFileSync(BACKUP_PATH, `${JSON.stringify(pkg, null, 2)}\n`);

  if (pkg.exports) {
    Object.values(pkg.exports).forEach((exportEntry) => {
      delete exportEntry.development;
    });
  }

  writeFileSync(PKG_PATH, `${JSON.stringify(pkg, null, 2)}\n`);
  logInfo(`✓ Stripped development export condition from ${PKG_PATH}`);
}

function restoreDevelopmentExports(): void {
  if (!existsSync(BACKUP_PATH)) {
    logWarning(`⚠ No backup found at ${BACKUP_PATH}, skipping restore`);

    return;
  }

  writeFileSync(PKG_PATH, readFileSync(BACKUP_PATH, 'utf-8'));
  unlinkSync(BACKUP_PATH);
  logInfo(`✓ Restored ${PKG_PATH} with development export condition`);
}

const command = process.argv[2];

switch (command) {
  case '--strip':
    stripDevelopmentExports();
    break;
  case '--restore':
    restoreDevelopmentExports();
    break;
  default:
    throw new Error('Usage: tsx stripDevelopmentExports.ts --strip|--restore (run from the target package root)');
}
