import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import TruncateDefault from './TruncateDefault';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Basic Usage" stackAlignment="stretch">
        <TruncateDefault />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
