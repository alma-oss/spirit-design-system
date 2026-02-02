import { act, renderHook } from '@testing-library/react';
import { type MutableRefObject, type TransitionEvent } from 'react';
import '@local/tests/mocks/dialog';
import { TRANSITION_FALLBACK_TIMEOUT } from '../constants';
import { useDialog } from '../useDialog';

// Helper to create mock dialog ref
const createMockDialogRef = (isOpen = false): MutableRefObject<HTMLDialogElement | null> => {
  const mockDialog = {
    open: isOpen,
    showModal: jest.fn(function showModal(this: HTMLDialogElement) {
      this.open = true;
    }),
    close: jest.fn(function closeModal(this: HTMLDialogElement) {
      this.open = false;
    }),
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(),
    },
    dispatchEvent: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  } as unknown as HTMLDialogElement;

  return { current: mockDialog };
};

describe('useDialog', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('timeout fallback behavior', () => {
    it('should close dialog via timeout when transitionend does not fire', () => {
      const dialogRef = createMockDialogRef(true);
      const { rerender } = renderHook(({ isOpen }) => useDialog(dialogRef, isOpen), {
        initialProps: { isOpen: true },
      });

      // Trigger close by changing isOpen to false
      act(() => {
        rerender({ isOpen: false });
      });

      // Dialog should still be open, timeout scheduled
      expect(dialogRef.current?.open).toBe(true);
      expect(dialogRef.current?.classList.remove).toHaveBeenCalledWith('is-open');

      // Advance timers to trigger fallback timeout
      act(() => {
        jest.advanceTimersByTime(TRANSITION_FALLBACK_TIMEOUT);
      });

      // Dialog should now be closed
      expect(dialogRef.current?.close).toHaveBeenCalled();
    });

    it('should clear timeout when transitionend fires successfully', () => {
      const dialogRef = createMockDialogRef(true);
      const { rerender, result } = renderHook(({ isOpen }) => useDialog(dialogRef, isOpen), {
        initialProps: { isOpen: true },
      });

      // Trigger close
      act(() => {
        rerender({ isOpen: false });
      });

      // Verify timeout was scheduled
      expect(jest.getTimerCount()).toBe(1);

      // Fire transitionend before timeout
      const event = new Event('transitionend') as unknown as TransitionEvent<HTMLDialogElement>;
      Object.defineProperty(event, 'target', {
        value: dialogRef.current,
        writable: false,
      });

      act(() => {
        result.current.onTransitionEnd(event);
      });

      // Dialog should be closed via transitionend
      expect(dialogRef.current?.close).toHaveBeenCalledTimes(1);

      // Advance past timeout duration
      act(() => {
        jest.advanceTimersByTime(TRANSITION_FALLBACK_TIMEOUT);
      });

      // close() should not be called again (timeout was cleared)
      expect(dialogRef.current?.close).toHaveBeenCalledTimes(1);
      expect(jest.getTimerCount()).toBe(0);
    });

    it('should clear timeout when dialog reopens before timeout fires', () => {
      const dialogRef = createMockDialogRef(true);
      const { rerender } = renderHook(({ isOpen }) => useDialog(dialogRef, isOpen), {
        initialProps: { isOpen: true },
      });

      // Trigger close
      act(() => {
        rerender({ isOpen: false });
      });

      // Verify timeout was scheduled
      expect(jest.getTimerCount()).toBe(1);
      expect(dialogRef.current?.classList.remove).toHaveBeenCalledWith('is-open');

      // Reopen before timeout fires
      act(() => {
        rerender({ isOpen: true });
      });

      // Timeout should be cleared immediately
      expect(jest.getTimerCount()).toBe(0);

      // Advance past timeout duration
      act(() => {
        jest.advanceTimersByTime(TRANSITION_FALLBACK_TIMEOUT);
      });

      // Dialog should remain open, close() should not be called
      // Note: showModal is not called because dialog is still technically open
      expect(dialogRef.current?.close).not.toHaveBeenCalled();
    });
  });

  describe('cleanup on unmount', () => {
    it('should clear timeout when hook unmounts', () => {
      const dialogRef = createMockDialogRef(true);
      const { rerender, unmount } = renderHook(({ isOpen }) => useDialog(dialogRef, isOpen), {
        initialProps: { isOpen: true },
      });

      // Trigger close to schedule timeout
      act(() => {
        rerender({ isOpen: false });
      });

      // Verify timeout was scheduled
      expect(jest.getTimerCount()).toBe(1);

      // Unmount the hook
      act(() => {
        unmount();
      });

      // Timeout should be cleared
      expect(jest.getTimerCount()).toBe(0);
    });

    it('should not throw when unmounting with no pending timeout', () => {
      const dialogRef = createMockDialogRef(false);
      const { unmount } = renderHook(() => useDialog(dialogRef, false));

      // Should not throw
      expect(() => {
        act(() => {
          unmount();
        });
      }).not.toThrow();

      expect(jest.getTimerCount()).toBe(0);
    });
  });

  describe('imperative API - closeDialog', () => {
    it('should schedule timeout when called imperatively', () => {
      const dialogRef = createMockDialogRef(true);
      const { result } = renderHook(() => useDialog(dialogRef, true));

      // Call closeDialog imperatively
      act(() => {
        result.current.closeDialog();
      });

      // Should remove open class
      expect(dialogRef.current?.classList.remove).toHaveBeenCalledWith('is-open');

      // Timeout should be scheduled
      expect(jest.getTimerCount()).toBe(1);

      // Advance timers
      act(() => {
        jest.advanceTimersByTime(TRANSITION_FALLBACK_TIMEOUT);
      });

      // Dialog should be closed
      expect(dialogRef.current?.close).toHaveBeenCalled();
    });

    it('should clear previous timeout when called multiple times', () => {
      const dialogRef = createMockDialogRef(true);
      const { result } = renderHook(() => useDialog(dialogRef, true));

      // Call closeDialog twice rapidly
      act(() => {
        result.current.closeDialog();
      });

      expect(jest.getTimerCount()).toBe(1);

      act(() => {
        result.current.closeDialog();
      });

      // Should still only have one timeout (previous cleared)
      expect(jest.getTimerCount()).toBe(1);

      // Advance timers
      act(() => {
        jest.advanceTimersByTime(TRANSITION_FALLBACK_TIMEOUT);
      });

      // close() should be called only once
      expect(dialogRef.current?.close).toHaveBeenCalledTimes(1);
    });

    it('should not close if dialog is already closed', () => {
      const dialogRef = createMockDialogRef(false);
      const { result } = renderHook(() => useDialog(dialogRef, false));

      // Call closeDialog when dialog is already closed
      act(() => {
        result.current.closeDialog();
      });

      // Should not schedule timeout or manipulate closed dialog
      expect(jest.getTimerCount()).toBe(0);
      expect(dialogRef.current?.classList.remove).not.toHaveBeenCalled();
    });
  });

  describe('imperative API - openDialog', () => {
    it('should clear pending timeout when opening', () => {
      const dialogRef = createMockDialogRef(true);
      const { result } = renderHook(() => useDialog(dialogRef, true));

      // Close dialog (schedules timeout)
      act(() => {
        result.current.closeDialog();
      });

      expect(jest.getTimerCount()).toBe(1);

      // Open before timeout fires
      act(() => {
        result.current.openDialog();
      });

      // Timeout should be cleared immediately
      expect(jest.getTimerCount()).toBe(0);

      // Advance timers
      act(() => {
        jest.advanceTimersByTime(TRANSITION_FALLBACK_TIMEOUT);
      });

      // Dialog should remain open, close() should not be called
      // Note: showModal is not called because dialog is still technically open
      expect(dialogRef.current?.close).not.toHaveBeenCalled();
    });

    it('should open dialog and add open class', () => {
      const dialogRef = createMockDialogRef(false);
      const { result } = renderHook(() => useDialog(dialogRef, false));

      act(() => {
        result.current.openDialog();
      });

      expect(dialogRef.current?.showModal).toHaveBeenCalled();
      expect(dialogRef.current?.classList.add).toHaveBeenCalledWith('is-open');
    });

    it('should not open if dialog is already open', () => {
      const dialogRef = createMockDialogRef(true);
      const { result } = renderHook(() => useDialog(dialogRef, true));

      jest.clearAllMocks();

      // Try to open when already open
      act(() => {
        result.current.openDialog();
      });

      // Should not call showModal again
      expect(dialogRef.current?.showModal).not.toHaveBeenCalled();
    });
  });

  describe('transitionend integration', () => {
    it('should close immediately on transitionend and cancel timeout', () => {
      const dialogRef = createMockDialogRef(true);
      const { rerender, result } = renderHook(({ isOpen }) => useDialog(dialogRef, isOpen), {
        initialProps: { isOpen: true },
      });

      // Trigger close
      act(() => {
        rerender({ isOpen: false });
      });

      // Verify timeout scheduled
      expect(jest.getTimerCount()).toBe(1);

      // Fire transitionend
      const event = new Event('transitionend') as unknown as TransitionEvent<HTMLDialogElement>;
      Object.defineProperty(event, 'target', {
        value: dialogRef.current,
        writable: false,
      });

      act(() => {
        result.current.onTransitionEnd(event);
      });

      // Dialog should be closed, timeout cleared
      expect(dialogRef.current?.close).toHaveBeenCalled();
      expect(jest.getTimerCount()).toBe(0);
    });

    it('should not close if transitionend fires for child element', () => {
      const dialogRef = createMockDialogRef(true);
      const { rerender, result } = renderHook(({ isOpen }) => useDialog(dialogRef, isOpen), {
        initialProps: { isOpen: true },
      });

      // Trigger close
      act(() => {
        rerender({ isOpen: false });
      });

      // Create a mock child element
      const childElement = document.createElement('div');

      // Fire transitionend with child as target
      const event = new Event('transitionend') as unknown as TransitionEvent<HTMLDialogElement>;
      Object.defineProperty(event, 'target', {
        value: childElement,
        writable: false,
      });

      act(() => {
        result.current.onTransitionEnd(event);
      });

      // Dialog should NOT be closed (event was for child)
      expect(dialogRef.current?.close).not.toHaveBeenCalled();

      // Timeout should still be active
      expect(jest.getTimerCount()).toBe(1);
    });

    it('should not close if dialog is meant to be open', () => {
      const dialogRef = createMockDialogRef(true);
      const { result } = renderHook(() => useDialog(dialogRef, true));

      // Fire transitionend while isOpen is true
      const event = new Event('transitionend') as unknown as TransitionEvent<HTMLDialogElement>;
      Object.defineProperty(event, 'target', {
        value: dialogRef.current,
        writable: false,
      });

      act(() => {
        result.current.onTransitionEnd(event);
      });

      // Dialog should NOT be closed (isOpen is true)
      expect(dialogRef.current?.close).not.toHaveBeenCalled();
    });
  });

  describe('declarative isOpen prop changes', () => {
    it('should open dialog when isOpen changes from false to true', () => {
      const dialogRef = createMockDialogRef(false);
      const { rerender } = renderHook(({ isOpen }) => useDialog(dialogRef, isOpen), {
        initialProps: { isOpen: false },
      });

      act(() => {
        rerender({ isOpen: true });
      });

      expect(dialogRef.current?.showModal).toHaveBeenCalled();
      expect(dialogRef.current?.classList.add).toHaveBeenCalledWith('is-open');
    });

    it('should close dialog when isOpen changes from true to false', () => {
      const dialogRef = createMockDialogRef(true);
      const { rerender } = renderHook(({ isOpen }) => useDialog(dialogRef, isOpen), {
        initialProps: { isOpen: true },
      });

      act(() => {
        rerender({ isOpen: false });
      });

      expect(dialogRef.current?.classList.remove).toHaveBeenCalledWith('is-open');
      expect(jest.getTimerCount()).toBe(1);
    });

    it('should handle rapid open/close cycles', () => {
      const dialogRef = createMockDialogRef(false);
      const { rerender } = renderHook(({ isOpen }) => useDialog(dialogRef, isOpen), {
        initialProps: { isOpen: false },
      });

      // Open
      act(() => {
        rerender({ isOpen: true });
      });

      // Close immediately
      act(() => {
        rerender({ isOpen: false });
      });

      expect(jest.getTimerCount()).toBe(1);

      // Open again before timeout
      act(() => {
        rerender({ isOpen: true });
      });

      // Timeout should be cleared
      expect(jest.getTimerCount()).toBe(0);

      // Advance timers
      act(() => {
        jest.advanceTimersByTime(TRANSITION_FALLBACK_TIMEOUT);
      });

      // Dialog should be open, not closed
      expect(dialogRef.current?.close).not.toHaveBeenCalled();
    });
  });
});
