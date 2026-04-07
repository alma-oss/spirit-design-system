import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import ToastColors from './ToastColors';
import ToastContentVariations from './ToastContentVariations';
import ToastDynamicToastQueue from './ToastDynamicToastQueue';
import ToastStaticToast from './ToastStaticToast';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Static Toast">
        <ToastStaticToast />
      </DocsSection>
      <DocsSection title="Dynamic Toast Queue">
        <ToastDynamicToastQueue />
      </DocsSection>
      <DocsSection title="Content Variations">
        <ToastContentVariations />
      </DocsSection>
      <DocsSection title="Colors">
        <ToastColors />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
