// Because there is no `dist` directory during the CI run

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import React from 'react';
import ReactDOM from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import SkeletonCombined from './SkeletonCombined';
import SkeletonHeadings from './SkeletonHeadings';
import SkeletonShapes from './SkeletonShapes';
import SkeletonTexts from './SkeletonTexts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
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
  </React.StrictMode>,
);
