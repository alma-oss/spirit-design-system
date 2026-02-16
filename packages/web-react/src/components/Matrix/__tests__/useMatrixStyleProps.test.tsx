import { renderHook } from '@testing-library/react';
import { MATRIX_ROWS_DEFAULT } from '../constants';
import { useDefaultResponsiveRowsStyle, useMatrixStyleProps } from '../useMatrixStyleProps';

describe('useMatrixStyleProps', () => {
  it('should return default className', () => {
    const props = {};
    const { result } = renderHook(() => useMatrixStyleProps(props));

    expect(result.current.classProps).toBe('Matrix');
  });

  it.each([
    // prop, value, expectedStyle10
    [
      'spacing',
      'space-100',
      {
        '--spirit-matrix-spacing-x': 'var(--spirit-space-100)',
        '--spirit-matrix-spacing-y': 'var(--spirit-space-100)',
      },
    ],
    [
      'spacingX',
      'space-200',
      {
        '--spirit-matrix-spacing-x': 'var(--spirit-space-200)',
      },
    ],
    [
      'spacingY',
      'space-300',
      {
        '--spirit-matrix-spacing-y': 'var(--spirit-space-300)',
      },
    ],
    [
      'cols',
      { mobile: '1', tablet: '2', desktop: '3' },
      {
        '--spirit-matrix-columns': '1',
        '--spirit-matrix-columns-tablet': '2',
        '--spirit-matrix-columns-desktop': '3',
      },
    ],
    [
      'rows',
      { mobile: '1', tablet: '2', desktop: '3' },
      {
        '--spirit-matrix-rows': '1',
        '--spirit-matrix-rows-tablet': '2',
        '--spirit-matrix-rows-desktop': '3',
      },
    ],
    [
      'itemRows',
      { mobile: '1', tablet: '2', desktop: '3' },
      {
        '--spirit-matrix-item-rows': '1',
        '--spirit-matrix-item-rows-tablet': '2',
        '--spirit-matrix-item-rows-desktop': '3',
      },
    ],
    ['spacing', undefined, {}],
    ['spacingX', undefined, {}],
    ['spacingY', undefined, {}],
    ['cols', undefined, {}],
    ['rows', undefined, {}],
    ['itemRows', undefined, {}],
  ])('should return %s CSS properties', (propName, value, expectedStyle) => {
    const props = value !== undefined ? { [propName]: value } : {};
    const { result } = renderHook(() => useMatrixStyleProps(props));

    expect(result.current.styleProps).toEqual(expectedStyle);
  });

  it('should return correct responsive CSS properties', () => {
    const props = {
      cols: { mobile: 1, tablet: 2, desktop: 3 },
      rows: MATRIX_ROWS_DEFAULT,
      itemRows: 3,
      itemsCount: 4,
    };
    const { result } = renderHook(() => useMatrixStyleProps(props));

    expect(result.current.styleProps).toEqual({
      '--spirit-matrix-columns': '1',
      '--spirit-matrix-columns-desktop': '3',
      '--spirit-matrix-columns-tablet': '2',
      '--spirit-matrix-item-rows': '3',
      '--spirit-matrix-items-count': '4',
      '--spirit-matrix-rows':
        'calc(var(--spirit-matrix-item-rows) * var(--spirit-matrix-items-count) / var(--spirit-matrix-columns))',
      '--spirit-matrix-rows-desktop':
        'calc(var(--spirit-matrix-item-rows) * var(--spirit-matrix-items-count) / var(--spirit-matrix-columns-desktop))',
      '--spirit-matrix-rows-tablet':
        'calc(var(--spirit-matrix-item-rows) * var(--spirit-matrix-items-count) / var(--spirit-matrix-columns-tablet))',
    });
  });
});

describe('useDefaultResponsiveRowsStyle', () => {
  it('should return correct styles', () => {
    const result = useDefaultResponsiveRowsStyle(
      { mobile: 1, tablet: 2, desktop: 3 },
      MATRIX_ROWS_DEFAULT,
      4,
      'matrix',
    );

    expect(result).toEqual({
      '--matrix-items-count': '4',
      '--matrix-rows': 'calc(var(--matrix-item-rows) * var(--matrix-items-count) / var(--matrix-columns))',
      '--matrix-rows-desktop':
        'calc(var(--matrix-item-rows) * var(--matrix-items-count) / var(--matrix-columns-desktop))',
      '--matrix-rows-tablet':
        'calc(var(--matrix-item-rows) * var(--matrix-items-count) / var(--matrix-columns-tablet))',
    });
  });

  it('should return empty style object', () => {
    const result = useDefaultResponsiveRowsStyle({ mobile: 1, tablet: 3 }, { mobile: 3, tablet: 1 }, 5, 'matrix');

    expect(result).toEqual({});
  });
});
