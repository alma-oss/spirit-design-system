import { EmotionColors, Intensity } from '../../constants';
import type {
  BackgroundAccentColorsType,
  BackgroundEmotionColorsType,
  BorderAccentColorsType,
  BorderEmotionColorsType,
  IconBoxColorsType,
  IntensityDictionaryType,
  TextColorProps,
} from '../../types';
import { createScopedColorTokenName } from '../../utils';

export interface UseIconBoxColorsProps {
  colors: {
    background: BackgroundAccentColorsType | BackgroundEmotionColorsType;
    border: BorderAccentColorsType | BorderEmotionColorsType;
    text: TextColorProps['textColor'];
  };
}

export const useIconBoxColors = (color?: IconBoxColorsType, isSubtle = true): UseIconBoxColorsProps => {
  const intensity: IntensityDictionaryType = isSubtle ? Intensity.SUBTLE : Intensity.BASIC;
  const complementaryIntensity: IntensityDictionaryType =
    intensity === Intensity.BASIC ? Intensity.SUBTLE : Intensity.BASIC;
  const base: IconBoxColorsType = color ?? EmotionColors.INFORMATIVE;

  const background = createScopedColorTokenName({
    color: base,
    intensity,
  }) as BackgroundAccentColorsType | BackgroundEmotionColorsType;
  const border = createScopedColorTokenName({
    color: base,
    intensity,
  }) as BorderAccentColorsType | BorderEmotionColorsType;
  const text = createScopedColorTokenName({
    color: base,
    intensity: complementaryIntensity,
  }) as TextColorProps['textColor'];

  return {
    colors: {
      background,
      border,
      text,
    },
  };
};
