import { Button, Matrix, PricingPlan, PricingPlanHeader } from '@alma-oss/spirit-web-react';
import React from 'react';
import type { PreviewComponent } from '../../component-catalog';
import { PREVIEW_GUIDES } from '../../component-catalog/constants/previewGuides';

const PricingPlanPreview: PreviewComponent = () => (
  <Matrix cols={2} UNSAFE_style={{ width: 592 }}>
    <PricingPlan hasComparableFeatures>
      <PricingPlanHeader title="Plan 01" price="39 EUR" action={<Button size="large">Get started</Button>} />
    </PricingPlan>
    <PricingPlan hasComparableFeatures>
      <PricingPlanHeader title="Plan 02" price="79 EUR" action={<Button size="large">Get started</Button>} />
    </PricingPlan>
  </Matrix>
);

PricingPlanPreview.guides = PREVIEW_GUIDES.VERTICAL;

export default PricingPlanPreview;
