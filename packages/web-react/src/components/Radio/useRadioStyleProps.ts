import classNames from 'classnames';
import { InputPositions } from '../../constants';
import { useClassNamePrefix, useInputPositionClass } from '../../hooks';
import { type RadioProps, type SpiritRadioProps } from '../../types';

export interface RadioStyles {
  /** className props */
  classProps: {
    root: string;
    input: string;
    text: string;
  };
  /** props to be passed to the input element */
  props: RadioProps;
}

export function useRadioStyleProps(props: SpiritRadioProps): RadioStyles {
  const { inputPosition = InputPositions.START, ...restProps } = props;
  const { isDisabled, isLabelHidden, isItem, validationState } = restProps;

  const radioClass = useClassNamePrefix('Radio');
  const radioDisabledClass = `${radioClass}--disabled`;
  const radioItemClass = `${radioClass}--item`;
  const radioInputClass = `${radioClass}__input`;
  const radioInputPositionClass = useInputPositionClass(radioClass, inputPosition);
  const radioTextClass = `${radioClass}__text`;
  const radioLabelHiddenClass = `${radioClass}--labelHidden`;
  const radioValidationClass = `${radioClass}--${validationState}`;

  const rootStyles = classNames(radioClass, {
    [radioInputPositionClass]: radioInputPositionClass,
    [radioDisabledClass]: isDisabled,
    [radioItemClass]: isItem,
    [radioValidationClass]: validationState,
    [radioLabelHiddenClass]: isLabelHidden,
  });

  return {
    classProps: {
      root: rootStyles,
      input: radioInputClass,
      text: radioTextClass,
    },
    props: restProps,
  };
}
