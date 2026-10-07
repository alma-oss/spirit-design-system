'use client';

import { Box, Text } from '@alma-oss/spirit-web-react';
import { type CSSProperties } from 'react';
import styles from './Stamp.module.scss';

export type StampDirection = 'down' | 'up' | 'right' | 'left';
export type StampTone = 'accent' | 'success';

interface StampProps {
  label: string;
  /** Where the sticky note points to: the point is placed at that end of the line. */
  direction: StampDirection;
  tone?: StampTone;
  style: CSSProperties;
  className?: string;
}

const Stamp = ({ label, direction, tone = 'accent', style, className = undefined }: StampProps) => (
  <div
    className={[styles.Stamp, styles[`Stamp--${direction}`], styles[`Stamp--${tone}`], className]
      .filter(Boolean)
      .join(' ')}
    style={style}
  >
    <Box borderRadius="400" paddingX="space-600" paddingY="space-500" UNSAFE_className={styles.Label}>
      <Text elementType="span" size="xsmall" emphasis="semibold" textColor="accent-02-subtle">
        {label}
      </Text>
    </Box>
    <span className={styles.Line} aria-hidden="true" />
    <span className={styles.Point} aria-hidden="true" />
  </div>
);

export default Stamp;
