import { act, renderHook } from '@testing-library/react';
import type { KeyboardEvent } from 'react';
import { useSplitTagListboxKeyboard } from '../useSplitTagListboxKeyboard';

const OPTIONS = [
  { value: '+5 km', label: '+5 km' },
  { value: '+10 km', label: '+10 km' },
  { value: '+20 km', label: '+20 km' },
  { value: '+50 km', label: '+50 km' },
];

const getOptionId = (value: string) => `option-${OPTIONS.findIndex((option) => option.value === value)}`;

const createListbox = () => {
  const container = document.createElement('div');

  OPTIONS.forEach(({ value, label }) => {
    const option = document.createElement('div');
    option.id = getOptionId(value);
    option.textContent = label;
    container.appendChild(option);
  });

  return container;
};

const keyEvent = (key: string): KeyboardEvent<HTMLElement> =>
  ({
    key,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    ctrlKey: false,
    metaKey: false,
    altKey: false,
  }) as unknown as KeyboardEvent<HTMLElement>;

const renderListboxKeyboard = (overrides: Partial<Parameters<typeof useSplitTagListboxKeyboard>[0]> = {}) => {
  const container = createListbox();

  return {
    container,
    ...renderHook(() =>
      useSplitTagListboxKeyboard({
        getOptionId,
        listboxRef: { current: container },
        onSelect: jest.fn(),
        optionValues: OPTIONS.map((option) => option.value),
        selectedValue: '',
        ...overrides,
      }),
    ),
  };
};

describe('useSplitTagListboxKeyboard', () => {
  it('should make the first option the initial tab stop when nothing is selected', () => {
    const { result } = renderListboxKeyboard();

    expect(result.current.getOptionProps('+5 km').tabIndex).toBe(0);
    expect(result.current.getOptionProps('+10 km').tabIndex).toBe(-1);
  });

  it('should make the selected option the initial tab stop', () => {
    const { result } = renderListboxKeyboard({ selectedValue: '+10 km' });

    expect(result.current.getOptionProps('+10 km').tabIndex).toBe(0);
    expect(result.current.getOptionProps('+5 km').tabIndex).toBe(-1);
  });

  it('should expose aria-selected from the selected value', () => {
    const { result } = renderListboxKeyboard({ selectedValue: '+10 km' });

    expect(result.current.getOptionProps('+10 km')['aria-selected']).toBe(true);
    expect(result.current.getOptionProps('+5 km')['aria-selected']).toBe(false);
  });

  it.each([' ', 'Enter'])('should select with %p', (key) => {
    const onSelect = jest.fn();
    const { result } = renderListboxKeyboard({ onSelect });

    act(() => {
      result.current.getOptionProps('+10 km').onKeyDown(keyEvent(key));
    });

    expect(onSelect).toHaveBeenCalledWith('+10 km');
  });

  it('should select on click', () => {
    const onSelect = jest.fn();
    const { result } = renderListboxKeyboard({ onSelect });

    act(() => {
      result.current.getOptionProps('+10 km').onClick({} as never);
    });

    expect(onSelect).toHaveBeenCalledWith('+10 km');
  });

  it('should move focus to the next option on ArrowDown', () => {
    const { result, container } = renderListboxKeyboard();
    const focusSpy = jest.spyOn(container.querySelector<HTMLElement>('#option-1')!, 'focus');

    result.current.getOptionProps('+5 km').onKeyDown(keyEvent('ArrowDown'));

    expect(focusSpy).toHaveBeenCalled();
  });

  it('should wrap ArrowDown from the last option to the first', () => {
    const { result, container } = renderListboxKeyboard();
    const focusSpy = jest.spyOn(container.querySelector<HTMLElement>('#option-0')!, 'focus');

    result.current.getOptionProps('+50 km').onKeyDown(keyEvent('ArrowDown'));

    expect(focusSpy).toHaveBeenCalled();
  });

  it('should wrap ArrowUp from the first option to the last', () => {
    const { result, container } = renderListboxKeyboard();
    const focusSpy = jest.spyOn(container.querySelector<HTMLElement>('#option-3')!, 'focus');

    result.current.getOptionProps('+5 km').onKeyDown(keyEvent('ArrowUp'));

    expect(focusSpy).toHaveBeenCalled();
  });

  it('should focus the first and last option on Home and End', () => {
    const { result, container } = renderListboxKeyboard();
    const firstSpy = jest.spyOn(container.querySelector<HTMLElement>('#option-0')!, 'focus');
    const lastSpy = jest.spyOn(container.querySelector<HTMLElement>('#option-3')!, 'focus');

    result.current.getOptionProps('+10 km').onKeyDown(keyEvent('End'));
    result.current.getOptionProps('+10 km').onKeyDown(keyEvent('Home'));

    expect(lastSpy).toHaveBeenCalled();
    expect(firstSpy).toHaveBeenCalled();
  });

  it('should focus the first option whose text matches the type-ahead query', () => {
    const { result, container } = renderListboxKeyboard();
    const focusSpy = jest.spyOn(container.querySelector<HTMLElement>('#option-2')!, 'focus');

    result.current.getOptionProps('+5 km').onKeyDown(keyEvent('+'));
    result.current.getOptionProps('+5 km').onKeyDown(keyEvent('2'));

    expect(focusSpy).toHaveBeenCalled();
  });

  it('should reset the type-ahead query after 500 ms', () => {
    jest.useFakeTimers();
    const { result, container } = renderListboxKeyboard();
    const focusSpy = jest.spyOn(container.querySelector<HTMLElement>('#option-0')!, 'focus');

    try {
      result.current.getOptionProps('+5 km').onKeyDown(keyEvent('2'));
      act(() => {
        jest.advanceTimersByTime(500);
      });
      result.current.getOptionProps('+5 km').onKeyDown(keyEvent('+'));
      result.current.getOptionProps('+5 km').onKeyDown(keyEvent('5'));

      expect(focusSpy).toHaveBeenCalled();
    } finally {
      jest.useRealTimers();
    }
  });

  it('should update the tab stop when an option receives focus', () => {
    const { result } = renderListboxKeyboard();

    act(() => {
      result.current.getOptionProps('+20 km').onFocus({} as never);
    });

    expect(result.current.getOptionProps('+20 km').tabIndex).toBe(0);
    expect(result.current.getOptionProps('+5 km').tabIndex).toBe(-1);
  });

  it('should not select or navigate when disabled', () => {
    const onSelect = jest.fn();
    const { result, container } = renderListboxKeyboard({ isDisabled: true, onSelect });
    const focusSpy = jest.spyOn(container.querySelector<HTMLElement>('#option-1')!, 'focus');

    result.current.getOptionProps('+5 km').onKeyDown(keyEvent('ArrowDown'));
    result.current.getOptionProps('+5 km').onKeyDown(keyEvent('Enter'));
    result.current.getOptionProps('+5 km').onClick({} as never);

    expect(onSelect).not.toHaveBeenCalled();
    expect(focusSpy).not.toHaveBeenCalled();
    expect(result.current.getOptionProps('+5 km')['aria-disabled']).toBe(true);
  });
});
