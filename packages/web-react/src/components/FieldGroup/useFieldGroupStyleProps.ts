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
  const fieldGroupRootClass = useClassNamePrefix('FieldGroup');
  const fieldGroupRootValidationClass = `${fieldGroupRootClass}--${validationState}`;
  const fieldGroupFieldsClass = `${fieldGroupRootClass}__fields`;

  return {
    classProps: {
      root: classNames(fieldGroupRootClass, {
        [fieldGroupRootValidationClass]: validationState,
      }),
      fields: fieldGroupFieldsClass,
    },
  };
};
