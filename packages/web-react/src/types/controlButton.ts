import { type ElementType } from 'react';
import type {
  ButtonType,
  ChildrenProps,
  ClickEvents,
  PolymorphicComponentProps,
  PolymorphicRef,
  SingleOrResponsive,
  SizesDictionaryType,
  StyleProps,
} from './shared';

/** @deprecated "SizesDictionaryType" fallback will be removed in the next major version. */
export type ControlButtonSize<S> = keyof S extends never ? SizesDictionaryType : 'small' | 'medium' | 'large' | S;

export interface ControlButtonBaseProps<S = void> extends ChildrenProps, StyleProps, ClickEvents {
  /** Whether the button is disabled. */
  isDisabled?: boolean;
  /** Whether the button is in a subtle variant (without border). */
  isSubtle?: boolean;
  /** Whether the button should be symmetrical. */
  isSymmetrical?: SingleOrResponsive<boolean>;
  /** The size of the button. */
  size?: ControlButtonSize<S>;
  /**
   * The behavior of the button when used in an HTML form.
   *
   * @default 'button'
   */
  type?: ButtonType;
}

export type ControlButtonProps<E extends ElementType = 'button', S = void> = PolymorphicComponentProps<
  E,
  ControlButtonBaseProps<S>
>;

/** @deprecated Use ControlButtonProps instead */
export type SpiritControlButtonProps<E extends ElementType = 'button', S = void> = ControlButtonProps<E, S>;

/**
 * @internal
 * Helper type to get the correct ref type for a ControlButton component
 */
export type ControlButtonRef<E extends ElementType = 'button'> = PolymorphicRef<E>;
