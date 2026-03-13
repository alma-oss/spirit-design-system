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
  const radioValidationClass = `${radioClass}--${validationState}`;

  const rootStyles = classNames(radioClass, {
    [radioInputPositionClass]: radioInputPositionClass,
    [radioDisabledClass]: isDisabled,
    [radioItemClass]: isItem,
    [radioValidationClass]: validationState,
  });
  const labelStyles = classNames(radioLabelClass, {
    [radioLabelHiddenClass]: isLabelHidden,
  });

  return {
    classProps: {
      root: rootStyles,
      label: labelStyles,
      input: radioInputClass,
      text: radioTextClass,
    },
    props: restProps,
  };
}
