'use client';

import { Flex, Heading, IconBox, Stack, Text } from '@alma-oss/spirit-web-react';
import { routes } from '../routing/routes';
import styles from './ComponentsOverview.module.scss';
import FeatureGrid, { type Feature } from './FeatureGrid';
import GridShowcase from './GridShowcase';
import PageSection from './PageSection';

// The subpages are not available yet, so every card links to the components page for now.
const features: Feature[] = [
  {
    title: 'Figma and code, basically twins',
    description:
      'A component in Figma is the very same one running in the browser, and you always know whether it matches the code. A handoff without surprises.',
    href: routes.components,
  },
  {
    title: 'Design block',
    description:
      'No babysitting the container, grid or section spacing. Drop your content into a slot and boom, a finished page section. Cards, a form, text with an image, whatever.',
    href: routes.components,
  },
  {
    title: 'Hierarchy through sizes',
    description:
      'A Large select box comes with a Large Label. You design the relationships between elements once and they hold everywhere.',
    href: routes.components,
  },
  {
    title: 'Ready-made layouts to kick things off',
    description:
      'Stop redrawing the same card layouts, FAQs and logo rows. They are ready in Figma and in code, so just pick one and fill it with content.',
    href: routes.components,
  },
];

const ComponentsOverview = () => (
  <PageSection size="xlarge" hasTopLine backgroundColor="primary">
    <Stack spacing="space-1200">
      <Flex direction="vertical" alignmentX="center" spacing="space-700" UNSAFE_className={styles.Intro}>
        <IconBox iconName="placeholder" color="success" shape="circle" size="large" />
        <Heading elementType="h2" size="large" textAlignment="center">
          From a single component to a whole page
        </Heading>
        <Text textColor="secondary" textAlignment="center">
          You build from parts that have already survived design, development and testing. No wondering whether it will
          work, just what you will make with it.
        </Text>
      </Flex>

      <Stack spacing="space-1300">
        <GridShowcase />

        <FeatureGrid features={features} />
      </Stack>
    </Stack>
  </PageSection>
);

export default ComponentsOverview;
