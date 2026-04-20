import { type ElementType } from 'react';
import { type TagColorsExtended } from '..';
import type {
  ChildrenProps,
  EmotionColorNamesType,
  PolymorphicComponentProps,
  SizeExtendedDictionaryType,
  StyleProps,
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
}

/** ===== PUBLIC API ===== */
export type SpiritTagProps<E extends ElementType = 'span', C = void, S = void> = PolymorphicComponentProps<
  E,
  TagProps<C, S>
>;
