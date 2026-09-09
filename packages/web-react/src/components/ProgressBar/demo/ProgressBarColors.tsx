import { accentColors } from '@alma-oss/spirit-design-tokens';
import React from 'react';
import { type AccentColorNamesType } from '../../../types';
import { CaptionText } from '../../CaptionText';
import { Flex } from '../../Flex';
import { Stack } from '../../Stack';
import { ProgressBar, type ProgressBarColor, ProgressBarColorsExtended } from '..';

const colors: Array<{ label: string; color: ProgressBarColor }> = [
  { label: 'emotion-informative', color: 'informative' },
  { label: 'emotion-success', color: 'success' },
  { label: 'emotion-warning', color: 'warning' },
  { label: 'emotion-danger', color: 'danger' },
  { label: 'selected', color: ProgressBarColorsExtended.SELECTED },
  ...(Object.keys(accentColors) as AccentColorNamesType[]).map((color) => ({
    label: `accent-${color}`,
    color,
  })),
];

const ProgressBarColors = () => (
  <>
    {colors.map(({ label, color }) => (
      <Stack key={label} spacing="space-400">
        <CaptionText textColor="secondary">{label}</CaptionText>
        <Flex alignmentX={undefined} alignmentY="center" spacingX="space-600">
          <ProgressBar aria-label={label} color={color} value={60} />
          <CaptionText textColor="secondary">{'60\u00a0%'}</CaptionText>
        </Flex>
      </Stack>
    ))}
  </>
);

export default ProgressBarColors;
