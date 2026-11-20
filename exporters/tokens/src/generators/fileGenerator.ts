import { Token, TokenGroup, TokenTheme } from '@supernovaio/sdk-exporters';
import {
  commonThemedFilesData,
  devicesFilesData,
  FileData,
  nonThemedFilesData,
  themedFilesData,
} from '../config/fileConfig';
import {
  DEVICES_DIRECTORY,
  GLOBAL_DIRECTORY,
  INDEX_SCSS_FILE,
  INDEX_TS_FILE,
  JS_DIRECTORY,
  SCSS_DIRECTORY,
  THEMES_DIRECTORY,
  THEMES_SCSS_FILE,
  TOKENS_SCSS_FILE,
} from '../constants';
import { indentAndFormat } from '../formatters/stylesFormatter';
import type { ResolvedTokens } from '../adapters/supernova/themeResolution';
import { buildDeviceDimensionMap } from '../helpers/deviceDimensionHelper';
import { toCamelCase, toOutputName } from '../helpers/stringHelper';
import { getFontSizeBaseMap } from '../helpers/unitHelper';
import type { FontSizeBaseMap } from '../helpers/types';
import { generateFileContent } from './contentGenerator';
import { type DeviceDimensionMap } from '../core/types';
import { type OutputFile } from '../writers/fileWriter';

/** The syntax a file is generated in: SCSS by default, JS (TypeScript) with `hasJsOutput`. */
type OutputSyntaxOptions = { hasJsOutput?: boolean };

type GenerateFilesOptions = {
  tokens: Array<Token>;
  mappedTokens: Map<string, Token>;
  tokenGroups: Array<TokenGroup>;
  filesData: FileData[];
  deviceDimensions?: DeviceDimensionMap;
  hasJsOutput?: boolean;
  fontSizeBaseMap?: FontSizeBaseMap;
};

export const generateFiles = ({
  tokens,
  mappedTokens,
  tokenGroups,
  filesData,
  deviceDimensions,
  hasJsOutput = false,
  fontSizeBaseMap,
}: GenerateFilesOptions) => {
  return filesData.map((fileData) => {
    const fileContent = generateFileContent({
      tokens,
      mappedTokens,
      tokenGroups,
      fileData,
      hasJsOutput,
      deviceDimensions,
      fontSizeBaseMapOverride: fontSizeBaseMap,
    });
    const fileName = toOutputName(fileData.fileName, hasJsOutput);

    return {
      fileName,
      ...fileContent,
    };
  });
};

export const generateBarrelFile = (
  files: { fileName: string; content: string }[],
  { hasJsOutput = false }: OutputSyntaxOptions = {},
) => {
  return `${files
    .map((file) => {
      const fileExtension = hasJsOutput ? 'ts' : 'scss';
      const baseName = file.fileName.replace(/^_/, '').replace(new RegExp(`\\.${fileExtension}$`), '');

      return hasJsOutput ? `export * from './${baseName}';` : `@forward '${baseName}';`;
    })
    .sort()
    .join('\n')}\n`;
};

export const jsImportStatement = (name: string) => {
  return `import * as ${toCamelCase(name)} from './${name}';`;
};

export const scssImportStatement = (name: string) => `@use '${THEMES_DIRECTORY}/${name}';`;

export const prepareImportStatementCallback = ({ hasJsOutput = false }: OutputSyntaxOptions = {}) => {
  return (theme: TokenTheme) => (hasJsOutput ? jsImportStatement(theme.name) : scssImportStatement(theme.name));
};

export const generateRootThemesFileImports = (
  themes: TokenTheme[],
  { hasJsOutput = false }: OutputSyntaxOptions = {},
): string => {
  return themes.map(prepareImportStatementCallback({ hasJsOutput })).join('\n');
};

export const generateRootThemesFileContent = (
  themes: TokenTheme[],
  { hasJsOutput = false }: OutputSyntaxOptions = {},
): string => {
  return themes
    .map((theme) => {
      const variables = `variables: meta.module-variables(${theme.name}),\n`;
      const mixins = `mixins: meta.module-mixins(${theme.name}),\n`;

      return hasJsOutput
        ? `${toCamelCase(theme.name)}: {\ntokens: ${toCamelCase(theme.name)},\n},`
        : `${theme.name}: (\n${variables}${mixins}),`;
    })
    .join('\n');
};

export const generateThemesRootFile = (
  themes: TokenTheme[],
  { hasJsOutput = false }: OutputSyntaxOptions = {},
): string => {
  const imports = generateRootThemesFileImports(themes, { hasJsOutput });
  const themesContent = generateRootThemesFileContent(themes, { hasJsOutput });
  const defaultThemeNote = '// The first theme is the default theme, as the left column in the Figma table.';
  const stylesObjectWrapper = hasJsOutput ? 'export const themes = {\n' : '$themes: (\n';
  const sassMetaImport = hasJsOutput ? '' : "@use 'sass:meta';\n";
  const content = `${sassMetaImport}${imports}\n\n${defaultThemeNote}\n${stylesObjectWrapper}${themesContent}\n${hasJsOutput ? '};\n' : ');\n'}`;

  return indentAndFormat(content, hasJsOutput);
};

type GenerationContext = {
  mappedTokens: Map<string, Token>;
  tokenGroups: TokenGroup[];
  deviceDimensions: DeviceDimensionMap;
  fontSizeBaseMap: FontSizeBaseMap;
};

/**
 * Relative path of a directory in the output, always with a trailing slash.
 *
 * @param root - `SCSS_DIRECTORY` or `JS_DIRECTORY`
 * @param segments - Directories inside of the root
 */
const outputPath = (root: string, ...segments: string[]): string => `./${[root, ...segments].join('/')}/`;
const scssPath = (...segments: string[]): string => outputPath(SCSS_DIRECTORY, ...segments);
const jsPath = (...segments: string[]): string => outputPath(JS_DIRECTORY, ...segments);

/**
 * Generates the files of one set of tokens in both syntaxes, SCSS and TypeScript.
 *
 * @param tokens
 * @param filesData
 * @param context
 */
const generateFilesInBothSyntaxes = (tokens: Token[], filesData: FileData[], context: GenerationContext) => {
  const options = { tokens, filesData, ...context };

  return {
    scssFiles: generateFiles(options),
    tsFiles: generateFiles({ ...options, hasJsOutput: true }),
  };
};

type GeneratedFile = { fileName: string; content: string };

/**
 * Output files of generated files: SCSS partials with the `_` prefix, TypeScript files without it.
 *
 * @param files
 * @param path
 * @param syntax
 */
const toOutputFiles = (files: GeneratedFile[], path: string, syntax: 'scss' | 'ts'): OutputFile[] =>
  files.map(({ fileName, content }) => ({
    path,
    fileName: syntax === 'scss' ? `_${fileName}.scss` : `${fileName}.ts`,
    content,
  }));

/**
 * Output files of one set of tokens: the files themselves and a barrel file of each syntax.
 *
 * @param files
 * @param files.scssFiles
 * @param files.tsFiles
 * @param scssDirectory
 * @param jsDirectory
 */
const toOutputFilesWithBarrels = (
  { scssFiles, tsFiles }: ReturnType<typeof generateFilesInBothSyntaxes>,
  scssDirectory: string,
  jsDirectory: string,
): OutputFile[] => [
  ...toOutputFiles(scssFiles, scssDirectory, 'scss'),
  ...toOutputFiles(tsFiles, jsDirectory, 'ts'),
  { path: scssDirectory, fileName: INDEX_SCSS_FILE, content: generateBarrelFile(scssFiles) },
  {
    path: jsDirectory,
    fileName: INDEX_TS_FILE,
    content: generateBarrelFile(tsFiles, { hasJsOutput: true }),
  },
];

const generateGlobalFiles = (globalTokens: Token[], context: GenerationContext): OutputFile[] =>
  toOutputFilesWithBarrels(
    generateFilesInBothSyntaxes(globalTokens, nonThemedFilesData, context),
    scssPath(GLOBAL_DIRECTORY),
    jsPath(GLOBAL_DIRECTORY),
  );

/**
 * Root barrel files that re-export the directories, the devices only when there are any.
 *
 * @param hasDevices
 */
const generateRootBarrelFiles = (hasDevices: boolean): OutputFile[] => {
  const directories = [...(hasDevices ? [DEVICES_DIRECTORY] : []), GLOBAL_DIRECTORY, THEMES_DIRECTORY].map(
    (directory) => ({ fileName: directory, content: '' }),
  );

  return [
    { path: scssPath(), fileName: TOKENS_SCSS_FILE, content: generateBarrelFile(directories) },
    {
      path: jsPath(),
      fileName: INDEX_TS_FILE,
      content: generateBarrelFile(directories, { hasJsOutput: true }),
    },
  ];
};

const generateThemeFiles = (themes: ResolvedTokens['themes'], context: GenerationContext): OutputFile[] =>
  themes.flatMap(({ theme, tokens }) =>
    toOutputFilesWithBarrels(
      generateFilesInBothSyntaxes(tokens, themedFilesData, context),
      scssPath(THEMES_DIRECTORY, theme.name),
      jsPath(THEMES_DIRECTORY, theme.name),
    ),
  );

/**
 * The root themes file and the files common to all themes.
 *
 * @param themes
 * @param colorTokens
 * @param context
 */
const generateCommonThemeFiles = (
  themes: ResolvedTokens['themes'],
  colorTokens: Token[],
  context: GenerationContext,
): OutputFile[] => {
  const themeList = themes.map(({ theme }) => theme);
  const { scssFiles, tsFiles } = generateFilesInBothSyntaxes(colorTokens, commonThemedFilesData, context);
  const scssThemesPath = scssPath(THEMES_DIRECTORY);
  const jsThemesPath = jsPath(THEMES_DIRECTORY);
  const jsThemesFileContent = [
    generateThemesRootFile(themeList, { hasJsOutput: true }),
    generateBarrelFile(tsFiles, { hasJsOutput: true }),
  ].join('\n');

  return [
    { path: scssPath(), fileName: THEMES_SCSS_FILE, content: generateThemesRootFile(themeList) },
    { path: jsThemesPath, fileName: INDEX_TS_FILE, content: jsThemesFileContent },
    { path: scssThemesPath, fileName: INDEX_SCSS_FILE, content: generateBarrelFile(scssFiles) },
    ...toOutputFiles(scssFiles, scssThemesPath, 'scss'),
    ...toOutputFiles(tsFiles, jsThemesPath, 'ts'),
  ];
};

const generateDeviceFiles = (deviceTokens: Token[], context: GenerationContext): OutputFile[] =>
  toOutputFilesWithBarrels(
    generateFilesInBothSyntaxes(deviceTokens, devicesFilesData, context),
    scssPath(DEVICES_DIRECTORY),
    jsPath(DEVICES_DIRECTORY),
  );

export const generateOutputFilesByThemes = (
  mappedTokens: Map<string, Token>,
  tokenGroups: TokenGroup[],
  { globalTokens, colorTokens, themes, deviceTokens }: ResolvedTokens,
): Array<OutputFile> => {
  const context: GenerationContext = {
    mappedTokens,
    tokenGroups,
    deviceDimensions: buildDeviceDimensionMap(deviceTokens, tokenGroups),
    fontSizeBaseMap: getFontSizeBaseMap(deviceTokens),
  };
  const hasDevices = deviceTokens.length > 0;

  return [
    ...generateGlobalFiles(globalTokens, context),
    ...generateRootBarrelFiles(hasDevices),
    ...generateThemeFiles(themes, context),
    ...generateCommonThemeFiles(themes, colorTokens, context),
    ...(hasDevices ? generateDeviceFiles(deviceTokens, context) : []),
  ];
};
