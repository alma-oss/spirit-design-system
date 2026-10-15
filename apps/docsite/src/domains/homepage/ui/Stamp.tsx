'use client';

import { Box, Text } from '@alma-oss/spirit-web-react';
import { type CSSProperties } from 'react';
import './Stamp.scss';

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
    className={['Stamp', `Stamp--${direction}`, `Stamp--${tone}`, className].filter(Boolean).join(' ')}
    style={style}
  >
    <Box
      backgroundColor={tone === 'success' ? 'emotion-success-basic' : 'accent-02-basic'}
      borderRadius="400"
      paddingX="space-600"
      paddingY="space-500"
      UNSAFE_className="Stamp__label"
    >
      <Text elementType="span" size="xsmall" emphasis="semibold" textColor="accent-02-subtle">
        {label}
      </Text>
    </Box>
    <span className="Stamp__line" aria-hidden="true" />
    <span className="Stamp__point" aria-hidden="true" />
  </div>
);

export default Stamp;
