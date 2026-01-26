import { type ElementType } from 'react';
import type {
  ButtonType,
  ChildrenProps,
  ClickEvents,
  PolymorphicComponentProps,
  SingleOrResponsive,
  SizesDictionaryType,
  StyleProps,
} from './shared';

type ButtonProps = {
  /**
   * The behavior of the button when used in an HTML form.
   *
   * @default 'button'
   */
  type?: ButtonType;
};

/** @deprecated "SizesDictionaryType" fallback will be removed in the next major version. */
export type ControlButtonSize<S> = keyof S extends never ? SizesDictionaryType : 'small' | 'medium' | 'large' | S;

export interface ControlButtonStyleProps<S = void> extends StyleProps, ChildrenProps, ClickEvents, ButtonProps {
  /** Whether the button is disabled. */
  isDisabled?: boolean;
  /** Whether the button is in a subtle variant (without border). */
  isSubtle?: boolean;
  /** Whether the button should be symmetrical. */
  isSymmetrical?: SingleOrResponsive<boolean>;
  /** The size of the button. */
  size?: ControlButtonSize<S>;
}

export type ControlButtonProps<E extends ElementType = 'button', S = void> = PolymorphicComponentProps<
  E,
  ControlButtonStyleProps<S>
>;

/** @deprecated Use ControlButtonProps instead */
export type SpiritControlButtonProps<E extends ElementType = 'button', S = void> = ControlButtonProps<E, S>;
