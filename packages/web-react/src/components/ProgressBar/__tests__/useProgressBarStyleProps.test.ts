import { renderHook } from '@testing-library/react';
import { EmotionColors } from '../../../constants';
import { getColorSchemeClassName } from '../../../utils';
import { ProgressBarColorsExtended } from '../constants';
import { type SpiritProgressBarProps } from '../types';
import { useProgressBarStyleProps } from '../useProgressBarStyleProps';

describe('useProgressBarStyleProps', () => {
  it('should return defaults', () => {
    const props = { color: 'informative', value: 60 } as SpiritProgressBarProps;
    const { result } = renderHook(() => useProgressBarStyleProps(props));

    expect(result.current.classProps.root).toBe(
      `ProgressBar ${getColorSchemeClassName({
        color: 'informative',
        isSubtle: true,
      })}`,
    );
    expect(result.current.valueRow).toEqual({
      className: 'Flex Flex--horizontal Flex--noWrap Flex--alignmentYCenter',
      style: { '--flex-spacing-x': 'var(--spirit-space-600)' },
    });
    expect(result.current.progressStyle).toEqual({ '--progress-bar-value': '60%' });
  });

  it.each([...Object.values(EmotionColors), ...Object.values(ProgressBarColorsExtended)])(
    'should return color scheme class %s',
    (color) => {
      const props = { color, value: 60 } as SpiritProgressBarProps;
      const { result } = renderHook(() => useProgressBarStyleProps(props));

      expect(result.current.classProps.root).toBe(
        `ProgressBar ${getColorSchemeClassName({
          color,
          isSubtle: true,
        })}`,
      );
    },
  );

  it('should return disabled classes on the value row, not the bar', () => {
    const props = { color: 'informative', isDisabled: true, value: 40 } as SpiritProgressBarProps;
    const { result } = renderHook(() => useProgressBarStyleProps(props));

    expect(result.current.classProps.root).toBe('ProgressBar');
    expect(result.current.classProps.value).toBe('color-scheme-on-disabled');
    expect(result.current.classProps.valueText).toBe('text-color-scheme');
  });

  it('should return vertical value row for bottom placement', () => {
    const props = { color: 'informative', value: 60, valuePlacement: 'bottom' } as SpiritProgressBarProps;
    const { result } = renderHook(() => useProgressBarStyleProps(props));

    expect(result.current.valueRow).toEqual({
      className: 'Flex Flex--vertical',
      style: { '--flex-spacing-y': 'var(--spirit-space-600)' },
    });
  });

  it('should return --progress-bar-value as a percentage of max', () => {
    const props = { color: 'informative', max: 20, value: 4 } as SpiritProgressBarProps;
    const { result } = renderHook(() => useProgressBarStyleProps(props));

    expect(result.current.progressStyle).toEqual({ '--progress-bar-value': '20%' });
  });
});
