import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SizesDictionaryType, type Validation } from '../../types';

export interface UseSelectStyleProps<S = void> extends Validation {
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  size?: SizesDictionaryType<S>;
}

export interface UseSelectStyleReturn {
  /** className props */
  classProps: {
    root: string;
    container: string;
    input: string;
    icon: string;
  };
}

export const useSelectStyleProps = ({
  isDisabled,
  size,
  validationState,
}: UseSelectStyleProps): UseSelectStyleReturn => {
  const selectClass = useClassNamePrefix('Select');
  const selectDisabledClass = `${selectClass}--disabled`;
  const selectSizeClass = `${selectClass}--${size}`;
  const selectValidationClass = `${selectClass}--${validationState}`;
  const selectContainerClass = `${selectClass}__inputContainer`;
  const selectInputClass = `${selectClass}__input`;
  const selectIconClass = `${selectClass}__icon`;

  return {
    classProps: {
      root: classNames(selectClass, {
        [selectDisabledClass]: isDisabled,
        [selectSizeClass]: size,
        [selectValidationClass]: validationState,
      }),
      container: selectContainerClass,
      input: selectInputClass,
      icon: selectIconClass,
    },
  };
};
