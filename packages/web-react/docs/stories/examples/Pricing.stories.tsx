import React from 'react';
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Matrix,
  PricingPlan,
  PricingPlanBody,
  PricingPlanHeader,
  ScrollView,
  Section,
  Tag,
  Text,
} from '../../../src/components';

export default {
  title: 'Examples/Layout Templates/Pricing',
  tags: ['!autodocs'],
  parameters: {
    controls: { disable: true },
  },
};

const FEATURE_TITLE = 'Function Name';

// The Figma feature titles use a dotted underline, which Spirit renders only for features that open a Tooltip
// or a Modal. The frame does not expose the tooltip copy, so the generic placeholder from the design is used.
const FEATURE_TOOLTIP = 'Supporting text or message';

interface Plan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  note: string;
  badge?: string;
  isHighlighted?: boolean;
  featureDescriptions: string[];
}

const plans: Plan[] = [
  {
    id: 'plan-1',
    name: 'Plan name',
    subtitle: 'Supporting text or message',
    price: '2 900 Kč',
    note: 'Supporting text or message',
    featureDescriptions: [
      'Hey there! Just a little note to support you.',
      'Supporting text or message',
      'Hey! Just sending some positive energy your way!',
      'Supporting text or message',
    ],
  },
  {
    id: 'plan-2',
    name: 'Plan name',
    subtitle: 'Supporting text or message',
    price: '4 990 Kč',
    note: 'Hey there! Just a little note to back you up.',
    featureDescriptions: [
      'Just wanted to drop a quick message to cheer you on!',
      'Hey there! Just a little message to support you.',
      "Here's a little encouragement to brighten your day!",
      'Supporting text or message',
    ],
  },
  {
    id: 'plan-3',
    name: 'Plan name',
    subtitle: "Just a friendly reminder that I'm here for you!",
    price: '9 690 Kč',
    note: 'Supporting text or message',
    badge: 'Badge',
    featureDescriptions: [
      "Here's a friendly reminder that I'm here for you!",
      'Supporting text or message',
      "Just a quick message to say I'm cheering for you!",
      'Supporting text or message',
    ],
  },
  {
    id: 'plan-4',
    name: 'Plan name',
    subtitle: "Just a friendly reminder that I'm here for you!",
    price: '39 000 Kč',
    note: "Just a friendly reminder that we're here for you!",
    isHighlighted: true,
    featureDescriptions: [
      'Sending some good vibes your way!',
      'Just a friendly note to back you up!',
      "Hey! Just wanted to remind you that I'm here for you.",
      'Supporting text or message',
    ],
  },
];

const PlanColumn = ({ plan }: { plan: Plan }) => (
  <PricingPlan hasComparableFeatures isHighlighted={plan.isHighlighted}>
    <PricingPlanHeader
      action={
        <Button id={`${plan.id}-action`} aria-labelledby={`${plan.id}-action ${plan.id}-title`}>
          Button
        </Button>
      }
      badge={plan.badge && <span id={`${plan.id}-badge`}>{plan.badge}</span>}
      title={
        <span id={`${plan.id}-title`} aria-labelledby={plan.badge && `${plan.id}-badge ${plan.id}-title`}>
          {plan.name}
        </span>
      }
      subtitle={plan.subtitle}
      price={plan.price}
      note={plan.note}
    />
    <PricingPlanBody
      id={plan.id}
      description="Headline"
      features={plan.featureDescriptions.map((description) => ({
        title: FEATURE_TITLE,
        description,
        tooltipContent: FEATURE_TOOLTIP,
      }))}
    />
  </PricingPlan>
);

export const WithTable = () => (
  <Section size="xlarge" backgroundColor="primary">
    <Flex direction="vertical" spacing="space-1400" alignmentX="stretch">
      <Grid cols={12} spacing="space-1000">
        <GridItem columnStart={{ mobile: 1, desktop: 3 }} columnEnd={{ mobile: 'span 12', desktop: 'span 8' }}>
          <Flex direction="vertical" spacing="space-700" alignmentX="center" alignmentY="top">
            <Tag isSubtle size="small">
              Label
            </Tag>
            <Flex direction="vertical" spacing="space-900" alignmentX="center" alignmentY="top">
              <Heading elementType="h1" size="large" textAlignment="center" marginBottom="space-0">
                Spirit Design System
              </Heading>
              <Text size="large" textColor="secondary" textAlignment="center">
                Our mission is to develop a comprehensive design system that can swiftly adapt to any business or
                technological demands, thereby preventing the redundancy of steps when establishing new frontends.
              </Text>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>

      <ScrollView direction="horizontal">
        {/* Matrix aligns the feature rows across all four plans */}
        <Matrix cols={4} spacingX="space-800">
          {plans.map((plan) => (
            <PlanColumn key={plan.id} plan={plan} />
          ))}
        </Matrix>
      </ScrollView>
    </Flex>
  </Section>
);
