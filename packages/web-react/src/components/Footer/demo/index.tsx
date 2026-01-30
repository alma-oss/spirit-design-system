// Because there is no `dist` directory during the CI run
/* eslint-disable import/no-extraneous-dependencies, import/extensions, import/no-unresolved */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment, import/extensions, import/no-unresolved
// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import FooterDefault from './FooterDefault';
import FooterMinimalistic from './FooterMinimalistic';
import FooterNested from './FooterNested';
import FooterTextAlignment from './FooterTextAlignment';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Basic Usage" stackAlignment="stretch" container="heading-only">
        <FooterDefault />
      </DocsSection>
      <DocsSection title="Nested Link Blocks, Logo Only" stackAlignment="stretch" container="heading-only">
        <FooterNested />
      </DocsSection>
      <DocsSection title="Minimalistic" stackAlignment="stretch" container="heading-only">
        <FooterMinimalistic />
      </DocsSection>
      <DocsSection title="Text Alignment" stackAlignment="stretch" container="heading-only">
        <FooterTextAlignment />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
