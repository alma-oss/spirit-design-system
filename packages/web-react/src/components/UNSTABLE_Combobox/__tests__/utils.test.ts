import { COMBOBOX_OPTION_VALUE_ATTR, getComboboxOptionDomId, getOptionRowEl, getOptionValueFromRow } from '../utils';

describe('UNSTABLE_Combobox utils', () => {
  const createListbox = (options: Array<{ id: string; value?: string }>) => {
    const listbox = document.createElement('div');

    options.forEach(({ id, value }) => {
      const row = document.createElement('div');

      row.setAttribute('role', 'row');
      row.id = id;

      if (value) {
        row.setAttribute(COMBOBOX_OPTION_VALUE_ATTR, value);
      }

      listbox.appendChild(row);
    });

    return listbox;
  };

  it('getComboboxOptionDomId should namespace value under combobox id', () => {
    expect(getComboboxOptionDomId('combobox-test', 'cs')).toBe('combobox-test-cs');
  });

  it('getOptionRowEl should match by data-spirit-value or raw id', () => {
    const listbox = createListbox([{ id: 'combobox-test-cs', value: 'cs' }, { id: 'en' }]);

    expect(getOptionRowEl(listbox, 'cs')?.id).toBe('combobox-test-cs');
    expect(getOptionRowEl(listbox, 'en')?.id).toBe('en');
    expect(getOptionRowEl(listbox, 'missing')).toBeNull();
    expect(getOptionRowEl(null, 'cs')).toBeNull();
    expect(getOptionRowEl(listbox, '')).toBeNull();
  });

  it('getOptionValueFromRow should prefer data-spirit-value over id', () => {
    const row = document.createElement('div');

    row.id = 'combobox-test-cs';
    row.setAttribute(COMBOBOX_OPTION_VALUE_ATTR, 'cs');

    expect(getOptionValueFromRow(row)).toBe('cs');
  });
});
