// Because there is no `dist` directory during the CI run
/* eslint-disable import/no-extraneous-dependencies, import/extensions, import/no-unresolved */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment, import/extensions, import/no-unresolved
// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import TimelineColors from './TimelineColors';
import TimelineDefault from './TimelineDefault';
import TimelineDots from './TimelineDots';
import TimelineIcons from './TimelineIcons';
import TimelineResponsiveSizes from './TimelineResponsiveSizes';
import TimelineSizes from './TimelineSizes';
import TimelineSizesDots from './TimelineSizesDots';
import TimelineSizesIcons from './TimelineSizesIcons';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Basic Usage with Numbers">
        <TimelineDefault />
      </DocsSection>
      <DocsSection title="With Colored Numbers">
        <TimelineColors />
      </DocsSection>
      <DocsSection title="With Dots">
        <TimelineDots />
      </DocsSection>
      <DocsSection title="With Icon Component">
        <TimelineIcons />
      </DocsSection>
      <DocsSection title="Sizes">
        <TimelineSizes />
      </DocsSection>
      <DocsSection title="Sizes With Dots">
        <TimelineSizesDots />
      </DocsSection>
      <DocsSection title="Sizes With Icon Component">
        <TimelineSizesIcons />
      </DocsSection>
      <DocsSection title="Responsive Sizes">
        <TimelineResponsiveSizes />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
