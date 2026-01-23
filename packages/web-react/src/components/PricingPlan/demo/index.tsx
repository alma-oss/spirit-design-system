// Because there is no `dist` directory during the CI run
/* eslint-disable import/no-extraneous-dependencies, import/extensions, import/no-unresolved */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import PricingPlanDefault from './PricingPlanDefault';
import PricingPlanInMatrix from './PricingPlanInMatrix';
import PricingPlanWithFeaturesComparison from './PricingPlanWithFeaturesComparison';
import PricingPlanWithModal from './PricingPlanWithModal';
import PricingPlanWithTooltip from './PricingPlanWithTooltip';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default" stackAlignment="start">
        <PricingPlanDefault />
      </DocsSection>
      <DocsSection title="Pricing Plan with Tooltip" stackAlignment="start">
        <PricingPlanWithTooltip />
      </DocsSection>
      <DocsSection title="Pricing Plan with Modal" stackAlignment="start">
        <PricingPlanWithModal />
      </DocsSection>
      <DocsSection title="Pricing Plans in Matrix and Scroll View" stackAlignment="start">
        <PricingPlanInMatrix />
      </DocsSection>
      <DocsSection title="Pricing Plans with Features Comparison" hasStack={false}>
        <PricingPlanWithFeaturesComparison />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
