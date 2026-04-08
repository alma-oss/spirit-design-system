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
    helperText: string;
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
  const selectClass = useClassNamePrefix('Select');
  const selectFluidClass = `${selectClass}--fluid`;
  const selectDisabledClass = `${selectClass}--disabled`;
  const selectSizeClass = `${selectClass}--${size}`;
  const selectValidationClass = `${selectClass}--${validationState}`;
  const selectLabelClass = `${selectClass}__label`;
  const selectLabelRequiredClass = `${selectLabelClass}--required`;
  const selectLabelHiddenClass = `${selectLabelClass}--hidden`;
  const selectContainerClass = `${selectClass}__inputContainer`;
  const selectInputClass = `${selectClass}__input`;
  const selectIconClass = `${selectClass}__icon`;
  const selectValidationTextClass = `${selectClass}__validationText`;
  const selectHelperTextClass = `${selectClass}__helperText`;

  return {
    classProps: {
      root: classNames(selectClass, {
        [selectDisabledClass]: isDisabled,
        [selectFluidClass]: isFluid,
        [selectSizeClass]: size,
        [selectValidationClass]: validationState,
      }),
      label: classNames(selectLabelClass, {
        [selectLabelRequiredClass]: isRequired,
        [selectLabelHiddenClass]: isLabelHidden,
      }),
      container: selectContainerClass,
      input: selectInputClass,
      icon: selectIconClass,
      validationText: selectValidationTextClass,
      helperText: selectHelperTextClass,
    },
  };
};
