// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import FileUploadDraggingNotAvailable from './FileUploadDraggingNotAvailable';
import FileUploadInputDisabled from './FileUploadInputDisabled';
import FileUploadInputValidationStates from './FileUploadInputValidationStates';
import FileUploadInputValidationWithIcon from './FileUploadInputValidationWithIcon';
import FileUploadInputWithAttachment from './FileUploadInputWithAttachment';
import FileUploadSimple from './FileUploadSimple';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <div className="spirit-feature-enable-v5-control-button-expanded-size-scale">
        <DocsSection title="FileUpload" stackAlignment="start">
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
        <DocsSection title="Dragging not Available" tag="Visual demo only" stackAlignment="start">
          <FileUploadDraggingNotAvailable />
        </DocsSection>
        <DocsSection title="With File List (UNSTABLE_File)" tag="Visual demo only" stackAlignment="stretch">
          <FileUploadInputWithAttachment />
        </DocsSection>
      </div>
    </IconsProvider>
  </StrictMode>,
);
