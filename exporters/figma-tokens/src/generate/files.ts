import { toCamelCase } from '../domain/naming';
import type { DomainDocument, DomainToken } from '../domain/types';
import {
  DEVICES_DIRECTORY,
  GLOBAL_DIRECTORY,
  JS_DIRECTORY,
  SCSS_DIRECTORY,
  THEMES_DIRECTORY,
} from './constants';
import { generateBarrelFile, generateFileContent, getFontSizeBaseMap, type OutputFile } from './content';
import { commonThemedFiles, devicesFiles, nonThemedFiles, themedFiles, type FileSpec } from './fileConfig';
import { indentAndFormat } from './units';

const generateFiles = (
  tokens: DomainToken[],
  specs: FileSpec[],
  prefix: string,
  hasJsOutput: boolean,
  fontSizeBaseMap: ReturnType<typeof getFontSizeBaseMap>,
) =>
  specs.map((spec) => ({
    fileName: hasJsOutput ? toCamelCase(spec.fileName) : spec.fileName,
    content: generateFileContent(tokens, spec, prefix, hasJsOutput, fontSizeBaseMap),
  }));

const jsImportStatement = (name: string): string => `import * as ${toCamelCase(name)} from './${name}';`;

const scssImportStatement = (name: string): string => `@use '${THEMES_DIRECTORY}/${name}';`;

const generateRootThemesFileContent = (themeNames: string[], hasJsOutput: boolean): string =>
  themeNames
    .map((theme) =>
      hasJsOutput
        ? `${toCamelCase(theme)}: {\ntokens: ${toCamelCase(theme)},\n},`
        : `${theme}: (\nvariables: meta.module-variables(${theme}),\nmixins: meta.module-mixins(${theme}),\n),`,
    )
    .join('\n');

const generateThemesRootFile = (themeNames: string[], hasJsOutput = false): string => {
  const imports = themeNames.map((name) => (hasJsOutput ? jsImportStatement(name) : scssImportStatement(name))).join('\n');
  const themesContent = generateRootThemesFileContent(themeNames, hasJsOutput);
  const defaultThemeNote = '// The first theme is the default theme, as the left column in the Figma table.';
  const stylesObjectWrapper = hasJsOutput ? 'export const themes = {\n' : '$themes: (\n';
  const sassMetaImport = hasJsOutput ? '' : "@use 'sass:meta';\n";
  const content = `${sassMetaImport}${imports}\n\n${defaultThemeNote}\n${stylesObjectWrapper}${themesContent}\n${hasJsOutput ? '};\n' : ');\n'}`;

  return indentAndFormat(content, hasJsOutput);
};

export const generateOutputFiles = (document: DomainDocument): OutputFile[] => {
  const outputFiles: OutputFile[] = [];
  const fontSizeBaseMap = getFontSizeBaseMap(document.deviceTokens);
  const prefix = document.prefix;
  const themeNames = document.themes.map((theme) => theme.name);

  const globalFiles = generateFiles(document.globalTokens, nonThemedFiles, prefix, false, fontSizeBaseMap);
  const globalJsFiles = generateFiles(document.globalTokens, nonThemedFiles, prefix, true, fontSizeBaseMap);
  const forwardDevices = document.deviceTokens.length > 0 ? `@forward '${DEVICES_DIRECTORY}';\n` : '';
  const exportDevices = document.deviceTokens.length > 0 ? `export * from './${DEVICES_DIRECTORY}';\n` : '';

  outputFiles.push(
    ...globalFiles.map((file) => ({
      path: `./${SCSS_DIRECTORY}/${GLOBAL_DIRECTORY}`,
      fileName: `_${file.fileName}.scss`,
      content: file.content,
    })),
    ...globalJsFiles.map((file) => ({
      path: `./${JS_DIRECTORY}/${GLOBAL_DIRECTORY}/`,
      fileName: `${file.fileName}.ts`,
      content: file.content,
    })),
    {
      path: `./${SCSS_DIRECTORY}/${GLOBAL_DIRECTORY}/`,
      fileName: 'index.scss',
      content: generateBarrelFile(globalFiles),
    },
    {
      path: `./${JS_DIRECTORY}/${GLOBAL_DIRECTORY}/`,
      fileName: 'index.ts',
      content: generateBarrelFile(globalJsFiles, true),
    },
    {
      path: `./${SCSS_DIRECTORY}/`,
      fileName: '@tokens.scss',
      content: `${forwardDevices}@forward '${GLOBAL_DIRECTORY}';\n@forward '${THEMES_DIRECTORY}';\n`,
    },
    {
      path: `./${JS_DIRECTORY}/`,
      fileName: 'index.ts',
      content: `${exportDevices}export * from './${GLOBAL_DIRECTORY}';\nexport * from './${THEMES_DIRECTORY}';\n`,
    },
  );

  for (const theme of document.themes) {
    const themeFiles = generateFiles(theme.tokens, themedFiles, prefix, false, fontSizeBaseMap);
    const themeTsFiles = generateFiles(theme.tokens, themedFiles, prefix, true, fontSizeBaseMap);

    outputFiles.push(
      ...themeFiles.map((file) => ({
        path: `./${SCSS_DIRECTORY}/${THEMES_DIRECTORY}/${theme.name}/`,
        fileName: `_${file.fileName}.scss`,
        content: file.content,
      })),
      ...themeTsFiles.map((file) => ({
        path: `./${JS_DIRECTORY}/${THEMES_DIRECTORY}/${theme.name}/`,
        fileName: `${file.fileName}.ts`,
        content: file.content,
      })),
      {
        path: `./${SCSS_DIRECTORY}/${THEMES_DIRECTORY}/${theme.name}/`,
        fileName: 'index.scss',
        content: generateBarrelFile(themeFiles),
      },
      {
        path: `./${JS_DIRECTORY}/${THEMES_DIRECTORY}/${theme.name}/`,
        fileName: 'index.ts',
        content: generateBarrelFile(themeTsFiles, true),
      },
    );
  }

  const colorTokens = document.themes[0]?.tokens ?? [];
  const colorTokensFile = generateFiles(colorTokens, commonThemedFiles, prefix, false, fontSizeBaseMap);
  const colorTsTokensFile = generateFiles(colorTokens, commonThemedFiles, prefix, true, fontSizeBaseMap);

  outputFiles.push(
    {
      path: `./${SCSS_DIRECTORY}/`,
      fileName: '@themes.scss',
      content: generateThemesRootFile(themeNames),
    },
    {
      path: `./${JS_DIRECTORY}/${THEMES_DIRECTORY}`,
      fileName: 'index.ts',
      content: `${generateThemesRootFile(themeNames, true)}\nexport * from './colorTokens';\n`,
    },
    {
      path: `./${SCSS_DIRECTORY}/${THEMES_DIRECTORY}`,
      fileName: 'index.scss',
      content: "@forward 'color-tokens';\n",
    },
    ...colorTokensFile.map((file) => ({
      path: `./${SCSS_DIRECTORY}/${THEMES_DIRECTORY}`,
      fileName: `_${file.fileName}.scss`,
      content: file.content,
    })),
    ...colorTsTokensFile.map((file) => ({
      path: `./${JS_DIRECTORY}/${THEMES_DIRECTORY}`,
      fileName: `${file.fileName}.ts`,
      content: file.content,
    })),
  );

  if (document.deviceTokens.length > 0) {
    const deviceFile = generateFiles(document.deviceTokens, devicesFiles, prefix, false, fontSizeBaseMap);
    const deviceTsFile = generateFiles(document.deviceTokens, devicesFiles, prefix, true, fontSizeBaseMap);

    outputFiles.push(
      ...deviceFile.map((file) => ({
        path: `./${SCSS_DIRECTORY}/${DEVICES_DIRECTORY}/`,
        fileName: `_${file.fileName}.scss`,
        content: file.content,
      })),
      ...deviceTsFile.map((file) => ({
        path: `./${JS_DIRECTORY}/${DEVICES_DIRECTORY}/`,
        fileName: `${file.fileName}.ts`,
        content: file.content,
      })),
      {
        path: `./${SCSS_DIRECTORY}/${DEVICES_DIRECTORY}/`,
        fileName: 'index.scss',
        content: generateBarrelFile(deviceFile),
      },
      {
        path: `./${JS_DIRECTORY}/${DEVICES_DIRECTORY}/`,
        fileName: 'index.ts',
        content: generateBarrelFile(deviceTsFile, true),
      },
    );
  }

  return outputFiles.map((file) => ({
    ...file,
    path: file.path.replace(/\\/g, '/').replace(/\/+$/, ''),
  }));
};

export const outputFileRelativePath = (file: OutputFile): string => {
  const directory = file.path.replace(/^\.\//, '').replace(/\/+$/, '');

  return `${directory}/${file.fileName}`.replace(/\/+/g, '/');
};
