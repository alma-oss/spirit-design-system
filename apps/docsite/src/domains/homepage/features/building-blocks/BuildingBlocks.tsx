'use client';

import {
  Box,
  Flex,
  Grid,
  GridItem,
  type SpiritGridItemProps,
  type SpiritTileProps,
  Stack,
  Text,
  UNSTABLE_Tile,
} from '@alma-oss/spirit-web-react';
import { routes } from '../../../routing/routes';
import PageSection from '../../ui/PageSection';
import SectionHeader from '../../ui/SectionHeader';
import Stats from '../../ui/Stats';
import './BuildingBlocks.scss';
import EducationForm from './EducationForm';
import FilesCard from './FilesCard';
import NotificationsCard from './NotificationsCard';
import PageShowcase from './PageShowcase';
import ProfileProgress from './ProfileProgress';
import SearchHistory from './SearchHistory';
import TechStackCard from './TechStackCard';

interface BuildingBlock extends Pick<SpiritGridItemProps, 'columnStart' | 'columnEnd'> {
  caption: string;
  /** Height of the tile as designed, in px. */
  height: number;
  /** The tile content, a placeholder is rendered when omitted. */
  content?: SpiritTileProps['children'];
  /** Whether the content brings its own frame instead of the standard tile. */
  hasOwnFrame?: boolean;
  /** Whether the content fills the whole tile, otherwise it is centered in it. */
  isFilled?: boolean;
}

// The bento is a 12-column grid: every row is either one full-width tile or two tiles.
const rows: BuildingBlock[][] = [
  [
    {
      caption: 'From individual components we build a whole page',
      height: 577,
      columnStart: { tablet: 1 },
      columnEnd: { tablet: 13 },
      content: <PageShowcase />,
      hasOwnFrame: true,
    },
  ],
  [
    {
      caption: 'A composition of form elements for picking education',
      height: 530,
      columnStart: { tablet: 1 },
      columnEnd: { tablet: 8 },
      content: <EducationForm />,
      isFilled: true,
    },
    {
      caption: 'Tracking progress while creating an account',
      height: 530,
      columnStart: { tablet: 8 },
      columnEnd: { tablet: 13 },
      content: <ProfileProgress />,
      isFilled: true,
    },
  ],
  [
    {
      caption: 'Managing and uploading files',
      height: 532,
      columnStart: { tablet: 1 },
      columnEnd: { tablet: 6 },
      content: <FilesCard />,
      isFilled: true,
    },
    {
      caption: 'Search history built from many subcomponents',
      height: 532,
      columnStart: { tablet: 6 },
      columnEnd: { tablet: 13 },
      content: <SearchHistory />,
    },
  ],
  [
    {
      caption: 'Interactive tags in context',
      height: 532,
      columnStart: { tablet: 1 },
      columnEnd: { tablet: 8 },
      content: <TechStackCard />,
    },
    {
      caption: 'Toast message',
      height: 532,
      columnStart: { tablet: 8 },
      columnEnd: { tablet: 13 },
      content: <NotificationsCard />,
      hasOwnFrame: true,
    },
  ],
];

const BuildingBlocks = () => (
  <PageSection size="xlarge" hasTopLine backgroundColor="primary">
    <Stack spacing="space-1300">
      <SectionHeader
        eyebrow="COMPONENTS"
        title="Turn components into experiences."
        description="Open, adjust, select, and interact. Every example works like the real thing."
        descriptionSize="large"
        actionLabel="View components"
        actionHref={routes.components}
      />

      <Stats size="small" />

      <Stack spacing="space-1200">
        {rows.map((row) => (
          <Grid
            key={row[0].caption}
            cols={{ mobile: 1, tablet: 12 }}
            spacingX="space-1000"
            spacingY={{ mobile: 'space-1100', tablet: 'space-1000' }}
          >
            {row.map(({ caption, height, columnStart, columnEnd, content, hasOwnFrame, isFilled }) => (
              <GridItem key={caption} columnStart={columnStart} columnEnd={columnEnd}>
                <Flex direction="vertical" spacing="space-700" UNSAFE_className="BuildingBlocks__item">
                  {/* Grid has no row-track size. The designed tile is taller than its content, so this minimum stays and the other tile in the row stretches to it. */}
                  {hasOwnFrame ? (
                    <Box elementType={Grid} cols={1} UNSAFE_className="BuildingBlocks__frame">
                      {content}
                    </Box>
                  ) : (
                    <UNSTABLE_Tile
                      elementType={Grid}
                      cols={1}
                      alignmentY={isFilled ? 'stretch' : 'center'}
                      backgroundColor="secondary"
                      padding={{ mobile: 'space-700', tablet: 'space-1000' }}
                      UNSAFE_className="BuildingBlocks__frame"
                      UNSAFE_style={{ minHeight: height }}
                    >
                      {content ?? (
                        <div className="docs-Placeholder">
                          <div className="docs-Placeholder__text">
                            <Text emphasis="semibold">Placeholder</Text>
                            <Text textColor="secondary">{caption}</Text>
                          </div>
                        </div>
                      )}
                    </UNSTABLE_Tile>
                  )}
                  <Text size="small" textColor="secondary" UNSAFE_className="BuildingBlocks__caption">
                    {caption}
                  </Text>
                </Flex>
              </GridItem>
            ))}
          </Grid>
        ))}
      </Stack>
    </Stack>
  </PageSection>
);

export default BuildingBlocks;
