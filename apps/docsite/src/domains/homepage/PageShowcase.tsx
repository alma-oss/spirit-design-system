'use client';

import { Box, Hidden } from '@alma-oss/spirit-web-react';
import { type CSSProperties } from 'react';
import styles from './PageShowcase.module.scss';
import Stamp, { type StampDirection } from './Stamp';

// All geometry below comes from the design, where the page screenshot (880 x 535) sits at 72, 45 in a 1024 x 580 frame.
// The positions are kept as designed and converted to percentages of the screenshot.
const PAGE = { width: 880, height: 535 };
const PAGE_OFFSET = { x: 72, y: 45 };

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Annotation {
  label: string;
  /** The highlighted element of the page. */
  target: Rect;
  /** The sticky note pointing at the target. */
  stamp: Rect & { direction: StampDirection };
}

const annotations: Annotation[] = [
  {
    label: 'Navigation item',
    target: { x: 290.28, y: 54.78, width: 51.56, height: 24.44 },
    stamp: { x: 257, y: 73, width: 115, height: 63, direction: 'down' },
  },
  {
    label: 'Label',
    target: { x: 470.06, y: 133.12, width: 258.72, height: 13 },
    stamp: { x: 526, y: 82, width: 56, height: 63, direction: 'up' },
  },
  {
    label: 'Picker',
    target: { x: 468.61, y: 199.9, width: 88, height: 29.33 },
    stamp: { x: 481, y: 222, width: 61, height: 63, direction: 'down' },
  },
  {
    label: 'Heading link',
    target: { x: 204, y: 322.45, width: 472.39, height: 18 },
    stamp: { x: 83, y: 315, width: 120, height: 32, direction: 'right' },
  },
  {
    label: 'Icon-star',
    target: { x: 790.67, y: 322.45, width: 29.33, height: 29.33 },
    stamp: { x: 813, y: 321, width: 120, height: 32, direction: 'left' },
  },
  {
    label: 'Hero',
    target: { x: 120.89, y: 113.57, width: 782.22, height: 135.22 },
    stamp: { x: 855, y: 165, width: 120, height: 32, direction: 'left' },
  },
];

const toPercent = (value: number, total: number) => `${(value / total) * 100}%`;

const toStyle = ({ x, y, width, height }: Rect): CSSProperties => ({
  left: toPercent(x - PAGE_OFFSET.x, PAGE.width),
  top: toPercent(y - PAGE_OFFSET.y, PAGE.height),
  width: toPercent(width, PAGE.width),
  height: toPercent(height, PAGE.height),
});

const PageShowcase = () => (
  <Box
    borderColor="basic"
    borderWidth="100"
    borderRadius="500"
    paddingTop="space-1100"
    paddingX={{ mobile: 'space-700', tablet: 'space-1200' }}
    UNSAFE_className={styles.PageShowcase}
  >
    <div className={styles.Stage}>
      <img
        className={styles.Page}
        src="/components-overview/jobs-page.webp"
        alt="A Jobs.cz page built from Spirit Design System components: navigation, search with filters and a list of job offers."
      />

      <Hidden on={['mobile', 'tablet']}>
        {annotations.map(({ label, target, stamp }) => (
          <div key={label} className={styles.Annotation}>
            <div className={styles.Highlight} style={toStyle(target)} />
            <Stamp label={label} direction={stamp.direction} style={toStyle(stamp)} className={styles.Stamp} />
          </div>
        ))}
      </Hidden>
    </div>
  </Box>
);

export default PageShowcase;
