'use client';

import { type ChangeEvent, useCallback, useEffect, useState } from 'react';
import { type StylePropsResult, useControlledModeGuard, useDebouncedValue, useStyleProps } from '../../hooks';
import { defaultLabels, replaceTranslationParams } from '../../translations';
import { type TextAreaCounterRenderProps } from '../../types';
import { CHARACTER_COUNTER_SCREEN_READER_DEBOUNCE_MS } from './constants';
import { type CharacterCounterProps } from './types';

/** Return value of the useCharacterCounterState hook */
export interface CharacterCounterState {
  /** Props to pass to CharacterCounter, or undefined when counter is hidden */
  counterProps: TextAreaCounterRenderProps | undefined;
  /** Change handler that updates internal length and calls the provided onChange */
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

/** Props for the useCharacterCounterState hook */
export interface UseCharacterCounterStateProps {
  /** Character threshold shown after the slash in the counter (e.g. `5/200`); implicitly enables the counter */
  counterThreshold?: number;
  /** Initial value when uncontrolled */
  defaultValue?: string;
  /** Whether to show the character counter; automatically true when `counterThreshold` is set */
  hasCounter?: boolean;
  /** Called when the textarea value changes */
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  /** Controlled value (takes precedence over defaultValue) */
  value?: string;
}

/** Return value of the `useCharacterCounter` hook (visible + screen reader presentation for `CharacterCounter`). */
export interface UseCharacterCounterResult {
  debouncedScreenReaderMessage: string;
  isVisible: boolean;
  screenReaderMessageId: string;
  styleProps: StylePropsResult['styleProps'];
  transferProps: StylePropsResult['props'];
  visibleCounterText: string;
}

const COUNTER_LABELS = defaultLabels.textArea.counter;

/**
 * Builds the visible counter label (`current/max` or count only).
 *
 * @param currentLength - Current number of characters.
 * @param counterThreshold - When set, label includes a slash and this max; when omitted, only the count is shown.
 * @returns {string} Formatted string for the aria-hidden counter element.
 */
const getCharacterCounterVisibleText = (currentLength: number, counterThreshold: number | undefined): string =>
  counterThreshold !== undefined ? `${currentLength}/${counterThreshold}` : String(currentLength);

/**
 * Builds the polite live-region message for assistive technologies (remaining, over limit, count-only, etc.).
 *
 * @param currentLength - Current number of characters.
 * @param counterThreshold - When set, messages relate to this max; when omitted, only “characters entered” copy is used.
 * @returns {string} Localized screen reader string (not debounced).
 */
const getCharacterCounterScreenReaderMessage = (
  currentLength: number,
  counterThreshold: number | undefined,
): string => {
  if (counterThreshold === undefined) {
    return replaceTranslationParams(COUNTER_LABELS.charactersEntered, { count: currentLength });
  }

  if (currentLength === 0) {
    return replaceTranslationParams(COUNTER_LABELS.canEnterUpTo, { maxLength: counterThreshold });
  }

  if (currentLength > counterThreshold) {
    const overCount = currentLength - counterThreshold;
    const template = overCount === 1 ? COUNTER_LABELS.characterOverLimit : COUNTER_LABELS.charactersOverLimit;

    return replaceTranslationParams(template, { count: overCount });
  }

  const remaining = counterThreshold - currentLength;
  const template = remaining === 1 ? COUNTER_LABELS.characterRemaining : COUNTER_LABELS.charactersRemaining;

  return replaceTranslationParams(template, { count: remaining });
};

/**
 * Tracks textarea length for `TextArea` and exposes `counterProps` plus a change handler when the counter is active.
 *
 * @param props - Controlled/uncontrolled value and counter flags; see {@link UseCharacterCounterStateProps}.
 * @returns {CharacterCounterState} Counter props for `CharacterCounter` (if visible) and textarea `onChange` handler.
 */
export const useCharacterCounterState = (props: UseCharacterCounterStateProps): CharacterCounterState => {
  const { value, defaultValue, counterThreshold, hasCounter, onChange } = props;
  const isControlled = value !== undefined;

  useControlledModeGuard({
    componentName: 'useCharacterCounterState',
    value,
    defaultValue,
  });

  const [internalLength, setInternalLength] = useState(() =>
    isControlled ? value.length : (defaultValue?.length ?? 0),
  );

  const currentLength = isControlled ? value.length : internalLength;
  const isCounterVisible = hasCounter === true || counterThreshold !== undefined;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled && isCounterVisible) {
        setInternalLength(event.target.value.length);
      }
      onChange?.(event);
    },
    [isControlled, isCounterVisible, onChange],
  );

  const counterProps: TextAreaCounterRenderProps | undefined = isCounterVisible
    ? {
        counterThreshold,
        currentLength,
        hasCounter,
      }
    : undefined;

  return {
    counterProps,
    handleChange,
  };
};

/**
 * Presentation hook for `CharacterCounter`: style props, visible text, debounced screen reader text, and ARIA id registration.
 *
 * @param props - Full `CharacterCounterProps` including `id` and `registerAria`.
 * @returns {UseCharacterCounterResult} Values to render the visible counter and `VisuallyHidden` live region.
 */
export const useCharacterCounter = (props: CharacterCounterProps): UseCharacterCounterResult => {
  const { counterThreshold, currentLength, hasCounter, id, registerAria, ...restProps } = props;
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const isVisible = hasCounter === true || counterThreshold !== undefined;
  const screenReaderMessageId = `${id}__counterScreenReaderMessage`;
  const visibleCounterText = getCharacterCounterVisibleText(currentLength, counterThreshold);
  const screenReaderMessage = getCharacterCounterScreenReaderMessage(currentLength, counterThreshold);
  const debouncedScreenReaderMessage = useDebouncedValue(
    screenReaderMessage,
    CHARACTER_COUNTER_SCREEN_READER_DEBOUNCE_MS,
  );

  useEffect(() => {
    if (isVisible) {
      registerAria({ add: screenReaderMessageId });

      return () => {
        registerAria({ remove: screenReaderMessageId });
      };
    }

    return undefined;
  }, [isVisible, screenReaderMessageId, registerAria]);

  return {
    debouncedScreenReaderMessage,
    isVisible,
    screenReaderMessageId,
    styleProps,
    transferProps,
    visibleCounterText,
  };
};
