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
    fields: string;
  };
}

export const useFieldGroupStyleProps = ({
  isFluid,
  validationState,
}: UseFieldGroupStyleProps): UseFieldGroupStyleReturn => {
  const fieldGroupRootClass = useClassNamePrefix('FieldGroup');
  const fieldGroupRootFluidClass = `${fieldGroupRootClass}--fluid`;
  const fieldGroupRootValidationClass = `${fieldGroupRootClass}--${validationState}`;
  const fieldGroupFieldsClass = `${fieldGroupRootClass}__fields`;

  return {
    classProps: {
      root: classNames(fieldGroupRootClass, {
        [fieldGroupRootFluidClass]: isFluid,
        [fieldGroupRootValidationClass]: validationState,
      }),
      fields: fieldGroupFieldsClass,
    },
  };
};
