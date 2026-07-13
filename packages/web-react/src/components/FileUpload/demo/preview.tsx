'use client';

import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import FileUploadDraggingNotAvailable from './FileUploadDraggingNotAvailable';
import FileUploadInputDisabled from './FileUploadInputDisabled';
import FileUploadInputValidationStates from './FileUploadInputValidationStates';
import FileUploadInputValidationWithIcon from './FileUploadInputValidationWithIcon';
import FileUploadInputWithAttachment from './FileUploadInputWithAttachment';
import FileUploadSimple from './FileUploadSimple';
import FileUploadUploadDisabled from './FileUploadUploadDisabled';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="FileUpload" tag="Visual demo only" stackAlignment="start">
        <FileUploadSimple />
      </DocsSection>
      <DocsSection title="Validation State with Validation Text" tag="Visual demo only" stackAlignment="start">
        <FileUploadInputValidationStates />
      </DocsSection>
      <DocsSection title="Validation Text with Icon" tag="Visual demo only" stackAlignment="start">
        <FileUploadInputValidationWithIcon />
      </DocsSection>
      <DocsSection title="Input Disabled" tag="Visual demo only" stackAlignment="start">
        <FileUploadInputDisabled />
      </DocsSection>
      <DocsSection title="Upload Interactions Disabled" tag="Visual demo only" stackAlignment="start">
        <FileUploadUploadDisabled />
      </DocsSection>
      <DocsSection title="Dragging not Available" tag="Visual demo only" stackAlignment="start">
        <FileUploadDraggingNotAvailable />
      </DocsSection>
      <DocsSection title="With File List" tag="Visual demo only" stackAlignment="stretch">
        <FileUploadInputWithAttachment />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
