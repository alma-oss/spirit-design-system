import React, { Fragment } from 'react';
import { DemoEmotionColors, DocsSection } from '../../../../docs';
import { Sizes, SizesExtended } from '../../../constants';
import type { SizesDictionaryType } from '../../../types';
import { ControlButton } from '../../ControlButton';
import { Grid } from '../../Grid';
import { Icon } from '../../Icon';
import { Tag, TagColorsExtended } from '..';

const sizes = Object.values(SizesExtended);
const emotionColors = Object.values(DemoEmotionColors);
const colors = [TagColorsExtended.NEUTRAL, ...emotionColors, TagColorsExtended.SELECTED];

// TODO: waiting for ControlButton extended sizes, https://jira.almacareer.tech/browse/DS-2452
const controlButtonSizeMap: Record<string, SizesDictionaryType> = {
  [SizesExtended.XSMALL]: Sizes.SMALL,
  [SizesExtended.SMALL]: Sizes.SMALL,
  [SizesExtended.MEDIUM]: Sizes.MEDIUM,
  [SizesExtended.LARGE]: Sizes.LARGE,
  [SizesExtended.XLARGE]: Sizes.LARGE,
};

const TagWithControlButton = () => (
  <Grid cols={{ mobile: 1, tablet: 3, desktop: 5 }} spacingY="space-1100">
    {sizes.map((size) => (
      <DocsSection key={size} container="none" hasPadding={false} title={`Size ${size}`}>
        {colors.map((color) => (
          <Fragment key={`tag-${color}-${size}`}>
            <Tag color={color} size={size} isSubtle elementType="div">
              <span>Tag {color}</span>
              <ControlButton size={controlButtonSizeMap[size]} isSymmetrical aria-label={`Remove Tag ${color}`}>
                <Icon name="close" />
              </ControlButton>
            </Tag>
            <Tag color={color} size={size} elementType="div">
              <span>Tag {color}</span>
              <ControlButton size={controlButtonSizeMap[size]} isSymmetrical aria-label={`Remove Tag ${color}`}>
                <Icon name="close" />
              </ControlButton>
            </Tag>
          </Fragment>
        ))}
      </DocsSection>
    ))}
  </Grid>
);

export default TagWithControlButton;
