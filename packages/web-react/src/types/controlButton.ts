import { type ElementType } from 'react';
import type {
  ButtonType,
  ChildrenProps,
  ClickEvents,
  PolymorphicComponentProps,
  SingleOrResponsive,
  SizesDictionaryType,
  SpaceToken,
  StyleProps,
} from './shared';

/** ===== BASE API ===== */
/** @deprecated "SizesDictionaryType" fallback will be removed in the next major version. */
export type ControlButtonSize<S> = keyof S extends never ? SizesDictionaryType : 'small' | 'medium' | 'large' | S;

export interface ControlButtonBaseProps extends ChildrenProps, StyleProps, ClickEvents {}

/** ===== STYLE API ===== */
export interface ControlButtonStyleProps<S = void> extends ControlButtonBaseProps {
  /** Whether the button is disabled. */
  isDisabled?: boolean;
  /** Whether the button is in a subtle variant (without border). */
  isSubtle?: boolean;
  /** Whether the button should be symmetrical. */
  isSymmetrical?: SingleOrResponsive<boolean>;
  /** The size of the button. */
  size?: ControlButtonSize<S>;
  /** Custom spacing between button content items. */
  spacing?: SingleOrResponsive<SpaceToken>;
}

/** ===== INTERNAL API ===== */
export interface ControlButtonProps<S = void> extends ControlButtonStyleProps<S> {
  /**
   * The behavior of the button when used in an HTML form.
   *
   * @default 'button'
   */
  type?: ButtonType;
}

/** ===== PUBLIC API ===== */
export type SpiritControlButtonProps<E extends ElementType = 'button', S = void> = PolymorphicComponentProps<
  E,
  ControlButtonProps<S>
>;
