'use client';

/**
 * This implementation is a modified copy of the `usehooks-ts` library
 *
 * @see { @link https://usehooks-ts.com/react-hook/use-resize-observer }
 */
import { type RefObject, useEffect, useRef, useState } from 'react';
import { isSSR } from '../utils';
import { useIsMounted } from './useIsMounted';

/** @private */
type BoxSizesKey = keyof Pick<ResizeObserverEntry, 'borderBoxSize' | 'contentBoxSize' | 'devicePixelContentBoxSize'>;

function extractSize(
  entry: ResizeObserverEntry,
  box: BoxSizesKey,
  sizeType: keyof ResizeObserverSize,
): number | undefined {
  if (!entry[box]) {
    if (box === 'contentBoxSize') {
      return entry.contentRect[sizeType === 'inlineSize' ? 'width' : 'height'];
    }

    return undefined;
  }

  return Array.isArray(entry[box])
    ? entry[box][0][sizeType]
    : //  Support Firefox's non-standard behavior
      // @ts-expect-error -- Element implicitly has an 'any' type because index expression is not of type 'number'.
      (entry[box][sizeType] as number);
}

/** The size of the observed element. */
type Size = {
  /** The width of the observed element. */
  width: number | undefined;
  /** The height of the observed element. */
  height: number | undefined;
};

/** The options for the ResizeObserver. */
type UseResizeObserverOptions<T extends HTMLElement = HTMLElement> = {
  /** The ref of the element to observe. */
  ref: RefObject<T | null>;
  /**
   * When using `onResize`, the hook doesn't re-render on element size changes; it delegates handling to the provided callback.
   *
   * @default undefined
   */
  onResize?: (size: Size) => void;
  /**
   * The box model to use for the ResizeObserver.
   *
   * @default 'border-box'
   */
  box?: 'border-box' | 'content-box' | 'device-pixel-content-box';
};

const initialSize: Size = {
  width: undefined,
  height: undefined,
};

/**
 * Custom hook that observes the size of an element using the [`ResizeObserver API`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
 *
 * @template T - The type of the element to observe.
 * @param {UseResizeObserverOptions<T>} options - The options for the ResizeObserver.
 * @returns {Size} - The size of the observed element.
 * @public
 * @example
 * ```tsx
 * const myRef = useRef(null);
 * const { width = 0, height = 0 } = useResizeObserver({
 *   ref: myRef,
 *   box: 'border-box',
 * });
 *
 * <div ref={myRef}>Hello, world!</div>
 * ```
 */
export function useResizeObserver<T extends HTMLElement = HTMLElement>(options: UseResizeObserverOptions<T>): Size {
  const { ref, box = 'border-box' } = options;
  const [{ width, height }, setSize] = useState<Size>(initialSize);
  const isMounted = useIsMounted();
  const previousSize = useRef<Size>({ ...initialSize });
  const onResize = useRef<((size: Size) => void) | undefined>(undefined);
  onResize.current = options.onResize;

  useEffect(() => {
    // Prevent execution on the server
    if (isSSR) {
      return;
    }
    if (!('ResizeObserver' in window)) {
      return;
    }
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const boxProp =
        // eslint-disable-next-line no-nested-ternary
        box === 'border-box'
          ? 'borderBoxSize'
          : box === 'device-pixel-content-box'
            ? 'devicePixelContentBoxSize'
            : 'contentBoxSize';

      const newWidth = extractSize(entry, boxProp, 'inlineSize');
      const newHeight = extractSize(entry, boxProp, 'blockSize');

      const hasChanged = previousSize.current.width !== newWidth || previousSize.current.height !== newHeight;

      if (hasChanged) {
        const newSize: Size = { width: newWidth, height: newHeight };
        previousSize.current.width = newWidth;
        previousSize.current.height = newHeight;

        if (onResize.current) {
          onResize.current(newSize);
        } else if (isMounted()) {
          setSize(newSize);
        }
      }
    });

    observer.observe(ref.current, { box });

    return () => {
      observer.disconnect();
    };
  }, [box, ref, isMounted]);

  return { width, height };
}
