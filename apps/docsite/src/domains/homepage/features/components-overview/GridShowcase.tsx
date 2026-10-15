'use client';

import { Box, Container, Flex, Grid, GridItem, Heading, Hidden, Section, Text } from '@alma-oss/spirit-web-react';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import Stamp, { type StampDirection, type StampTone } from '../../ui/Stamp';
import './GridShowcase.scss';

// All geometry below comes from the design.
// The window is 884 px wide and its visible part is 394 px tall, the browser content inside it is 880 px wide.
const WINDOW_WIDTH = 884;
const WINDOW_VISIBLE_HEIGHT = 394;
const BROWSER_WIDTH = 880;
// The page is rendered with real Spirit components at a virtual width and scaled down into the browser window.
// With the container being 1280 px wide (xlarge), 1474 px puts the container edges where the design has them.
const PAGE_WIDTH = 1474;
const PAGE_SCALE = BROWSER_WIDTH / PAGE_WIDTH;
const COLUMNS = Array.from({ length: 12 }, (_, index) => index + 1);
const ACTIVE_COLUMN = 4;

interface StampPlacement {
  label: string;
  tone?: StampTone;
  direction: StampDirection;
  x: number;
  y: number;
  width: number;
  height: number;
  placement: 'column' | 'section' | 'container';
}

const stamps: StampPlacement[] = [
  { label: 'columnStart={4}', direction: 'up', x: 223, y: 22, width: 122, height: 63, placement: 'column' },
  {
    label: 'Section',
    tone: 'success',
    direction: 'left',
    x: 784,
    y: 40,
    width: 138,
    height: 32,
    placement: 'section',
  },
  { label: 'Container', direction: 'right', x: -48, y: 237, width: 120, height: 32, placement: 'container' },
];

const toPercent = (value: number, total: number) => `${(value / total) * 100}%`;

const GridShowcase = () => {
  const areaRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>();

  useEffect(() => {
    const area = areaRef.current;
    if (!area) {
      return undefined;
    }

    const update = () => setScale(area.clientWidth / WINDOW_WIDTH);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(area);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="GridShowcase__band">
      <Box borderRadius="400" paddingTop="space-1200" UNSAFE_className="GridShowcase">
        <Flex direction="vertical" spacing="space-1100">
          <Flex direction="vertical" spacing="space-600" UNSAFE_className="GridShowcase__intro">
            <Heading elementType="h2" size="medium" textAlignment="center">
              A page skeleton built on tokens
            </Heading>
            <Text textColor="secondary" textAlignment="center">
              Widths, section spacing and columns are all driven by tokens. In Figma and in code, so what you design
              into columns stays in columns. Nobody needs to pull out a ruler.
            </Text>
          </Flex>

          <div
            ref={areaRef}
            className="GridShowcase__window"
            style={{ aspectRatio: `${WINDOW_WIDTH} / ${WINDOW_VISIBLE_HEIGHT}` }}
          >
            <div className="GridShowcase__clip" aria-hidden="true">
              <div
                className="GridShowcase__frame"
                style={{ width: WINDOW_WIDTH, transform: `scale(${scale ?? 1})`, opacity: scale ? 1 : 0 }}
              >
                <div className="GridShowcase__toolbar">
                  <span className="GridShowcase__toolbarDot" />
                  <span className="GridShowcase__toolbarDot" />
                  <span className="GridShowcase__toolbarDot" />
                </div>
                <div className="GridShowcase__browser">
                  <div
                    className="GridShowcase__page"
                    style={{ width: PAGE_WIDTH, transform: `scale(${PAGE_SCALE})` } as CSSProperties}
                  >
                    <Section
                      size="large"
                      elementType="div"
                      hasContainer={false}
                      UNSAFE_className="GridShowcase__section"
                    >
                      <span className="GridShowcase__sectionHotspot" />
                      <Container UNSAFE_className="GridShowcase__container">
                        <span className="GridShowcase__containerEdge GridShowcase__containerEdge--start" />
                        <span className="GridShowcase__containerEdge GridShowcase__containerEdge--end" />
                        <div className="GridShowcase__layers">
                          <Grid cols={12} spacingY="space-0" UNSAFE_className="GridShowcase__blocks">
                            <GridItem
                              columnStart={4}
                              columnEnd={10}
                              rowStart={2}
                              UNSAFE_className="GridShowcase__block"
                            />
                            <GridItem
                              columnStart={1}
                              columnEnd={5}
                              rowStart={4}
                              UNSAFE_className="GridShowcase__block"
                            />
                            <GridItem
                              columnStart={5}
                              columnEnd={9}
                              rowStart={4}
                              UNSAFE_className="GridShowcase__block"
                            />
                            <GridItem
                              columnStart={9}
                              columnEnd={13}
                              rowStart={4}
                              UNSAFE_className="GridShowcase__block"
                            />
                          </Grid>
                          <Grid cols={12}>
                            {COLUMNS.map((column) => (
                              <GridItem
                                key={column}
                                UNSAFE_className={`GridShowcase__column${column === ACTIVE_COLUMN ? ' GridShowcase__column--active' : ''}`}
                              >
                                {null}
                              </GridItem>
                            ))}
                          </Grid>
                        </div>
                      </Container>
                    </Section>
                  </div>
                </div>
              </div>
            </div>

            <Hidden on={['mobile', 'tablet']}>
              {stamps.map(({ label, tone, direction, x, y, width, height, placement }) => (
                <div
                  key={label}
                  className={`GridShowcase__stamp GridShowcase__stamp--${placement}`}
                  style={{
                    left: toPercent(x, WINDOW_WIDTH),
                    top: toPercent(y, WINDOW_VISIBLE_HEIGHT),
                    width: toPercent(width, WINDOW_WIDTH),
                    height: toPercent(height, WINDOW_VISIBLE_HEIGHT),
                  }}
                >
                  <Stamp label={label} tone={tone} direction={direction} style={{ inset: 0 }} />
                </div>
              ))}
            </Hidden>
          </div>
        </Flex>
      </Box>
    </div>
  );
};

export default GridShowcase;
