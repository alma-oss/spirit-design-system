/* eslint-disable @typescript-eslint/no-var-requires -- refactor to ESM TypeScript */
const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');

const BUNDLE = process.env.BUNDLE === 'true';
const ESM = process.env.ESM === 'true';

let fileDestination = `spirit-web${ESM ? '.esm' : ''}`;
let fileDirectory = ESM ? 'esm' : 'cjs';

const plugins = [];

if (BUNDLE) {
  fileDestination += '.bundle';
  fileDirectory = 'bundle';

  plugins.push(
    replace({
      'process.env.NODE_ENV': '"production"',
      preventAssignment: true,
    }),
  );
}

plugins.push(
  nodeResolve({
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
  }),
  // TypeScript before Babel — @see https://github.com/rollup/plugins/tree/master/packages/typescript#usage
  typescript({
    tsconfig: path.resolve(__dirname, '../tsconfig.json'),
    // Default plugin include only matches under cwd, so `../common` (unpublished `spirit-common` sources)
    // is excluded unless we list it here with filterRoot = package root.
    include: ['src/**/*.ts', 'src/**/*.tsx', '../common/src/**/*.ts'],
    filterRoot: path.resolve(__dirname, '..'),
    compilerOptions: {
      // Do not set rootDir: TypeScript must include linked workspace sources (e.g. @alma-oss/spirit-common)
      // when bundling shared utilities; a fixed ./src root causes TS6059 for those imports.
      outDir: path.resolve(__dirname, `../dist/js/${fileDirectory}`),
    },
    exclude: ['**/__tests__', '**/*.test.ts'],
    declaration: false,
  }),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
  }),
);

const filePath = `../dist/js/${fileDirectory}/${fileDestination}`;
const format = ESM ? 'esm' : 'umd';

const outputConfig = {
  format,
  globals: {},
  generatedCode: 'es2015',
  sourcemap: true,
};

if (!ESM) {
  outputConfig.name = 'spirit-web';
}

const rollupConfig = {
  input: path.resolve(__dirname, `../src/js/index.${format}.ts`),
  output: [
    {
      file: path.resolve(__dirname, `${filePath}.js`),
      ...outputConfig,
    },
    {
      file: path.resolve(__dirname, `${filePath}.min.js`),
      plugins: [terser()],
      ...outputConfig,
    },
  ],
  external: {},
  plugins,
};

module.exports = rollupConfig;
