import React from 'react';
import { BackgroundColors, TextColors } from '../../../constants';
import { getAccentBackgroundColors, getEmotionBackgroundColors, getNeutralBackgroundColors } from '../../../utils';
import { Grid } from '../../Grid';
import BoxColorDemoFactory, { type BoxTextColorsType } from './BoxColorDemoFactory';
import { collectDefinedColorValues, getComplementaryColor } from './complementaryColorHelper';

const accentColorsObject = getAccentBackgroundColors();
const emotionColorsObject = getEmotionBackgroundColors();
const neutralColorsObject = getNeutralBackgroundColors();

const getComplementaryTextColor = (backgroundColor: string): BoxTextColorsType =>
  getComplementaryColor({
    sourceColor: backgroundColor,
    fallback: TextColors.PRIMARY,
  }) as BoxTextColorsType;

const BoxWithBackgroundColor = () => {
  const accentBackgroundColors = collectDefinedColorValues(accentColorsObject);
  const neutralBackgroundColors = collectDefinedColorValues(neutralColorsObject);
  const backgroundColors = [...Object.values(BackgroundColors), ...neutralBackgroundColors];
  const emotionBackgroundColors = collectDefinedColorValues(emotionColorsObject);

  return (
    <>
      <p>For demo purposes, the boxes have custom padding.</p>
      <Grid cols={{ desktop: 3, tablet: 1, mobile: 1 }}>
        <BoxColorDemoFactory
          label="Background colors"
          demoType="background"
          colorList={backgroundColors}
          getComplementaryColor={getComplementaryTextColor}
        />
        <BoxColorDemoFactory
          label="Accent colors"
          demoType="background"
          colorList={accentBackgroundColors}
          getComplementaryColor={getComplementaryTextColor}
        />
        <BoxColorDemoFactory
          label="Emotion colors"
          demoType="background"
          colorList={emotionBackgroundColors}
          getComplementaryColor={getComplementaryTextColor}
        />
      </Grid>
    </>
  );
};

export default BoxWithBackgroundColor;
