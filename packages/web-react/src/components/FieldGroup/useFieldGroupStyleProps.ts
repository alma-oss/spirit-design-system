import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type Validation } from '../../types';

export interface UseFieldGroupStyleProps extends Validation {
  isFluid?: boolean;
}

export interface UseFieldGroupStyleReturn {
  /** className props */
  classProps: {
    root: string;
    label: string;
    fields: string;
    validationText: string;
    helperText: string;
  };
}

export const useFieldGroupStyleProps = ({
  isFluid,
  isRequired,
  validationState,
}: UseFieldGroupStyleProps): UseFieldGroupStyleReturn => {
  const fieldGroupClass = useClassNamePrefix('FieldGroup');
  const fieldGroupFluidClass = `${fieldGroupClass}--fluid`;
  const fieldGroupValidationClass = `${fieldGroupClass}--${validationState}`;
  const fieldGroupLabelClass = `${fieldGroupClass}__label`;
  const fieldGroupLabelRequiredClass = `${fieldGroupLabelClass}--required`;
  const fieldGroupFieldsClass = `${fieldGroupClass}__fields`;
  const fieldGroupValidationTextClass = `${fieldGroupClass}__validationText`;
  const fieldGroupHelperTextClass = `${fieldGroupClass}__helperText`;

  return {
    classProps: {
      root: classNames(fieldGroupClass, {
        [fieldGroupFluidClass]: isFluid,
        [fieldGroupValidationClass]: validationState,
      }),
      label: classNames(fieldGroupLabelClass, {
        [fieldGroupLabelRequiredClass]: isRequired,
      }),
      fields: fieldGroupFieldsClass,
      validationText: fieldGroupValidationTextClass,
      helperText: fieldGroupHelperTextClass,
    },
  };
};
