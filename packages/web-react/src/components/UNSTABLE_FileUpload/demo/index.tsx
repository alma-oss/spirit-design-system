// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import FileUploadAttachment from './FileUploadAttachment';
import FileUploadAttachmentWithCustomAction from './FileUploadAttachmentWithCustomAction';
import FileUploadAttachmentWithImagePreview from './FileUploadAttachmentWithImagePreview';
import FileUploadDraggingNotAvailable from './FileUploadDraggingNotAvailable';
import FileUploadFluidWidth from './FileUploadFluidWidth';
import FileUploadInputDisabled from './FileUploadInputDisabled';
import FileUploadInputMultiple from './FileUploadInputMultiple';
import FileUploadInputValidationStates from './FileUploadInputValidationStates';
import FileUploadInputValidationWithIcon from './FileUploadInputValidationWithIcon';
import FileUploadInputWithAttachment from './FileUploadInputWithAttachment';
import FileUploadInputWithHiddenLabel from './FileUploadInputWithHiddenLabel';
import FileUploadSimple from './FileUploadSimple';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Simple File Upload">
        <FileUploadSimple />
      </DocsSection>
      <DocsSection title="Multiple Files Upload">
        <FileUploadInputMultiple />
      </DocsSection>
      <DocsSection title="Attachment with Image Preview">
        <FileUploadAttachmentWithImagePreview />
      </DocsSection>
      <DocsSection title="Attachment with Custom Actions">
        <FileUploadAttachmentWithCustomAction />
      </DocsSection>
      <DocsSection title="Input Validation States" tag="Visual demo only">
        <FileUploadInputValidationStates />
      </DocsSection>
      <DocsSection title="Input Validation Text with Icon" tag="Visual demo only">
        <FileUploadInputValidationWithIcon />
      </DocsSection>
      <DocsSection title="Input Disabled" tag="Visual demo only">
        <FileUploadInputDisabled />
      </DocsSection>
      <DocsSection title="Attachment" tag="Visual demo only">
        <FileUploadAttachment />
      </DocsSection>
      <DocsSection title="Input with Attachment" tag="Visual demo only">
        <FileUploadInputWithAttachment />
      </DocsSection>
      <DocsSection title="Dragging not Available" tag="Visual demo only">
        <FileUploadDraggingNotAvailable />
      </DocsSection>
      <DocsSection title="Fluid Width" tag="Visual demo only">
        <FileUploadFluidWidth />
      </DocsSection>
      <DocsSection title="Input with Hidden Label" tag="Visual demo only">
        <FileUploadInputWithHiddenLabel />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
