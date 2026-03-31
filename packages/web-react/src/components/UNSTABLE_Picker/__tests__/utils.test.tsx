import React from 'react';
import {
  collectPickerItems,
  getAggregatedTagLabel,
  getNodeText,
  getPickerItemLabelMap,
  getPickerSelectionGridKeyboardRowCount,
  getSelectedItems,
} from '../utils';
import { UNSTABLE_PickerGroup, UNSTABLE_PickerItem } from '..';

describe('UNSTABLE_Picker utils', () => {
  it('collectPickerItems should collect picker items recursively', () => {
    const children = (
      <UNSTABLE_PickerGroup label="Languages">
        <UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>
        <div>
          <UNSTABLE_PickerItem value="dk">Danish</UNSTABLE_PickerItem>
          Text Node
        </div>
      </UNSTABLE_PickerGroup>
    );

    expect(collectPickerItems(children)).toEqual([
      { value: 'cs', label: 'Czech' },
      { value: 'dk', label: 'Danish' },
    ]);
  });

  it('collectPickerItems should ignore valid elements without children', () => {
    expect(collectPickerItems(<span />)).toEqual([]);
  });

  it('getPickerItemLabelMap should build labels map from picker items', () => {
    expect(
      getPickerItemLabelMap([
        { value: 'cs', label: 'Czech' },
        { value: 'dk', label: 'Danish' },
      ]),
    ).toEqual({
      cs: 'Czech',
      dk: 'Danish',
    });
  });

  it('getSelectedItems should map selected keys to labels with key fallback', () => {
    const labels = { cs: 'Czech' };

    expect(getSelectedItems(['cs', 'dk'], labels)).toEqual([
      { value: 'cs', label: 'Czech' },
      { value: 'dk', label: 'dk' },
    ]);
  });

  it.each([
    ['Languages', [{ value: 'cs', label: 'Czech' }], 'Czech'],
    [
      'Languages',
      [
        { value: 'cs', label: 'Czech' },
        { value: 'dk', label: 'Danish' },
      ],
      'Languages (2)',
    ],
    ['Languages', [], 'Languages'],
  ])('getAggregatedTagLabel(%s, %j)', (label, selectedItems, expected) => {
    expect(getAggregatedTagLabel(label, selectedItems)).toEqual(expected);
  });

  it('getAggregatedTagLabel should preserve ReactNode for a single selected item', () => {
    const richLabel = (
      <>
        Czech <em>Republic</em>
      </>
    );

    expect(getAggregatedTagLabel('Languages', [{ value: 'cs', label: richLabel }])).toBe(richLabel);
  });

  it('getNodeText should normalize duplicated whitespaces in nested nodes', () => {
    const label = (
      <>
        {'  Czech '}
        <strong>{'\n Republic\t'}</strong>
      </>
    );
    const text = getNodeText(label);

    expect(text).toBeTruthy();
    expect(text).toBe('Czech Republic');
  });

  it.each([undefined, false, true, {} as React.ReactNode])(
    'getNodeText should return falsy for unsupported value %p',
    (value) => {
      expect(getNodeText(value)).toBeFalsy();
    },
  );

  it.each([
    { count: 0, opts: { isAggregated: false }, expected: 0 },
    { count: 0, opts: { isAggregated: true }, expected: 0 },
    { count: 2, opts: { isAggregated: false }, expected: 2 },
    { count: 3, opts: { isAggregated: false }, expected: 3 },
    { count: 3, opts: { isAggregated: true }, expected: 1 },
  ])('getPickerSelectionGridKeyboardRowCount($count, $opts)', ({ count, opts, expected }) => {
    expect(getPickerSelectionGridKeyboardRowCount(count, opts)).toBe(expected);
  });
});
