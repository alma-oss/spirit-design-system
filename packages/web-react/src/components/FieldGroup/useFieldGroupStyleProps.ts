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
  };
}

export const useFieldGroupStyleProps = ({
  isFluid,
  isRequired,
  validationState,
}: UseFieldGroupStyleProps): UseFieldGroupStyleReturn => {
  const fieldGroupRootClass = useClassNamePrefix('FieldGroup');
  const fieldGroupRootFluidClass = `${fieldGroupRootClass}--fluid`;
  const fieldGroupRootValidationClass = `${fieldGroupRootClass}--${validationState}`;
  const fieldGroupLabelClass = `${fieldGroupRootClass}__label`;
  const fieldGroupLabelRequiredClass = `${fieldGroupLabelClass}--required`;
  const fieldGroupFieldsClass = `${fieldGroupRootClass}__fields`;
  const fieldGroupValidationTextClass = `${fieldGroupRootClass}__validationText`;

  return {
    classProps: {
      root: classNames(fieldGroupRootClass, {
        [fieldGroupRootFluidClass]: isFluid,
        [fieldGroupRootValidationClass]: validationState,
      }),
      label: classNames(fieldGroupLabelClass, {
        [fieldGroupLabelRequiredClass]: isRequired,
      }),
      fields: fieldGroupFieldsClass,
      validationText: fieldGroupValidationTextClass,
    },
  };
};
