import React from 'react';
import { COMBOBOX_OPTION_LABEL_ATTR, COMBOBOX_OPTION_VALUE_ATTR } from '../constants';
import UNSTABLE_ComboboxOption from '../UNSTABLE_ComboboxOption';
import {
  areAllOptionsSelected,
  collectComboboxItems,
  createSelectedKeysSet,
  getComboboxOptionDomId,
  getOptionRowCellControls,
  getOptionRowEl,
  getOptionRowFromFocus,
  getOptionValueFromRow,
  getRowLabel,
} from '../utils';

describe('UNSTABLE_Combobox utils', () => {
  const createListbox = (options: Array<{ id: string; value?: string; role?: 'option' | 'row' }>) => {
    const listbox = document.createElement('div');

    options.forEach(({ id, value, role = 'option' }) => {
      const option = document.createElement('div');

      option.setAttribute('role', role);
      option.id = id;

      if (value) {
        option.setAttribute(COMBOBOX_OPTION_VALUE_ATTR, value);
      }

      listbox.appendChild(option);
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

  it('getOptionRowEl should match grid rows as well as listbox options', () => {
    const listbox = createListbox([{ id: 'combobox-test-cs', value: 'cs', role: 'row' }]);

    expect(getOptionRowEl(listbox, 'cs')?.id).toBe('combobox-test-cs');
  });

  it('getOptionValueFromRow should prefer data-spirit-value over id', () => {
    const row = document.createElement('div');

    row.id = 'combobox-test-cs';
    row.setAttribute(COMBOBOX_OPTION_VALUE_ATTR, 'cs');

    expect(getOptionValueFromRow(row)).toBe('cs');
  });

  it('getRowLabel should prefer data-spirit-label over nested text', () => {
    const row = document.createElement('div');
    const cell = document.createElement('div');

    row.setAttribute(COMBOBOX_OPTION_LABEL_ATTR, 'Malíř pokojů');
    cell.setAttribute('role', 'gridcell');
    cell.textContent = 'Malíř pokojů Plný úvazek 4 nové nabídky';
    row.appendChild(cell);

    expect(getRowLabel(row)).toBe('Malíř pokojů');
  });

  it('getOptionRowFromFocus should resolve nested controls to their option row', () => {
    const listbox = document.createElement('div');
    const row = document.createElement('div');
    const button = document.createElement('button');

    row.setAttribute('role', 'row');
    row.appendChild(button);
    listbox.appendChild(row);

    expect(getOptionRowFromFocus(row, [row])).toBe(row);
    expect(getOptionRowFromFocus(button, [row])).toBe(row);
    expect(getOptionRowFromFocus(document.createElement('button'), [row])).toBeNull();
  });

  it('getOptionRowCellControls should return nested interactive controls', () => {
    const row = document.createElement('div');
    const link = document.createElement('a');
    const button = document.createElement('button');
    const disabled = document.createElement('button');

    link.href = '#czech';
    disabled.disabled = true;
    row.append(link, button, disabled);

    expect(getOptionRowCellControls(row)).toEqual([button]);
  });

  it('collectComboboxItems should collect key, label, and disabled metadata', () => {
    const items = collectComboboxItems(
      <>
        <UNSTABLE_ComboboxOption value="cs" label="Czech short">
          Czech Republic
        </UNSTABLE_ComboboxOption>
        <UNSTABLE_ComboboxOption value="en" isDisabled>
          English
        </UNSTABLE_ComboboxOption>
      </>,
    );

    expect(items).toEqual([
      { key: 'cs', label: 'Czech short', isDisabled: false },
      { key: 'en', label: 'English', isDisabled: true },
    ]);
  });

  it('areAllOptionsSelected should accept arrays or Sets', () => {
    expect(areAllOptionsSelected(['cs', 'en'], ['cs', 'en'])).toBe(true);
    expect(areAllOptionsSelected(createSelectedKeysSet(['cs']), ['cs', 'en'])).toBe(false);
  });
});
