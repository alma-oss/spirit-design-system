import React, { Fragment } from 'react';
import { DemoColorTypes } from '../../../../docs';
import { Intensity, Sizes } from '../../../constants';
import type {
  AccentColorNamesType,
  BackgroundColorsDictionaryType,
  BoxBackgroundColorsType,
  ColorSchemeType,
  EmotionColorNamesType,
  IntensityDictionaryType,
  TextAccentColorsType,
  TextEmotionColorsType,
  TextNeutralColorsType,
} from '../../../types';
import {
  getAccentBackgroundColors,
  getAccentTextColors,
  getEmotionBackgroundColors,
  getEmotionTextColors,
  getNeutralBackgroundColors,
  getNeutralTextColors,
} from '../../../utils';
import { Box } from '../../Box';
import { Flex } from '../../Flex';
import { Icon } from '../../Icon';
import ControlButton from '../ControlButton';

type DemoColorType = (typeof DemoColorTypes)[keyof typeof DemoColorTypes];

type ControlButtonDemoFactoryProps = {
  color: BackgroundColorsDictionaryType | 'neutral' | EmotionColorNamesType | AccentColorNamesType;
  colorType: DemoColorType;
};

const accentBackgroundColors = getAccentBackgroundColors();
const emotionBackgroundColors = getEmotionBackgroundColors();
const neutralBackgroundColors = getNeutralBackgroundColors();
const accentTextColors = getAccentTextColors();
const emotionTextColors = getEmotionTextColors();
const neutralTextColors = getNeutralTextColors();

const getBackgroundColor = (
  color: BackgroundColorsDictionaryType | 'neutral' | EmotionColorNamesType | AccentColorNamesType,
  colorType: DemoColorType,
  intensity: IntensityDictionaryType,
): BoxBackgroundColorsType | undefined => {
  switch (colorType) {
    case 'basic':
      return color as BackgroundColorsDictionaryType;
    case 'neutral': {
      const key = `NEUTRAL_${intensity.toUpperCase()}`;

      return neutralBackgroundColors[key];
    }
    case 'emotion': {
      const key = `EMOTION_${color!.toUpperCase()}_${intensity.toUpperCase()}`;

      return emotionBackgroundColors[key];
    }
    case 'accent': {
      const key = `ACCENT_${color!.toUpperCase()}_${intensity.toUpperCase()}`;

      return accentBackgroundColors[key];
    }
    default:
      return undefined;
  }
};

const getTextColor = (
  color: BackgroundColorsDictionaryType | 'neutral' | EmotionColorNamesType | AccentColorNamesType,
  colorType: DemoColorType,
  intensity: IntensityDictionaryType,
): TextNeutralColorsType | TextEmotionColorsType | TextAccentColorsType | undefined => {
  switch (colorType) {
    case 'basic':
      return undefined;
    case 'neutral': {
      const key = `NEUTRAL_${intensity.toUpperCase()}`;

      return neutralTextColors[key];
    }
    case 'emotion': {
      const key = `EMOTION_${color!.toUpperCase()}_${intensity.toUpperCase()}`;

      return emotionTextColors[key];
    }
    case 'accent': {
      const key = `ACCENT_${color!.toUpperCase()}_${intensity.toUpperCase()}`;

      return accentTextColors[key];
    }
    default:
      return undefined;
  }
};

const getColorScheme = (
  color: BackgroundColorsDictionaryType | 'neutral' | EmotionColorNamesType | AccentColorNamesType,
  colorType: DemoColorType,
  intensity: IntensityDictionaryType,
): ColorSchemeType | undefined => {
  switch (colorType) {
    case DemoColorTypes.BASIC:
      return undefined;
    case DemoColorTypes.NEUTRAL:
      return `neutral-${intensity}` as ColorSchemeType;
    case DemoColorTypes.EMOTION:
      return `emotion-${color}-${intensity}` as ColorSchemeType;
    case DemoColorTypes.ACCENT:
      return `accent-${color}-${intensity}` as ColorSchemeType;
    default:
      return undefined;
  }
};

const renderRow = (
  color: BackgroundColorsDictionaryType | 'neutral' | EmotionColorNamesType | AccentColorNamesType,
  colorType: DemoColorType,
  intensity?: IntensityDictionaryType,
) => {
  const sizes = Object.values(Sizes);
  const resolvedIntensity = intensity ?? Intensity.BASIC;
  const colorScheme =
    colorType !== DemoColorTypes.BASIC ? getColorScheme(color, colorType, resolvedIntensity) : undefined;

  let backgroundColor: BoxBackgroundColorsType | undefined;
  let textColor: TextNeutralColorsType | TextEmotionColorsType | TextAccentColorsType | undefined;
  if (colorScheme) {
    backgroundColor = undefined;
    textColor = undefined;
  } else if (intensity) {
    backgroundColor = getBackgroundColor(color, colorType, intensity);
    textColor = getTextColor(color, colorType, intensity === Intensity.BASIC ? Intensity.SUBTLE : Intensity.BASIC);
  } else {
    backgroundColor = getBackgroundColor(color, colorType, Intensity.BASIC);
    textColor = undefined;
  }

  return (
    <Box
      key={intensity || 'default'}
      alignmentX={{ mobile: 'center', tablet: 'left' }}
      alignmentY="center"
      elementType={Flex}
      padding="space-800"
      {...(colorScheme ? { colorScheme } : { backgroundColor, textColor })}
    >
      {sizes.map((size) => (
        <Fragment key={`${size}-subtle`}>
          <ControlButton size={size} isSymmetrical isSubtle aria-label="Close dialog">
            <Icon name="close" />
          </ControlButton>
        </Fragment>
      ))}
      {sizes.map((size) => (
        <Fragment key={`${size}-bordered`}>
          <ControlButton size={size} isSymmetrical aria-label="Close dialog">
            <Icon name="close" />
          </ControlButton>
        </Fragment>
      ))}
    </Box>
  );
};

const ControlButtonDemoFactory = ({ color, colorType }: ControlButtonDemoFactoryProps) =>
  colorType === DemoColorTypes.BASIC ? (
    renderRow(color, colorType)
  ) : (
    <>
      {renderRow(color, colorType, Intensity.BASIC)}
      {renderRow(color, colorType, Intensity.SUBTLE)}
    </>
  );

export default ControlButtonDemoFactory;
