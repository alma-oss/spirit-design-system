'use client';

import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import FileIconVariant from './FileIconVariant';
import FileImagePreviewVariant from './FileImagePreviewVariant';
import FileTruncatedLabel from './FileTruncatedLabel';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="File Icon Variant" stackAlignment="stretch">
        <FileIconVariant />
      </DocsSection>
      <DocsSection title="Image Preview Variant" stackAlignment="stretch">
        <FileImagePreviewVariant />
      </DocsSection>
      <DocsSection title="Label Truncation" stackAlignment="stretch">
        <FileTruncatedLabel />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
