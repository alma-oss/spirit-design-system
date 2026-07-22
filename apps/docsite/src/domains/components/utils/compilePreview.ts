import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import Handlebars from 'handlebars';

// Matches apps/demo/config/vite/app.ts's vite-plugin-handlebars setup, so `preview.html`
// files compile the same way in both apps/demo (Vite) and apps/docsite (this module).
const DEMO_PARTIALS_DIR = join(process.cwd(), '../../apps/demo/partials');

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

    if (!options.data.root) {
      options.data.root = {};
    }
    options.data.root[varName] = data;
  });
  instance.registerHelper('eq', (variable, value) => variable === value);
  instance.registerHelper('contains', (array, value) => array.includes(value));

  registerPartialsFromDir(instance, DEMO_PARTIALS_DIR);

  handlebarsEnv = instance;

  return handlebarsEnv;
};

export const compilePreview = (source: string) => getHandlebarsEnv().compile(source)({});
