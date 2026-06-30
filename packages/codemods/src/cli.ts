import { $ } from 'execa';
import sade from 'sade';
import { fs, path } from 'zx';
import { _dirname, errorMessage, logMessage } from './helpers';

const packageJson = fs.readJsonSync(path.resolve(_dirname, './package.json'));

export default async function cli(args: string[]) {
  sade('spirit-codemods', true)
    .version(packageJson.version)
    .describe(packageJson.description)
    .option('-p, --path', 'Path to the code to be transformed')
    .example('-p ./')
    .option('-t, --transformation', 'Codemod transformation name to run')
    .example('-t v2/web-react/codemodName')
    .option(
      '-s, --import-sources',
      'Additional import sources to match (comma-separated). Defaults to @alma-oss/spirit-web-react',
    )
    .example('-s @almacareer/cyborg-design-system')
    .option('-e, --extensions', 'Extensions to look for when transforming files, default: ts,tsx,js,jsx')
    .example('-e ts, tsx, js, jsx')
    .option('-i, --ignore', 'Ignore files or directories, default: **/node_modules/**')
    .example('-i **/node_modules/**')
    .option('-r, --parser', 'Parser to use (babel, ts, tsx, flow), default: tsx')
    .example('--parser babel')
    .action(async ({ path: codePath, transformation, importSources, extensions, ignore, parser }) => {
      const defaultExtensions = 'ts,tsx,js,jsx';
      const defaultIgnore = '**/node_modules/**';
      const defaultParser = 'tsx';

      if (!codePath || !fs.existsSync(codePath)) {
        errorMessage(codePath);
        errorMessage('Please provide a valid path');
        process.exit(1);
      }

      if (!transformation) {
        errorMessage('Please provide a codemod name');
        process.exit(1);
      }

      const codemodPath = path.resolve(_dirname, `./transforms/${transformation}.ts`);

      if (!fs.existsSync(codemodPath)) {
        errorMessage('Codemod does not exist');
        process.exit(1);
      }

      const jscodeshiftArgs = [
        '--transform',
        codemodPath,
        '--extensions',
        extensions || defaultExtensions,
        '--ignore-pattern',
        ignore || defaultIgnore,
        '--parser',
        parser || defaultParser,
      ];

      if (importSources) {
        jscodeshiftArgs.push('--importSources', importSources);
      }

      jscodeshiftArgs.push(codePath);

      const { stdout } = await $({ stdio: 'pipe' })`jscodeshift ${jscodeshiftArgs}`;

      // stdout object from jscodeshift
      logMessage(stdout);

      process.exit(0);
    })
    .parse(args);
}
