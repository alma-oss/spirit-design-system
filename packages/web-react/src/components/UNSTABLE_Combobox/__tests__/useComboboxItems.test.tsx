import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import React, { createRef } from 'react';
import UNSTABLE_ComboboxOption from '../UNSTABLE_ComboboxOption';
import { useComboboxItems } from '../useComboboxItems';

describe('useComboboxItems', () => {
  it('should collect items from option children', () => {
    const listboxRef = createRef<HTMLElement>();
    const { result } = renderHook(() =>
      useComboboxItems({
        children: (
          <>
            <UNSTABLE_ComboboxOption value="cs" label="Czech short">
              Czech Republic
            </UNSTABLE_ComboboxOption>
            <UNSTABLE_ComboboxOption value="en" isDisabled>
              English
            </UNSTABLE_ComboboxOption>
          </>
        ),
        listboxRef,
        selectedKeys: ['cs'],
      }),
    );

    expect(result.current.resolvedOptionKeys).toEqual(['cs', 'en']);
    expect(result.current.itemsByKey.cs).toEqual({
      key: 'cs',
      label: 'Czech short',
      isDisabled: false,
    });
    expect(result.current.itemsByKey.en?.isDisabled).toBe(true);
    expect(result.current.selectedItems).toEqual([{ value: 'cs', label: 'Czech short' }]);
  });

  it('should prefer optionKeys and keep labels for unmounted selected options', () => {
    const listboxRef = createRef<HTMLElement>();
    const { result, rerender } = renderHook(
      ({ children, selectedKeys }) =>
        useComboboxItems({
          children,
          listboxRef,
          optionKeys: ['cs', 'en', 'de'],
          selectedKeys,
        }),
      {
        initialProps: {
          children: (
            <>
              <UNSTABLE_ComboboxOption value="cs">Czech</UNSTABLE_ComboboxOption>
              <UNSTABLE_ComboboxOption value="en">English</UNSTABLE_ComboboxOption>
            </>
          ),
          selectedKeys: ['cs', 'en'],
        },
      },
    );

    expect(result.current.resolvedOptionKeys).toEqual(['cs', 'en', 'de']);

    rerender({
      children: <UNSTABLE_ComboboxOption value="en">English</UNSTABLE_ComboboxOption>,
      selectedKeys: ['cs', 'en'],
    });

    expect(result.current.selectedItems).toEqual([
      { value: 'cs', label: 'Czech' },
      { value: 'en', label: 'English' },
    ]);
  });
});
