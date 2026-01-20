// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import TooltipAdvancedFloating from './TooltipAdvancedFloating';
import TooltipDefault from './TooltipDefault';
import TooltipDismissible from './TooltipDismissible';
import TooltipDismissibleViaJS from './TooltipDismissibleViaJS';
import TooltipIcon from './TooltipIcon';
import TooltipPlacements from './TooltipPlacements';
import TooltipTriggers from './TooltipTriggers';
import TooltipWithLink from './TooltipWithLink';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <TooltipDefault />
      </DocsSection>
      <DocsSection title="Dismissible Tooltip">
        <TooltipDismissible />
      </DocsSection>
      <DocsSection title="Dismissible Tooltip via JS API">
        <TooltipDismissibleViaJS />
      </DocsSection>
      <DocsSection title="Tooltip with Link Component">
        <TooltipWithLink />
      </DocsSection>
      <DocsSection title="Tooltip Triggers">
        <TooltipTriggers />
      </DocsSection>
      <DocsSection title="Tooltip on Icon Component">
        <TooltipIcon />
      </DocsSection>
      <DocsSection title="Placements" stackAlignment="stretch">
        <TooltipPlacements />
      </DocsSection>
      <DocsSection title="Advanced Floating Functionality" stackAlignment="stretch">
        <TooltipAdvancedFloating />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
