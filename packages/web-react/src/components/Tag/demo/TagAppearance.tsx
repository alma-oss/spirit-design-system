import React from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { SizesExtended } from '../../../constants';
import { Grid } from '../../Grid';
import { Tag } from '..';

const sizes = Object.values(SizesExtended);

const TagAppearance = () => (
  <Grid
    cols={{ mobile: 1, tablet: 3, desktop: 5 }}
    spacingY="space-1100"
    UNSAFE_className="spirit-feature-enable-v5-control-button-expanded-size-scale spirit-feature-enable-v5-tag-appearance"
  >
    {sizes.map((size) => (
      <DocsSection key={size} container="none" hasPadding={false} title={`Size ${size}`}>
        <Tag color="neutral" size={size} isSubtle>
          Tag subtle
        </Tag>
        <Tag color="neutral" size={size}>
          Tag
        </Tag>
      </DocsSection>
    ))}
  </Grid>
);

export default TagAppearance;
