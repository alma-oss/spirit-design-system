'use client';

import React from 'react';
import { VisuallyHidden } from '../VisuallyHidden';
import { type CharacterCounterProps } from './types';
import { useCharacterCounter } from './useCharacterCounterState';

const CharacterCounter = (props: CharacterCounterProps) => {
  const {
    debouncedScreenReaderMessage,
    isVisible,
    screenReaderMessageId,
    styleProps,
    transferProps,
    visibleCounterText,
  } = useCharacterCounter(props);

  return isVisible ? (
    <>
      <div {...transferProps} {...styleProps} aria-hidden="true">
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
