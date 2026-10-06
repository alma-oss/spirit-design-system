'use client';

import { Box, Grid, GridItem, Stack, Text } from '@alma-oss/spirit-web-react';
import { routes } from '../routing/routes';
import { AssetGroups } from './CustomAssets';
import styles from './DesignTeaser.module.scss';
import PageSection from './PageSection';
import SectionHeader from './SectionHeader';
import Stats, { type Stat } from './Stats';

const stats: Stat[] = [
  { value: 2, suffix: '+', label: 'Modes and themes' },
  { value: 400, suffix: '+', label: 'Customizable variables' },
  { text: 'Unlimited', label: 'color shades and gradients' },
  { value: 1, label: 'source of truth' },
];

interface Topic {
  title: string;
  description: string;
  /** Columns of the 12-column grid the tile spans. */
  columnStart: number;
  columnEnd: number;
  /** Whether the tile shows the custom assets, otherwise it is a placeholder. */
  hasAssets?: boolean;
}

const topics: Topic[] = [
  {
    title: 'Colors',
    description:
      'Every color has a job. Text, background, state, emotion. You change the meaning, not hex codes, and nothing falls apart.',
    columnStart: 1,
    columnEnd: 5,
  },
  {
    title: 'Typography',
    description:
      'Use tokenized font sizes, weights, and line heights to keep typography consistent, flexible, and scalable across your product.',
    columnStart: 5,
    columnEnd: 9,
  },
  {
    title: 'Shape and effects',
    description:
      'Flexible shapes, radii, gradients, and effects give your product the freedom to express your brand’s unique visual identity.',
    columnStart: 9,
    columnEnd: 13,
  },
  {
    title: 'Icons and illustrations',
    description:
      'Choose a visual style that fits your theme, or bring your own to make your product truly feel like your brand.',
    columnStart: 1,
    columnEnd: 13,
    hasAssets: true,
  },
];

// The teaser of the Design section. The tiles are placeholders until the visuals are ready.
const DesignTeaser = () => (
  <PageSection size="xlarge" paddingBottom="small" hasTopLine backgroundColor="primary">
    <Stack spacing="space-1200">
      <SectionHeader
        title="A complete design language."
        description="A scalable foundation of tokens, colors, typography, and visual styles — thoughtfully designed to bring consistency, flexibility, and character to every product."
        actionLabel="Learn more"
        actionHref={routes.design}
      />

      <Stats stats={stats} />

      <Grid cols={{ mobile: 1, tablet: 12 }} spacingX="space-800" spacingY="space-800">
        {topics.map(({ title, description, columnStart, columnEnd, hasAssets }) => (
          <GridItem
            key={title}
            columnStart={{ tablet: columnStart }}
            columnEnd={{ tablet: columnEnd }}
            UNSAFE_className={styles.Topic}
          >
            <Box
              backgroundColor={hasAssets ? undefined : 'primary'}
              borderColor="basic"
              borderWidth="100"
              borderRadius="500"
              padding={hasAssets ? 'space-1000' : 'space-800'}
              UNSAFE_className={hasAssets ? styles.AssetsTile : styles.Tile}
            >
              <Stack spacing={hasAssets ? 'space-1200' : 'space-800'} UNSAFE_className={styles.TileContent}>
                {!hasAssets && <div className="docs-Placeholder" />}
                <Stack spacing="space-500">
                  <Text emphasis="semibold" marginBottom="space-0" UNSAFE_className={styles.TopicTitle}>
                    {title}
                  </Text>
                  <Text textColor="secondary" marginBottom="space-0">
                    {description}
                  </Text>
                </Stack>
                {hasAssets && <AssetGroups />}
              </Stack>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Stack>
  </PageSection>
);

export default DesignTeaser;
