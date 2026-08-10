import React, { Fragment } from 'react';
import { DemoEmotionColors, DocsSection } from '../../../../docs';
import { SizesExtended } from '../../../constants';
import type { SizeExtendedDictionaryType } from '../../../types';
import { CloseButton } from '../../CloseButton';
import { Grid } from '../../Grid';
import { Tag, TagColorsExtended } from '..';

const sizes = Object.values(SizesExtended);
const emotionColors = Object.values(DemoEmotionColors);
const colors = [TagColorsExtended.NEUTRAL, ...emotionColors, TagColorsExtended.SELECTED];

const closeButtonSizeMap: Record<string, SizeExtendedDictionaryType> = {
  [SizesExtended.XSMALL]: SizesExtended.XSMALL,
  [SizesExtended.SMALL]: SizesExtended.XSMALL,
  [SizesExtended.MEDIUM]: SizesExtended.XSMALL,
  [SizesExtended.LARGE]: SizesExtended.SMALL,
  [SizesExtended.XLARGE]: SizesExtended.SMALL,
};

const TagWithCloseButton = () => (
  <Grid cols={{ mobile: 1, tablet: 3, desktop: 5 }} spacingY="space-1100">
    {sizes.map((size) => (
      <DocsSection key={size} container="none" hasPadding={false} title={`Size ${size}`}>
        {colors.map((color) => (
          <Fragment key={`tag-${color}-${size}`}>
            <Tag color={color} size={size} isSubtle elementType="div">
              <span>Tag {color}</span>
              <CloseButton size={closeButtonSizeMap[size]} label={`Remove Tag ${color}`} />
            </Tag>
            <Tag color={color} size={size} elementType="div">
              <span>Tag {color}</span>
              <CloseButton size={closeButtonSizeMap[size]} label={`Remove Tag ${color}`} />
            </Tag>
          </Fragment>
        ))}
      </DocsSection>
    ))}
  </Grid>
);

export default TagWithCloseButton;
