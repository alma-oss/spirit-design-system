import { type ElementType } from 'react';
import type {
  ButtonSizesType,
  ButtonType,
  ChildrenProps,
  ClickEvents,
  ComponentButtonColorNamesType,
  EmotionColorNamesType,
  PolymorphicComponentProps,
  SingleOrResponsive,
  SizesDictionaryType,
  StyleProps,
} from './shared';

export type ButtonColor<C> = ComponentButtonColorNamesType<C> | EmotionColorNamesType<C>;
/** @deprecated "SizesDictionaryType" fallback will be removed in the next major version. */
export type ButtonSize<S> = keyof S extends never ? SizesDictionaryType : ButtonSizesType | S;

export interface ButtonStyleProps<C = void, S = void> extends ChildrenProps, StyleProps, ClickEvents {
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
  /**
   * The behavior of the button when used in an HTML form.
   *
   * @default 'button'
   */
  type?: ButtonType;
}

export type ButtonProps<E extends ElementType = 'button', C = void, S = void> = PolymorphicComponentProps<
  E,
  ButtonStyleProps<C, S>
>;

export type ButtonLinkProps<E extends ElementType = 'a', C = void, S = void> = PolymorphicComponentProps<
  E,
  Omit<ButtonStyleProps<C, S>, 'type'>
>;

/** @deprecated Use ButtonProps instead */
export type SpiritButtonProps<E extends ElementType = 'button', C = void, S = void> = ButtonProps<E, C, S>;

/** @deprecated Use ButtonLinkProps instead */
export type SpiritButtonLinkProps<E extends ElementType = 'a', C = void, S = void> = ButtonLinkProps<E, C, S>;
