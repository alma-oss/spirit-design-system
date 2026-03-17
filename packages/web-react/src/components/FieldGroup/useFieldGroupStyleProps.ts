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
  const fieldGroupClass = useClassNamePrefix('FieldGroup');
  const fieldGroupFluidClass = `${fieldGroupClass}--fluid`;
  const fieldGroupValidationClass = `${fieldGroupClass}--${validationState}`;
  const fieldGroupFieldsClass = `${fieldGroupClass}__fields`;

  return {
    classProps: {
      root: classNames(fieldGroupClass, {
        [fieldGroupFluidClass]: isFluid,
        [fieldGroupValidationClass]: validationState,
      }),
      fields: fieldGroupFieldsClass,
    },
  };
};
