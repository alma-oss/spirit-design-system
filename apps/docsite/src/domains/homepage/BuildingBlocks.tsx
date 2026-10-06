'use client';

import { Box, Grid, GridItem, Stack, Text } from '@alma-oss/spirit-web-react';
import { type ReactNode } from 'react';
import { routes } from '../routing/routes';
import styles from './BuildingBlocks.module.scss';
import EducationForm from './EducationForm';
import FilesCard from './FilesCard';
import NotificationsCard from './NotificationsCard';
import PageSection from './PageSection';
import PageShowcase from './PageShowcase';
import ProfileProgress from './ProfileProgress';
import SearchHistory from './SearchHistory';
import SectionHeader from './SectionHeader';
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
  /** Whether the content fills the whole tile, otherwise it is centered in it. */
  isFilled?: boolean;
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
      height: 532,
      columnStart: 1,
      columnEnd: 8,
      content: <EducationForm />,
      isFilled: true,
    },
    {
      caption: 'Tracking progress while creating an account',
      height: 532,
      columnStart: 8,
      columnEnd: 13,
      content: <ProfileProgress />,
      isFilled: true,
    },
  ],
  [
    {
      caption: 'Tracking progress while creating an account',
      height: 532,
      columnStart: 1,
      columnEnd: 6,
      content: <FilesCard />,
      isFilled: true,
    },
    {
      caption: 'Search history built from many subcomponents',
      height: 532,
      columnStart: 6,
      columnEnd: 13,
      content: <SearchHistory />,
    },
  ],
  [
    {
      caption: 'Interactive tags in context',
      height: 532,
      columnStart: 1,
      columnEnd: 8,
      content: <TechStackCard />,
    },
    {
      caption: 'Toast message',
      height: 532,
      columnStart: 8,
      columnEnd: 13,
      content: <NotificationsCard />,
      hasOwnFrame: true,
    },
  ],
];

const BuildingBlocks = () => (
  <PageSection size="xlarge" hasTopLine backgroundColor="primary">
    <Stack spacing="space-1100">
      <SectionHeader
        title="From a single component to a whole page"
        description="You build from parts that have already survived design, development and testing. No wondering whether it will work, just what you will make with it."
        actionLabel="View components"
        actionHref={routes.components}
      />

      <Stats />

      <Stack spacing="space-1100">
        {rows.map((row) => (
          <Grid
            key={row[0].caption}
            cols={{ mobile: 1, tablet: 12 }}
            spacingX="space-800"
            spacingY={{ mobile: 'space-1100', tablet: 'space-800' }}
          >
            {row.map(({ caption, height, columnStart, columnEnd, content, hasOwnFrame, isFilled }) => (
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
                      <div
                        className={isFilled ? `${styles.Tile} ${styles['Tile--filled']}` : styles.Tile}
                        style={{ minHeight: height - TILE_PADDING * 2 }}
                      >
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
