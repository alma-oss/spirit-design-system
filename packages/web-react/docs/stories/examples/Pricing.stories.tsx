import { Box, Button, Divider, Flex, Heading, Icon, Section, Tag, Text } from '../../../src/components';
import React, { CSSProperties } from 'react';

export default {
  title: 'Examples/Layout Templates/Pricing',
  tags: ['!autodocs'],
  parameters: {
    controls: { disable: true },
  },
};

const BORDER_RADIUS = 'var(--radius/radius-500, 16px)';

type ColumnPosition = 'top' | 'middle' | 'bottom';

function getColumnStyle(highlighted: boolean, position: ColumnPosition): CSSProperties {
  const bg = highlighted
    ? 'var(--themed/component/pricing-plan/highlighted-background, #f2f7fd)'
    : 'var(--themed/background/primary, #fdfdfc)';
  const bc = highlighted
    ? 'var(--themed/component/pricing-plan/highlighted-border, #80b2eb)'
    : 'var(--themed/border/basic, #d9d9d9)';

  return {
    flex: '1 0 0',
    minWidth: 0,
    background: bg,
    borderLeft: `1px solid ${bc}`,
    borderRight: `1px solid ${bc}`,
    ...(position === 'top' && {
      borderTop: `1px solid ${bc}`,
      borderTopLeftRadius: BORDER_RADIUS,
      borderTopRightRadius: BORDER_RADIUS,
    }),
    ...(position === 'bottom' && {
      borderBottom: `1px solid ${bc}`,
      borderBottomLeftRadius: BORDER_RADIUS,
      borderBottomRightRadius: BORDER_RADIUS,
    }),
  };
}

const plans = [
  {
    id: 'standard',
    name: 'Plan name',
    description: "Just a friendly reminder that I'm here for you!",
    price: '9 690 Kč',
    note: 'Supporting text or message',
    highlighted: false,
  },
  {
    id: 'highlighted',
    name: 'Plan name',
    description: "Just a friendly reminder that I'm here for you!",
    price: '39 000 Kč',
    note: "Just a friendly reminder that we're here for you!",
    highlighted: true,
  },
];

const features: { id: string; name: string; descriptions: [string, string] }[] = [
  {
    id: 'feature-1',
    name: 'Function Name',
    descriptions: ["Here's a friendly reminder that I'm here for you!", 'Sending some good vibes your way!'],
  },
  {
    id: 'feature-2',
    name: 'Function Name',
    descriptions: ['Supporting text or message', 'Just a friendly note to back you up!'],
  },
  {
    id: 'feature-3',
    name: 'Function Name',
    descriptions: [
      "Just a quick message to say I'm cheering for you!",
      "Hey! Just wanted to remind you that I'm here for you.",
    ],
  },
];

const lastFeature = {
  name: 'Function Name',
  descriptions: ['Supporting text or message', 'Supporting text or message'] as [string, string],
};

const FeatureContent = ({ name, description }: { name: string; description: string }) => (
  <Flex spacing="space-500" alignmentY="top">
    <Box UNSAFE_style={{ display: 'flex', alignItems: 'center', height: '24px', flexShrink: 0 }}>
      <Icon name="check-plain" />
    </Box>
    <Flex direction="vertical" spacing="space-300">
      <Text
        emphasis="semibold"
        marginBottom="space-0"
        UNSAFE_style={{ textDecoration: 'underline dotted', textDecorationSkipInk: 'none' }}
      >
        {name}
      </Text>
      <Text size="small" textColor="secondary" marginBottom="space-0">
        {description}
      </Text>
    </Flex>
  </Flex>
);

const PricingTable = () => (
  <Flex direction="vertical">
    {/* Badge row – top position with rounded top corners */}
    <Flex spacing="space-1000">
      {plans.map((plan) => (
        <Box
          key={plan.id}
          paddingX="space-800"
          paddingY="space-500"
          UNSAFE_style={{ ...getColumnStyle(plan.highlighted, 'top'), minHeight: '40px' }}
        />
      ))}
    </Flex>

    {/* Plan name row */}
    <Flex spacing="space-1000" alignmentY="stretch">
      {plans.map((plan) => (
        <Box
          key={plan.id}
          paddingTop="space-700"
          paddingX="space-800"
          UNSAFE_style={getColumnStyle(plan.highlighted, 'middle')}
        >
          <Flex direction="vertical" spacing="space-300">
            <Heading elementType="div" size="small" marginBottom="space-0">
              {plan.name}
            </Heading>
            <Text size="small" marginBottom="space-0">
              {plan.description}
            </Text>
          </Flex>
        </Box>
      ))}
    </Flex>

    {/* Price row */}
    <Flex spacing="space-1000" alignmentY="stretch">
      {plans.map((plan) => (
        <Box
          key={plan.id}
          paddingTop="space-800"
          paddingBottom="space-900"
          paddingX="space-800"
          UNSAFE_style={getColumnStyle(plan.highlighted, 'middle')}
        >
          <Flex direction="vertical" spacing="space-700" alignmentX="stretch">
            <Heading elementType="div" size="medium" UNSAFE_style={{ textAlign: 'center' }} marginBottom="space-0">
              {plan.price}
            </Heading>
            <Flex direction="vertical" spacing="space-700" alignmentX="stretch">
              <Button size="large">Button</Button>
              <Text size="small" textColor="secondary" UNSAFE_style={{ textAlign: 'center' }} marginBottom="space-0">
                {plan.note}
              </Text>
            </Flex>
          </Flex>
        </Box>
      ))}
    </Flex>

    {/* Horizontal dividers */}
    <Flex spacing="space-1000">
      {plans.map((plan) => (
        <Divider key={plan.id} UNSAFE_style={{ flex: '1 0 0', minWidth: 0 }} />
      ))}
    </Flex>

    {/* Headline row */}
    <Flex spacing="space-1000" alignmentY="stretch">
      {plans.map((plan) => (
        <Box
          key={plan.id}
          paddingX="space-800"
          paddingY="space-700"
          UNSAFE_style={getColumnStyle(plan.highlighted, 'middle')}
        >
          <Text size="small" textColor="secondary" marginBottom="space-0">
            Headline
          </Text>
        </Box>
      ))}
    </Flex>

    {/* Feature rows */}
    {features.map((feature) => (
      <Flex key={feature.id} spacing="space-1000" alignmentY="stretch">
        {plans.map((plan, planIndex) => (
          <Box
            key={plan.id}
            paddingX="space-800"
            paddingY="space-600"
            UNSAFE_style={getColumnStyle(plan.highlighted, 'middle')}
          >
            <FeatureContent name={feature.name} description={feature.descriptions[planIndex]} />
          </Box>
        ))}
      </Flex>
    ))}

    {/* Last feature row – bottom position with rounded bottom corners */}
    <Flex spacing="space-1000" alignmentY="stretch">
      {plans.map((plan, planIndex) => (
        <Box
          key={plan.id}
          paddingTop="space-600"
          paddingBottom="space-1000"
          paddingX="space-800"
          UNSAFE_style={getColumnStyle(plan.highlighted, 'bottom')}
        >
          <FeatureContent name={lastFeature.name} description={lastFeature.descriptions[planIndex]} />
        </Box>
      ))}
    </Flex>
  </Flex>
);

export const WithTable = () => (
  <Section size="xlarge" backgroundColor="primary">
    <Flex direction="vertical" spacing="space-1400" alignmentX="stretch">
      <Box UNSAFE_style={{ maxWidth: '800px' }}>
        <Flex direction="vertical" spacing="space-700" alignmentX="left">
          <Tag isSubtle size="small">
            Small Tag
          </Tag>
          <Flex direction="vertical" spacing="space-900" alignmentX="left">
            <Heading elementType="h1" size="large" marginBottom="space-0">
              Spirit Design System
            </Heading>
            <Text size="large" textColor="secondary">
              Our mission is to develop a comprehensive design system that can swiftly adapt to any business or
              technological demands, thereby preventing the redundancy of steps when establishing new frontends.
            </Text>
          </Flex>
        </Flex>
      </Box>
      <PricingTable />
    </Flex>
  </Section>
);
