'use client';

import { Lottie, type LottieHandle } from 'lottie-react';
import { useEffect, useRef } from 'react';

interface HoverLottieProps {
  /** Path to the Lottie JSON file in the `public` folder, e.g. `/lottie/card.json`. */
  path: string;
  /** Whether the element controlling the animation (e.g. a card) is hovered. The animation plays once on each hover. */
  isHovered: boolean;
  className?: string;
}

const HoverLottie = ({ path, isHovered, className = undefined }: HoverLottieProps) => {
  const lottieRef = useRef<LottieHandle>(null);

  useEffect(() => {
    if (!isHovered) {
      return;
    }

    // Users who prefer reduced motion get the still first frame.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    lottieRef.current?.stop();
    lottieRef.current?.play();
  }, [isHovered]);

  return <Lottie lottieRef={lottieRef} src={path} autoplay={false} loop={false} className={className} aria-hidden />;
};

export default HoverLottie;
