'use client';

import React from 'react';
import { useContextProps } from '../../context';
import { type FormFieldContextValue } from '../../types';
import { mergeStyleProps } from '../../utils';
import { VisuallyHidden } from '../VisuallyHidden';
import { type SpiritCharacterCounterProps } from './types';
import { useCharacterCounter } from './useCharacterCounterState';
import { useCharacterCounterStyleProps } from './useCharacterCounterStyleProps';

const CharacterCounter = (props: SpiritCharacterCounterProps) => {
  const contextProps = useContextProps<Partial<FormFieldContextValue>>();
  const propsWithDefaults = {
    isDisabled: contextProps.isDisabled,
    validationState: contextProps.validationState,
    formFieldMode: contextProps.formFieldMode,
    ...props,
  };
  const { classProps, props: restProps } = useCharacterCounterStyleProps(propsWithDefaults);
  const {
    debouncedScreenReaderMessage,
    isVisible,
    screenReaderMessageId,
    styleProps,
    transferProps,
    visibleCounterText,
  } = useCharacterCounter(restProps);
  const mergedStyleProps = mergeStyleProps('div', { classProps, styleProps, transferProps });

  return isVisible ? (
    <>
      <div {...transferProps} {...mergedStyleProps} aria-hidden="true">
        {visibleCounterText}
      </div>
      <VisuallyHidden id={screenReaderMessageId} aria-live="polite" aria-atomic="true">
        {debouncedScreenReaderMessage}
      </VisuallyHidden>
    </>
  ) : null;
};

CharacterCounter.spiritComponent = 'CharacterCounter';

export default CharacterCounter;
