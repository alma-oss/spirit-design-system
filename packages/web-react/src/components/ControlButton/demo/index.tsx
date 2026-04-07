import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import ControlButtonDisabled from './ControlButtonDisabled';
import ControlButtonExpandedSizeScale from './ControlButtonExpandedSizeScale';
import ControlButtonIcon from './ControlButtonIcon';
import ControlButtonResponsiveSymmetrical from './ControlButtonResponsiveSymmetrical';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Icon" stackAlignment="start">
        <ControlButtonIcon />
      </DocsSection>
      <DocsSection title="Feature Flag: Expanded Size Scale" stackAlignment="start">
        <ControlButtonExpandedSizeScale />
      </DocsSection>
      <DocsSection title="Responsive Symmetrical" stackAlignment="start">
        <ControlButtonResponsiveSymmetrical />
      </DocsSection>
      <DocsSection title="Disabled State" stackAlignment="start">
        <ControlButtonDisabled />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
