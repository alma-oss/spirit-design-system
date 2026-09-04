import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import Handlebars from 'handlebars';

// Only the partials packages/web's preview.html files actually reference are kept here (a copy
// of the matching apps/demo/partials files), so docsite doesn't depend on apps/demo's full partial
// set and keeps working if/when apps/demo is removed.
const PARTIALS_DIR = join(__dirname, 'partials');

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

  registerPartialsFromDir(instance, PARTIALS_DIR);

  handlebarsEnv = instance;

  return handlebarsEnv;
};

export const compilePreview = (source: string) => getHandlebarsEnv().compile(source)({});
