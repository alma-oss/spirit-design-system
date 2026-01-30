import { componentColors, containers, emotionColors, textColors } from '@alma-oss/spirit-design-tokens';

function createUppercaseKeyDictionary<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(Object.keys(obj).map((key) => [key.toUpperCase(), key])) as {
    [K in keyof T as Uppercase<string & K>]: K;
  };
}

/* Alignment */
export const AlignmentX = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
} as const;

export const AlignmentXExtended = {
  SPACE_BETWEEN: 'space-between',
  STRETCH: 'stretch',
  ...AlignmentX,
} as const;

export const AlignmentY = {
  TOP: 'top',
  CENTER: 'center',
  BOTTOM: 'bottom',
} as const;

export const AlignmentYExtended = {
  BASELINE: 'baseline',
  STRETCH: 'stretch',
  ...AlignmentY,
} as const;

export const TextAlignments = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
} as const;

/* Border */
export const BorderColors = {
  BASIC: 'basic',
} as const;

export const BorderRadii = {
  0: '0',
  100: '100',
  200: '200',
  300: '300',
  400: '400',
  500: '500',
  FULL: 'full',
} as const;

export const BorderStyles = {
  SOLID: 'solid',
  DOTTED: 'dotted',
  DASHED: 'dashed',
} as const;

export const BorderWidths = {
  0: '0',
  100: '100',
  200: '200',
} as const;

/* Color */
export const BackgroundColors = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
} as const;

export const ComponentButtonColors = createUppercaseKeyDictionary(componentColors.button);

export const EmotionColors = createUppercaseKeyDictionary(emotionColors);

export const LinkColors = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  UNSTYLED: 'unstyled',
} as const;

export const TextColors = createUppercaseKeyDictionary(textColors);

/* Intensity */
export const Intensity = {
  BASIC: 'basic',
  SUBTLE: 'subtle',
} as const;

/* Emphasis */
export const Emphasis = {
  REGULAR: 'regular',
  SEMIBOLD: 'semibold',
  BOLD: 'bold',
  ITALIC: 'italic',
} as const;

/* Gradient */
export const BackgroundGradients = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
} as const;

/* Placement */
export const Placements = {
  TOP: 'top',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  BOTTOM: 'bottom',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end',
  LEFT: 'left',
  LEFT_START: 'left-start',
  LEFT_END: 'left-end',
  RIGHT: 'right',
  RIGHT_START: 'right-start',
  RIGHT_END: 'right-end',
} as const;

/* Size */
export const Sizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export const SizesExtended = {
  XSMALL: 'xsmall',
  ...Sizes,
  XLARGE: 'xlarge',
} as const;

// Exclude unwanted tokens so we can iterate over Container sizes.
// Max-width and padding will be moved out of this map in the future.
// @see https://jira.almacareer.tech/browse/DS-2142
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { MAXWIDTH, PADDING, ...ContainerTokenSizes } = createUppercaseKeyDictionary(containers);
export { ContainerTokenSizes };

/* Validation */
export const ValidationStates = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
} as const;

/* Variant */
export const FillVariants = {
  FILL: 'fill',
  OUTLINE: 'outline',
} as const;

export const ShapeVariants = {
  BOX: 'box',
  PILL: 'pill',
} as const;
