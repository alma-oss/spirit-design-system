import { type ComponentPropsWithRef, type ElementType } from 'react';
import type {
  ButtonSizesType,
  ButtonType,
  ChildrenProps,
  ClickEvents,
  ComponentButtonColorNamesType,
  EmotionColorNamesType,
  SingleOrResponsive,
  SizesDictionaryType,
  SpaceToken,
  StyleProps,
} from './shared';

export type ButtonColor<C> = ComponentButtonColorNamesType<C> | EmotionColorNamesType<C>;
/** @deprecated "SizesDictionaryType" fallback will be removed in the next major version. */
export type ButtonSize<S> = keyof S extends never ? SizesDictionaryType : ButtonSizesType | S;

export interface ButtonBaseProps<C = void, S = void> extends ChildrenProps, StyleProps, ClickEvents {
  /** The color of the button. */
  color?: ButtonColor<C>;
  /** Whether the button is disabled. */
  isDisabled?: boolean;
  /** Whether the button should be displayed with a block style. */
  isBlock?: boolean;
  /** Whether the button should be in a loading state. */
  isLoading?: boolean;
  /** Whether the button should be symmetrical. */
  isSymmetrical?: SingleOrResponsive<boolean>;
  /** The size of the button. */
  size?: ButtonSize<S>;
  /** Custom spacing between button content items. */
  spacing?: SingleOrResponsive<SpaceToken>;
}

export type ButtonProps<E extends ElementType, C = void, S = void> = {
  /**
   * The HTML element or React element used to render the button, e.g. 'div', 'a', or `RouterLink`.
   *
   * @default 'button'
   */
  elementType?: E;
  /**
   * The behavior of the button when used in an HTML form.
   *
   * @default 'button'
   */
  type?: ButtonType;
} & ButtonBaseProps<C, S>;

export type ButtonLinkProps<E extends ElementType, C = void, S = void> = {
  /**
   * The HTML element or React element used to render the button, e.g. 'div', 'a', or `RouterLink`.
   *
   * @default 'a'
   */
  elementType?: E;
} & ButtonBaseProps<C, S>;

export type SpiritButtonProps<E extends ElementType = 'button', C = void, S = void> = ButtonProps<E, C, S> &
  ComponentPropsWithRef<E>;

export type SpiritButtonLinkProps<E extends ElementType = 'a', C = void, S = void> = ButtonLinkProps<E, C, S> &
  ComponentPropsWithRef<E>;
