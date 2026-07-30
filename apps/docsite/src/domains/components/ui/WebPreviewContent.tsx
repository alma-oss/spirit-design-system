'use client';

import React, { useEffect, useRef } from 'react';

interface WebPreviewContentProps {
  html: string;
}

// Scripts inserted via dangerouslySetInnerHTML never execute (the browser ignores <script> tags
// created outside of a real parse), so bespoke inline demo scripts (e.g. Dropdown/preview.html's
// placement-radio handler) need to be manually re-created to run.
const executeInlineScripts = (container: HTMLElement) => {
  container.querySelectorAll('script').forEach((oldScript) => {
    const newScript = document.createElement('script');

    oldScript.getAttributeNames().forEach((name) => newScript.setAttribute(name, oldScript.getAttribute(name) ?? ''));
    newScript.textContent = oldScript.textContent;
    oldScript.replaceWith(newScript);
  });
};

const WebPreviewContent = ({ html }: WebPreviewContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    executeInlineScripts(container);

    let cancelled = false;

    // Importing @alma-oss/spirit-web's JS registers each interactive component's auto-binder,
    // but only against the page's original DOMContentLoaded, which already fired before this
    // content was injected — initSpiritComponents() re-runs that binding scoped to `container`.
    import('@workspace/web/js/index.esm').then(({ initSpiritComponents }) => {
      if (!cancelled) {
        initSpiritComponents(container);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [html]);

  return (
    <div
      ref={containerRef}
      // eslint-disable-next-line react/no-danger -- rendering compiled preview HTML, static
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default WebPreviewContent;
