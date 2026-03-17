import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type FormFieldContextValue, FormFieldVariants, type ValidationState } from '../../types';

export interface ValidationTextStyles {
  /** className for the root element */
  classProps: string;
}

export interface UseValidationTextStylePropsProps extends FormFieldContextValue {
  hasValidationStateIcon?: ValidationState;
}

export function useValidationTextStyleProps(props: UseValidationTextStylePropsProps): ValidationTextStyles {
  const { formFieldVariant, hasValidationStateIcon, isDisabled } = props;

  const prefix = useClassNamePrefix('ValidationText');
  const dangerClass = `${prefix}--danger`;
  const warningClass = `${prefix}--warning`;
  const successClass = `${prefix}--success`;
  const disabledClass = `${prefix}--disabled`;
  const inlineClass = `${prefix}--inline`;
  const itemClass = `${prefix}--item`;

  const classProps = classNames(prefix, {
    [dangerClass]: hasValidationStateIcon === 'danger',
    [warningClass]: hasValidationStateIcon === 'warning',
    [successClass]: hasValidationStateIcon === 'success',
    [disabledClass]: isDisabled,
    [inlineClass]: formFieldVariant === FormFieldVariants.INLINE,
    [itemClass]: formFieldVariant === FormFieldVariants.ITEM,
  });

  return {
    classProps,
  };
}
