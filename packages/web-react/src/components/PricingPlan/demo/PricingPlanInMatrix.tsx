import React from 'react';
import { ButtonLink } from '../../ButtonLink';
import { Matrix } from '../../Matrix';
import { ScrollView } from '../../ScrollView';
import PricingPlan from '../PricingPlan';
import PricingPlanBody from '../PricingPlanBody';
import PricingPlanFooter from '../PricingPlanFooter';
import PricingPlanHeader from '../PricingPlanHeader';

const PricingPlanInMatrix = () => (
  <div className="breakout-container d-grid">
    <ScrollView direction="horizontal">
      <Matrix
        spacingX={{ mobile: 'space-600', tablet: 'space-700' }}
        marginBottom="space-800"
        UNSAFE_style={{ marginInline: 'var(--container-padding-inline)' }}
      >
        <PricingPlan>
          <PricingPlanHeader
            action={
              <ButtonLink
                href="#"
                size="large"
                id="plan-matrix-1-action"
                aria-labelledby="plan-matrix-1-action plan-matrix-1-title"
              >
                Get started
              </ButtonLink>
            }
            title={<span id="plan-matrix-1-title">Plan 1</span>}
            subtitle="Supporting text or message"
            price="39 EUR"
          />
          <PricingPlanBody
            id="tier-matrix-1"
            features={[
              {
                title: 'Feature name',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                modalContent: (
                  <>
                    {[...Array(20)].map((_, index) => {
                      const key = `paragraph-${index}`;

                      return <p key={key}>This is a really long text that should be wrapped in a paragraph.</p>;
                    })}
                  </>
                ),
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
        <PricingPlan>
          <PricingPlanHeader
            action={
              <ButtonLink
                href="#"
                size="large"
                id="plan-matrix-2-action"
                aria-labelledby="plan-matrix-2-action plan-matrix-2-title"
              >
                Get started
              </ButtonLink>
            }
            badge={<span id="plan-matrix-2-badge">Recommended</span>}
            title={
              <span id="plan-matrix-2-title" aria-labelledby="plan-matrix-2-badge plan-matrix-2-title">
                Plan 2
              </span>
            }
            subtitle="Supporting text or message"
            price="59 EUR"
          />
          <PricingPlanBody
            id="tier-matrix-2"
            description="Everything in Plan 1 plus:"
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
        <PricingPlan isHighlighted>
          <PricingPlanHeader
            action={
              <ButtonLink
                href="#"
                size="large"
                id="plan-matrix-3-action"
                aria-labelledby="plan-matrix-3-action plan-matrix-3-title"
              >
                Get started
              </ButtonLink>
            }
            title={<span id="plan-matrix-3-title">Plan 3</span>}
            price="99 EUR"
            note="Another supporting text or message"
          />
          <PricingPlanBody
            id="tier-matrix-3"
            description="Everything in Plan 2 plus:"
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
);

export default PricingPlanInMatrix;
