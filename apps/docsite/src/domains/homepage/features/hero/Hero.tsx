'use client';

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  InputAddon,
  Link,
  Stack,
  Text,
  TextField,
  UNSTABLE_EyebrowText,
} from '@alma-oss/spirit-web-react';
import NextLink from 'next/link';
import { useState } from 'react';
import { routes } from '../../../routing/routes';
import HoverLottie from '../../ui/HoverLottie';
import PageSection from '../../ui/PageSection';
import './Hero.scss';

const popularLinks = [
  { label: 'Button', href: routes.component('Button') },
  { label: 'Modal', href: routes.component('Modal') },
  { label: 'Theme tokens', href: `${routes.design}/theme-tokens` },
  { label: 'Migrations', href: routes.migrations },
  { label: 'Icons', href: routes.icons },
];

const personas = [
  {
    title: 'For Designers',
    description: 'Explore Figma libraries, design tokens, and layout specs to craft pixel-perfect interfaces.',
    animation: '/lottie/building-blocks.json',
  },
  {
    title: 'For Developers',
    description: 'Browse production-ready React and Twig components with live code snippets.',
    animation: '/lottie/working-on-a-laptop.json',
  },
  {
    title: 'For Product',
    description: 'Discover how adopting Spirit reduces tech debt, unifies design, and speeds up product delivery.',
    animation: '/lottie/business-growth.json',
  },
  {
    title: 'For QA & A11y',
    description: 'Discover WCAG 2.1 guidelines, keyboard navigation patterns, and screen reader setup.',
    animation: '/lottie/analysis.json',
  },
];

interface PersonaCardProps {
  title: string;
  description: string;
  animation: string;
}

const PersonaCard = ({ title, description, animation }: PersonaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      backgroundColor="primary"
      borderColor="basic"
      borderWidth="100"
      borderRadius="500"
      padding="space-800"
      UNSAFE_className="Hero__persona"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Stack spacing="space-500">
        <div className="Hero__personaAnimation">
          <HoverLottie path={animation} isHovered={isHovered} className="Hero__personaLottie" />
        </div>
        <Text size="large" fontWeight="semibold" marginBottom="space-0">
          {/* TODO: Link to the persona pages once they exist. */}
          <Link elementType="span" underlined="never">
            {title}
          </Link>
        </Text>
        <Text size="small" textColor="secondary" marginBottom="space-0">
          {description}
        </Text>
      </Stack>
    </Box>
  );
};

const Hero = () => (
  <PageSection size="large" paddingBottom="small" hasRails={false} className="Hero" backgroundColor="primary">
    <Flex direction="vertical" alignmentX="center" spacing="space-1300">
      <Grid cols={{ mobile: 1, tablet: 12 }} spacingX="space-800">
        <GridItem columnStart={{ tablet: 3 }} columnEnd={{ tablet: 11 }} UNSAFE_className="Hero__intro">
          <Stack spacing="space-1000">
            <Stack spacing="space-500">
              <UNSTABLE_EyebrowText textAlignment="center" textColor="accent-01-basic">
                MEET SPIRIT
              </UNSTABLE_EyebrowText>
              <Heading elementType="h1" size="xlarge" textAlignment="center" marginBottom="space-0">
                Design consistently.
                <br />
                Ship faster. Include everyone.
              </Heading>
            </Stack>

            <Text size="large" textColor="secondary" textAlignment="center" marginBottom="space-0">
              Spirit is Alma Career’s design system. Components, tokens and guidelines to design in Figma, build in HTML
              or React, and adapt to any brand.
            </Text>

            <Stack spacing="space-700">
              <form role="search" onSubmit={(event) => event.preventDefault()}>
                <TextField
                  id="docs-search"
                  name="q"
                  type="search"
                  size="large"
                  label="Search components, tokens and guides"
                  isLabelHidden
                  placeholder="Search components, tokens and guides"
                  startAddon={
                    <InputAddon elementType="label" htmlFor="docs-search">
                      <Icon name="search" />
                    </InputAddon>
                  }
                  endAddon={
                    <InputAddon>
                      <Icon name="placeholder" />
                    </InputAddon>
                  }
                />
              </form>

              <Flex isWrapping alignmentX="left" alignmentY="center" spacingX="space-700" spacingY="space-300">
                <Text elementType="span" size="small" textColor="secondary">
                  Popular:
                </Text>
                <Flex isWrapping alignmentX="left" alignmentY="center" spacing="space-300">
                  {popularLinks.map(({ label, href }, index) => (
                    <Text key={label} elementType="span" size="small" marginBottom="space-0">
                      <Link elementType={NextLink} href={href} underlined="never">
                        {label}
                        {index < popularLinks.length - 1 ? <span aria-hidden="true">,</span> : null}
                      </Link>
                    </Text>
                  ))}
                </Flex>
              </Flex>
            </Stack>
          </Stack>
        </GridItem>
      </Grid>

      <div className="Hero__personas">
        <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} spacing="space-1000">
          {personas.map((persona) => (
            <PersonaCard key={persona.title} {...persona} />
          ))}
        </Grid>
      </div>

      <Text size="large" textColor="secondary">
        A shared visual language powering products used by 100,000+ people every day.
      </Text>
    </Flex>
  </PageSection>
);

export default Hero;
