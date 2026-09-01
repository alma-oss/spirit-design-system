import React from 'react';
import DocsStack from '../../../../docs/DocsStack';
import { TextColors } from '../../../constants';
import { type TextColorsType } from '../../../types';
import { getAccentTextColors, getEmotionTextColors } from '../../../utils';
import { Grid } from '../../Grid';
import { Text } from '../../Text';
import { UNSTABLE_DisplayHeading } from '..';

const colorList = {
  text: Object.values(TextColors),
  accent: Object.values(getAccentTextColors()),
  emotion: Object.values(getEmotionTextColors()),
};

const DisplayHeadingColors = () => (
  <>
    <Text>For demo purposes, the display heading has custom size, background and padding.</Text>
    <Grid cols={{ mobile: 1, desktop: 3 }} alignmentY="top" spacingY="space-1100">
      {Object.entries(colorList).map(([key, colors]: [string, TextColorsType[]]) => (
        <DocsStack key={`display-heading-${key}`} stackAlignment="start">
          <h3>{`${key.charAt(0).toUpperCase()}${key.slice(1)} `} colors</h3>

          {colors?.map((color) => {
            const bgColor = color?.replace(/basic|subtle/, (match) => (match === 'basic' ? 'subtle' : 'basic'));
            const boxClass = key !== 'text' ? `bg-${bgColor} p-800` : 'mb-800';

            return (
              <div key={`display-heading-item-${color}`} className={boxClass}>
                <UNSTABLE_DisplayHeading elementType="h2" size="small" textColor={color}>
                  Display {color}
                </UNSTABLE_DisplayHeading>
              </div>
            );
          })}
        </DocsStack>
      ))}
    </Grid>
  </>
);

export default DisplayHeadingColors;
