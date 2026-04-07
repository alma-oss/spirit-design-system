import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import FileIconVariant from './FileIconVariant';
import FileImagePreviewVariant from './FileImagePreviewVariant';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <div className="spirit-feature-enable-v5-control-button-expanded-size-scale">
        <DocsSection title="File Icon Variant" stackAlignment="stretch">
          <FileIconVariant />
        </DocsSection>
        <DocsSection title="Image Preview Variant" stackAlignment="stretch">
          <FileImagePreviewVariant />
        </DocsSection>
      </div>
    </IconsProvider>
  </StrictMode>,
);
