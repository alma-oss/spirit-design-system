import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import PartnerLogoDefault from './PartnerLogoDefault';
import PartnerLogoFluid from './PartnerLogoFluid';
import PartnerLogoResponsiveSize from './PartnerLogoResponsiveSize';
import PartnerLogoSafeAreaDisabled from './PartnerLogoSafeAreaDisabled';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DocsSection title="Default" hasStack={false}>
      <PartnerLogoDefault />
    </DocsSection>
    <DocsSection title="Disabled safe area" hasStack={false}>
      <PartnerLogoSafeAreaDisabled />
    </DocsSection>
    <DocsSection title="Responsive Size" hasStack={false}>
      <PartnerLogoResponsiveSize />
    </DocsSection>
    <DocsSection title="Fluid Size" hasStack={false}>
      <PartnerLogoFluid />
    </DocsSection>
  </StrictMode>,
);
