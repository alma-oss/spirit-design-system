import { act, renderHook } from '@testing-library/react';
import type { FocusEvent, KeyboardEvent } from 'react';
import { usePickerSelectionGridKeyboard } from '../usePickerSelectionGridKeyboard';

const createSelectionGrid = (rowCount: number) => {
  const container = document.createElement('div');
  const rows: HTMLElement[] = [];

  for (let i = 0; i < rowCount; i += 1) {
    const row = document.createElement('div');
    row.setAttribute('role', 'row');
    rows.push(row);
    container.appendChild(row);
  }

  return { container, rows };
};

describe('usePickerSelectionGridKeyboard', () => {
  it('should set active row to last tag on mount when tagCount > 0', () => {
    const onRemoveAtIndex = jest.fn();

    const { result } = renderHook(() =>
      usePickerSelectionGridKeyboard({
        tagCount: 3,
        onRemoveAtIndex,
      }),
    );

    expect(result.current.getKeyboardGridRowProps(2).tabIndex).toBe(0);
    expect(result.current.getKeyboardGridRowProps(0).tabIndex).toBe(-1);
  });

  it('should not change active index on mount when tagCount is 0', () => {
    const onRemoveAtIndex = jest.fn();

    const { result } = renderHook(() =>
      usePickerSelectionGridKeyboard({
        tagCount: 0,
        onRemoveAtIndex,
      }),
    );

    expect(result.current.getKeyboardGridRowProps(0).tabIndex).toBe(0);
  });

  it('should no-op tag count sync when count is unchanged after initial mount', () => {
    const onRemoveAtIndex = jest.fn();

    const { result, rerender } = renderHook(
      ({ tagCount }) =>
        usePickerSelectionGridKeyboard({
          tagCount,
          onRemoveAtIndex,
        }),
      { initialProps: { tagCount: 2 } },
    );

    expect(result.current.getKeyboardGridRowProps(1).tabIndex).toBe(0);

    rerender({ tagCount: 2 });

    act(() => {});

    expect(result.current.getKeyboardGridRowProps(1).tabIndex).toBe(0);
  });

  it('should move pending focus to last row when tag count increases and popover is closed', () => {
    const onRemoveAtIndex = jest.fn();
    const { container, rows } = createSelectionGrid(2);
    const focusSpy = jest.spyOn(rows[1]!, 'focus');

    const { result, rerender } = renderHook(
      ({ tagCount }) =>
        usePickerSelectionGridKeyboard({
          tagCount,
          onRemoveAtIndex,
          selectionRef: { current: container },
          isPopoverOpen: false,
        }),
      { initialProps: { tagCount: 1 } },
    );

    rerender({ tagCount: 2 });

    act(() => {});

    expect(focusSpy).toHaveBeenCalled();
    expect(result.current.getKeyboardGridRowProps(1).tabIndex).toBe(0);

    focusSpy.mockRestore();
  });

  it('should not schedule focus on last row when tag count increases while popover is open', () => {
    const onRemoveAtIndex = jest.fn();
    const { container, rows } = createSelectionGrid(2);
    const focusSpy = jest.spyOn(rows[1]!, 'focus');

    const { rerender } = renderHook(
      ({ tagCount, isPopoverOpen }) =>
        usePickerSelectionGridKeyboard({
          tagCount,
          onRemoveAtIndex,
          selectionRef: { current: container },
          isPopoverOpen,
        }),
      { initialProps: { tagCount: 1, isPopoverOpen: true } },
    );

    rerender({ tagCount: 2, isPopoverOpen: true });

    act(() => {});

    expect(focusSpy).not.toHaveBeenCalled();

    focusSpy.mockRestore();
  });

  it('should clamp active index when tag count decreases', () => {
    const onRemoveAtIndex = jest.fn();

    const { result, rerender } = renderHook(
      ({ tagCount }) =>
        usePickerSelectionGridKeyboard({
          tagCount,
          onRemoveAtIndex,
        }),
      { initialProps: { tagCount: 3 } },
    );

    expect(result.current.getKeyboardGridRowProps(2).tabIndex).toBe(0);

    rerender({ tagCount: 2 });

    act(() => {});

    expect(result.current.getKeyboardGridRowProps(1).tabIndex).toBe(0);
  });

  it('should update stored count when tag count goes to zero without changing active when empty', () => {
    const onRemoveAtIndex = jest.fn();

    const { result, rerender } = renderHook(
      ({ tagCount }) =>
        usePickerSelectionGridKeyboard({
          tagCount,
          onRemoveAtIndex,
        }),
      { initialProps: { tagCount: 1 } },
    );

    rerender({ tagCount: 0 });

    act(() => {});

    expect(result.current.getKeyboardGridRowProps(0).tabIndex).toBe(0);
  });

  it('should not run focusTagRow when selectionRef is missing', () => {
    const onRemoveAtIndex = jest.fn();

    const { rerender } = renderHook(
      ({ tagCount }) =>
        usePickerSelectionGridKeyboard({
          tagCount,
          onRemoveAtIndex,
          selectionRef: undefined,
          isPopoverOpen: false,
        }),
      { initialProps: { tagCount: 1 } },
    );

    expect(() => {
      rerender({ tagCount: 2 });
      act(() => {});
    }).not.toThrow();
  });

  it('should not run focusTagRow when selectionRef.current is null', () => {
    const onRemoveAtIndex = jest.fn();
    const selectionRef = { current: null as HTMLElement | null };

    const { rerender } = renderHook(
      ({ tagCount }) =>
        usePickerSelectionGridKeyboard({
          tagCount,
          onRemoveAtIndex,
          selectionRef,
          isPopoverOpen: false,
        }),
      { initialProps: { tagCount: 1 } },
    );

    expect(() => {
      rerender({ tagCount: 2 });
      act(() => {});
    }).not.toThrow();
  });

  it('should not run focusTagRow when selection container has no row elements', () => {
    const onRemoveAtIndex = jest.fn();
    const empty = document.createElement('div');

    const { rerender } = renderHook(
      ({ tagCount }) =>
        usePickerSelectionGridKeyboard({
          tagCount,
          onRemoveAtIndex,
          selectionRef: { current: empty },
          isPopoverOpen: false,
        }),
      { initialProps: { tagCount: 1 } },
    );

    expect(() => {
      rerender({ tagCount: 2 });
      act(() => {});
    }).not.toThrow();
  });

  it('should focus previous row when removing last of multiple tags via removeTagAtIndex', () => {
    const onRemoveAtIndex = jest.fn();
    const { container, rows } = createSelectionGrid(2);
    const focusSpy = jest.spyOn(rows[0]!, 'focus');

    const { result } = renderHook(() =>
      usePickerSelectionGridKeyboard({
        tagCount: 2,
        onRemoveAtIndex,
        selectionRef: { current: container },
        isPopoverOpen: false,
      }),
    );

    act(() => {
      result.current.removeTagAtIndex(1);
    });

    expect(onRemoveAtIndex).toHaveBeenCalledWith(1);
    expect(focusSpy).toHaveBeenCalled();

    focusSpy.mockRestore();
  });

  it('should keep focus index when removing a non-last tag via removeTagAtIndex', () => {
    const onRemoveAtIndex = jest.fn();
    const { container, rows } = createSelectionGrid(3);
    const focusSpy = jest.spyOn(rows[0]!, 'focus');

    const { result } = renderHook(() =>
      usePickerSelectionGridKeyboard({
        tagCount: 3,
        onRemoveAtIndex,
        selectionRef: { current: container },
        isPopoverOpen: false,
      }),
    );

    act(() => {
      result.current.removeTagAtIndex(0);
    });

    expect(onRemoveAtIndex).toHaveBeenCalledWith(0);
    expect(focusSpy).toHaveBeenCalled();

    focusSpy.mockRestore();
  });

  it('should not schedule focus when popover is open via removeTagAtIndex', () => {
    const onRemoveAtIndex = jest.fn();
    const { container, rows } = createSelectionGrid(2);
    const focusSpy = jest.spyOn(rows[0]!, 'focus');

    const { result } = renderHook(() =>
      usePickerSelectionGridKeyboard({
        tagCount: 2,
        onRemoveAtIndex,
        selectionRef: { current: container },
        isPopoverOpen: true,
      }),
    );

    act(() => {
      result.current.removeTagAtIndex(1);
    });

    expect(focusSpy).not.toHaveBeenCalled();

    focusSpy.mockRestore();
  });

  it('should return inert row props when popover is open', () => {
    const onRemoveAtIndex = jest.fn();

    const { result } = renderHook(() =>
      usePickerSelectionGridKeyboard({
        tagCount: 2,
        onRemoveAtIndex,
        isPopoverOpen: true,
      }),
    );

    const props = result.current.getKeyboardGridRowProps(0);

    expect(props.tabIndex).toBe(-1);
    expect(props.removeButtonTabIndex).toBe(-1);

    act(() => {
      props.onFocusCapture({} as FocusEvent<HTMLElement>);
      props.onBlurCapture({} as FocusEvent<HTMLElement>);
      props.onKeyDown({} as KeyboardEvent<HTMLElement>);
    });

    expect(onRemoveAtIndex).not.toHaveBeenCalled();
  });

  it('should return inert row props when disabled', () => {
    const onRemoveAtIndex = jest.fn();

    const { result } = renderHook(() =>
      usePickerSelectionGridKeyboard({
        tagCount: 2,
        onRemoveAtIndex,
        isDisabled: true,
      }),
    );

    const props = result.current.getKeyboardGridRowProps(0);

    expect(props.tabIndex).toBe(-1);
  });

  it('should move active row and schedule focus on arrow keys', () => {
    const onRemoveAtIndex = jest.fn();
    const { container, rows } = createSelectionGrid(2);
    const focus0 = jest.spyOn(rows[0]!, 'focus');
    const focus1 = jest.spyOn(rows[1]!, 'focus');

    const { result } = renderHook(() =>
      usePickerSelectionGridKeyboard({
        tagCount: 2,
        onRemoveAtIndex,
        selectionRef: { current: container },
        isPopoverOpen: false,
      }),
    );

    act(() => {
      result.current.getKeyboardGridRowProps(1).onKeyDown({
        key: 'ArrowLeft',
        preventDefault: jest.fn(),
      } as unknown as KeyboardEvent<HTMLElement>);
    });

    expect(focus0).toHaveBeenCalled();

    act(() => {
      result.current.getKeyboardGridRowProps(0).onKeyDown({
        key: 'ArrowRight',
        preventDefault: jest.fn(),
      } as unknown as KeyboardEvent<HTMLElement>);
    });

    expect(focus1).toHaveBeenCalled();

    act(() => {
      result.current.getKeyboardGridRowProps(1).onKeyDown({
        key: 'ArrowUp',
        preventDefault: jest.fn(),
      } as unknown as KeyboardEvent<HTMLElement>);
    });

    expect(focus0).toHaveBeenCalledTimes(2);

    focus0.mockRestore();
    focus1.mockRestore();
  });

  it('should move to first and last row on Home and End keys', () => {
    const onRemoveAtIndex = jest.fn();
    const { container, rows } = createSelectionGrid(3);
    const focus0 = jest.spyOn(rows[0]!, 'focus');
    const focus2 = jest.spyOn(rows[2]!, 'focus');

    const { result } = renderHook(() =>
      usePickerSelectionGridKeyboard({
        tagCount: 3,
        onRemoveAtIndex,
        selectionRef: { current: container },
        isPopoverOpen: false,
      }),
    );

    act(() => {
      result.current.getKeyboardGridRowProps(2).onKeyDown({
        key: 'Home',
        preventDefault: jest.fn(),
      } as unknown as KeyboardEvent<HTMLElement>);
    });

    expect(focus0).toHaveBeenCalled();

    act(() => {
      result.current.getKeyboardGridRowProps(0).onKeyDown({
        key: 'End',
        preventDefault: jest.fn(),
      } as unknown as KeyboardEvent<HTMLElement>);
    });

    expect(focus2).toHaveBeenCalled();

    focus0.mockRestore();
    focus2.mockRestore();
  });

  it('should remove tag and call onRemoveAtIndex on Delete', () => {
    const onRemoveAtIndex = jest.fn();

    const { result } = renderHook(() =>
      usePickerSelectionGridKeyboard({
        tagCount: 1,
        onRemoveAtIndex,
        isPopoverOpen: false,
      }),
    );

    const preventDefault = jest.fn();

    act(() => {
      result.current.getKeyboardGridRowProps(0).onKeyDown({
        key: 'Delete',
        preventDefault,
      } as unknown as KeyboardEvent<HTMLElement>);
    });

    expect(preventDefault).toHaveBeenCalled();
    expect(onRemoveAtIndex).toHaveBeenCalledWith(0);
  });

  it('should remove tag on Backspace like Delete', () => {
    const onRemoveAtIndex = jest.fn();

    const { result } = renderHook(() =>
      usePickerSelectionGridKeyboard({
        tagCount: 1,
        onRemoveAtIndex,
        isPopoverOpen: false,
      }),
    );

    act(() => {
      result.current.getKeyboardGridRowProps(0).onKeyDown({
        key: 'Backspace',
        preventDefault: jest.fn(),
      } as unknown as KeyboardEvent<HTMLElement>);
    });

    expect(onRemoveAtIndex).toHaveBeenCalledWith(0);
  });

  it('should ignore navigation keys when tagCount is 0', () => {
    const onRemoveAtIndex = jest.fn();

    const { result } = renderHook(() =>
      usePickerSelectionGridKeyboard({
        tagCount: 0,
        onRemoveAtIndex,
        isPopoverOpen: false,
      }),
    );

    const preventDefault = jest.fn();

    act(() => {
      result.current.getKeyboardGridRowProps(0).onKeyDown({
        key: 'ArrowRight',
        preventDefault,
      } as unknown as KeyboardEvent<HTMLElement>);
    });

    expect(preventDefault).not.toHaveBeenCalled();
  });

  it('should ignore unhandled keys', () => {
    const onRemoveAtIndex = jest.fn();

    const { result } = renderHook(() =>
      usePickerSelectionGridKeyboard({
        tagCount: 2,
        onRemoveAtIndex,
        isPopoverOpen: false,
      }),
    );

    const preventDefault = jest.fn();

    act(() => {
      result.current.getKeyboardGridRowProps(0).onKeyDown({
        key: 'x',
        preventDefault,
      } as unknown as KeyboardEvent<HTMLElement>);
    });

    expect(preventDefault).not.toHaveBeenCalled();
  });

  it('should clear focused row on blur when focus leaves the row subtree', () => {
    const onRemoveAtIndex = jest.fn();
    const outside = document.createElement('button');
    document.body.append(outside);

    const { result } = renderHook(() =>
      usePickerSelectionGridKeyboard({
        tagCount: 2,
        onRemoveAtIndex,
        isPopoverOpen: false,
      }),
    );

    act(() => {
      result.current.getKeyboardGridRowProps(0).onFocusCapture({} as FocusEvent<HTMLElement>);
    });

    expect(result.current.getKeyboardGridRowProps(0).removeButtonTabIndex).toBe(0);

    act(() => {
      result.current.getKeyboardGridRowProps(0).onBlurCapture({
        currentTarget: document.createElement('div'),
        relatedTarget: outside,
      } as unknown as FocusEvent<HTMLElement>);
    });

    expect(result.current.getKeyboardGridRowProps(0).removeButtonTabIndex).toBe(-1);

    outside.remove();
  });

  it('should not clear focused row on blur when focus moves within the row', () => {
    const onRemoveAtIndex = jest.fn();
    const row = document.createElement('div');
    const inner = document.createElement('button');
    row.append(inner);

    const { result } = renderHook(() =>
      usePickerSelectionGridKeyboard({
        tagCount: 2,
        onRemoveAtIndex,
        isPopoverOpen: false,
      }),
    );

    act(() => {
      result.current.getKeyboardGridRowProps(0).onFocusCapture({} as FocusEvent<HTMLElement>);
    });

    act(() => {
      result.current.getKeyboardGridRowProps(0).onBlurCapture({
        currentTarget: row,
        relatedTarget: inner,
      } as unknown as FocusEvent<HTMLElement>);
    });

    expect(result.current.getKeyboardGridRowProps(0).removeButtonTabIndex).toBe(0);
  });
});
