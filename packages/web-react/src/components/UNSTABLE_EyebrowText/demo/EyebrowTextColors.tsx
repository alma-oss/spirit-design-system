import React from 'react';
import DocsStack from '../../../../docs/DocsStack';
import { Intensity, TextColors } from '../../../constants';
import { type TextColorsType } from '../../../types';
import { getAccentTextColors, getEmotionTextColors } from '../../../utils';
import { Grid } from '../../Grid';
import { Text } from '../../Text';
import { UNSTABLE_EyebrowText } from '..';

const colorList = {
  text: Object.values(TextColors),
  accent: Object.values(getAccentTextColors()),
  emotion: Object.values(getEmotionTextColors()),
};

const intensityPattern = new RegExp(`${Intensity.BASIC}|${Intensity.SUBTLE}`);

const EyebrowTextColors = () => (
  <>
    <Text>For demo purposes, the EyebrowText has custom background and padding.</Text>
    <Grid cols={{ mobile: 1, desktop: 3 }} alignmentY="top" spacingY="space-1100">
      {Object.entries(colorList).map(([key, colors]: [string, TextColorsType[]]) => (
        <DocsStack key={`eyebrow-text-${key}`} stackAlignment="start">
          <h3>{`${key.charAt(0).toUpperCase()}${key.slice(1)} colors`}</h3>

          {colors?.map((color) => {
            const bgColor = color?.replace(intensityPattern, (match) =>
              match === Intensity.BASIC ? Intensity.SUBTLE : Intensity.BASIC,
            );
            const boxClass = key !== 'text' ? `bg-${bgColor} p-800` : 'mb-800';

            return (
              <div key={`eyebrow-text-item-${color}`} className={boxClass}>
                <UNSTABLE_EyebrowText textColor={color}>EyebrowText {color}</UNSTABLE_EyebrowText>
              </div>
            );
          })}
        </DocsStack>
      ))}
    </Grid>
  </>
);

export default EyebrowTextColors;
