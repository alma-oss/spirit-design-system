import React, { Fragment } from 'react';
import { DemoColorTypes } from '../../../../docs';
import { Intensity, Sizes } from '../../../constants';
import type {
  AccentColorNamesType,
  BackgroundColorsDictionaryType,
  BoxBackgroundColorsType,
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

const renderRow = (
  color: BackgroundColorsDictionaryType | 'neutral' | EmotionColorNamesType | AccentColorNamesType,
  colorType: DemoColorType,
  intensity?: IntensityDictionaryType,
) => {
  const sizes = Object.values(Sizes);
  const backgroundColor = intensity
    ? getBackgroundColor(color, colorType, intensity)
    : getBackgroundColor(color, colorType, Intensity.BASIC);
  const textColor = intensity
    ? getTextColor(color, colorType, intensity === Intensity.BASIC ? Intensity.SUBTLE : Intensity.BASIC)
    : undefined;

  return (
    <Box
      key={intensity || 'default'}
      backgroundColor={backgroundColor}
      padding="space-800"
      textColor={textColor}
    >
      <Flex
        alignmentX={{ mobile: 'center', tablet: 'left' }}
        alignmentY="center"
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
      </Flex>
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
