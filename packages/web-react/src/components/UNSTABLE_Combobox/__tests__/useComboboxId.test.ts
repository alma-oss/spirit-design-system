import { renderHook } from '@testing-library/react';
import { useComboboxId } from '../useComboboxId';

describe('useComboboxId', () => {
  it('should build stable ids from the combobox id', () => {
    const { result } = renderHook(() => useComboboxId('languages'));

    expect(result.current).toEqual({
      comboboxId: 'combobox-languages',
      labelId: 'combobox-languages-label',
      inputId: 'combobox-languages-input',
      popoverId: 'combobox-languages-popover',
      listboxId: 'combobox-languages-listbox',
      selectionId: 'combobox-languages-selection',
      tagDescriptionId: 'combobox-languages-tag-description',
      addMoreHelperId: 'combobox-languages-add-more-helper',
    });
  });
});
