import React, { Fragment } from 'react';
import { DemoEmotionColors, DocsSection } from '../../../../docs';
import { SizesExtended } from '../../../constants';
import type { SizeExtendedDictionaryType } from '../../../types';
import { ControlButton } from '../../ControlButton';
import { Grid } from '../../Grid';
import { Icon } from '../../Icon';
import { Tag, TagColorsExtended } from '..';

const sizes = Object.values(SizesExtended);
const emotionColors = Object.values(DemoEmotionColors);
const colors = [TagColorsExtended.NEUTRAL, ...emotionColors, TagColorsExtended.SELECTED];

const controlButtonSizeMap: Record<string, SizeExtendedDictionaryType> = {
  [SizesExtended.XSMALL]: SizesExtended.XSMALL,
  [SizesExtended.SMALL]: SizesExtended.SMALL,
  [SizesExtended.MEDIUM]: SizesExtended.SMALL,
  [SizesExtended.LARGE]: SizesExtended.MEDIUM,
  [SizesExtended.XLARGE]: SizesExtended.MEDIUM,
};

const TagWithControlButton = () => (
  <Grid
    cols={{ mobile: 1, tablet: 3, desktop: 5 }}
    spacingY="space-1100"
    UNSAFE_className="spirit-feature-enable-v5-control-button-expanded-size-scale spirit-feature-enable-v5-tag-appearance"
  >
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
