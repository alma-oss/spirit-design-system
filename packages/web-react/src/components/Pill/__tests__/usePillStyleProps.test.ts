import { renderHook } from '@testing-library/react';
import { EmotionColors } from '../../../constants';
import { type SpiritPillProps } from '../../../types';
import { getColorSchemeClassName } from '../../../utils';
import { PillColorsExtended } from '../constants';
import { usePillStyleProps } from '../usePillStyleProps';

describe('usePillStyleProps', () => {
  it('should return defaults', () => {
    const props = {};
    const { result } = renderHook(() => usePillStyleProps(props));

    expect(result.current.classProps).toBe(
      `Pill Pill--selected ${getColorSchemeClassName({
        color: PillColorsExtended.SELECTED,
      })}`,
    );
  });

  it.each([...Object.values(PillColorsExtended), ...Object.values(EmotionColors)])(
    'should return color class %s',
    (color) => {
      const props = { color } as SpiritPillProps;
      const { result } = renderHook(() => usePillStyleProps(props));

      expect(result.current.classProps).toBe(
        `Pill Pill--${color} ${getColorSchemeClassName({
          color,
        })}`,
      );
    },
  );

  it('should return subtle color classes', () => {
    const props = { color: 'success', isSubtle: true } as SpiritPillProps;
    const { result } = renderHook(() => usePillStyleProps(props));

    expect(result.current.classProps).toBe(
      `Pill Pill--success ${getColorSchemeClassName({
        color: 'success',
        isSubtle: true,
      })} Pill--subtle`,
    );
  });
});
