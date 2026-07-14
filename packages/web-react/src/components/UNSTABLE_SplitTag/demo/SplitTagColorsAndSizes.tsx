import React from 'react';
import { DemoEmotionColors, DocsSection } from '../../../../docs';
import { SizesExtended } from '../../../constants';
import { Grid } from '../../Grid';
import { TagColorsExtended } from '../../Tag';
import SplitTagPragueRadius from './SplitTagPragueRadius';

const sizes = Object.values(SizesExtended);
const emotionColors = Object.values(DemoEmotionColors);
const colors = [TagColorsExtended.NEUTRAL, ...emotionColors, TagColorsExtended.SELECTED];

const SplitTagColorsAndSizes = () => (
  <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} spacingY="space-1100">
    {sizes.map((size) => (
      <DocsSection key={size} container="none" hasPadding={false} title={`Size ${size}`}>
        {colors.map((color) => (
          <SplitTagPragueRadius
            key={`split-tag-${color}-${size}`}
            id={`split-tag-prague-radius-${color}-${size}`}
            color={color}
            size={size}
          />
        ))}
      </DocsSection>
    ))}
  </Grid>
);

export default SplitTagColorsAndSizes;
