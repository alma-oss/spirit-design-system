import React from 'react';
import { BackgroundColors, TextColors } from '../../../constants';
import { type BoxBackgroundColorsType } from '../../../types';
import { getAccentTextColors, getEmotionTextColors, getNeutralTextColors } from '../../../utils';
import { Grid } from '../../Grid';
import BoxColorDemoFactory from './BoxColorDemoFactory';
import { collectDefinedColorValues, getComplementaryColor } from './complementaryColorHelper';

const accentColorsObject = getAccentTextColors();
const emotionColorsObject = getEmotionTextColors();
const neutralColorsObject = getNeutralTextColors();

const getComplementaryBackgroundColor = (textColor: string): BoxBackgroundColorsType =>
  getComplementaryColor({
    sourceColor: textColor,
    fallback: BackgroundColors.SECONDARY,
  }) as BoxBackgroundColorsType;

const BoxWithTextColor = () => {
  const accentTextColors = collectDefinedColorValues(accentColorsObject);
  const emotionTextColors = collectDefinedColorValues(emotionColorsObject);
  const neutralTextColors = collectDefinedColorValues(neutralColorsObject);
  const textColors = [...Object.values(TextColors), ...neutralTextColors];

  return (
    <>
      <p>For demo purposes, the boxes have custom padding.</p>
      <Grid cols={{ mobile: 1, tablet: 1, desktop: 3 }}>
        <BoxColorDemoFactory
          label="Text colors"
          demoType="text"
          colorList={textColors}
          getComplementaryColor={getComplementaryBackgroundColor}
        />
        <BoxColorDemoFactory
          label="Accent text colors"
          demoType="text"
          colorList={accentTextColors}
          getComplementaryColor={getComplementaryBackgroundColor}
        />
        <BoxColorDemoFactory
          label="Emotion text colors"
          demoType="text"
          colorList={emotionTextColors}
          getComplementaryColor={getComplementaryBackgroundColor}
        />
      </Grid>
    </>
  );
};

export default BoxWithTextColor;
