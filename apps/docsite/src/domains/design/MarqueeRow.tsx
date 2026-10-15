'use client';

import { type ReactNode, useEffect, useRef } from 'react';
import styles from './TokenMarquee.module.scss';

/** Speed of every row in px per second, so the rows drift equally fast whatever their width is. */
const MARQUEE_SPEED = 50;

interface MarqueeRowProps {
  isReversed?: boolean;
  children: ReactNode;
}

const MarqueeRow = ({ isReversed = false, children }: MarqueeRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    const track = row?.firstElementChild;

    if (!row || !track) {
      return undefined;
    }

    const setDuration = () => row.style.setProperty('--marquee-duration', `${track.scrollWidth / MARQUEE_SPEED}s`);
    const observer = new ResizeObserver(setDuration);

    setDuration();
    observer.observe(track);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rowRef} className={`${styles.Row} ${isReversed ? styles['Row--reverse'] : ''}`}>
      {children}
    </div>
  );
};

export default MarqueeRow;
