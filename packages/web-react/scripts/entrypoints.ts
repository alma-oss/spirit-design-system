import { readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

const { warn: logWarning, error: logError } = console;

const ROOT = resolve(__dirname, '..');
export const SRC_DIR = join(ROOT, 'src');
export const PKG_PATH = join(ROOT, 'package.json');

// Directories to exclude from entry point discovery
const EXCLUDED_DIRS = new Set(['.', 'node_modules', '__tests__', 'demo', 'figma', 'docs', '.coverage', 'stories']);
const EXCLUDED_PATH_PATTERNS = ['demo', 'figma', 'stories'];

/**
 * Check if a path contains any excluded patterns
 *
 * @param basePath
 */
function isPathExcluded(basePath: string): boolean {
  // Normalize to forward slashes for cross-platform compatibility (Windows uses backslashes)
  const normalizedPath = basePath.replace(/\\/g, '/');

  return EXCLUDED_PATH_PATTERNS.some((pattern) => normalizedPath.includes(`/${pattern}`));
}

/**
 * Recursively find all index.ts files and return their directory paths
 *
 * @param dir
 * @param basePath
 */
export function findEntryPoints(dir: string, basePath = ''): string[] {
  const entries: string[] = [];

  try {
    const items = readdirSync(dir);

    // Check if current directory has an index.ts and is not in an excluded path
    if (items.includes('index.ts') && !isPathExcluded(basePath)) {
      entries.push(basePath || '.');
    }

    // Recursively check subdirectories
    for (const item of items) {
      const fullPath = join(dir, item);

      try {
        const stat = statSync(fullPath);

        if (stat.isDirectory() && !EXCLUDED_DIRS.has(item) && !isPathExcluded(basePath)) {
          const subPath = basePath ? `${basePath}/${item}` : item;
          entries.push(...findEntryPoints(fullPath, subPath));
        }
      } catch (error) {
        // Handle permission denied or other stat errors
        if ((error as NodeJS.ErrnoException).code === 'EACCES') {
          logWarning(`Permission denied accessing: ${fullPath}`);
        } else if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          logWarning(`File not found: ${fullPath}`);
        } else {
          logWarning(`Error reading: ${fullPath}`, error);
        }
      }
    }
  } catch (error) {
    // Handle directory read errors
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      logError(`Directory not found: ${dir}`);
    } else if ((error as NodeJS.ErrnoException).code === 'EACCES') {
      logError(`Permission denied: ${dir}`);
    } else {
      logError(`Error reading directory ${dir}:`, error);
    }
  }

  return entries;
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
