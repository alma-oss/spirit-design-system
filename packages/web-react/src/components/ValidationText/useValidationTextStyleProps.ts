import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type FormFieldContextValue, FormFieldModes, type ValidationState } from '../../types';

export interface ValidationTextStyles {
  /** className for the root element */
  classProps: string;
}

export interface UseValidationTextStylePropsProps extends FormFieldContextValue {
  validationStateIcon?: ValidationState;
}

export function useValidationTextStyleProps(props: UseValidationTextStylePropsProps): ValidationTextStyles {
  const { formFieldMode, validationStateIcon, isDisabled } = props;

  const prefix = useClassNamePrefix('ValidationText');
  const dangerClass = `${prefix}--danger`;
  const warningClass = `${prefix}--warning`;
  const successClass = `${prefix}--success`;
  const disabledClass = `${prefix}--disabled`;
  const inlineClass = `${prefix}--inline`;

  const classProps = classNames(prefix, {
    [dangerClass]: validationStateIcon === 'danger',
    [warningClass]: validationStateIcon === 'warning',
    [successClass]: validationStateIcon === 'success',
    [disabledClass]: isDisabled,
    [inlineClass]: formFieldMode === FormFieldModes.INLINE,
  });

  return {
    classProps,
  };
}
