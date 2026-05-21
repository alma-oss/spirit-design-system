import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { FormFieldTypes } from '../../types';
import { type SpiritCharacterCounterProps } from './types';

export interface CharacterCounterStyles {
  classProps: string;
  props: Omit<SpiritCharacterCounterProps, 'formFieldType' | 'isDisabled' | 'validationState'>;
}

export function useCharacterCounterStyleProps(props: SpiritCharacterCounterProps): CharacterCounterStyles {
  const { formFieldType, isDisabled, validationState, ...restProps } = props;
  const characterCounterClass = useClassNamePrefix('CharacterCounter');
  const characterCounterDisabledClass = `${characterCounterClass}--disabled`;
  const characterCounterValidationClass = `${characterCounterClass}--${validationState}`;
  const inlineClass = `${characterCounterClass}--inline`;
  const itemClass = `${characterCounterClass}--item`;

  return {
    classProps: classNames(characterCounterClass, {
      [inlineClass]: formFieldType === FormFieldTypes.INLINE,
      [itemClass]: formFieldType === FormFieldTypes.ITEM,
      [characterCounterDisabledClass]: isDisabled,
      [characterCounterValidationClass]: validationState,
    }),
    props: restProps,
  };
}
