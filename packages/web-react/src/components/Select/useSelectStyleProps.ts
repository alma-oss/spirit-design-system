import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SizesDictionaryType, type Validation } from '../../types';

export interface UseSelectStyleProps<S = void> extends Validation {
  isDisabled?: boolean;
  isFluid?: boolean;
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
  isFluid,
  size,
  validationState,
}: UseSelectStyleProps): UseSelectStyleReturn => {
  const selectRootClass = useClassNamePrefix('Select');
  const selectRootFluidClass = `${selectRootClass}--fluid`;
  const selectRootDisabledClass = `${selectRootClass}--disabled`;
  const selectRootSizeClass = `${selectRootClass}--${size}`;
  const selectRootValidationClass = `${selectRootClass}--${validationState}`;
  const selectContainerClass = `${selectRootClass}__inputContainer`;
  const selectInputClass = `${selectRootClass}__input`;
  const selectIconClass = `${selectRootClass}__icon`;

  return {
    classProps: {
      root: classNames(selectRootClass, {
        [selectRootDisabledClass]: isDisabled,
        [selectRootFluidClass]: isFluid,
        [selectRootSizeClass]: size,
        [selectRootValidationClass]: validationState,
      }),
      container: selectContainerClass,
      input: selectInputClass,
      icon: selectIconClass,
    },
  };
};
