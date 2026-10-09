'use client';

import { Box, Container, Flex, Grid, GridItem, Heading, Hidden, Section, Text } from '@alma-oss/spirit-web-react';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './GridShowcase.module.scss';
import Stamp, { type StampDirection, type StampTone } from './Stamp';

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
  className: string;
}

const stamps: StampPlacement[] = [
  { label: 'columnStart={4}', direction: 'up', x: 223, y: 22, width: 122, height: 63, className: 'StampColumn' },
  {
    label: 'Section',
    tone: 'success',
    direction: 'left',
    x: 784,
    y: 40,
    width: 138,
    height: 32,
    className: 'StampSection',
  },
  { label: 'Container', direction: 'right', x: -48, y: 237, width: 120, height: 32, className: 'StampContainer' },
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
    <Box borderRadius="400" paddingTop="space-1200" UNSAFE_className={styles.GridShowcase}>
      <Flex direction="vertical" spacing="space-1100">
        <Flex direction="vertical" spacing="space-600" UNSAFE_className={styles.Intro}>
          <Heading elementType="h2" size="medium" textAlignment="center">
            A page skeleton built on tokens
          </Heading>
          <Text textColor="secondary" textAlignment="center">
            Widths, section spacing and columns are all driven by tokens. In Figma and in code, so what you design into
            columns stays in columns. Nobody needs to pull out a ruler.
          </Text>
        </Flex>

        <div
          ref={areaRef}
          className={styles.WindowArea}
          style={{ aspectRatio: `${WINDOW_WIDTH} / ${WINDOW_VISIBLE_HEIGHT}` }}
        >
          <div className={styles.WindowClip} aria-hidden="true">
            <div
              className={styles.Window}
              style={{ width: WINDOW_WIDTH, transform: `scale(${scale ?? 1})`, opacity: scale ? 1 : 0 }}
            >
              <div className={styles.Toolbar}>
                <span className={styles.ToolbarDot} />
                <span className={styles.ToolbarDot} />
                <span className={styles.ToolbarDot} />
              </div>
              <div className={styles.Browser}>
                <div
                  className={styles.Page}
                  style={{ width: PAGE_WIDTH, transform: `scale(${PAGE_SCALE})` } as CSSProperties}
                >
                  <Section size="large" elementType="div" hasContainer={false} UNSAFE_className={styles.Section}>
                    <span className={styles.SectionHotspot} />
                    <Container UNSAFE_className={styles.Container}>
                      <span className={`${styles.ContainerEdge} ${styles.ContainerEdgeStart}`} />
                      <span className={`${styles.ContainerEdge} ${styles.ContainerEdgeEnd}`} />
                      <div className={styles.Layers}>
                        <Grid cols={12} spacingY="space-0" UNSAFE_className={styles.Blocks}>
                          <GridItem columnStart={4} columnEnd={10} rowStart={2} UNSAFE_className={styles.Block} />
                          <GridItem columnStart={1} columnEnd={5} rowStart={4} UNSAFE_className={styles.Block} />
                          <GridItem columnStart={5} columnEnd={9} rowStart={4} UNSAFE_className={styles.Block} />
                          <GridItem columnStart={9} columnEnd={13} rowStart={4} UNSAFE_className={styles.Block} />
                        </Grid>
                        <Grid cols={12}>
                          {COLUMNS.map((column) => (
                            <GridItem
                              key={column}
                              UNSAFE_className={`${styles.Column} ${column === ACTIVE_COLUMN ? styles.ColumnActive : ''}`}
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
            {stamps.map(({ label, tone, direction, x, y, width, height, className }) => (
              <Stamp
                key={label}
                label={label}
                tone={tone}
                direction={direction}
                className={`${styles.Stamp} ${styles[className]}`}
                style={{
                  left: toPercent(x, WINDOW_WIDTH),
                  top: toPercent(y, WINDOW_VISIBLE_HEIGHT),
                  width: toPercent(width, WINDOW_WIDTH),
                  height: toPercent(height, WINDOW_VISIBLE_HEIGHT),
                }}
              />
            ))}
          </Hidden>
        </div>
      </Flex>
    </Box>
  );
};

export default GridShowcase;
