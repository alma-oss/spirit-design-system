import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { FormFieldModes } from '../../types';
import { type SpiritCharacterCounterProps } from './types';

export interface CharacterCounterStyles {
  classProps: string;
  props: Omit<SpiritCharacterCounterProps, 'formFieldMode' | 'isDisabled' | 'validationState'>;
}

export function useCharacterCounterStyleProps(props: SpiritCharacterCounterProps): CharacterCounterStyles {
  const { formFieldMode, isDisabled, validationState, ...restProps } = props;
  const characterCounterClass = useClassNamePrefix('CharacterCounter');
  const characterCounterDisabledClass = `${characterCounterClass}--disabled`;
  const characterCounterValidationClass = `${characterCounterClass}--${validationState}`;
  const inlineClass = `${characterCounterClass}--inline`;
  const itemClass = `${characterCounterClass}--item`;

  return {
    classProps: classNames(characterCounterClass, {
      [inlineClass]: formFieldMode === FormFieldModes.INLINE,
      [itemClass]: formFieldMode === FormFieldModes.ITEM,
      [characterCounterDisabledClass]: isDisabled,
      [characterCounterValidationClass]: validationState,
    }),
    props: restProps,
  };
}
