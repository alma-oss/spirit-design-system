import { existsSync } from 'fs';
import { createRequire } from 'module';
import { dirname, extname, resolve } from 'path';
import { compile } from 'sass-embedded';
import type { Plugin } from 'vite';
import { fileURLToPath } from 'url';
import {
  DEFAULT_CSS_SOURCE_FILE_NAME,
  DEFAULT_CSS_SOURCE_ID,
  STORYBOOK_CSS_MANIFEST_PATH,
  STORYBOOK_CSS_PREFIX,
} from './cssSourceEntries';

type CssSource = { id: string; loadPaths: readonly string[] };
type CompiledScss = { css: string; loadedUrls: URL[] };

/** Resolve Storybook app dir at runtime so it works when config is loaded from a different path (e.g. bundled). */
function getStorybookDir(): string {
  try {
    const req = createRequire(import.meta.url);
    return dirname(req.resolve('@alma-oss/spirit-storybook/package.json'));
  } catch {
    const cwd = process.cwd();
    const entryHere = resolve(cwd, 'assets/stylesheets/index.scss');
    return existsSync(entryHere) ? cwd : resolve(cwd, 'apps/storybook');
  }
}

function compileScss(entryPath: string, loadPaths: string[]): CompiledScss {
  const result = compile(entryPath, {
    loadPaths,
    silenceDeprecations: ['mixed-decls'],
  } as Parameters<typeof compile>[1]);
  return {
    css: result.css,
    loadedUrls: result.loadedUrls,
  };
}

function getDefaultLoadPaths(storybookDir: string): string[] {
  return [
    resolve(storybookDir, '../../node_modules'),
    resolve(storybookDir, '../../node_modules/@alma-oss/spirit-design-tokens/src/scss'),
    resolve(storybookDir, '../../packages/design-tokens/src/scss'),
  ];
}

function getLoadedFilePaths(loadedUrls: URL[]): string[] {
  return loadedUrls
    .filter(({ protocol }) => protocol === 'file:')
    .map((url) => fileURLToPath(url));
}

export function storybookCssPlugin(cssSources: readonly CssSource[]): Plugin {
  let builtManifest: Record<string, string> = {};
  const watchedFiles = new Set<string>();

  return {
    name: 'storybook-css-sources',
    configureServer(server) {
      server.watcher.on('change', (changedFile) => {
        if (!watchedFiles.has(changedFile)) {
          return;
        }

        if (!['.css', '.sass', '.scss'].includes(extname(changedFile))) {
          return;
        }

        server.ws.send({ type: 'full-reload', path: '*' });
      });

      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').split('?')[0];
        if (url.startsWith(STORYBOOK_CSS_PREFIX)) {
          const rest = url.slice(`${STORYBOOK_CSS_PREFIX}/`.length);
          if (url === STORYBOOK_CSS_MANIFEST_PATH) {
            const manifest: Record<string, string> = {};
            cssSources.forEach((s) => {
              manifest[s.id] = `${STORYBOOK_CSS_PREFIX}/${s.id}.css`;
            });
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(manifest));
            return;
          }
          if (rest.endsWith('.css')) {
            const id = rest.slice(0, -4);
            const source = cssSources.find((s) => s.id === id);
            if (source) {
              try {
                const dir = getStorybookDir();
                const entry = resolve(dir, 'assets/stylesheets/index.scss');
                const defaultPaths = getDefaultLoadPaths(dir);
                const loadPaths =
                  source.id === DEFAULT_CSS_SOURCE_ID ? defaultPaths : [...source.loadPaths, ...defaultPaths];
                const { css, loadedUrls } = compileScss(entry, loadPaths);
                const loadedFiles = getLoadedFilePaths(loadedUrls);
                loadedFiles.forEach((file) => watchedFiles.add(file));
                server.watcher.add(loadedFiles);
                res.setHeader('Content-Type', 'text/css');
                res.end(css);
                return;
              } catch (err) {
                console.error(`[storybook-css-sources] Failed to compile ${id}:`, err);
                res.statusCode = 500;
                res.end();
                return;
              }
            }
          }
        }
        next();
      });
    },
    generateBundle() {
      const storybookDir = getStorybookDir();
      const entryScssPath = resolve(storybookDir, 'assets/stylesheets/index.scss');
      const resolvedDefaultPaths = getDefaultLoadPaths(storybookDir);
      for (const source of cssSources) {
        const loadPaths =
          source.id === DEFAULT_CSS_SOURCE_ID ? resolvedDefaultPaths : [...source.loadPaths, ...resolvedDefaultPaths];
        const { css } = compileScss(entryScssPath, loadPaths);
        const ref = this.emitFile({
          type: 'asset',
          name: `storybook-${source.id}.css`,
          source: css,
          fileName: source.id === DEFAULT_CSS_SOURCE_ID ? DEFAULT_CSS_SOURCE_FILE_NAME : undefined,
        });
        builtManifest[source.id] = this.getFileName(ref);
      }
      this.emitFile({
        type: 'asset',
        name: 'storybook-css-sources.json',
        source: JSON.stringify(builtManifest),
        fileName: 'assets/storybook-css-sources.json',
      });
    },
  };
}
