import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import AccordionBasic from './AccordionBasic';
import AccordionOneItemOpenAtATime from './AccordionOneItemOpenAtATime';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Basic Usage">
        <AccordionBasic />
      </DocsSection>
      <DocsSection title="One Item Open at a Time">
        <AccordionOneItemOpenAtATime />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
