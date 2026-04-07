import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import IconColor from './IconColor';
import IconColorDualtone from './IconColorDualtone';
import IconDefault from './IconDefault';
import IconResponsive from './IconResponsive';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <IconDefault />
      </DocsSection>
      <DocsSection title="Responsive Size">
        <IconResponsive />
      </DocsSection>
      <DocsSection title="Colors">
        <IconColor />
      </DocsSection>
      <DocsSection title="Dualtone Colors">
        <IconColorDualtone />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
