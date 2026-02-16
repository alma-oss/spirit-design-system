import React from 'react';
import { Stack } from '../..';
import { UNSTABLE_Attachment } from '..';
import { visualOnlyNoopOnDismiss } from './visualOnlyContext';

const AttachmentFluidWidth = () => (
  <Stack aria-label="Attachments" elementType="ul" hasSpacing>
    <UNSTABLE_Attachment id="attachment-fluid-1" isFluid label="My resume.docx" onDismiss={visualOnlyNoopOnDismiss} />
  </Stack>
);

export default AttachmentFluidWidth;
