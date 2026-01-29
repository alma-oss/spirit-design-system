// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React from 'react';
import ReactDOM from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import ModalDefault from './ModalDefault';
import ModalDisabledBackdropClick from './ModalDisabledBackdropClick';
import ModalHiddenCloseButton from './ModalHiddenCloseButton';
import ModalScrollingLongContent from './ModalScrollingLongContent';
import ModalStacking from './ModalStacking';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Modal">
        <ModalDefault />
      </DocsSection>
      <DocsSection title="Scrolling Long Content">
        <ModalScrollingLongContent />
      </DocsSection>
      <DocsSection title="Stacking Modals">
        <ModalStacking />
      </DocsSection>
      <DocsSection title="Disabled Backdrop Click">
        <ModalDisabledBackdropClick />
      </DocsSection>
      <DocsSection title="Hidden Close Button and Disabled Escape Key">
        <ModalHiddenCloseButton />
      </DocsSection>
    </IconsProvider>
  </React.StrictMode>,
);
