'use client';

import { useIsomorphicLayoutEffect } from '@alma-oss/spirit-web-react';
import React, { CSSProperties, ReactNode, useRef, useState } from 'react';
import type { PreviewGuides } from './model/types';
import './PreviewFrame.scss';

interface PreviewFrameProps {
  children?: ReactNode;
  contentClassName?: string;
  guides?: PreviewGuides;
}

interface Guides {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

const PreviewFrame = ({
  children = undefined,
  contentClassName = undefined,
  guides: guidesOnly = undefined,
}: PreviewFrameProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [guides, setGuides] = useState<Guides | null>(null);
  const hasVerticalGuides = guidesOnly !== 'horizontal';
  const hasHorizontalGuides = guidesOnly !== 'vertical';

  useIsomorphicLayoutEffect(() => {
    const frame = frameRef.current;
    const content = contentRef.current;

    if (!frame || !content) {
      return undefined;
    }

    const frameStyle = getComputedStyle(frame);
    const padding = parseFloat(frameStyle.getPropertyValue('--preview-frame-padding')) || 0;
    const gap = parseFloat(frameStyle.getPropertyValue('--preview-frame-guide-gap')) || 0;

    // Never scale up – only shrink content that doesn't fit.
    const update = () => {
      const { clientWidth: frameWidth, clientHeight: frameHeight } = frame;
      const { offsetWidth: contentWidth, offsetHeight: contentHeight } = content;

      if (!contentWidth || !contentHeight) {
        return;
      }

      const nextScale = Math.min(
        1,
        (frameWidth - 2 * padding) / contentWidth,
        (frameHeight - 2 * padding) / contentHeight,
      );
      const left = (frameWidth - contentWidth * nextScale) / 2;
      const top = (frameHeight - contentHeight * nextScale) / 2;

      setScale(nextScale);
      // Snap guides to whole device pixels, otherwise a 1px line on a half pixel is blurred to half intensity.
      const snap = (value: number) => Math.round(value * devicePixelRatio) / devicePixelRatio;

      setGuides({
        left: snap(left - gap),
        right: snap(left + contentWidth * nextScale + gap - 1),
        top: snap(top - gap),
        bottom: snap(top + contentHeight * nextScale + gap - 1),
      });
    };

    update();

    const observer = new ResizeObserver(update);

    observer.observe(frame);
    observer.observe(content);

    return () => observer.disconnect();
  }, [children]);

  return (
    <div ref={frameRef} className="PreviewFrame">
      {guides && (
        <>
          {hasVerticalGuides && (
            <>
              <span className="PreviewFrame__guide PreviewFrame__guide--vertical" style={{ left: guides.left }} />
              <span className="PreviewFrame__guide PreviewFrame__guide--vertical" style={{ left: guides.right }} />
            </>
          )}
          {hasHorizontalGuides && (
            <>
              <span className="PreviewFrame__guide PreviewFrame__guide--horizontal" style={{ top: guides.top }} />
              <span className="PreviewFrame__guide PreviewFrame__guide--horizontal" style={{ top: guides.bottom }} />
            </>
          )}
        </>
      )}
      <div
        ref={contentRef}
        className={contentClassName ? `PreviewFrame__content ${contentClassName}` : 'PreviewFrame__content'}
        style={{ '--preview-scale': scale } as CSSProperties}
        // The preview is a picture only – `inert` removes it from hover, focus and the accessibility tree.
        inert
      >
        {children ?? <div className="PreviewFrame__placeholder" />}
      </div>
    </div>
  );
};

export default PreviewFrame;
