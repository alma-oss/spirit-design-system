export const COLOR_CSS_VARIABLE_PREFIX = 'color-';
export const COLOR_JS_SUFFIX = 'Colors';
export const COLOR_KEY = 'colors';
export const COLOR_SCSS_SUFFIX = '-colors';
export const CSS_LAYER_SEPARATOR = ', ';
export const DEFAULT_DECIMALS = 4;
export const DEVICES_DIRECTORY = 'devices';
export const FONT_SIZE_BASE = 'font-size-base';
export const FONT_SIZE_BASE_DEFAULT = 16;
/**
 * Standard CSS / OpenType names of the font weights and the numbers they stand for. Not exporter defaults, just the
 * lookup that turns a weight name used by a source (e.g. `Semi Bold`) into the numeric `font-weight`.
 */
export const FONT_WEIGHT_NAME_TO_NUMBER: Record<string, number> = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};
export const GLOBAL_DIRECTORY = 'global-tokens';
export const INDEX_SCSS_FILE = 'index.scss';
export const INDEX_TS_FILE = 'index.ts';
export const JS_DIRECTORY = 'js';
export const JS_INDENTATION = '  ';
// `Number.prototype.toFixed` requires the digits argument to be an integer in [0, 100]
// (per the ECMAScript spec); anything outside that range throws a `RangeError`.
export const MAX_TO_FIXED_DIGITS = 100;
export const REM_UNIT = 'rem';
export const PX_UNIT = 'px';
export const SCSS_DIRECTORY = 'scss';
export const SCSS_INDENTATION = '    ';
export const THEMES_DIRECTORY = 'themes';
export const THEMES_SCSS_FILE = '@themes.scss';
export const TOKENS_SCSS_FILE = '@tokens.scss';
export const TYPOGRAPHY_KEY = 'styles';
export const TYPOGRAPHY_SUBSTITUTE_FONT = 'sans-serif';
