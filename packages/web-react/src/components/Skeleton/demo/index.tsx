// Because there is no `dist` directory during the CI run

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import SkeletonCombined from './SkeletonCombined';
import SkeletonHeadings from './SkeletonHeadings';
import SkeletonShapes from './SkeletonShapes';
import SkeletonTexts from './SkeletonTexts';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DocsSection title="SkeletonText" stackAlignment="stretch">
      <SkeletonTexts />
    </DocsSection>
    <DocsSection title="SkeletonHeading" stackAlignment="stretch">
      <SkeletonHeadings />
    </DocsSection>
    <DocsSection title="SkeletonShape" stackAlignment="stretch">
      <SkeletonShapes />
    </DocsSection>
    <DocsSection title="Combined Skeletons" stackAlignment="stretch">
      <SkeletonCombined />
    </DocsSection>
  </StrictMode>,
);
