import type { ElementType } from 'react';
import type {
  ChildrenProps,
  PolymorphicComponentProps,
  SizesDictionaryType,
  StyleProps,
  ValidationState,
} from '../../types/shared';

export interface InputContainerProps extends ChildrenProps, StyleProps {
  /** InputContainer size modifier class. */
  size?: SizesDictionaryType;
  /** Whether the field is disabled; adds `InputContainer--disabled`. */
  isDisabled?: boolean;
  /** Validation state; adds `InputContainer--{validationState}`. */
  validationState?: ValidationState;
}

export type SpiritInputContainerProps<E extends ElementType = 'div'> = PolymorphicComponentProps<
  E,
  InputContainerProps
>;
