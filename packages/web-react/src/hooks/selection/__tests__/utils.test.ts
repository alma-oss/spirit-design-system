import { getSelectedKeys, isKeySelected, isSingleSelectionMode, selectSingleKey, toggleSelection } from '../utils';

describe('selection utils', () => {
  it('isSingleSelectionMode', () => {
    expect(isSingleSelectionMode('single')).toBeTruthy();
    expect(isSingleSelectionMode('multiple')).toBeFalsy();
  });

  it.each<[string[], Parameters<typeof getSelectedKeys>[1], string[]]>([
    [['cs', 'dk'], 'single', ['cs']],
    [['cs'], 'single', ['cs']],
    [[], 'single', []],
    [['cs', 'dk'], 'multiple', ['cs', 'dk']],
  ])('getSelectedKeys(%j, %s)', (keys, mode, expected) => {
    expect(getSelectedKeys(keys, mode)).toEqual(expected);
  });

  it.each<[string[], string, Parameters<typeof isKeySelected>[2], boolean]>([
    [['cs'], 'cs', 'single', true],
    [['cs'], 'dk', 'single', false],
    [['cs', 'dk'], 'dk', 'multiple', true],
    [['cs', 'dk'], 'kl', 'multiple', false],
  ])('isKeySelected(%j, %s, %s)', (selectedKeys, key, mode, expected) => {
    expect(isKeySelected(selectedKeys, key, mode)).toBe(expected);
  });

  it.each<[string[], string, string[]]>([
    [['cs'], 'cs', []],
    [['cs'], 'dk', ['cs', 'dk']],
    [['cs', 'dk'], 'dk', ['cs']],
    [['cs', 'dk'], 'kl', ['cs', 'dk', 'kl']],
  ])('toggleSelection(%j, %s)', (previousKeys, key, expected) => {
    expect(toggleSelection(previousKeys, key)).toEqual(expected);
  });

  it('selectSingleKey', () => {
    expect(selectSingleKey('dk')).toEqual(['dk']);
  });
});
