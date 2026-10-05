'use client';

import { Grid, Heading, Stack, Text, VisuallyHidden } from '@alma-oss/spirit-web-react';
import { type CSSProperties } from 'react';
import styles from './Stats.module.scss';

const stats = [
  { value: 6, suffix: '+', label: 'products and brands' },
  { value: 70, suffix: '+', label: 'battle-tested components' },
  { value: 500, suffix: '+', label: 'icons and illustrations' },
  { value: 5, suffix: '', label: 'years in production' },
];

const Stats = () => (
  <Grid cols={{ mobile: 2, tablet: 4 }} spacing="space-1000">
    {stats.map(({ value, suffix, label }) => (
      <Stack key={label} spacing="space-500">
        <Heading elementType="p" size="medium">
          <VisuallyHidden>{`${value}${suffix}`}</VisuallyHidden>
          <span aria-hidden="true">
            <span className={styles.StatValue} style={{ '--stat-target': value } as CSSProperties} />
            {suffix}
          </span>
        </Heading>
        <Text textColor="secondary">{label}</Text>
      </Stack>
    ))}
  </Grid>
);

export default Stats;
