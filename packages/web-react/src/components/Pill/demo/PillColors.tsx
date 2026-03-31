import React from 'react';
import { DemoEmotionColors } from '../../../../docs';
import { Pill, PillColorsExtended } from '..';

interface PillColorsProps {
  isSubtle?: boolean;
}

const PillColors = ({ isSubtle = false }: PillColorsProps) => {
  const pillColors = Object.values(PillColorsExtended);
  const emotionColors = Object.values(DemoEmotionColors);
  const colors = [...pillColors, ...emotionColors];

  return (
    <>
      {colors.map((color) => (
        <Pill key={color} color={color} isSubtle={isSubtle}>
          3
        </Pill>
      ))}
    </>
  );
};

export default PillColors;
