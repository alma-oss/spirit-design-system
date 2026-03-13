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
    label: string;
    container: string;
    input: string;
    icon: string;
    validationText: string;
  };
}

export const useSelectStyleProps = ({
  isDisabled,
  isFluid,
  isLabelHidden,
  isRequired,
  size,
  validationState,
}: UseSelectStyleProps): UseSelectStyleReturn => {
  const selectRootClass = useClassNamePrefix('Select');
  const selectRootFluidClass = `${selectRootClass}--fluid`;
  const selectRootDisabledClass = `${selectRootClass}--disabled`;
  const selectRootSizeClass = `${selectRootClass}--${size}`;
  const selectRootValidationClass = `${selectRootClass}--${validationState}`;
  const selectLabelClass = `${selectRootClass}__label`;
  const selectLabelRequiredClass = `${selectLabelClass}--required`;
  const selectLabelHiddenClass = `${selectLabelClass}--hidden`;
  const selectContainerClass = `${selectRootClass}__inputContainer`;
  const selectInputClass = `${selectRootClass}__input`;
  const selectIconClass = `${selectRootClass}__icon`;
  const selectValidationTextClass = `${selectRootClass}__validationText`;

  return {
    classProps: {
      root: classNames(selectRootClass, {
        [selectRootDisabledClass]: isDisabled,
        [selectRootFluidClass]: isFluid,
        [selectRootSizeClass]: size,
        [selectRootValidationClass]: validationState,
      }),
      label: classNames(selectLabelClass, {
        [selectLabelRequiredClass]: isRequired,
        [selectLabelHiddenClass]: isLabelHidden,
      }),
      container: selectContainerClass,
      input: selectInputClass,
      icon: selectIconClass,
      validationText: selectValidationTextClass,
    },
  };
};
