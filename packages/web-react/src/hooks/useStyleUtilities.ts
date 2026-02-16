import { SpacingStyleProp as DefaultSpacingStyleProp, DisplayStyleProps, ThemeStyleProps } from '../constants';
import {
  BREAKPOINT_MOBILE,
  type BreakpointToken,
  type Responsive,
  STYLE_SPACING_AUTO,
  type SpaceToken,
  type StyleProps,
  type StyleSpacingAuto,
  type ThemeNameType,
} from '../types';
import { applyClassNamePrefix, camelCaseToKebabCase, isEmpty } from '../utils';

type SpacingStyleProp = string | SpaceToken | StyleSpacingAuto;

/** The breakpoint property value. */
type BreakpointPropValue = Responsive<SpacingStyleProp>;

/** The nullable string. */
type NullableString = string | null | undefined;

/** The prefix for the class name. */
type ClassNamePrefix = NullableString;

/** The utility name. */
type UtilityName = string;

/** The props shape. */
type PropsShape = Record<string, string>;

/** The style utilities result. */
export type StyleUtilitiesResult = {
  /** The parsed style utilities. */
  styleUtilities: string[];
  /** The updated props. */
  props: StyleProps;
};

const CLASS_SEPARATOR = '-';

/**
 * Normalize the spacing value.
 *
 * @param {string} value - The value to normalize.
 * @returns {string} - Just a number from the value if not `auto.
 */
const normalizeSpacingValue = (value: string): string =>
  value === STYLE_SPACING_AUTO ? STYLE_SPACING_AUTO : value.replace(/[^0-9]/g, '');

const isSpaceToken = (value: unknown): value is SpaceToken => typeof value === 'string' && value.startsWith('space-');

const getUtilityValue = (value: string): string => (isSpaceToken(value) ? normalizeSpacingValue(value) : value);

/**
 * Check if the key is included in the object.
 *
 * @param {object} object - The object to check in.
 * @param {string} key - The key to find.
 * @returns {boolean} - `true` if the key is included, `false` otherwise.
 */
const isKeyIncluded = (object: Record<string, unknown>, key: string): boolean => Object.keys(object).includes(key);

const processBreakpointProperties = (
  utilityName: UtilityName,
  propValue: BreakpointPropValue,
  prefix: ClassNamePrefix,
): string[] =>
  Object.keys(propValue).reduce((accumulatedBreakpointUtilities: string[], breakpoint: string) => {
    const breakpointValue = propValue[breakpoint as keyof typeof propValue];

    if (typeof breakpointValue === 'string') {
      const utilityValue = getUtilityValue(breakpointValue);
      const infix = breakpoint === BREAKPOINT_MOBILE ? '' : `${CLASS_SEPARATOR}${breakpoint}`;
      accumulatedBreakpointUtilities.push(
        applyClassNamePrefix(prefix)(`${utilityName}${infix}${CLASS_SEPARATOR}${utilityValue}`),
      );
    }

    return accumulatedBreakpointUtilities;
  }, []);

/**
 * Process the hideOn property.
 *
 * @param {UtilityName} utilityName - The utility name.
 * @param {BreakpointToken | BreakpointToken[]} propValue - The prop value.
 * @param {ClassNamePrefix} prefix - The prefix.
 * @returns {string[]} - The processed utilities.
 */
const processHideOnProperty = (
  utilityName: UtilityName,
  propValue: BreakpointToken | BreakpointToken[],
  prefix: ClassNamePrefix,
): string[] => {
  const breakpoints = Array.isArray(propValue) ? propValue : [propValue];

  return breakpoints.map((breakpoint) =>
    applyClassNamePrefix(prefix)(
      `${utilityName}${CLASS_SEPARATOR}only${CLASS_SEPARATOR}${breakpoint}${CLASS_SEPARATOR}none`,
    ),
  );
};

/**
 * Process the hideFrom property.
 *
 * @param {UtilityName} utilityName - The utility name.
 * @param {BreakpointToken | BreakpointToken[]} propValue - The prop value.
 * @param {ClassNamePrefix} prefix - The prefix.
 * @returns {string[]} - The processed utilities.
 */
const processHideFromProperty = (
  utilityName: UtilityName,
  propValue: BreakpointToken | BreakpointToken[],
  prefix: ClassNamePrefix,
): string[] => {
  const breakpoint = propValue;
  const infix = breakpoint === BREAKPOINT_MOBILE ? '' : `${CLASS_SEPARATOR}${breakpoint}`;

  return [applyClassNamePrefix(prefix)(`${utilityName}${infix}${CLASS_SEPARATOR}none`)];
};

/**
 * Process the display properties.
 *
 * @param {keyof typeof DisplayStyleProps} utilityKey - The utility key.
 * @param {UtilityName} utilityName - The utility name.
 * @param {BreakpointToken | BreakpointToken[]} propValue - The prop value.
 * @param {ClassNamePrefix} prefix - The prefix.
 * @returns {string[]} - The processed utilities.
 */
const processDisplayProperties = (
  utilityKey: keyof typeof DisplayStyleProps,
  utilityName: UtilityName,
  propValue: BreakpointToken | BreakpointToken[],
  prefix: ClassNamePrefix,
): string[] => {
  switch (utilityKey) {
    case 'hideOn':
      return processHideOnProperty(utilityName, propValue, prefix);
    case 'hideFrom':
      return processHideFromProperty(utilityName, propValue, prefix);
    default:
      return [];
  }
};

/**
 * Process the properties.
 *
 * @param {keyof typeof DefaultSpacingStyleProp | keyof typeof DisplayStyleProps | keyof typeof ThemeStyleProps} utilityKey - The utility key.
 * @param {UtilityName} utilityName - The utility name.
 * @param {string | BreakpointPropValue | BreakpointToken | BreakpointToken[]} propValue - The prop value.
 * @param {ClassNamePrefix} prefix - The prefix.
 * @returns {string[]} - The processed utilities.
 */
const processProperties = (
  utilityKey: keyof typeof DefaultSpacingStyleProp | keyof typeof DisplayStyleProps | keyof typeof ThemeStyleProps,
  utilityName: UtilityName,
  propValue: string | boolean | BreakpointPropValue | BreakpointToken | BreakpointToken[],
  prefix: ClassNamePrefix,
): string[] => {
  if (utilityName === ThemeStyleProps.theme) {
    if (typeof propValue !== 'string') {
      return [];
    }

    const themeClassName = camelCaseToKebabCase(propValue) as ThemeNameType;

    return [applyClassNamePrefix(prefix)(themeClassName)];
  }

  if (utilityKey in DisplayStyleProps) {
    return processDisplayProperties(
      utilityKey as keyof typeof DisplayStyleProps,
      utilityName,
      propValue as BreakpointToken | BreakpointToken[],
      prefix,
    );
  }

  if (typeof propValue === 'boolean') {
    return propValue ? [applyClassNamePrefix(prefix)(utilityName)] : [];
  }

  if (typeof propValue === 'string') {
    return [applyClassNamePrefix(prefix)(`${utilityName}-${getUtilityValue(propValue)}`)];
  }

  return processBreakpointProperties(utilityName, propValue as BreakpointPropValue, prefix);
};

type IsStylePropProcessableOptions = {
  /** The flag to check if the key should be included in the styleProp or not. */
  includesKey?: boolean;
};

/**
 * Check if a style prop should be processed based on key presence and value emptiness.
 *
 * When `includesKey` is `true` (default): Returns `true` if the key exists in styleProps
 * AND the value is not empty (using `isEmpty()` check for null, undefined, empty strings,
 * empty arrays, empty objects).
 *
 * When `includesKey` is `false`: Returns `true` if the key does NOT exist in styleProps.
 * Used to filter non-style props that should pass through to the component. Skips emptiness
 * checks entirely in this mode.
 *
 * Beware of disabling style props using `undefined` value.
 * Setting the value conditionally in React is not that simple.
 *
 * @example
 * ```diff
 * ---  marginBottom={!showTogglerAfterCollapse ? 'space-300' : undefined} // Incorrect
 * +++  {...(!showTogglerAfterCollapse && { marginBottom: 'space-300' })}  // Correct
 * ```
 * @param {PropsShape} styleProps - The style props object.
 * @param {string} stylePropKey - The style prop key.
 * @param {NullableString} stylePropValue - The style prop value (can be string, boolean, object, array, null, undefined).
 * @param {IsStylePropProcessableOptions} options - The options object.
 * @param {boolean} options.includesKey - When true, checks if key is in styleProps and value is not empty. When false, checks if key is NOT in styleProps (no emptiness check).
 * @returns {boolean} - `true` if the style prop should be processed, `false` otherwise.
 */
const isStylePropProcessable = (
  styleProps: PropsShape,
  stylePropKey: string,
  stylePropValue: NullableString,
  options: IsStylePropProcessableOptions = { includesKey: true },
): boolean => {
  const isStylePropKeyIncluded = isKeyIncluded(styleProps, stylePropKey);

  if (options.includesKey) {
    return isStylePropKeyIncluded && !isEmpty(stylePropValue);
  }

  return !isStylePropKeyIncluded;
};

export const useStyleUtilities = (
  props: StyleProps,
  prefix: ClassNamePrefix = '',
  additionalProps: PropsShape = {},
): StyleUtilitiesResult => {
  const styleProps = { ...DefaultSpacingStyleProp, ...DisplayStyleProps, ...ThemeStyleProps, ...additionalProps };

  const propEntries = Object.entries(props);
  const styleUtilities = propEntries.reduce((accumulatedUtilities: string[], [key, propValue]) => {
    if (isStylePropProcessable(styleProps, key, propValue)) {
      const utilityName = styleProps[key as keyof typeof styleProps];

      return [
        ...accumulatedUtilities,
        ...processProperties(key as keyof typeof styleProps, utilityName, propValue, prefix),
      ];
    }

    return accumulatedUtilities;
  }, []);

  const updatedProps = propEntries.reduce((accumulatedProps: StyleProps, [key, propValue]) => {
    if (isStylePropProcessable(styleProps, key, propValue, { includesKey: false })) {
      return { ...accumulatedProps, [key]: propValue };
    }

    return accumulatedProps;
  }, {} as StyleProps);

  return {
    styleUtilities,
    props: updatedProps,
  };
};
