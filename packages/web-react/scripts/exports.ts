import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { PKG_PATH, SRC_DIR, findEntryPoints } from './entrypoints';

const { warn: logWarning, error: logError, info: logInfo } = console;

type PackageJson = {
  exports?: Record<string, Record<string, string>>;
  [key: string]: unknown;
};

const BACKUP_PATH = join(__dirname, '../package.json.backup');

interface ExportEntry {
  [path: string]: {
    types: string;
    development?: string;
    production?: string;
    import: string;
    require: string;
    default?: string;
  };
}

/**
 * Convert directory path to export path (e.g., 'components/Button' -> './components/Button')
 *
 * @param dirPath
 */
function dirPathToExportPath(dirPath: string): string {
  return dirPath === '.' ? '.' : `./${dirPath}`;
}

/**
 * Generate exports field for package.json
 */
function generateExportsField(): ExportEntry {
  const entryPoints = findEntryPoints(SRC_DIR);
  const exports: ExportEntry = {};

  for (const entry of entryPoints) {
    const exportPath = dirPathToExportPath(entry);
    const srcPath = `./src/${entry === '.' ? 'index' : `${entry}/index`}.ts`;
    const distBase = `./dist/${entry === '.' ? 'index' : `${entry}/index`}`;

    exports[exportPath] = {
      types: `${distBase}.d.ts`,
      // Points to TypeScript source for zero-build development in monorepo.
      // External consumers will use 'production', 'import', or 'require' conditions instead.
      development: srcPath,
      production: `${distBase}.js`,
      import: `${distBase}.js`,
      require: `${distBase}.cjs`,
      default: `${distBase}.js`,
    };
  }

  return exports;
}

/**
 * Update package.json with generated exports
 */
function updatePackageJson(): void {
  const pkg = JSON.parse(readFileSync(PKG_PATH, 'utf-8'));
  const exports = generateExportsField();

  // Update package.json fields
  pkg.main = './dist/index.cjs';
  pkg.module = './dist/index.js';
  pkg.types = './dist/index.d.ts';
  pkg.exports = exports;

  // Remove old publishConfig.directory, keep other publishConfig
  if (pkg.publishConfig?.directory) {
    delete pkg.publishConfig.directory;
  }

  writeFileSync(PKG_PATH, `${JSON.stringify(pkg, null, 2)}\n`);
  logInfo(`✓ Updated ${PKG_PATH}`);
  logInfo(`✓ Generated ${Object.keys(exports).length} export paths`);
}

/**
 * Validate that discovered entry points match package.json exports
 */
function validateEntryPoints(): void {
  const discoveredEntries = findEntryPoints(SRC_DIR);
  const pkg = JSON.parse(readFileSync(PKG_PATH, 'utf-8'));
  const currentExports = pkg.exports || {};

  const discoveredCount = discoveredEntries.length;
  const exportedCount = Object.keys(currentExports).length;

  logInfo(`\nFound ${discoveredCount} entry points in source:`);
  discoveredEntries.forEach((entry) => {
    logInfo(`  - ${dirPathToExportPath(entry)}`);
  });

  logInfo(`\nPackage.json has ${exportedCount} exports defined.`);

  if (discoveredCount !== exportedCount) {
    logWarning(
      `\n⚠  Mismatch detected: Found ${discoveredCount} entry points in source, ` +
        `but package.json has ${exportedCount} exports.\n` +
        'This may indicate:\n' +
        '  - Missing exports in package.json (need to run exports:regenerate)\n' +
        '  - Stale exports (source files were removed but exports remain)\n' +
        '  - Extra source files that should not be exported',
    );
  } else {
    logInfo(`\n✓ All ${discoveredCount} entry points are properly exported!`);
  }
}

/**
 * Strip development exports for production packaging
 * Creates backup before modification
 */
function stripDevelopmentExports(): void {
  // Backup original package.json
  const pkg: PackageJson = JSON.parse(readFileSync(PKG_PATH, 'utf-8'));
  writeFileSync(BACKUP_PATH, `${JSON.stringify(pkg, null, 2)}\n`);

  // Remove development condition from all exports
  if (pkg.exports) {
    Object.keys(pkg.exports).forEach((exportKey) => {
      if (pkg.exports![exportKey].development) {
        delete pkg.exports![exportKey].development;
      }
    });
  }

  // Write modified package.json
  writeFileSync(PKG_PATH, `${JSON.stringify(pkg, null, 2)}\n`);

  logInfo('✓ Stripped development exports for production build');
  logInfo('✓ Backup saved to package.json.backup');
}

/**
 * Restore development exports from backup
 */
function restoreDevelopmentExports(): void {
  if (!existsSync(BACKUP_PATH)) {
    logWarning('⚠ No backup found, skipping restore');

    return;
  }

  // Restore original package.json from backup
  const backup = readFileSync(BACKUP_PATH, 'utf-8');
  writeFileSync(PKG_PATH, backup);
  unlinkSync(BACKUP_PATH);

  logInfo('✓ Restored original package.json with development exports');
}

// Main execution
if (require.main === module) {
  const command = process.argv[2];

  try {
    switch (command) {
      case '--strip-development':
        stripDevelopmentExports();
        break;
      case '--restore-development':
        restoreDevelopmentExports();
        break;
      default:
        // Default behavior: validate and update exports
        validateEntryPoints();
        logInfo('\n');
        updatePackageJson();
        logInfo('\n✓ Export generation complete!');
        break;
    }
  } catch (error) {
    logError('Error in exports script:', error);
    process.exit(1);
  }
}
