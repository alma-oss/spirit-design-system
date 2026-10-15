'use client';

import { Grid, Heading, Stack, Text, VisuallyHidden } from '@alma-oss/spirit-web-react';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import './Stats.scss';

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

const phaseClassName = {
  idle: 'Stats',
  pending: 'Stats Stats--pending',
  counting: 'Stats Stats--counting',
} as const;

const Stats = ({ stats = defaultStats, size = 'medium' }: StatsProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<keyof typeof phaseClassName>('idle');

  useEffect(() => {
    const root = rootRef.current;

    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let isActive = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!isActive || !entry) {
          return;
        }

        if (!entry.isIntersecting) {
          setPhase('pending');

          return;
        }

        setPhase('counting');
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(root);

    return () => {
      isActive = false;
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className={phaseClassName[phase]}>
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
                    <span className="Stats__value" style={{ '--stats-target': value } as CSSProperties} />
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
    </div>
  );
};

export default Stats;
