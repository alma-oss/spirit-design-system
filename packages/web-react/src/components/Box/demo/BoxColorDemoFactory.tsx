import React from 'react';
import DocsStack from '../../../../docs/DocsStack';
import {
  type BoxBackgroundColorsType,
  type TextAccentColorsType,
  type TextColorsDictionaryType,
  type TextEmotionColorsType,
  type TextNeutralColorsType,
} from '../../../types';
import Box from '../Box';

type BoxColorDemoType = 'background' | 'text';
export type BoxTextColorsType =
  TextAccentColorsType | TextEmotionColorsType | TextNeutralColorsType | TextColorsDictionaryType;

type BoxColorDemoFactoryProps = {
  label: string;
  demoType: BoxColorDemoType;
  colorList: BoxBackgroundColorsType[] | BoxTextColorsType[];
  getComplementaryColor: (color: string) => BoxBackgroundColorsType | BoxTextColorsType;
};

const BoxColorDemoFactory = ({ label, demoType, colorList, getComplementaryColor }: BoxColorDemoFactoryProps) => (
  <div>
    <DocsStack stackAlignment="start">
      <h3>{label}</h3>
      {colorList.map((color) => {
        if (!color) return null;

        const complementary = getComplementaryColor(color);

        return (
          <Box
            key={`${demoType}-${color}`}
            padding="space-800"
            backgroundColor={demoType === 'background' ? color : complementary}
            textColor={demoType === 'text' ? color : complementary}
          >
            With {color} {demoType}
          </Box>
        );
      })}
    </DocsStack>
  </div>
);

export default BoxColorDemoFactory;
