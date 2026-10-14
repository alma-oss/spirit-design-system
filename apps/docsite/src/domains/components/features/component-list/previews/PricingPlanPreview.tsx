'use client';

import { Button, Matrix, PricingPlan, PricingPlanHeader } from '@alma-oss/spirit-web-react';
import React from 'react';

const PricingPlanPreview = () => (
  <Matrix cols={2} UNSAFE_style={{ width: 592 }}>
    <PricingPlan hasComparableFeatures>
      <PricingPlanHeader title="Plan 01" price="39 EUR" action={<Button size="large">Get started</Button>} />
    </PricingPlan>
    <PricingPlan hasComparableFeatures>
      <PricingPlanHeader title="Plan 02" price="79 EUR" action={<Button size="large">Get started</Button>} />
    </PricingPlan>
  </Matrix>
);

export default PricingPlanPreview;
