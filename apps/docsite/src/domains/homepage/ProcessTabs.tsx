'use client';

import { Box, Grid, GridItem, Heading, Item, Link, Stack, Text } from '@alma-oss/spirit-web-react';
import NextLink from 'next/link';
import { type KeyboardEvent, useState } from 'react';
import { routes } from '../routing/routes';
import PageSection from './PageSection';
import styles from './ProcessTabs.module.scss';

const REPOSITORY_URL = 'https://github.com/alma-oss/spirit-design-system/tree/main';

interface Step {
  id: string;
  label: string;
  /** The content of the step, steps without it show a placeholder. */
  content?: {
    title: string;
    description: string;
    links: { label: string; href: string }[];
  };
}

const steps: Step[] = [
  {
    id: 'design',
    label: 'Design',
    content: {
      title: 'Start on-system',
      description: 'Pick components from the Figma UI kit and design with the same building blocks developers use.',
      // The Figma UI kit has no page of its own yet, so it links to the design section.
      links: [
        { label: 'Figma UI kit', href: routes.design },
        { label: 'Foundations', href: `${routes.design}/global-tokens` },
        { label: 'Visual hierarchy', href: `${routes.design}/visual-hierarchy` },
      ],
    },
  },
  {
    id: 'theme',
    label: 'Theme',
    content: {
      title: 'Make it yours',
      description:
        'Swap brand tokens for colors, radii, typography, shadows and icons. The structure stays, the brand changes.',
      links: [
        { label: 'Theme tokens', href: `${routes.design}/theme-tokens` },
        { label: 'Customization guide', href: `${routes.introduction}/how-to-customize-spirit` },
      ],
    },
  },
  {
    id: 'build',
    label: 'Build',
    content: {
      title: 'Ship production UI',
      description: 'Install the packages and use components that match the design one to one.',
      // The packages have no pages in the docsite yet, so they link to their READMEs on GitHub.
      links: [
        { label: 'Web package', href: `${REPOSITORY_URL}/packages/web` },
        { label: 'React package', href: `${REPOSITORY_URL}/packages/web-react` },
        { label: 'Component docs', href: routes.components },
      ],
    },
  },
  {
    id: 'check',
    label: 'Check',
    content: {
      title: 'Stay on-system',
      description: 'Catch detached components, hardcoded values and missing tokens before they reach production.',
      // The design check has no page of its own yet, so it links to the design section.
      links: [
        { label: 'Component status', href: `${routes.components}/status` },
        { label: 'Design Check', href: routes.design },
      ],
    },
  },
  {
    id: 'evolve',
    label: 'Evolve',
    content: {
      title: 'Upgrade and give back',
      description: 'Follow releases, migrate with confidence and bring your improvements back to the system.',
      links: [
        { label: 'Releases', href: routes.releases },
        { label: 'Migrations', href: routes.migrations },
        { label: 'Contribution', href: routes.development },
      ],
    },
  },
];

const ProcessTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex];

  // Arrow keys, Home and End move between the tabs, as the tabs pattern expects.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const lastIndex = steps.length - 1;
    const nextIndex = {
      ArrowRight: activeIndex === lastIndex ? 0 : activeIndex + 1,
      ArrowLeft: activeIndex === 0 ? lastIndex : activeIndex - 1,
      Home: 0,
      End: lastIndex,
    }[event.key];

    if (nextIndex !== undefined) {
      event.preventDefault();
      setActiveIndex(nextIndex);
      document.getElementById(`process-tab-${steps[nextIndex].id}`)?.focus();
    }
  };

  return (
    <PageSection size="xlarge" hasTopLine backgroundColor="primary">
      <Stack spacing="space-1200">
        <Heading elementType="h2" size="large" UNSAFE_className={styles.Headline}>
          From first frame to production. And back.
        </Heading>

        <Stack spacing="space-1100">
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
          <div role="tablist" aria-label="Design system adoption process" onKeyDown={onKeyDown}>
            <Grid cols={{ mobile: 1, tablet: 5 }} spacing="space-700">
              {steps.map(({ id, label }, index) => {
                const isActive = index === activeIndex;

                return (
                  <Box key={id} borderWidth="100" borderRadius="300" UNSAFE_className={styles.Step}>
                    <Item
                      elementType="button"
                      id={`process-tab-${id}`}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      aria-controls={`process-panel-${id}`}
                      tabIndex={isActive ? 0 : -1}
                      isSelected={isActive}
                      onClick={() => setActiveIndex(index)}
                    >
                      <Stack spacing="space-300">
                        <Text textColor="secondary">{String(index + 1).padStart(2, '0')}</Text>
                        <Text emphasis="semibold" size="large">
                          {label}
                        </Text>
                      </Stack>
                    </Item>
                  </Box>
                );
              })}
            </Grid>
          </div>

          <div role="tabpanel" id={`process-panel-${activeStep.id}`} aria-labelledby={`process-tab-${activeStep.id}`}>
            <Grid cols={{ mobile: 1, tablet: 12 }} spacing="space-1000">
              {activeStep.content ? (
                <GridItem columnStart={{ tablet: 1 }} columnEnd={{ tablet: 6 }}>
                  <Stack spacing="space-900" UNSAFE_className={styles.Description}>
                    <Stack spacing="space-600">
                      <Heading elementType="h3" size="medium">
                        {activeStep.content.title}
                      </Heading>
                      <Text textColor="secondary">{activeStep.content.description}</Text>
                    </Stack>
                    <Stack spacing="space-500">
                      <Text textColor="secondary">Docs</Text>
                      {activeStep.content.links.map(({ label, href }) => (
                        <Link key={label} elementType={NextLink} href={href}>
                          {label}
                        </Link>
                      ))}
                    </Stack>
                  </Stack>
                </GridItem>
              ) : (
                <GridItem columnStart={{ tablet: 1 }} columnEnd={{ tablet: 6 }}>
                  <div className="docs-Placeholder">
                    <div className="docs-Placeholder__text">
                      <Text emphasis="semibold">Placeholder</Text>
                      <Text textColor="secondary">{`${activeStep.label}: text and links`}</Text>
                    </div>
                  </div>
                </GridItem>
              )}

              <GridItem columnStart={{ tablet: 6 }} columnEnd={{ tablet: 13 }}>
                <Box
                  backgroundColor="secondary"
                  borderColor="basic"
                  borderWidth="100"
                  borderRadius="500"
                  UNSAFE_className={styles.Image}
                >
                  <Text textColor="secondary">Image placeholder</Text>
                </Box>
              </GridItem>
            </Grid>
          </div>
        </Stack>
      </Stack>
    </PageSection>
  );
};

export default ProcessTabs;
