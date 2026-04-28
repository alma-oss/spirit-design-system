'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import ButtonLinkDefault from './ButtonLinkDefault';
import ButtonLinkDisabled from './ButtonLinkDisabled';
import ButtonLinkFluid from './ButtonLinkFluid';
import ButtonLinkResponsiveSymmetrical from './ButtonLinkResponsiveSymmetrical';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default" stackAlignment="stretch">
        <ButtonLinkDefault />
      </DocsSection>
      <DocsSection title="Disabled" stackAlignment="stretch">
        <ButtonLinkDisabled />
      </DocsSection>
      <DocsSection title="Fluid" stackAlignment="stretch">
        <ButtonLinkFluid />
      </DocsSection>
      <DocsSection title="Responsive Symmetrical" stackAlignment="start">
        <ButtonLinkResponsiveSymmetrical />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
