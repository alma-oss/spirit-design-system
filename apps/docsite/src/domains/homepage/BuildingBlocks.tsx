'use client';

import { Box, ButtonLink, Flex, Grid, GridItem, Heading, Stack, Text } from '@alma-oss/spirit-web-react';
import NextLink from 'next/link';
import { type ReactNode } from 'react';
import { routes } from '../routing/routes';
import styles from './BuildingBlocks.module.scss';
import EducationForm from './EducationForm';
import FilesCard from './FilesCard';
import PageSection from './PageSection';
import PageShowcase from './PageShowcase';
import ProfileProgress from './ProfileProgress';
import SearchHistory from './SearchHistory';
import Stats from './Stats';
import TechStackCard from './TechStackCard';

// The tile height from the design includes the border and the `space-1000` padding (in px).
const TILE_PADDING = 33;

interface Tile {
  caption: string;
  /** Height of the tile as designed, in px. */
  height: number;
  columnStart: number;
  columnEnd: number;
  /** The tile content, a placeholder is rendered when omitted. */
  content?: ReactNode;
  /** Whether the content brings its own frame instead of the standard tile. */
  hasOwnFrame?: boolean;
}

// The bento is a 12-column grid: every row is either one full-width tile or two tiles.
const rows: Tile[][] = [
  [
    {
      caption: 'From individual components we build a whole page',
      height: 577,
      columnStart: 1,
      columnEnd: 13,
      content: <PageShowcase />,
      hasOwnFrame: true,
    },
  ],
  [
    {
      caption: 'A composition of form elements for picking education',
      height: 530,
      columnStart: 1,
      columnEnd: 8,
      content: <EducationForm />,
    },
    {
      caption: 'Tracking progress while creating an account',
      height: 530,
      columnStart: 8,
      columnEnd: 13,
      content: <ProfileProgress />,
    },
  ],
  [
    {
      caption: 'Search history built from many subcomponents',
      height: 526,
      columnStart: 1,
      columnEnd: 13,
      content: <SearchHistory />,
    },
  ],
  [
    {
      caption: 'Managing a user’s files and attachments',
      height: 456,
      columnStart: 1,
      columnEnd: 7,
      content: <FilesCard />,
    },
    {
      caption: 'Interactive tags in context',
      height: 456,
      columnStart: 7,
      columnEnd: 13,
      content: <TechStackCard />,
    },
  ],
];

const BuildingBlocks = () => (
  <PageSection size="xlarge" hasTopLine backgroundColor="primary">
    <Stack spacing="space-1100">
      <Grid cols={{ mobile: 1, tablet: 12 }} spacingX="space-800" spacingY="space-900">
        <GridItem columnStart={{ tablet: 1 }} columnEnd={{ tablet: 6 }} UNSAFE_className={styles.Item}>
          <Stack spacing="space-800">
            <Heading elementType="h2" size="large">
              From a single component to a whole page
            </Heading>
            <Text>
              You build from parts that have already survived design, development and testing. No wondering whether it
              will work, just what you will make with it.
            </Text>
          </Stack>
        </GridItem>
        <GridItem columnStart={{ tablet: 6 }} columnEnd={{ tablet: 13 }} UNSAFE_className={styles.Item}>
          <Flex alignmentX={{ mobile: 'left', tablet: 'right' }}>
            <ButtonLink elementType={NextLink} href={routes.components} color="secondary">
              View components
            </ButtonLink>
          </Flex>
        </GridItem>
      </Grid>

      <Stats />

      <Stack spacing="space-1100">
        {rows.map((row) => (
          <Grid
            key={row[0].caption}
            cols={{ mobile: 1, tablet: 12 }}
            spacingX="space-800"
            spacingY={{ mobile: 'space-1100', tablet: 'space-800' }}
          >
            {row.map(({ caption, height, columnStart, columnEnd, content, hasOwnFrame }) => (
              <GridItem
                key={caption}
                columnStart={{ tablet: columnStart }}
                columnEnd={{ tablet: columnEnd }}
                UNSAFE_className={styles.Item}
              >
                <Stack spacing="space-600">
                  {hasOwnFrame ? (
                    content
                  ) : (
                    <Box
                      backgroundColor="secondary"
                      borderColor="basic"
                      borderWidth="100"
                      borderRadius="500"
                      padding={{ mobile: 'space-700', tablet: 'space-1000' }}
                      UNSAFE_className={styles.Shell}
                    >
                      <div className={styles.Tile} style={{ minHeight: height - TILE_PADDING * 2 }}>
                        {content ?? (
                          <div className="docs-Placeholder">
                            <div className="docs-Placeholder__text">
                              <Text emphasis="semibold">Placeholder</Text>
                              <Text textColor="secondary">{caption}</Text>
                            </div>
                          </div>
                        )}
                      </div>
                    </Box>
                  )}
                  <Text textColor="secondary">{caption}</Text>
                </Stack>
              </GridItem>
            ))}
          </Grid>
        ))}
      </Stack>
    </Stack>
  </PageSection>
);

export default BuildingBlocks;
