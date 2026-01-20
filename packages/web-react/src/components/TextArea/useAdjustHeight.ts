'use client';

/* eslint-disable no-param-reassign -- DOM manipulation is required for dynamic height adjustment */
import { type FormEvent, type FormEventHandler, type ForwardedRef, type MutableRefObject, useEffect } from 'react';

export interface UseAdjustHeightProps {
  elementReference?: MutableRefObject<ForwardedRef<HTMLTextAreaElement>>;
  maxHeight: number;
  onInput?: FormEventHandler<HTMLTextAreaElement>;
  isAutoResizing?: boolean;
}

export interface UseAdjustHeightReturn {
  adjustHeight: (element: HTMLTextAreaElement) => void;
  adjustHeightOnAutoresize: () => void;
  onInput: FormEventHandler<HTMLTextAreaElement>;
}

export const useAdjustHeight = ({
  elementReference,
  maxHeight,
  onInput,
  isAutoResizing,
}: UseAdjustHeightProps): UseAdjustHeightReturn => {
  const adjustHeight = (element: HTMLTextAreaElement) => {
    const borderTopWidth = parseFloat(getComputedStyle(element).getPropertyValue('border-top-width')) || 0;
    const borderBottomWidth = parseFloat(getComputedStyle(element).getPropertyValue('border-bottom-width')) || 0;
    const totalBorderWidth = borderTopWidth + borderBottomWidth;

    element.style.height = 'auto';
    element.style.overflow = 'auto';

    const totalHeight = element.scrollHeight + totalBorderWidth;

    element.style.height = `${totalHeight < maxHeight ? totalHeight : maxHeight}px`;
    element.style.overflow = totalHeight < maxHeight ? 'hidden' : 'auto';
  };

  const adjustHeightOnAutoresize = () => {
    if (isAutoResizing) {
      // Because of mixed props for input and textarea
      const textArea = elementReference?.current as unknown as HTMLTextAreaElement;

      if (textArea) {
        adjustHeight(textArea);
      }
    }
  };

  const inputHandler = (event: FormEvent<HTMLTextAreaElement>) => {
    adjustHeightOnAutoresize();

    if (onInput) {
      onInput(event);
    }
  };

  /**
   * This is the equivalent of the initialization function
   * It will run only once when the component is mounted
   */
  useEffect(() => {
    adjustHeightOnAutoresize();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Empty deps array to run only once
  }, []);

  return {
    adjustHeight,
    adjustHeightOnAutoresize,
    onInput: inputHandler,
  };
};
