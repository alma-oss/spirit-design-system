import React, { Fragment } from 'react';
import { DemoEmotionColors, DocsSection } from '../../../../docs';
import { SizesExtended } from '../../../constants';
import { Grid } from '../../Grid';
import { Tag, TagColorsExtended } from '..';

const TagDefault = () => {
  const sizes = Object.values(SizesExtended);
  const emotionColors = Object.values(DemoEmotionColors);
  const colors = [TagColorsExtended.NEUTRAL, ...emotionColors, TagColorsExtended.SELECTED];

  return (
    <Grid cols={{ mobile: 1, tablet: 3, desktop: 5 }} spacingY="space-1100">
      {sizes.map((size) => (
        <DocsSection key={size} container="none" hasPadding={false} title={`Size ${size}`}>
          {colors.map((color) => (
            <Fragment key={`tag-${color}-${size}`}>
              <Tag color={color} size={size} isSubtle>
                Tag {color}
              </Tag>
              <Tag color={color} size={size}>
                Tag {color}
              </Tag>
            </Fragment>
          ))}
        </DocsSection>
      ))}
    </Grid>
  );
};

export default TagDefault;
