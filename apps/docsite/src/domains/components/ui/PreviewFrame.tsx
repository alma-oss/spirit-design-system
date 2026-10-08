'use client';

import { useIsomorphicLayoutEffect } from '@alma-oss/spirit-web-react';
import React, { CSSProperties, useRef, useState } from 'react';
import styles from './PreviewFrame.module.scss';

interface PreviewFrameProps {
  html?: string;
  contentClassName?: string;
}

// Add `<!-- doc-preview-guides: vertical -->` or `<!-- doc-preview-guides: horizontal -->` to `doc-preview-card.html`
// to draw only the vertical or only the horizontal guides. Both are drawn by default.
const GUIDES_PATTERN = /<!--\s*doc-preview-guides:\s*(vertical|horizontal)\s*-->/;

interface Guides {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

const PreviewFrame = ({ html = undefined, contentClassName = undefined }: PreviewFrameProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [guides, setGuides] = useState<Guides | null>(null);
  const guidesOnly = html?.match(GUIDES_PATTERN)?.[1];
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
  }, [html]);

  return (
    <div ref={frameRef} className={styles.frame}>
      {guides && (
        <>
          {hasVerticalGuides && (
            <>
              <span className={`${styles.guide} ${styles.guideVertical}`} style={{ left: guides.left }} />
              <span className={`${styles.guide} ${styles.guideVertical}`} style={{ left: guides.right }} />
            </>
          )}
          {hasHorizontalGuides && (
            <>
              <span className={`${styles.guide} ${styles.guideHorizontal}`} style={{ top: guides.top }} />
              <span className={`${styles.guide} ${styles.guideHorizontal}`} style={{ top: guides.bottom }} />
            </>
          )}
        </>
      )}
      <div
        ref={contentRef}
        className={contentClassName ? `${styles.content} ${contentClassName}` : styles.content}
        style={{ '--preview-scale': scale } as CSSProperties}
        // The preview is a picture only – `inert` removes it from hover, focus and the accessibility tree.
        inert
      >
        {html ? (
          // eslint-disable-next-line react/no-danger -- compiled static card preview
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
    </div>
  );
};

export default PreviewFrame;
