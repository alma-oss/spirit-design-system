import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, relative, resolve } from 'path';

const ROOT = resolve(__dirname, '..');
const SRC_DIR = join(ROOT, 'src');
const PKG_PATH = join(ROOT, 'package.json');

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
 * Recursively find all index.ts files and return their directory paths
 */
function findEntryPoints(dir: string, basePath = ''): string[] {
  const entries: string[] = [];
  const items = readdirSync(dir);

  // Directories to exclude from entry point discovery
  const EXCLUDED_DIRS = new Set([
    '.', 'node_modules', '__tests__', 'demo', 'figma', 'docs', '.coverage', 'stories',
  ]);

  // Check if current directory has an index.ts and is not in an excluded path
  if (items.includes('index.ts')
    && !basePath.includes('/demo')
    && !basePath.includes('/figma')
    && !basePath.includes('/stories')) {
    entries.push(basePath || '.');
  }

  // Recursively check subdirectories
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()
      && !EXCLUDED_DIRS.has(item)
      && !basePath.includes('/demo')
      && !basePath.includes('/figma')
      && !basePath.includes('/stories')) {
      const subPath = basePath ? `${basePath}/${item}` : item;
      entries.push(...findEntryPoints(fullPath, subPath));
    }
  }

  return entries;
}

/**
 * Convert directory path to export path (e.g., 'components/Button' -> './components/Button')
 */
function dirPathToExportPath(dirPath: string): string {
  if (dirPath === '.') {
    return '.';
  }
  return `./${dirPath}`;
}

/**
 * Get all entry points for Vite config
 */
export function getEntryPoints(): Record<string, string> {
  const entryPoints = findEntryPoints(SRC_DIR);
  const result: Record<string, string> = {};

  for (const entry of entryPoints) {
    const key = entry === '.' ? 'index' : entry;
    const srcPath = entry === '.' ? join(SRC_DIR, 'index.ts') : join(SRC_DIR, entry, 'index.ts');
    result[key] = srcPath;
  }

  return result;
}

/**
 * Generate exports field for package.json
 */
function generateExportsField(): ExportEntry {
  const entryPoints = findEntryPoints(SRC_DIR);
  const exports: ExportEntry = {};

  for (const entry of entryPoints) {
    const exportPath = dirPathToExportPath(entry);
    const srcPath = entry === '.' ? './src/index.ts' : `./src/${entry}/index.ts`;
    const distBase = entry === '.' ? './dist/index' : `./dist/${entry}/index`;

    exports[exportPath] = {
      types: `${distBase}.d.ts`,
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
  pkg.files = ['dist', 'README.md'];
  pkg.exports = exports;

  // Remove old publishConfig.directory, keep other publishConfig
  if (pkg.publishConfig?.directory) {
    delete pkg.publishConfig.directory;
  }

  writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`✓ Updated ${PKG_PATH}`);
  console.log(`✓ Generated ${Object.keys(exports).length} export paths`);
}

/**
 * Validate all expected entry points exist
 */
function validateEntryPoints(): void {
  const entries = findEntryPoints(SRC_DIR);
  const expectedCount = 65; // From plan: All 65 exported paths

  console.log(`\nFound ${entries.length} entry points:`);
  entries.forEach((entry) => {
    console.log(`  - ${dirPathToExportPath(entry)}`);
  });

  if (entries.length !== expectedCount) {
    console.warn(
      `\n⚠️  Expected ${expectedCount} entry points, but found ${entries.length}. ` +
        'This may indicate missing components or extra files.',
    );
  } else {
    console.log(`\n✓ All ${expectedCount} entry points found!`);
  }
}

// Main execution
if (require.main === module) {
  try {
    validateEntryPoints();
    console.log('\n');
    updatePackageJson();
    console.log('\n✓ Export generation complete!');
  } catch (error) {
    console.error('Error generating exports:', error);
    process.exit(1);
  }
}
