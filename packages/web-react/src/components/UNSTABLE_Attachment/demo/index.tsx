// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import Attachment from './Attachment';
import FluidWidth from './FluidWidth';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Attachment" tag="Visual demo only">
        <Attachment />
      </DocsSection>
      <DocsSection title="Fluid Width" tag="Visual demo only" stackAlignment="stretch">
        <FluidWidth />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
