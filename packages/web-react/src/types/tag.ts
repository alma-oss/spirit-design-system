import { type ElementType } from 'react';
import { type TagColorsExtended } from '..';
import type {
  ChildrenProps,
  EmotionColorNamesType,
  SizeExtendedDictionaryType,
  StyleProps,
  TransferProps,
} from './shared';

export type TagColorsExtendedNamesType = (typeof TagColorsExtended)[keyof typeof TagColorsExtended];

export type TagColor<C> = EmotionColorNamesType | TagColorsExtendedNamesType | C;

export type TagSize<S> = SizeExtendedDictionaryType | S;

export interface AriaTagElementTypeProps<E extends ElementType = 'span'> {
  /**
   * The HTML element or React element used to render the tag, e.g. 'div', 'span'.
   *
   * @default 'span'
   */
  elementType?: E;
}

export interface TagProps<E extends ElementType = 'span', C = void, S = void>
  extends ChildrenProps, StyleProps, TransferProps, AriaTagElementTypeProps<E> {
  color?: TagColor<C>;
  isSubtle?: boolean;
  size?: TagSize<S>;
}

export type SpiritTagProps<E extends ElementType = 'span', C = void, S = void> = TagProps<E, C, S>;
