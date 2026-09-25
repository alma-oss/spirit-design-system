import React from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { Grid } from '../../Grid';
import { SkeletonHeading, SkeletonShape, SkeletonText } from '../index';

const widthGridColumns = { mobile: 1, tablet: 2, desktop: 3 } as const;

export const SkeletonHeadingWidths = () => (
  <Grid cols={widthGridColumns} spacingY="space-1100">
    <DocsSection title="Fixed width" stackAlignment="stretch" container="none" hasPadding={false}>
      <SkeletonHeading lines={2} width={240} />
    </DocsSection>
    <DocsSection title="% width" stackAlignment="stretch" container="none" hasPadding={false}>
      <SkeletonHeading lines={2} width="50%" />
    </DocsSection>
  </Grid>
);

export const SkeletonTextWidths = () => (
  <Grid cols={widthGridColumns} spacingY="space-1100">
    <DocsSection title="Fixed width" stackAlignment="stretch" container="none" hasPadding={false}>
      <SkeletonText lines={2} width={240} />
    </DocsSection>
    <DocsSection title="% width" stackAlignment="stretch" container="none" hasPadding={false}>
      <SkeletonText lines={2} width="60%" />
    </DocsSection>
  </Grid>
);

export const SkeletonShapeWidths = () => (
  <Grid cols={widthGridColumns} spacingY="space-1100">
    <DocsSection title="Fixed width" stackAlignment="stretch" container="none" hasPadding={false}>
      <SkeletonShape width={240} height={100} />
    </DocsSection>
    <DocsSection title="% width" stackAlignment="stretch" container="none" hasPadding={false}>
      <SkeletonShape width="50%" height={100} />
    </DocsSection>
  </Grid>
);
