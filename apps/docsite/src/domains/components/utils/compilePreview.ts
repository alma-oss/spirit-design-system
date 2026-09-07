import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import Handlebars from 'handlebars';

// `__dirname` doesn't survive Turbopack's server bundling (it no longer points at this file's
// source directory once bundled), so use `process.cwd()` like the rest of docsite's fs reads.
//
// Only the partials packages/web's preview.html files actually reference are kept here (a copy
// of the matching apps/demo/partials files), so docsite doesn't depend on apps/demo's full partial
// set and keeps working if/when apps/demo is removed.
//
// This path is also hardcoded in next.config.ts's `outputFileTracingIncludes` (keyed by the
// web-preview route) so it ships with production/serverless builds — update both if this moves.
const PARTIALS_DIR = join(process.cwd(), 'src/domains/components/ui/partials');

let handlebarsEnv: typeof Handlebars | undefined;

const registerPartialsFromDir = (handlebarsInstance: typeof Handlebars, dir: string, prefix = '') => {
  readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const entryPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      registerPartialsFromDir(handlebarsInstance, entryPath, `${prefix}${entry.name}/`);
    } else if (entry.name.endsWith('.hbs')) {
      const partialName = `${prefix}${entry.name.slice(0, -'.hbs'.length)}`;
      handlebarsInstance.registerPartial(partialName, readFileSync(entryPath, 'utf-8'));
    }
  });
};

const getHandlebarsEnv = () => {
  if (handlebarsEnv) {
    return handlebarsEnv;
  }

  const instance = Handlebars.create();

  instance.registerHelper('setVar', (...data) => {
    const varName = data.shift();
    const options = data.pop();

    if (!options.data) {
      options.data = {};
    }
    if (!options.data.root) {
      options.data.root = {};
    }
    options.data.root[varName] = data;
  });
  instance.registerHelper('eq', (variable, value) => variable === value);
  instance.registerHelper('contains', (array, value) => array.includes(value));

  // Registered as `web/assets/*` (not `assets/*`) to match the partial names preview.html files
  // use — the same names apps/demo registers from its own apps/demo/partials/web/assets/*.hbs.
  registerPartialsFromDir(instance, PARTIALS_DIR, 'web/');

  handlebarsEnv = instance;

  return handlebarsEnv;
};

export const compilePreview = (source: string) => getHandlebarsEnv().compile(source)({});
