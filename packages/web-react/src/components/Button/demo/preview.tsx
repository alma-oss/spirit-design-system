'use client';

import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import ButtonDefault from './ButtonDefault';
import ButtonDisabled from './ButtonDisabled';
import ButtonFluid from './ButtonFluid';
import ButtonLoading from './ButtonLoading';
import ButtonResponsive from './ButtonResponsive';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default" stackAlignment="stretch">
        <ButtonDefault />
      </DocsSection>
      <DocsSection title="Disabled" stackAlignment="stretch">
        <ButtonDisabled />
      </DocsSection>
      <DocsSection title="Loading" stackAlignment="stretch">
        <ButtonLoading />
      </DocsSection>
      <DocsSection title="Fluid" stackAlignment="stretch">
        <ButtonFluid />
      </DocsSection>
      <DocsSection title="Responsive" stackAlignment="start">
        <ButtonResponsive />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
