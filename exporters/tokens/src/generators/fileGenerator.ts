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
import { buildDeviceDimensionMap } from '../helpers/deviceDimensionHelper';
import { toCamelCase, toOutputName } from '../helpers/stringHelper';
import { getFontSizeBaseMap } from '../helpers/unitHelper';
import type {
  FontReplacement,
  FontSizeBaseMap,
  DesignToken,
  DeviceDimensionMap,
  OutputFile,
  Theme,
  ThemedDesignTokens,
  TokenCollection,
  TokenIndex,
} from '../core/types';
import { generateFileContent } from './contentGenerator';
import { splitTokens } from '../core/splitTokens';
import { createTokenIndex } from '../core/tokenIndex';

/** The syntax a file is generated in: SCSS by default, JS (TypeScript) with `hasJsOutput`. */
type OutputSyntaxOptions = { hasJsOutput?: boolean };

/** The part of a theme the generated files need. */
type ThemeName = Pick<Theme, 'name'>;

type GenerateFilesOptions = {
  tokens: Array<DesignToken>;
  tokenIndex: TokenIndex;
  filesData: FileData[];
  deviceDimensions?: DeviceDimensionMap;
  hasJsOutput?: boolean;
  fontSizeBaseMap?: FontSizeBaseMap;
  fontReplacements?: FontReplacement[];
};

export const generateFiles = ({
  tokens,
  tokenIndex,
  filesData,
  deviceDimensions,
  hasJsOutput = false,
  fontSizeBaseMap,
  fontReplacements,
}: GenerateFilesOptions) => {
  return filesData.map((fileData) => {
    const fileContent = generateFileContent({
      tokens,
      tokenIndex,
      fileData,
      hasJsOutput,
      deviceDimensions,
      fontSizeBaseMapOverride: fontSizeBaseMap,
      fontReplacements,
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
  return (theme: ThemeName) => (hasJsOutput ? jsImportStatement(theme.name) : scssImportStatement(theme.name));
};

export const generateRootThemesFileImports = (
  themes: ThemeName[],
  { hasJsOutput = false }: OutputSyntaxOptions = {},
): string => {
  return themes.map(prepareImportStatementCallback({ hasJsOutput })).join('\n');
};

export const generateRootThemesFileContent = (
  themes: ThemeName[],
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
  themes: ThemeName[],
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
  tokenIndex: TokenIndex;
  deviceDimensions: DeviceDimensionMap;
  fontSizeBaseMap: FontSizeBaseMap;
  fontReplacements: FontReplacement[];
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
const generateFilesInBothSyntaxes = (tokens: DesignToken[], filesData: FileData[], context: GenerationContext) => {
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

const generateGlobalFiles = (globalTokens: DesignToken[], context: GenerationContext): OutputFile[] =>
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

const generateThemeFiles = (themes: ThemedDesignTokens[], context: GenerationContext): OutputFile[] =>
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
  themes: ThemedDesignTokens[],
  colorTokens: DesignToken[],
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

const generateDeviceFiles = (deviceTokens: DesignToken[], context: GenerationContext): OutputFile[] =>
  toOutputFilesWithBarrels(
    generateFilesInBothSyntaxes(deviceTokens, devicesFilesData, context),
    scssPath(DEVICES_DIRECTORY),
    jsPath(DEVICES_DIRECTORY),
  );

/**
 * Generates all output files, in both syntaxes, of the tokens of a collection.
 *
 * @param collection - Tokens in the internal model, as a source adapter fetched them
 * @param options
 * @param options.fontReplacements - Replacements of the font family of the typography styles, as the entry got them
 */
export const generateOutputFilesByThemes = (
  collection: TokenCollection,
  { fontReplacements = [] }: { fontReplacements?: FontReplacement[] } = {},
): Array<OutputFile> => {
  const { globalTokens, colorTokens, themes, deviceTokens } = splitTokens(collection);
  const tokenIndex = createTokenIndex(collection.tokens);
  const context: GenerationContext = {
    tokenIndex,
    deviceDimensions: buildDeviceDimensionMap(deviceTokens),
    fontSizeBaseMap: getFontSizeBaseMap(deviceTokens),
    fontReplacements,
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
