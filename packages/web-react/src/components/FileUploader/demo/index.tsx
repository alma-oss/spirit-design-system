// Because there is no `dist` directory during the CI run
/* eslint-disable import/no-extraneous-dependencies, import/extensions, import/no-unresolved */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment, import/extensions, import/no-unresolved
// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import FileUploaderAttachment from './FileUploaderAttachment';
import FileUploaderAttachmentWithCustomAction from './FileUploaderAttachmentWithCustomAction';
import FileUploaderAttachmentWithImagePreview from './FileUploaderAttachmentWithImagePreview';
import FileUploaderDefault from './FileUploaderDefault';
import FileUploaderDraggingNotAvailable from './FileUploaderDraggingNotAvailable';
import FileUploaderExampleOfJSControlledForm from './FileUploaderExampleOfJSControlledForm';
import FileUploaderFluidWidth from './FileUploaderFluidWidth';
import FileUploaderInputDisabled from './FileUploaderInputDisabled';
import FileUploaderInputMultiple from './FileUploaderInputMultiple';
import FileUploaderInputMultipleWithFileQueueBehaviorControl from './FileUploaderInputMultipleWithFileQueueBehaviorControl';
import FileUploaderInputValidationStates from './FileUploaderInputValidationStates';
import FileUploaderInputValidationWithIcon from './FileUploaderInputValidationWithIcon';
import FileUploaderInputWithAttachment from './FileUploaderInputWithAttachment';
import FileUploaderMetaData from './FileUploaderMetaData';
import FileUploaderMultipleWithValidation from './FileUploaderMultipleWithValidation';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Input Single File">
        <FileUploaderDefault />
      </DocsSection>
      <DocsSection title="Input Multiple">
        <FileUploaderInputMultiple />
      </DocsSection>
      <DocsSection title="Input Multiple with Validation">
        <FileUploaderMultipleWithValidation />
      </DocsSection>
      <DocsSection title="Input Multiple with File Queue Behavior Control">
        <FileUploaderInputMultipleWithFileQueueBehaviorControl />
      </DocsSection>
      <DocsSection title="Input Validation States">
        <FileUploaderInputValidationStates />
      </DocsSection>
      <DocsSection title="Input Validation Text with Icon">
        <FileUploaderInputValidationWithIcon />
      </DocsSection>
      <DocsSection title="Input Disabled">
        <FileUploaderInputDisabled />
      </DocsSection>
      <DocsSection title="Attachment" tag="Visual demo only">
        <FileUploaderAttachment />
      </DocsSection>
      <DocsSection title="Attachment with Image Preview">
        <FileUploaderAttachmentWithImagePreview />
      </DocsSection>
      <DocsSection title="Attachment with Custom Actions">
        <FileUploaderAttachmentWithCustomAction />
      </DocsSection>
      <DocsSection title="FileUploader with Meta Data">
        <FileUploaderMetaData />
      </DocsSection>
      <DocsSection title="Input with Attachment" tag="Visual demo only">
        <FileUploaderInputWithAttachment />
      </DocsSection>
      <DocsSection title="Dragging not Available" tag="Visual demo only">
        <FileUploaderDraggingNotAvailable />
      </DocsSection>
      <DocsSection title="Fluid Width" tag="Visual demo only">
        <FileUploaderFluidWidth />
      </DocsSection>
      <DocsSection title="Example of JS-Controlled Form">
        <FileUploaderExampleOfJSControlledForm />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
