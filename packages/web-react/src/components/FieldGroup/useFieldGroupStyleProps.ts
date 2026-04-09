import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type Validation } from '../../types';

export interface UseFieldGroupStyleProps extends Validation {}

export interface UseFieldGroupStyleReturn {
  /** className props */
  classProps: {
    root: string;
    fields: string;
  };
}

export const useFieldGroupStyleProps = ({ validationState }: UseFieldGroupStyleProps): UseFieldGroupStyleReturn => {
  const fieldGroupClass = useClassNamePrefix('FieldGroup');
  const fieldGroupValidationClass = `${fieldGroupClass}--${validationState}`;
  const fieldGroupFieldsClass = `${fieldGroupClass}__fields`;

  return {
    classProps: {
      root: classNames(fieldGroupClass, {
        [fieldGroupValidationClass]: validationState,
      }),
      fields: fieldGroupFieldsClass,
    },
  };
};
