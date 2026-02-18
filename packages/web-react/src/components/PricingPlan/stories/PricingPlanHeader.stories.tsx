import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ButtonLink } from '../../ButtonLink';
import PricingPlan from '../PricingPlan';
import PricingPlanHeader from '../PricingPlanHeader';
import ReadMe from '../README.md?raw';

const meta: Meta<typeof PricingPlanHeader> = {
  title: 'Components/PricingPlan',
  component: PricingPlanHeader,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    action: {
      control: 'select',
      options: ['buttonLink', undefined],
      table: {
        defaultValue: { summary: 'undefined' },
      },
      description: `This is the place for the content of the PricingPlanHeader action. In the real code
        you can pass in any children you want. In this demo we have predefined options:
        \`buttonLink\` and \`undefined\`. Please note the predefined options
        in this demo are not customizable.`,
      mapping: {
        buttonLink: (
          <ButtonLink href="#" size="large" id="plan-action" aria-labelledby="plan-action plan-title">
            Subscribe
          </ButtonLink>
        ),
      },
    },
    badge: {
      control: 'text',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    note: {
      control: 'text',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    price: {
      control: 'text',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    subtitle: {
      control: 'text',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    title: {
      control: 'select',
      options: ['label', undefined],
      table: {
        defaultValue: { summary: 'undefined' },
      },
      description: `This is the place for the content of the PricingPlanHeader title. In the real code
        you can pass in any children you want. In this demo we have predefined options:
        \`label\` and \`undefined\`. Please note the predefined options
        in this demo are not customizable.`,
      mapping: {
        label: <span id="plan-title">Premium Plan</span>,
      },
    },
  },
  args: {
    action: 'buttonLink',
    badge: undefined,
    note: 'Another supporting text or message',
    price: '39 EUR',
    subtitle: 'Supporting text or message',
    title: 'Premium Plan',
  },
};

export default meta;
type Story = StoryObj<typeof PricingPlanHeader>;

export const PricingPlanHeaderPlayground: Story = {
  name: 'PricingPlanHeader',
  render: (args) => (
    <PricingPlan>
      <PricingPlanHeader {...args} />
    </PricingPlan>
  ),
};

export const PricingPlanHeaderWithBadge: Story = {
  name: 'PricingPlanHeader with Badge',
  render: () => (
    <PricingPlan>
      <PricingPlanHeader
        action={
          <ButtonLink href="#" size="large" id="plan-action" aria-labelledby="plan-action plan-title">
            Get started
          </ButtonLink>
        }
        badge={<span id="plan-badge">Recommended</span>}
        title={
          <span id="plan-title" aria-labelledby="plan-badge plan-title">
            Plan 2
          </span>
        }
        subtitle="Supporting text or message"
        price="59 EUR"
      />
    </PricingPlan>
  ),
};
