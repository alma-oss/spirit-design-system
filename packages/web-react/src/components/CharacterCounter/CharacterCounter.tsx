'use client';

import React from 'react';
import { useContextProps } from '../../context';
import { type FormFieldContextValue } from '../../types';
import { filterDOMProps, mergeStyleProps } from '../../utils';
import { VisuallyHidden } from '../VisuallyHidden';
import { type SpiritCharacterCounterProps } from './types';
import { useCharacterCounter } from './useCharacterCounterState';
import { useCharacterCounterStyleProps } from './useCharacterCounterStyleProps';

const CharacterCounter = (props: SpiritCharacterCounterProps) => {
  const mergedProps = useContextProps<
    Partial<Omit<FormFieldContextValue, 'elementType'> & SpiritCharacterCounterProps>
  >(props, 'characterCounter');
  const { classProps, props: restProps } = useCharacterCounterStyleProps(mergedProps as SpiritCharacterCounterProps);
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
      <div {...filterDOMProps(transferProps)} {...mergedStyleProps} aria-hidden="true">
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
