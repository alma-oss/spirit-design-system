import { type ElementType, type ReactNode } from 'react';
import {
  type AlignmentYDictionaryType,
  type ChildrenProps,
  type PolymorphicComponentProps,
  type SingleOrResponsive,
  type StyleProps,
} from './shared';

export type ItemAlignmentYType = SingleOrResponsive<NonNullable<AlignmentYDictionaryType>>;

export interface ItemStyleProps extends StyleProps {
  alignmentY?: ItemAlignmentYType;
  isDisabled?: boolean;
  isSelected?: boolean;
}

/** ===== INTERNAL API ===== */
export interface ItemBaseProps extends ChildrenProps, ItemStyleProps {
  endSlot?: ReactNode;
  startSlot?: ReactNode;
}

/** ===== PUBLIC API ===== */
export type SpiritItemProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, ItemBaseProps>;
