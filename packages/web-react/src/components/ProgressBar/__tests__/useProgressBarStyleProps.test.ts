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

  it('should apply the disabled color scheme on the bar and the value row', () => {
    const props = { color: 'informative', isDisabled: true, value: 40 } as SpiritProgressBarProps;
    const { result } = renderHook(() => useProgressBarStyleProps(props));

    expect(result.current.classProps.root).toBe('ProgressBar color-scheme-on-disabled');
    expect(result.current.classProps.value).toBe('color-scheme-on-disabled');
    expect(result.current.classProps.valueLabel).toBe('text-color-scheme');
  });

  it('should return --progress-bar-value as a percentage of max', () => {
    const props = { color: 'informative', max: 20, value: 4 } as SpiritProgressBarProps;
    const { result } = renderHook(() => useProgressBarStyleProps(props));

    expect(result.current.progressStyle).toEqual({ '--progress-bar-value': '20%' });
  });
});
