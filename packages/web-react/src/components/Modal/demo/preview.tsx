'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import ModalDefault from './ModalDefault';
import ModalDisabledBackdropClick from './ModalDisabledBackdropClick';
import ModalHiddenCloseButton from './ModalHiddenCloseButton';
import ModalScrollingLongContent from './ModalScrollingLongContent';
import ModalStacking from './ModalStacking';

export const Preview = () => (
  <StrictMode>
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
  </StrictMode>
);
