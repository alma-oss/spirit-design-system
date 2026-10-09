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
} from '@alma-oss/spirit-web-react';
import NextLink from 'next/link';
import { useState } from 'react';
import { routes } from '../routing/routes';
import Eyebrow from './Eyebrow';
import styles from './Hero.module.scss';
import HoverLottie from './HoverLottie';
import PageSection from './PageSection';

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
      UNSAFE_className={styles.Persona}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex direction="vertical" spacing="space-500" UNSAFE_className={styles.PersonaContent}>
        <div className={styles.PersonaAnimation}>
          <HoverLottie path={animation} isHovered={isHovered} className={styles.PersonaLottie} />
        </div>
        <Text size="large" emphasis="semibold" marginBottom="space-0" UNSAFE_className={styles.PersonaTitle}>
          {title}
        </Text>
        <Text size="small" textColor="secondary" marginBottom="space-0">
          {description}
        </Text>
      </Flex>
    </Box>
  );
};

const Hero = () => (
  <PageSection size="large" paddingBottom="small" hasRails={false} className={styles.Hero} backgroundColor="primary">
    <Flex direction="vertical" alignmentX="center" spacing="space-1300">
      <Grid cols={{ mobile: 1, tablet: 12 }} spacingX="space-800">
        <GridItem columnStart={{ tablet: 3 }} columnEnd={{ tablet: 11 }} UNSAFE_className={styles.Intro}>
          <Flex direction="vertical" alignmentX="center" spacing="space-1000">
            <Stack spacing="space-500">
              <Eyebrow isCentered>MEET SPIRIT</Eyebrow>
              <Heading elementType="h2" size="xlarge" textAlignment="center" marginBottom="space-0">
                Design consistently.
                <br />
                Ship faster. Include everyone.
              </Heading>
            </Stack>

            <Text size="large" textColor="secondary" textAlignment="center" marginBottom="space-0">
              Spirit is Alma Career’s design system. Components, tokens and guidelines to design in Figma, build in HTML
              or React, and adapt to any brand.
            </Text>

            <Flex direction="vertical" alignmentX="left" spacing="space-700" UNSAFE_className={styles.Search}>
              <form role="search" className={styles.SearchForm} onSubmit={(event) => event.preventDefault()}>
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
                    <Flex key={label} alignmentY="center" spacing="space-0">
                      <Text elementType="span" size="small" marginBottom="space-0">
                        <Link
                          elementType={NextLink}
                          href={href}
                          underlined="hover"
                          UNSAFE_className={styles.PopularLink}
                        >
                          {label}
                        </Link>
                      </Text>
                      {index < popularLinks.length - 1 && (
                        <Text
                          elementType="span"
                          size="small"
                          marginBottom="space-0"
                          UNSAFE_className={styles.PopularSeparator}
                          aria-hidden="true"
                        >
                          ,
                        </Text>
                      )}
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>

      <div className={styles.Personas}>
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
