'use client';

import { type MutableRefObject, type UIEvent, useCallback, useEffect, useState } from 'react';
import { Position, isDirectionHorizontal } from '../../constants';
import { useResizeObserver } from '../../hooks';
import { type PositionType, type ScrollViewDirectionType } from '../../types';
import { debounce } from '../../utils';
import { DEBOUNCE_DELAY, EDGE_DETECTION_INACCURACY_PX } from './constants';

export interface UseScrollPositionProps {
  viewportReference: MutableRefObject<HTMLDivElement | null>;
  contentReference: MutableRefObject<HTMLDivElement | null>;
  direction: ScrollViewDirectionType;
}

export interface UseScrollPositionReturn {
  isScrolledAtEnd: boolean;
  isScrolledAtStart: boolean;
  onScroll: (event: UIEvent) => void;
}

export type CurrentPositionProps = {
  [key in PositionType]: number;
};

export const useScrollPosition = ({
  viewportReference,
  contentReference,
  direction,
}: UseScrollPositionProps): UseScrollPositionReturn => {
  const [isScrolledAtStart, setScrolledStart] = useState<boolean>(false);
  const [isScrolledAtEnd, setScrolledAtEnd] = useState<boolean>(false);

  const getElementsPositionDifference = (): CurrentPositionProps | null => {
    if (!(contentReference.current && viewportReference.current)) {
      return null;
    }

    const contentPosition: DOMRect = contentReference.current.getBoundingClientRect();
    const viewportPosition: DOMRect = viewportReference.current.getBoundingClientRect();

    return {
      [Position.BOTTOM]: contentPosition.bottom - viewportPosition.bottom,
      [Position.LEFT]: contentPosition.left - viewportPosition.left,
      [Position.RIGHT]: contentPosition.right - viewportPosition.right,
      [Position.TOP]: contentPosition.top - viewportPosition.top,
    };
  };

  const handleScrollViewState = () => {
    const isHorizontal = isDirectionHorizontal(direction);
    const scrollPositionStart = isHorizontal ? Position.LEFT : Position.TOP;
    const scrollPositionEnd = isHorizontal ? Position.RIGHT : Position.BOTTOM;
    const currentPosition = getElementsPositionDifference();

    if (!currentPosition) {
      return;
    }

    const isScrolledAtStartActive = currentPosition[scrollPositionStart] <= -1 * EDGE_DETECTION_INACCURACY_PX;
    const isScrolledAtEndActive = currentPosition[scrollPositionEnd] >= EDGE_DETECTION_INACCURACY_PX;

    if (isScrolledAtStartActive !== isScrolledAtStart) {
      setScrolledStart(isScrolledAtStartActive);
    }

    if (isScrolledAtEndActive !== isScrolledAtEnd) {
      setScrolledAtEnd(isScrolledAtEndActive);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps -- debounce is stable
  const debouncedHandler = useCallback(debounce(handleScrollViewState, DEBOUNCE_DELAY), [handleScrollViewState]);

  useResizeObserver({
    ref: viewportReference,
    onResize: debouncedHandler,
  });

  /* We want to call this hook only once */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleScrollViewState, []);

  return {
    isScrolledAtEnd,
    isScrolledAtStart,
    onScroll: debounce(handleScrollViewState, DEBOUNCE_DELAY),
  };
};
