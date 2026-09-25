'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { Stack } from '../../Stack';
import SkeletonCombined from './SkeletonCombined';
import SkeletonHeadings from './SkeletonHeadings';
import SkeletonShapes from './SkeletonShapes';
import SkeletonTexts from './SkeletonTexts';
import { SkeletonHeadingWidths, SkeletonShapeWidths, SkeletonTextWidths } from './SkeletonWidths';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="SkeletonHeading" stackAlignment="stretch">
      <Stack spacing="space-1100">
        <SkeletonHeadings />
        <SkeletonHeadingWidths />
      </Stack>
    </DocsSection>
    <DocsSection title="SkeletonText" stackAlignment="stretch">
      <Stack spacing="space-1100">
        <SkeletonTexts />
        <SkeletonTextWidths />
      </Stack>
    </DocsSection>
    <DocsSection title="SkeletonShape" stackAlignment="stretch">
      <Stack spacing="space-1100">
        <SkeletonShapes />
        <SkeletonShapeWidths />
      </Stack>
    </DocsSection>
    <DocsSection title="Combined Skeletons" stackAlignment="stretch">
      <SkeletonCombined />
    </DocsSection>
  </StrictMode>
);
