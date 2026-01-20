// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import ControlButtonIcon from './ControlButtonIcon';
import ControlButtonResponsiveSymmetrical from './ControlButtonResponsiveSymmetrical';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Icon" stackAlignment="start">
        <ControlButtonIcon />
      </DocsSection>
      <DocsSection title="Responsive Symmetrical" stackAlignment="start">
        <ControlButtonResponsiveSymmetrical />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
