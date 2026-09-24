import { type ElementType } from 'react';
import { type ToastColorsExtended } from '../components/Toast';
import { type LinkTarget } from './link';
import type {
  AlignmentXDictionaryType,
  AlignmentYDictionaryType,
  ChildrenProps,
  EmotionColorNamesType,
  StringsProps,
  StyleProps,
  TranslatableString,
} from './shared';

export type ToastColorsExtendedNamesType = (typeof ToastColorsExtended)[keyof typeof ToastColorsExtended];

export type ToastColorType = ToastColorsExtendedNamesType | EmotionColorNamesType;

export interface BaseToastProps extends ChildrenProps, StyleProps {}

export interface SpiritToastProps extends BaseToastProps {
  alignmentX?: AlignmentXDictionaryType | { [key: string]: AlignmentXDictionaryType };
  alignmentY?: Omit<AlignmentYDictionaryType, 'center'> | { [key: string]: Omit<AlignmentYDictionaryType, 'center'> };
  isCollapsible?: boolean;
}

export type ToastStrings = {
  ariaLabelClose?: TranslatableString;
};

export interface BaseToastBarProps extends ChildrenProps, StyleProps, StringsProps<ToastStrings> {
  /** @deprecated Use `strings.ariaLabelClose` instead. */
  closeLabel?: string;
  color?: ToastColorType;
  hasIcon?: boolean;
  iconName?: string;
}

export interface ToastBarHandlingProps {
  isDismissible?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export interface ToastBarProps extends BaseToastBarProps, ToastBarHandlingProps {}

export interface TransitionToastBarProps {
  transitionDuration?: number;
}

export interface SpiritToastBarProps extends ToastBarProps, TransitionToastBarProps {
  id: string;
}

export interface ToastLinkProps<E extends ElementType = 'a'> extends ToastBarHandlingProps, ToastBarProps {
  elementType?: E;
  href?: string;
  target?: LinkTarget;
}

export interface UncontrolledToastProps extends ChildrenProps, StyleProps, StringsProps<ToastStrings> {
  alignmentX?: 'left' | 'center' | 'right';
  alignmentY?: 'top' | 'bottom';
  /** @deprecated Use `strings.ariaLabelClose` instead. */
  closeLabel?: string;
  isCollapsible?: boolean;
}
