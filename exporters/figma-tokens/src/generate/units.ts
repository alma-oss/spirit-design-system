import {
  DEFAULT_DECIMALS,
  FONT_SIZE_BASE_DEFAULT,
  JS_INDENTATION,
  MAX_TO_FIXED_DIGITS,
  PX_UNIT,
  REM_UNIT,
  SCSS_INDENTATION,
} from './constants';

export type PxToRemOptions = {
  baseFontSize: number;
  decimals?: number;
};

export const pxToRem = (valuePx: string | number, options: PxToRemOptions): string => {
  const { baseFontSize, decimals = DEFAULT_DECIMALS } = options;

  if (!baseFontSize || baseFontSize <= 0) {
    return `${valuePx}${PX_UNIT}`;
  }

  const parsedValuePx = Number.parseFloat(String(valuePx));
  const effectiveValuePx = Number.isFinite(parsedValuePx) ? parsedValuePx : 0;
  const effectiveDecimals =
    Number.isInteger(decimals) && decimals >= 0 && decimals <= MAX_TO_FIXED_DIGITS ? decimals : DEFAULT_DECIMALS;
  const remValue = effectiveValuePx / baseFontSize;
  const roundingFactor = 10 ** effectiveDecimals;
  const roundedRem = Math.round((remValue + Number.EPSILON) * roundingFactor) / roundingFactor;
  const normalizedRem = Math.abs(roundedRem) === 0 ? 0 : roundedRem;
  const formattedRem = normalizedRem.toFixed(effectiveDecimals).replace(/\.?0+$/, '');

  return `${formattedRem}${REM_UNIT}`;
};

export const replacePxWithRem = (value: string, baseFontSize: number): string => {
  if (!baseFontSize || baseFontSize <= 0) {
    return value;
  }

  return value.replace(new RegExp(`(\\d+(?:\\.\\d+)?)${PX_UNIT}`, 'g'), (_, number: string) =>
    pxToRem(number, { baseFontSize }),
  );
};

export const normalizeZeroValueWithUnit = (
  value: string | number,
  unit: string,
  isRelative: boolean,
  baseFontSize: number = FONT_SIZE_BASE_DEFAULT,
): string | number => {
  if (value === 0) {
    return 0;
  }

  if (isRelative) {
    return pxToRem(value, { baseFontSize });
  }

  return `${value}${unit}`;
};

export const removeExtraBlankLines = (css: string): string => css.replace(/\n{3,}/g, '\n\n');

export const formatLinesAtEndOfTheFile = (css: string): string => css.replace(/\n{2,}$/, '\n');

const formattingConfig = {
  js: {
    indentation: JS_INDENTATION,
    openingBracket: '{',
    closingBracket: '}',
  },
  scss: {
    indentation: SCSS_INDENTATION,
    openingBracket: '(',
    closingBracket: ')',
  },
};

export const indentAndFormat = (css: string, hasJsOutput: boolean): string => {
  const fileType = hasJsOutput ? 'js' : 'scss';
  const { indentation, openingBracket, closingBracket } = formattingConfig[fileType];
  let indentationLevel = 0;
  let formattedCSS = '';

  for (const line of css.split('\n')) {
    if (line.includes(openingBracket) && line.includes(closingBracket)) {
      formattedCSS += `${indentation.repeat(indentationLevel)}${line}\n`;
    } else if (line.includes(openingBracket)) {
      formattedCSS += `${indentation.repeat(indentationLevel)}${line}\n`;
      indentationLevel += 1;
    } else if (line.includes(closingBracket)) {
      indentationLevel -= 1;
      formattedCSS += `${indentation.repeat(indentationLevel)}${line}\n`;
    } else {
      formattedCSS += `${indentation.repeat(indentationLevel)}${line}\n`;
    }
  }

  return formatLinesAtEndOfTheFile(removeExtraBlankLines(formattedCSS));
};
