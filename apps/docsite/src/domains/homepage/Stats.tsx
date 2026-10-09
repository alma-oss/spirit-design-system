'use client';

import { Grid, Heading, Stack, Text, VisuallyHidden } from '@alma-oss/spirit-web-react';
import { type CSSProperties } from 'react';
import styles from './Stats.module.scss';

export interface Stat {
  /** The number that is counted up to. A stat without a number shows the text only. */
  value?: number;
  suffix?: string;
  /** The text shown instead of the number, e.g. a word. */
  text?: string;
  label: string;
}

const defaultStats: Stat[] = [
  { value: 6, suffix: '+', label: 'products and brands' },
  { value: 70, suffix: '+', label: 'battle-tested components' },
  { value: 500, suffix: '+', label: 'icons and illustrations' },
  { value: 5, label: 'years in production' },
];

interface StatsProps {
  stats?: Stat[];
  /** The size of the numbers. */
  size?: 'small' | 'medium';
}

const Stats = ({ stats = defaultStats, size = 'medium' }: StatsProps) => (
  <Grid cols={{ mobile: 2, tablet: 4 }} spacing="space-1000">
    {stats.map(({ value, suffix = '', text, label }) => (
      <Stack key={label} spacing="space-500">
        <Heading elementType="p" size={size} marginBottom="space-0">
          {value === undefined ? (
            text
          ) : (
            <>
              <VisuallyHidden>{`${value}${suffix}`}</VisuallyHidden>
              <span aria-hidden="true">
                <span className={styles.StatValue} style={{ '--stat-target': value } as CSSProperties} />
                {suffix}
              </span>
            </>
          )}
        </Heading>
        <Text textColor="secondary" marginBottom="space-0">
          {label}
        </Text>
      </Stack>
    ))}
  </Grid>
);

export default Stats;
