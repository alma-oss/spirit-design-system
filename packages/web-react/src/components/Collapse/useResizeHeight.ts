'use client';

import { type RefObject, useState } from 'react';
import { useResizeObserver } from '../../hooks/useResizeObserver';

type Size = {
  height: number | undefined;
};

export const useResizeHeight = (ref: RefObject<HTMLElement | null>): string | undefined => {
  const [height, setHeight] = useState<string | undefined>(undefined);

  const onResize = (size: Size) => {
    const currentHeight = size.height;
    setHeight(`${currentHeight}px`);
  };

  useResizeObserver({ ref, onResize });

  return height;
};
