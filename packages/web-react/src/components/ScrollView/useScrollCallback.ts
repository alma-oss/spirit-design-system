'use client';

import { type MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { Position, isDirectionHorizontal } from '../../constants';
import { type ScrollViewControlsScrollStepType, type ScrollViewDirectionType } from '../../types';
import { SCROLL_CANCEL_DELAY } from './constants';

export interface UseScrollCallbackProps {
  viewportRef: MutableRefObject<HTMLDivElement | null>;
  direction: ScrollViewDirectionType;
}

export interface UseScrollCallbackReturn {
  handleScroll: (step: ScrollViewControlsScrollStepType) => void;
}

export const useScrollCallback = ({ viewportRef, direction }: UseScrollCallbackProps): UseScrollCallbackReturn => {
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(
    () => () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    },
    [],
  );

  const handleScroll = useCallback(
    (step: ScrollViewControlsScrollStepType) => {
      if (!viewportRef.current) {
        return;
      }

      const isHorizontal = isDirectionHorizontal(direction);
      const scrollToDirection = isHorizontal ? Position.LEFT : Position.TOP;
      const currentScrollPosition = isHorizontal ? viewportRef.current.scrollLeft : viewportRef.current.scrollTop;
      const maxScroll = isHorizontal
        ? viewportRef.current.scrollWidth - viewportRef.current.clientWidth
        : viewportRef.current.scrollHeight - viewportRef.current.clientHeight;

      // Cancel any ongoing smooth scroll animation by instantly jumping to current position
      // This prevents accumulation of scroll animations on iOS when clicking rapidly
      viewportRef.current.scrollTo({
        [scrollToDirection]: currentScrollPosition,
        behavior: 'auto',
      });

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Calculate target position and clamp it to valid scroll bounds
      const targetPosition = Math.max(0, Math.min(currentScrollPosition + step, maxScroll));

      // Start new scroll after a small delay to ensure the cancel takes effect
      scrollTimeoutRef.current = setTimeout(() => {
        if (viewportRef.current) {
          viewportRef.current.scrollTo({
            [scrollToDirection]: targetPosition,
            behavior: 'smooth',
          });
        }
      }, SCROLL_CANCEL_DELAY);
    },
    [viewportRef, direction],
  );

  return { handleScroll };
};
