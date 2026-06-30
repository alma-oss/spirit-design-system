import React from 'react';
import DocsStack from '../../../../docs/DocsStack';
import { TextColors } from '../../../constants';
import { type TextColorsType } from '../../../types';
import { getAccentTextColors, getEmotionTextColors } from '../../../utils';
import { Grid } from '../../Grid';
import { Text } from '../../Text';
import { ActionText } from '..';

const colorList = {
  text: Object.values(TextColors),
  accent: Object.values(getAccentTextColors()),
  emotion: Object.values(getEmotionTextColors()),
};

const ActionTextColors = () => (
  <>
    <Text>For demo purposes, accent and emotion text has custom background and padding.</Text>
    <Grid cols={{ mobile: 1, desktop: 3 }} alignmentY="top" spacingY="space-1100">
      {Object.entries(colorList).map(([key, colors]: [string, TextColorsType[]]) => (
        <DocsStack key={key} stackAlignment="start">
          <h3>{`${key.charAt(0).toUpperCase()}${key.slice(1)} `}colors</h3>

          {colors?.map((color) => {
            const bgColor = color?.replace(/basic|subtle/, (match) => (match === 'basic' ? 'subtle' : 'basic'));
            const bgClass = key !== 'text' ? `bg-${bgColor} px-800` : '';

            return (
              <div key={color} className={`${bgClass} py-800`}>
                <ActionText textColor={color}>Action {color}</ActionText>
              </div>
            );
          })}
        </DocsStack>
      ))}
    </Grid>
  </>
);

export default ActionTextColors;
