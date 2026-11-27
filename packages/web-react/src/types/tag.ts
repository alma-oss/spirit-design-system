import { type ElementType } from 'react';
import { type TagColorsExtended } from '..';
import type {
  ChildrenProps,
  EmotionColorNamesType,
  PolymorphicComponentProps,
  SizeExtendedDictionaryType,
  StyleProps,
  TextHyphensType,
  TextWordBreakType,
} from './shared';

export type TagColorsExtendedNamesType = (typeof TagColorsExtended)[keyof typeof TagColorsExtended];

export type TagColor<C> = EmotionColorNamesType | TagColorsExtendedNamesType | C;

export type TagSize<S> = SizeExtendedDictionaryType | S;

/** ===== INTERNAL API ===== */
export interface TagProps<C = void, S = void> extends ChildrenProps, StyleProps {
  color?: TagColor<C>;
  isDisabled?: boolean;
  isSubtle?: boolean;
  size?: TagSize<S>;
  /** Hyphens strategy applied to the tag content. */
  textHyphens?: TextHyphensType;
  /** Word break strategy applied to the tag content. */
  textWordBreak?: TextWordBreakType;
}

/** ===== PUBLIC API ===== */
export type SpiritTagProps<E extends ElementType = 'span', C = void, S = void> = PolymorphicComponentProps<
  E,
  TagProps<C, S>
>;
