import { act, renderHook } from '@testing-library/react';
import type { KeyboardEvent } from 'react';
import { usePickerListboxKeyboard } from '../usePickerListboxKeyboard';

const OPTIONS = [
  { value: 'cs', label: 'Czech' },
  { value: 'dk', label: 'Danish' },
  { value: 'en', label: 'English' },
];

const getOptionId = (value: string) => `opt-${value}`;

const createListbox = () => {
  const container = document.createElement('div');
  const options: Record<string, HTMLElement> = {};

  OPTIONS.forEach(({ value, label }) => {
    const option = document.createElement('div');
    option.setAttribute('role', 'option');
    option.id = getOptionId(value);
    option.textContent = label;
    container.appendChild(option);
    options[value] = option;
  });

  return { container, options };
};

const keyEvent = (key: string): KeyboardEvent<HTMLElement> =>
  ({
    key,
    preventDefault: jest.fn(),
    ctrlKey: false,
    metaKey: false,
    altKey: false,
  }) as unknown as KeyboardEvent<HTMLElement>;

const renderListboxKeyboard = (overrides: Partial<Parameters<typeof usePickerListboxKeyboard>[0]> = {}) => {
  const { container } = createListbox();

  return {
    container,
    ...renderHook(() =>
      usePickerListboxKeyboard({
        getOptionId,
        listboxRef: { current: container },
        onSelectionChange: jest.fn(),
        optionValues: OPTIONS.map((option) => option.value),
        selectedKeys: [],
        selectionMode: 'multiple',
        ...overrides,
      }),
    ),
  };
};

describe('usePickerListboxKeyboard', () => {
  it('should make the first option the initial tab stop when nothing is selected', () => {
    const { result } = renderListboxKeyboard();

    expect(result.current.getOptionProps('cs').tabIndex).toBe(0);
    expect(result.current.getOptionProps('dk').tabIndex).toBe(-1);
  });

  it('should make the first selected option the initial tab stop', () => {
    const { result } = renderListboxKeyboard({ selectedKeys: ['dk'] });

    expect(result.current.getOptionProps('dk').tabIndex).toBe(0);
    expect(result.current.getOptionProps('cs').tabIndex).toBe(-1);
  });

  it('should expose aria-selected from selectedKeys', () => {
    const { result } = renderListboxKeyboard({ selectedKeys: ['cs'] });

    expect(result.current.getOptionProps('cs')['aria-selected']).toBe(true);
    expect(result.current.getOptionProps('dk')['aria-selected']).toBe(false);
  });

  it('should toggle selection with Space in multiple mode', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderListboxKeyboard({ onSelectionChange, selectedKeys: ['cs'] });

    result.current.getOptionProps('dk').onKeyDown(keyEvent(' '));

    expect(onSelectionChange).toHaveBeenCalledWith(['cs', 'dk']);
  });

  it('should toggle selection with Enter', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderListboxKeyboard({ onSelectionChange, selectedKeys: ['cs'] });

    result.current.getOptionProps('cs').onKeyDown(keyEvent('Enter'));

    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });

  it('should replace selection with Space in single mode', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderListboxKeyboard({ onSelectionChange, selectionMode: 'single' });

    result.current.getOptionProps('en').onKeyDown(keyEvent(' '));

    expect(onSelectionChange).toHaveBeenCalledWith(['en']);
  });

  it('should toggle selection on click', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderListboxKeyboard({ onSelectionChange });

    result.current.getOptionProps('dk').onClick();

    expect(onSelectionChange).toHaveBeenCalledWith(['dk']);
  });

  it('should move focus to the next option on ArrowDown', () => {
    const { result, container } = renderListboxKeyboard();
    const focusSpy = jest.spyOn(container.querySelector<HTMLElement>('#opt-dk')!, 'focus');

    result.current.getOptionProps('cs').onKeyDown(keyEvent('ArrowDown'));

    expect(focusSpy).toHaveBeenCalled();
  });

  it('should clamp ArrowDown at the last option', () => {
    const { result, container } = renderListboxKeyboard();
    const focusSpy = jest.spyOn(container.querySelector<HTMLElement>('#opt-en')!, 'focus');

    result.current.getOptionProps('en').onKeyDown(keyEvent('ArrowDown'));

    expect(focusSpy).toHaveBeenCalled();
  });

  it('should clamp ArrowUp at the first option', () => {
    const { result, container } = renderListboxKeyboard();
    const focusSpy = jest.spyOn(container.querySelector<HTMLElement>('#opt-cs')!, 'focus');

    result.current.getOptionProps('cs').onKeyDown(keyEvent('ArrowUp'));

    expect(focusSpy).toHaveBeenCalled();
  });

  it('should focus the first and last option on Home and End', () => {
    const { result, container } = renderListboxKeyboard();
    const firstSpy = jest.spyOn(container.querySelector<HTMLElement>('#opt-cs')!, 'focus');
    const lastSpy = jest.spyOn(container.querySelector<HTMLElement>('#opt-en')!, 'focus');

    result.current.getOptionProps('dk').onKeyDown(keyEvent('End'));
    result.current.getOptionProps('dk').onKeyDown(keyEvent('Home'));

    expect(lastSpy).toHaveBeenCalled();
    expect(firstSpy).toHaveBeenCalled();
  });

  it('should focus the first option whose label matches the type-ahead query', () => {
    const { result, container } = renderListboxKeyboard();
    const focusSpy = jest.spyOn(container.querySelector<HTMLElement>('#opt-dk')!, 'focus');

    result.current.getOptionProps('cs').onKeyDown(keyEvent('d'));

    expect(focusSpy).toHaveBeenCalled();
  });

  it('should update the tab stop when an option receives focus', () => {
    const { result } = renderListboxKeyboard();

    act(() => {
      result.current.getOptionProps('en').onFocus({} as never);
    });

    expect(result.current.getOptionProps('en').tabIndex).toBe(0);
    expect(result.current.getOptionProps('cs').tabIndex).toBe(-1);
  });

  it('should not toggle or navigate when disabled', () => {
    const onSelectionChange = jest.fn();
    const { result } = renderListboxKeyboard({ isDisabled: true, onSelectionChange });

    result.current.getOptionProps('cs').onKeyDown(keyEvent(' '));
    result.current.getOptionProps('cs').onClick();

    expect(onSelectionChange).not.toHaveBeenCalled();
    expect(result.current.getOptionProps('cs')['aria-disabled']).toBe(true);
  });
});
