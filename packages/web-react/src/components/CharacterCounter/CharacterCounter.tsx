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
  const mergedProps = useContextProps<
    Partial<Omit<FormFieldContextValue, 'elementType'> & SpiritCharacterCounterProps>
  >(props, 'characterCounter');
  // isRequired is discarded here so it never leaks onto the DOM as a raw attribute
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isRequired, ...ownProps } = mergedProps;
  const { classProps, props: restProps } = useCharacterCounterStyleProps(ownProps as SpiritCharacterCounterProps);
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
