'use client';

import { Box, Flex, Grid, GridItem, Heading, Link, Stack, Text } from '@alma-oss/spirit-web-react';
import NextLink from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { routes } from '../routing/routes';
import Eyebrow from './Eyebrow';
import PageSection from './PageSection';
import styles from './WorkflowScroll.module.scss';

const REPOSITORY_URL = 'https://github.com/alma-oss/spirit-design-system/tree/main';

interface WorkflowStep {
  eyebrow: string;
  title: string;
  description: string;
  /** Accessible description of the image shown next to the step. */
  imageAlt: string;
  /** The temporary color of the placeholder image, so the change of the images is easy to see. */
  imageColor:
    | 'accent-01-subtle'
    | 'accent-02-subtle'
    | 'emotion-success-subtle'
    | 'emotion-informative-subtle'
    | 'emotion-warning-subtle';
  links: { label: string; href: string }[];
}

// The images are placeholders until the visuals are ready.
const steps: WorkflowStep[] = [
  {
    eyebrow: 'DESIGN',
    title: 'Start on-system',
    description: 'Pick components from the Figma UI kit and design with the same building blocks developers use.',
    imageAlt: 'Preview of designing with the Figma UI kit',
    imageColor: 'accent-01-subtle',
    // The Figma UI kit has no page of its own yet, so it links to the design section.
    links: [
      { label: 'Figma UI kit', href: routes.design },
      { label: 'Foundations', href: `${routes.design}/global-tokens` },
      { label: 'Visual hierarchy', href: `${routes.design}/visual-hierarchy` },
    ],
  },
  {
    eyebrow: 'THEME',
    title: 'Make it yours',
    description:
      'Swap brand tokens for colors, radii, typography, shadows and icons. The structure stays, the brand changes.',
    imageAlt: 'Preview of switching brand tokens',
    imageColor: 'accent-02-subtle',
    links: [
      { label: 'Theme tokens', href: `${routes.design}/theme-tokens` },
      { label: 'Customization guide', href: `${routes.introduction}/how-to-customize-spirit` },
    ],
  },
  {
    eyebrow: 'BUILD',
    title: 'Ship production UI',
    description: 'Install the packages and use components that match the design one to one.',
    imageAlt: 'Preview of building a page from the packages',
    imageColor: 'emotion-success-subtle',
    // The packages have no pages in the docsite yet, so they link to their READMEs on GitHub.
    links: [
      { label: 'Web package', href: `${REPOSITORY_URL}/packages/web` },
      { label: 'React package', href: `${REPOSITORY_URL}/packages/web-react` },
      { label: 'Component docs', href: routes.components },
    ],
  },
  {
    eyebrow: 'CHECK',
    title: 'Stay on-system',
    description: 'Catch detached components, hardcoded values and missing tokens before they reach production.',
    imageAlt: 'Preview of checking a design for detached components',
    imageColor: 'emotion-informative-subtle',
    // The design check has no page of its own yet, so it links to the design section.
    links: [
      { label: 'Component status', href: `${routes.components}/status` },
      { label: 'Design Check', href: routes.design },
    ],
  },
  {
    eyebrow: 'EVOLVE',
    title: 'Upgrade and give back',
    description: 'Follow releases, migrate with confidence and bring your improvements back to the system.',
    imageAlt: 'Preview of upgrading to a new release',
    imageColor: 'emotion-warning-subtle',
    links: [
      { label: 'Releases', href: routes.releases },
      { label: 'Migrations', href: routes.migrations },
      { label: 'Contribution', href: routes.development },
    ],
  },
];

// The images change when the next step reaches this part of the sticky image height (0 is its top edge, 1 its bottom edge).
const SWITCH_POINT = 0.75;

// Without the sticky image (small screens), the step becomes active when its top edge passes this part of the viewport.
const FALLBACK_TRIGGER_LINE = 0.7;

const StepImage = ({ alt, color, label }: { alt: string; color: WorkflowStep['imageColor']; label: string }) => (
  <Box
    role="img"
    aria-label={alt}
    backgroundColor={color}
    borderColor="basic"
    borderWidth="100"
    borderRadius="500"
    UNSAFE_className={styles.Image}
  >
    <Text textColor="primary" emphasis="semibold" size="large" marginBottom="space-0">
      {label}
    </Text>
  </Box>
);

// The left column with the steps scrolls with the page, the image on the right sticks and follows the active step.
const WorkflowScroll = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isScheduled = false;

    const update = () => {
      isScheduled = false;
      const sticky = stickyRef.current;
      const isImageVisible = sticky !== null && sticky.offsetParent !== null;
      const imageRect = isImageVisible ? sticky.getBoundingClientRect() : null;
      const triggerLine = imageRect
        ? imageRect.top + imageRect.height * SWITCH_POINT
        : window.innerHeight * FALLBACK_TRIGGER_LINE;

      let index = 0;

      stepRefs.current.forEach((step, stepIndex) => {
        if (step && step.getBoundingClientRect().top <= triggerLine) {
          index = stepIndex;
        }
      });

      setActiveIndex(index);
    };

    const onScroll = () => {
      if (!isScheduled) {
        isScheduled = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <PageSection size="xlarge" paddingBottom="large" hasTopLine backgroundColor="primary">
      <Stack spacing="space-1600">
        <Grid cols={{ mobile: 1, tablet: 12 }} spacingX="space-800">
          <GridItem columnStart={{ tablet: 1 }} columnEnd={{ tablet: 6 }}>
            <Stack spacing="space-800">
              <Stack spacing="space-500">
                <Eyebrow>WORKFLOW</Eyebrow>
                <Heading elementType="h2" size="large" marginBottom="space-0">
                  From first frame
                  <br />
                  to production. And back.
                </Heading>
              </Stack>
              <Text size="large" textColor="secondary" marginBottom="space-0">
                Every step of your workflow, connected by one system. Pick where you are and jump straight in.
              </Text>
            </Stack>
          </GridItem>
        </Grid>

        <Grid cols={{ mobile: 1, tablet: 12 }} spacingX="space-1000">
          <GridItem columnStart={{ tablet: 1 }} columnEnd={{ tablet: 6 }}>
            {steps.map(({ eyebrow, title, description, imageAlt, imageColor, links }, index) => (
              <div
                key={title}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                className={`${styles.Step} ${index === activeIndex ? styles['Step--active'] : ''}`}
              >
                <Stack spacing="space-1100">
                  <Stack spacing="space-700">
                    <Eyebrow>{eyebrow}</Eyebrow>
                    <Heading elementType="h3" size="small" marginBottom="space-0">
                      {title}
                    </Heading>
                    <Text size="large" textColor="secondary" marginBottom="space-0">
                      {description}
                    </Text>
                  </Stack>

                  {/* The vertical Flex does not stretch its items, so the clickable area of a link is only as wide as its text. */}
                  <Flex direction="vertical" alignmentX="left" spacing="space-500">
                    <Text textColor="secondary" marginBottom="space-0">
                      Docs
                    </Text>
                    {links.map(({ label, href }) => (
                      <Link key={label} elementType={NextLink} href={href}>
                        {label}
                      </Link>
                    ))}
                  </Flex>
                </Stack>

                {/* On small screens, every step shows its own image below the text. */}
                <div className={styles.StepImage}>
                  <StepImage alt={imageAlt} color={imageColor} label={eyebrow} />
                </div>
              </div>
            ))}
          </GridItem>

          <GridItem columnStart={{ tablet: 6 }} columnEnd={{ tablet: 13 }} UNSAFE_className={styles.Gallery}>
            <Box backgroundColor="secondary" borderRadius="500" UNSAFE_className={styles.Panel}>
              <div ref={stickyRef} className={styles.Sticky}>
                {steps.map(({ title, eyebrow, imageAlt, imageColor }, index) => (
                  <div
                    key={title}
                    aria-hidden={index !== activeIndex}
                    className={`${styles.Slide} ${index === activeIndex ? styles['Slide--active'] : ''}`}
                  >
                    <StepImage alt={imageAlt} color={imageColor} label={eyebrow} />
                  </div>
                ))}
              </div>
            </Box>
          </GridItem>
        </Grid>
      </Stack>
    </PageSection>
  );
};

export default WorkflowScroll;
