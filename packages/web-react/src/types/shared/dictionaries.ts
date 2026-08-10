import {
  type AlignmentX,
  type AlignmentXExtended,
  type AlignmentY,
  type AlignmentYExtended,
  type BackgroundColors,
  type BackgroundGradients,
  type BorderColors,
  type BorderRadii,
  type BorderStyles,
  type BorderWidths,
  type ComponentButtonColors,
  type Emphasis,
  type FillVariants,
  type Intensity,
  type LinkColors,
  type Placements,
  type ShapeVariants,
  type Sizes,
  type SizesExtended,
  type TextAlignments,
  type TextColors,
  type ValidationStates,
} from '../../constants';
import { type TextAccentColorsType, type TextEmotionColorsType, type TextNeutralColorsType } from './colors';

/**
 * Allow autocomplete for string literals.
 *
 * This is a TypeScript quirk.
 *
 * @see { @link https://github.com/microsoft/TypeScript/issues/29729}
 *
 * When you want to allow any string but still give suggestions for known string literals.
 * This works because it prevents TypeScript from eagerly collapsing string | "literal" into just string.
 * It behaves exactly the same way as string, but with autocomplete added.
 * Someday, string | "literal" will just work.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
type AutocompleteStringLiteral = string & {};

/* Alignment */
export type AlignmentXDictionaryKeys = keyof typeof AlignmentX;
export type AlignmentXDictionaryType<T = undefined> = (typeof AlignmentX)[AlignmentXDictionaryKeys] | T;

export type AlignmentXExtendedDictionaryKeys = keyof typeof AlignmentXExtended;
export type AlignmentXExtendedDictionaryType<T = undefined> =
  (typeof AlignmentXExtended)[AlignmentXExtendedDictionaryKeys] | T;

export type AlignmentYDictionaryKeys = keyof typeof AlignmentY;
export type AlignmentYDictionaryType<T = undefined> = (typeof AlignmentY)[AlignmentYDictionaryKeys] | T;

export type AlignmentYExtendedDictionaryKeys = keyof typeof AlignmentYExtended;
export type AlignmentYExtendedDictionaryType<T = undefined> =
  (typeof AlignmentYExtended)[AlignmentYExtendedDictionaryKeys] | T;

export type TextAlignmentDictionaryKeys = keyof typeof TextAlignments;
export type TextAlignmentDictionaryType<T = undefined> = (typeof TextAlignments)[TextAlignmentDictionaryKeys] | T;

/* Border */
export type BorderColorsDictionaryKeys = keyof typeof BorderColors;
export type BorderColorsDictionaryType<C = undefined> = (typeof BorderColors)[BorderColorsDictionaryKeys] | C;

export type BorderRadiiDictionaryKeys = keyof typeof BorderRadii;
export type BorderRadiiDictionaryType<C = undefined> = (typeof BorderRadii)[BorderRadiiDictionaryKeys] | C;

export type BorderStylesDictionaryKeys = keyof typeof BorderStyles;
export type BorderStylesDictionaryType<C = undefined> = (typeof BorderStyles)[BorderStylesDictionaryKeys] | C;

export type BorderWidthsDictionaryKeys = keyof typeof BorderWidths;
export type BorderWidthsDictionaryType<C = undefined> = (typeof BorderWidths)[BorderWidthsDictionaryKeys] | C;

/* Color */
export type BackgroundColorsDictionaryKeys = keyof typeof BackgroundColors;
export type BackgroundColorsDictionaryType<C = undefined> =
  (typeof BackgroundColors)[BackgroundColorsDictionaryKeys] | C;

export type ComponentButtonColorsDictionaryKeys = keyof typeof ComponentButtonColors;
export type ComponentButtonColorsDictionaryType<C = undefined> =
  (typeof ComponentButtonColors)[ComponentButtonColorsDictionaryKeys] | C;

export type LinkColorsDictionaryKeys = keyof typeof LinkColors;
export type LinkColorsDictionaryType<C = undefined> = (typeof LinkColors)[LinkColorsDictionaryKeys] | C;

export type TextColorsDictionaryKeys = keyof typeof TextColors;
export type TextColorsDictionaryType<C = undefined> = (typeof TextColors)[TextColorsDictionaryKeys] | C;

export interface TextColorProps<C = undefined> {
  textColor?: C | TextAccentColorsType | TextEmotionColorsType | TextNeutralColorsType | TextColorsDictionaryType;
}

/* Intensity */
export type IntensityDictionaryKeys = keyof typeof Intensity;
export type IntensityDictionaryType = (typeof Intensity)[IntensityDictionaryKeys];

/* Emphasis */
export type EmphasisDictionaryKeys = keyof typeof Emphasis;
export type EmphasisDictionaryType<C = undefined> = (typeof Emphasis)[EmphasisDictionaryKeys] | C;

export interface EmphasisProps<E> {
  emphasis?: E;
}

/* Gradient */
export type BackgroundGradientsDictionaryKeys = keyof typeof BackgroundGradients;
export type BackgroundGradientsDictionaryType<C = undefined> =
  (typeof BackgroundGradients)[BackgroundGradientsDictionaryKeys] | C;

/* Placement */
export type PlacementDictionaryKeys = keyof typeof Placements;
export type PlacementDictionaryType<T = undefined> = (typeof Placements)[PlacementDictionaryKeys] | T;

/* Size */
export type SizesDictionaryKeys = keyof typeof Sizes;
export type SizesDictionaryType<T = undefined> = (typeof Sizes)[SizesDictionaryKeys] | T;

export type SizesExtendedDictionaryKeys = keyof typeof SizesExtended;
export type SizeExtendedDictionaryType<T = undefined> = (typeof SizesExtended)[SizesExtendedDictionaryKeys] | T;

export interface SizeProps<P> {
  size?: P;
}

/* Validation */
export type ValidationStatesDictionaryKeys = keyof typeof ValidationStates;
export type ValidationStatesDictionaryType<T = undefined> =
  (typeof ValidationStates)[ValidationStatesDictionaryKeys] | T;

/* Variant */
export type ShapeVariantDictionaryKeys = keyof typeof ShapeVariants;
export type ShapeVariantDictionaryType = (typeof ShapeVariants)[ShapeVariantDictionaryKeys] | AutocompleteStringLiteral;

export type FillVariantDictionaryKeys = keyof typeof FillVariants;
export type FillVariantDictionaryType = (typeof FillVariants)[FillVariantDictionaryKeys] | AutocompleteStringLiteral;
