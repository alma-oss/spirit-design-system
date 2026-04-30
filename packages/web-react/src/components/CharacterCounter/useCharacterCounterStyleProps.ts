import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { FormFieldVariants } from '../../types';
import { type SpiritCharacterCounterProps } from './types';

export interface CharacterCounterStyles {
  classProps: string;
  props: Omit<SpiritCharacterCounterProps, 'formFieldVariant' | 'isDisabled' | 'validationState'>;
}

export function useCharacterCounterStyleProps(props: SpiritCharacterCounterProps): CharacterCounterStyles {
  const { formFieldVariant, isDisabled, validationState, ...restProps } = props;
  const characterCounterClass = useClassNamePrefix('CharacterCounter');
  const characterCounterDisabledClass = `${characterCounterClass}--disabled`;
  const characterCounterValidationClass = `${characterCounterClass}--${validationState}`;
  const inlineClass = `${characterCounterClass}--inline`;
  const itemClass = `${characterCounterClass}--item`;

  return {
    classProps: classNames(characterCounterClass, {
      [inlineClass]: formFieldVariant === FormFieldVariants.INLINE,
      [itemClass]: formFieldVariant === FormFieldVariants.ITEM,
      [characterCounterDisabledClass]: isDisabled,
      [characterCounterValidationClass]: validationState,
    }),
    props: restProps,
  };
}
