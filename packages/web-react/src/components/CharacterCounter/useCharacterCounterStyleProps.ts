import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritCharacterCounterProps } from './types';

export interface CharacterCounterStyles {
  classProps: string;
  props: Omit<SpiritCharacterCounterProps, 'isDisabled' | 'validationState'>;
}

export function useCharacterCounterStyleProps(props: SpiritCharacterCounterProps): CharacterCounterStyles {
  const { isDisabled, validationState, ...restProps } = props;
  const characterCounterClass = useClassNamePrefix('CharacterCounter');
  const characterCounterDisabledClass = `${characterCounterClass}--disabled`;
  const characterCounterValidationClass = `${characterCounterClass}--${validationState}`;

  return {
    classProps: classNames(characterCounterClass, {
      [characterCounterDisabledClass]: isDisabled,
      [characterCounterValidationClass]: validationState,
    }),
    props: restProps,
  };
}
