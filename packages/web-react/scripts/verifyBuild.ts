import { existsSync, statSync } from 'fs';
import { join } from 'path';

const { info: logInfo, log, warn: logWarning, error: logError } = console;

const DIST_DIR = join(__dirname, '..', 'dist');

interface FileCheck {
  name: string;
  path: string;
  required: boolean;
}

const fileChecks: FileCheck[] = [
  { name: 'ESM main entry', path: 'index.js', required: true },
  { name: 'CJS main entry', path: 'index.cjs', required: true },
  { name: 'TypeScript definitions', path: 'index.d.ts', required: true },
  { name: 'UMD bundle', path: 'bundles/web-react.umd.js', required: false },
  { name: 'UMD bundle minified', path: 'bundles/web-react.umd.min.js', required: false },
];

let errors = 0;
let warnings = 0;

log('🔍 Verifying build output...\n');

// Check required files
for (const check of fileChecks) {
  const fullPath = join(DIST_DIR, check.path);
  const exists = existsSync(fullPath);

  if (exists) {
    const stats = statSync(fullPath);
    const size = (stats.size / 1024).toFixed(2);
    logInfo(`✓ ${check.name}: ${size}KB`);

    // Warn if file is unexpectedly large
    if (stats.size > 10 * 1024 * 1024) {
      logWarning(`⚠  Warning: File is larger than 10MB`);
      warnings += 1;
    }
  } else if (check.required) {
    logError(`✕ ${check.name}: NOT FOUND`);
    errors += 1;
  } else {
    logWarning(`⚠  ${check.name}: NOT FOUND (optional)`);
    warnings += 1;
  }
}

// Check sourcemaps
log('\n📍 Checking sourcemaps...');
const sourcemapFiles = ['index.js.map', 'index.cjs.map', 'bundles/web-react.umd.js.map'];

for (const mapFile of sourcemapFiles) {
  const fullPath = join(DIST_DIR, mapFile);
  if (existsSync(fullPath)) {
    logInfo(`✓ ${mapFile}`);
  } else {
    log(`⚠  ${mapFile}: NOT FOUND`);
  }
}

// Check main export paths from package.json
log('\n📦 Verifying package.json exports...');
const packageJsonPath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(require('fs').readFileSync(packageJsonPath, 'utf-8'));

const exportsToCheck = [
  { field: 'main', expected: './dist/index.cjs' },
  { field: 'module', expected: './dist/index.js' },
  { field: 'types', expected: './dist/index.d.ts' },
];

for (const exportCheck of exportsToCheck) {
  const actual = packageJson[exportCheck.field];
  if (actual === exportCheck.expected) {
    logInfo(`✓ ${exportCheck.field}: ${actual}`);
  } else {
    logError(`✕ ${exportCheck.field}: expected ${exportCheck.expected}, got ${actual}`);
    errors += 1;
  }
}

// Summary
log(`\n${'='.repeat(50)}`);
if (errors === 0) {
  log('✓ Build verification passed!');
  if (warnings > 0) {
    log(`⚠  ${warnings} warning(s) found`);
  }
  process.exit(0);
} else {
  logError(`✕ Build verification failed with ${errors} error(s)`);
  if (warnings > 0) {
    logWarning(`⚠  ${warnings} warning(s) found`);
  }
  process.exit(1);
}
