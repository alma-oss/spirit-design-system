import classNames from 'classnames';
import { InputPositions } from '../../constants';
import { useClassNamePrefix, useInputPositionClass } from '../../hooks';
import { type RadioProps, type SpiritRadioProps } from '../../types';

export interface RadioStyles {
  /** className props */
  classProps: {
    root: string;
    label: string;
    input: string;
    text: string;
    helperText: string;
  };
  /** props to be passed to the input element */
  props: RadioProps;
}

export function useRadioStyleProps(props: SpiritRadioProps): RadioStyles {
  const { inputPosition = InputPositions.START, isItem, isLabelHidden, validationState, ...restProps } = props;
  const { isDisabled } = restProps;

  const radioClass = useClassNamePrefix('Radio');
  const radioDisabledClass = `${radioClass}--disabled`;
  const radioItemClass = `${radioClass}--item`;
  const radioInputClass = `${radioClass}__input`;
  const radioInputPositionClass = useInputPositionClass(radioClass, inputPosition);
  const radioLabelClass = `${radioClass}__label`;
  const radioLabelHiddenClass = `${radioClass}__label--hidden`;
  const radioTextClass = `${radioClass}__text`;
  const radioHelperTextClass = `${radioClass}__helperText`;
  const radioValidationClass = `${radioClass}--${validationState}`;

  return {
    classProps: {
      root: classNames(radioClass, {
        [radioInputPositionClass]: radioInputPositionClass,
        [radioDisabledClass]: isDisabled,
        [radioItemClass]: isItem,
        [radioValidationClass]: validationState,
      }),
      label: classNames(radioLabelClass, {
        [radioLabelHiddenClass]: isLabelHidden,
      }),
      input: radioInputClass,
      text: radioTextClass,
      helperText: radioHelperTextClass,
    },
    props: restProps,
  };
}
