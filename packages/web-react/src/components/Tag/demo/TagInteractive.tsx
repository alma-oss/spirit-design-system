import React, { Fragment } from 'react';
import { DemoEmotionColors, DocsSection } from '../../../../docs';
import { Grid } from '../../Grid';
import { Tag, TagColorsExtended } from '..';

const emotionColors = Object.values(DemoEmotionColors);
const colors = [TagColorsExtended.NEUTRAL, ...emotionColors, TagColorsExtended.SELECTED];

const TagInteractive = () => (
  <Grid cols={{ mobile: 1, tablet: 2 }}>
    <DocsSection title="Button" container="none" hasPadding={false}>
      {colors.map((color) => (
        <Fragment key={`button-${color}`}>
          <Tag elementType="button" color={color} isSubtle>
            Tag {color}
          </Tag>
          <Tag elementType="button" color={color}>
            Tag {color}
          </Tag>
        </Fragment>
      ))}
    </DocsSection>
    <DocsSection title="Link" container="none" hasPadding={false}>
      {colors.map((color) => (
        <Fragment key={`link-${color}`}>
          <Tag elementType="a" href="#" color={color} isSubtle>
            Tag {color}
          </Tag>
          <Tag elementType="a" href="#" color={color}>
            Tag {color}
          </Tag>
        </Fragment>
      ))}
    </DocsSection>
  </Grid>
);

export default TagInteractive;
