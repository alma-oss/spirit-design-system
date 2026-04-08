import { renderHook } from '@testing-library/react';
import { type RefObject, createRef } from 'react';
import { Direction } from '../../../constants';
import { useScrollCallback } from '../useScrollCallback';

describe('useScrollCallback', () => {
  it('should return handleScroll function', () => {
    const viewportRef = createRef<HTMLDivElement>();
    const { result } = renderHook(() => useScrollCallback({ viewportRef, direction: Direction.HORIZONTAL }));

    expect(result.current.handleScroll).toBeDefined();
    expect(typeof result.current.handleScroll).toBe('function');
  });

  it('should not scroll when viewportRef is null', () => {
    const viewportRef = createRef<HTMLDivElement>();
    const { result } = renderHook(() => useScrollCallback({ viewportRef, direction: Direction.HORIZONTAL }));

    // Should not throw when viewportRef.current is null
    expect(() => {
      result.current.handleScroll(100);
    }).not.toThrow();
  });

  describe('horizontal scrolling', () => {
    it('should call scrollTo with correct values for positive step', () => {
      const scrollTo = jest.fn();
      const viewportRef = {
        current: {
          scrollLeft: 0,
          scrollWidth: 1000,
          clientWidth: 500,
          scrollTo,
        },
      } as unknown as RefObject<HTMLDivElement>;

      jest.useFakeTimers();

      const { result } = renderHook(() => useScrollCallback({ viewportRef, direction: Direction.HORIZONTAL }));

      result.current.handleScroll(100);

      // First call cancels ongoing scroll (behavior: 'auto')
      expect(scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'auto' });

      // Advance timer to trigger the delayed scrollTo
      jest.advanceTimersByTime(10);

      // Second call performs the actual scroll (behavior: 'smooth')
      expect(scrollTo).toHaveBeenCalledWith({ left: 100, behavior: 'smooth' });

      jest.useRealTimers();
    });

    it('should call scrollTo with correct values for negative step', () => {
      const scrollTo = jest.fn();
      const viewportRef = {
        current: {
          scrollLeft: 200,
          scrollWidth: 1000,
          clientWidth: 500,
          scrollTo,
        },
      } as unknown as RefObject<HTMLDivElement>;

      jest.useFakeTimers();

      const { result } = renderHook(() => useScrollCallback({ viewportRef, direction: Direction.HORIZONTAL }));

      result.current.handleScroll(-100);

      // First call cancels ongoing scroll (behavior: 'auto')
      expect(scrollTo).toHaveBeenCalledWith({ left: 200, behavior: 'auto' });

      jest.advanceTimersByTime(10);

      // Second call performs the actual scroll (behavior: 'smooth')
      expect(scrollTo).toHaveBeenCalledWith({ left: 100, behavior: 'smooth' });

      jest.useRealTimers();
    });

    it('should clamp scroll position to minimum (0)', () => {
      const scrollTo = jest.fn();
      const viewportRef = {
        current: {
          scrollLeft: 50,
          scrollWidth: 1000,
          clientWidth: 500,
          scrollTo,
        },
      } as unknown as RefObject<HTMLDivElement>;

      jest.useFakeTimers();

      const { result } = renderHook(() => useScrollCallback({ viewportRef, direction: Direction.HORIZONTAL }));

      result.current.handleScroll(-200); // Would go below 0

      jest.advanceTimersByTime(10);

      // Should clamp to 0
      expect(scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });

      jest.useRealTimers();
    });

    it('should clamp scroll position to maximum (maxScroll)', () => {
      const scrollTo = jest.fn();
      const viewportRef = {
        current: {
          scrollLeft: 400,
          scrollWidth: 1000,
          clientWidth: 500,
          scrollTo,
        },
      } as unknown as RefObject<HTMLDivElement>;

      jest.useFakeTimers();

      const { result } = renderHook(() => useScrollCallback({ viewportRef, direction: Direction.HORIZONTAL }));

      result.current.handleScroll(200); // Would exceed maxScroll (500)

      jest.advanceTimersByTime(10);

      // Should clamp to maxScroll (500)
      expect(scrollTo).toHaveBeenCalledWith({ left: 500, behavior: 'smooth' });

      jest.useRealTimers();
    });
  });

  describe('vertical scrolling', () => {
    it('should call scrollTo with correct values for positive step', () => {
      const scrollTo = jest.fn();
      const viewportRef = {
        current: {
          scrollTop: 0,
          scrollHeight: 1000,
          clientHeight: 500,
          scrollTo,
        },
      } as unknown as RefObject<HTMLDivElement>;

      jest.useFakeTimers();

      const { result } = renderHook(() => useScrollCallback({ viewportRef, direction: Direction.VERTICAL }));

      result.current.handleScroll(100);

      // First call cancels ongoing scroll (behavior: 'auto')
      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });

      jest.advanceTimersByTime(10);

      // Second call performs the actual scroll (behavior: 'smooth')
      expect(scrollTo).toHaveBeenCalledWith({ top: 100, behavior: 'smooth' });

      jest.useRealTimers();
    });

    it('should call scrollTo with correct values for negative step', () => {
      const scrollTo = jest.fn();
      const viewportRef = {
        current: {
          scrollTop: 200,
          scrollHeight: 1000,
          clientHeight: 500,
          scrollTo,
        },
      } as unknown as RefObject<HTMLDivElement>;

      jest.useFakeTimers();

      const { result } = renderHook(() => useScrollCallback({ viewportRef, direction: Direction.VERTICAL }));

      result.current.handleScroll(-100);

      // First call cancels ongoing scroll (behavior: 'auto')
      expect(scrollTo).toHaveBeenCalledWith({ top: 200, behavior: 'auto' });

      jest.advanceTimersByTime(10);

      // Second call performs the actual scroll (behavior: 'smooth')
      expect(scrollTo).toHaveBeenCalledWith({ top: 100, behavior: 'smooth' });

      jest.useRealTimers();
    });

    it('should clamp scroll position to minimum (0)', () => {
      const scrollTo = jest.fn();
      const viewportRef = {
        current: {
          scrollTop: 50,
          scrollHeight: 1000,
          clientHeight: 500,
          scrollTo,
        },
      } as unknown as RefObject<HTMLDivElement>;

      jest.useFakeTimers();

      const { result } = renderHook(() => useScrollCallback({ viewportRef, direction: Direction.VERTICAL }));

      result.current.handleScroll(-200); // Would go below 0

      jest.advanceTimersByTime(10);

      // Should clamp to 0
      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

      jest.useRealTimers();
    });

    it('should clamp scroll position to maximum (maxScroll)', () => {
      const scrollTo = jest.fn();
      const viewportRef = {
        current: {
          scrollTop: 400,
          scrollHeight: 1000,
          clientHeight: 500,
          scrollTo,
        },
      } as unknown as RefObject<HTMLDivElement>;

      jest.useFakeTimers();

      const { result } = renderHook(() => useScrollCallback({ viewportRef, direction: Direction.VERTICAL }));

      result.current.handleScroll(200); // Would exceed maxScroll (500)

      jest.advanceTimersByTime(10);

      // Should clamp to maxScroll (500)
      expect(scrollTo).toHaveBeenCalledWith({ top: 500, behavior: 'smooth' });

      jest.useRealTimers();
    });
  });

  describe('rapid clicking prevention', () => {
    it('should cancel previous scroll when called multiple times rapidly', () => {
      const scrollTo = jest.fn();
      const viewportRef = {
        current: {
          scrollLeft: 0,
          scrollWidth: 1000,
          clientWidth: 500,
          scrollTo,
        },
      } as unknown as RefObject<HTMLDivElement>;

      jest.useFakeTimers();

      const { result } = renderHook(() => useScrollCallback({ viewportRef, direction: Direction.HORIZONTAL }));

      // First scroll - sets up timeout
      result.current.handleScroll(100);

      expect(scrollTo).toHaveBeenCalledTimes(1);
      expect(scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'auto' });

      // Verify timeout was set
      expect(jest.getTimerCount()).toBe(1);

      // Second scroll before first completes - should clear previous timeout and set new one
      result.current.handleScroll(100);

      expect(scrollTo).toHaveBeenCalledTimes(2);
      expect(scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'auto' });
      // Should still have only one timer (previous was cleared, new one set)
      expect(jest.getTimerCount()).toBe(1);

      jest.advanceTimersByTime(10);

      // Should only have the second scroll call (first was cancelled)
      expect(scrollTo).toHaveBeenCalledTimes(3);
      expect(scrollTo).toHaveBeenLastCalledWith({ left: 100, behavior: 'smooth' });
      // Timer should be cleared after execution
      expect(jest.getTimerCount()).toBe(0);

      jest.useRealTimers();
    });
  });

  describe('cleanup', () => {
    it('should cleanup timeout on unmount', () => {
      const scrollTo = jest.fn();
      const viewportRef = {
        current: {
          scrollLeft: 0,
          scrollWidth: 1000,
          clientWidth: 500,
          scrollTo,
        },
      } as unknown as RefObject<HTMLDivElement>;

      jest.useFakeTimers();

      const { result, unmount } = renderHook(() => useScrollCallback({ viewportRef, direction: Direction.HORIZONTAL }));

      // Set up a timeout by calling handleScroll
      result.current.handleScroll(100);

      expect(scrollTo).toHaveBeenCalled();

      // Verify timeout was set
      expect(jest.getTimerCount()).toBe(1);

      // Unmount should cleanup the timeout
      unmount();

      // Verify timeout was cleared on unmount
      expect(jest.getTimerCount()).toBe(0);

      jest.useRealTimers();
    });
  });
});
