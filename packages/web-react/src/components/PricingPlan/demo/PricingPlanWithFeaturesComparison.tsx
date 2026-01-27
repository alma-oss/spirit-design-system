import React, { useState } from 'react';
import { ButtonLink } from '../../ButtonLink';
import { Flex } from '../../Flex';
import { Matrix } from '../../Matrix';
import { ScrollView } from '../../ScrollView';
import { SegmentedControl, SegmentedControlItem } from '../../SegmentedControl';
import PricingPlan from '../PricingPlan';
import PricingPlanBody from '../PricingPlanBody';
import PricingPlanFooter from '../PricingPlanFooter';
import PricingPlanHeader from '../PricingPlanHeader';

const PricingPlanWithFeaturesComparison = () => {
  const [selectedValue, setSelectedValue] = useState<string | string[]>('monthly');

  return (
    <>
      <Flex marginBottom="space-1000" alignmentY="baseline" alignmentX="right">
        <SegmentedControl
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          label="Billing"
          name="segmented"
        >
          <SegmentedControlItem key="monthly" id="billing-control-monthly" value="monthly">
            Monthly billing
          </SegmentedControlItem>
          <SegmentedControlItem key="yearly" id="billing-control-yearly" value="yearly">
            Yearly billing
          </SegmentedControlItem>
        </SegmentedControl>
      </Flex>

      <div className="breakout-container d-grid">
        <ScrollView direction="horizontal">
          <Matrix
            cols={{ mobile: 1, tablet: 3 }}
            spacingX={{ mobile: 'space-600', tablet: 'space-700' }}
            marginBottom="space-800"
            UNSAFE_style={{ marginInline: 'var(--container-padding-inline)' }}
          >
            <PricingPlan hasComparableFeatures marginBottom={{ mobile: 'space-600', tablet: 'space-0' }}>
              <PricingPlanHeader
                action={
                  <ButtonLink
                    href="#"
                    size="large"
                    id="plan-comparison-1-action"
                    aria-labelledby="plan-comparison-1-action plan-comparison-1-title"
                  >
                    Get started
                  </ButtonLink>
                }
                title={<span id="plan-comparison-1-title">Plan 1</span>}
                subtitle="Supporting text or message"
                price={selectedValue === 'monthly' ? '39 EUR' : '35 EUR'}
              />
              <PricingPlanBody
                id="tier-comparison-1"
                description="Optional description"
                features={[
                  {
                    title: 'Feature name',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  },
                  {
                    title: 'Feature name',
                    description:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.',
                  },
                  {
                    title: 'Feature name',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  },
                ]}
              />
              <PricingPlanFooter>footer</PricingPlanFooter>
            </PricingPlan>
            <PricingPlan hasComparableFeatures marginBottom={{ mobile: 'space-600', tablet: 'space-0' }}>
              <PricingPlanHeader
                action={
                  <ButtonLink
                    href="#"
                    size="large"
                    id="plan-comparison-2-action"
                    aria-labelledby="plan-comparison-2-action plan-comparison-2-title"
                  >
                    Get started
                  </ButtonLink>
                }
                badge={<span id="plan-comparison-2-badge">Recommended</span>}
                title={
                  <span id="plan-comparison-2-title" aria-labelledby="plan-comparison-2-badge plan-comparison-2-title">
                    Plan 2
                  </span>
                }
                subtitle="Supporting text or message"
                price={selectedValue === 'monthly' ? '59 EUR' : '54 EUR'}
              />
              <PricingPlanBody
                id="tier-comparison-2"
                description="Optional description"
                features={[
                  {
                    title: 'Feature name',
                    description:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.',
                  },
                  {
                    title: 'Feature name',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  },
                  {
                    title: 'Feature name',
                    description:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.',
                  },
                ]}
              />
              <PricingPlanFooter>footer</PricingPlanFooter>
            </PricingPlan>
            <PricingPlan hasComparableFeatures isHighlighted>
              <PricingPlanHeader
                action={
                  <ButtonLink
                    href="#"
                    size="large"
                    id="plan-comparison-3-action"
                    aria-labelledby="plan-comparison-3-action plan-comparison-3-title"
                  >
                    Get started
                  </ButtonLink>
                }
                title={<span id="plan-comparison-3-title">Plan 3</span>}
                price={selectedValue === 'monthly' ? '99 EUR' : '89 EUR'}
                note="Another supporting text or message"
              />
              <PricingPlanBody
                id="tier-comparison-3"
                description="Optional description"
                features={[
                  {
                    title: 'Feature name',
                    description:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.',
                  },
                  {
                    title: 'Feature name with a very long name that should wrap to the next line',
                    description:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.',
                  },
                  {
                    title: 'Feature name',
                    description:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.',
                  },
                  {
                    title: 'Feature name',
                    description:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.',
                  },
                ]}
              />
              <PricingPlanFooter>footer</PricingPlanFooter>
            </PricingPlan>
          </Matrix>
        </ScrollView>
      </div>
    </>
  );
};

export default PricingPlanWithFeaturesComparison;
