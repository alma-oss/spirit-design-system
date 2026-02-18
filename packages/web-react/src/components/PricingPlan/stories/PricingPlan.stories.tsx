import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ButtonLink } from '../../ButtonLink';
import PricingPlan from '../PricingPlan';
import PricingPlanBody from '../PricingPlanBody';
import PricingPlanFooter from '../PricingPlanFooter';
import PricingPlanHeader from '../PricingPlanHeader';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof PricingPlan> = {
  title: 'Components/PricingPlan',
  component: PricingPlan,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'object',
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: {
          summary: 'article',
        },
      },
    },
    hasComparableFeatures: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isHighlighted: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    children: (
      <>
        <PricingPlanHeader
          action={
            <ButtonLink href="#" size="large" id="plan-action" aria-labelledby="plan-action plan-title">
              Subscribe
            </ButtonLink>
          }
          title={<span id="plan-title">Premium plan</span>}
          subtitle="Supporting text or message"
          price="39 EUR"
          note="Another supporting text or message"
        />
        <PricingPlanBody
          id="tier-1"
          features={[
            {
              title: 'Feature name',
              description: 'Feature description.',
            },
          ]}
        />
        <PricingPlanFooter>Footer</PricingPlanFooter>
      </>
    ),
    elementType: 'article',
    hasComparableFeatures: false,
    isHighlighted: false,
  },
};

export default meta;
type Story = StoryObj<typeof PricingPlan>;

export const Playground: Story = {
  name: 'PricingPlan',
  render: (args) => <PricingPlan {...args} />,
};
