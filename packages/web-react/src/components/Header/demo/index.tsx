// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import HeaderExperimentalRTL from './HeaderExperimentalRTL';
import HeaderMinimal from './HeaderMinimal';
import HeaderSimple from './HeaderSimple';
import HeaderSimpleTransparent from './HeaderSimpleTransparent';
import HeaderWithActions from './HeaderWithActions';
import HeaderWithActionsAndDialog from './HeaderWithActionsAndDialog';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Minimal Header" stackAlignment="stretch" container="heading-only">
        <HeaderMinimal />
      </DocsSection>
      <DocsSection title="Header with Actions" stackAlignment="stretch" container="heading-only">
        <HeaderWithActions />
      </DocsSection>
      <DocsSection title="Header with Actions and Header Dialog" stackAlignment="stretch" container="heading-only">
        <HeaderWithActionsAndDialog />
      </DocsSection>
      <DocsSection title="Simple Header" stackAlignment="stretch" container="heading-only">
        <HeaderSimple />
      </DocsSection>
      <DocsSection title="Simple Transparent Header" stackAlignment="stretch" container="heading-only">
        <HeaderSimpleTransparent />
      </DocsSection>
      <DocsSection title="Experimental RTL Support" stackAlignment="stretch">
        <HeaderExperimentalRTL />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
