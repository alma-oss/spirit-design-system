'use client';

import React, { useEffect, useRef } from 'react';

interface WebPreviewProps {
  html: string;
}

// Scripts inserted via dangerouslySetInnerHTML never execute (the browser ignores <script> tags
// created outside of a real parse), so bespoke inline demo scripts (e.g. Dropdown/preview.html's
// placement-radio handler) need to be manually re-created to run.
//
// `data-executed` guards against React Strict Mode's double-invoke of `useEffect`: without it,
// the second invocation would re-execute scripts that already ran (e.g. a `const prefix = …`
// declaration) and throw "Identifier already declared" in the shared global lexical environment.
const executeInlineScripts = (container: HTMLElement) => {
  container.querySelectorAll<HTMLScriptElement>('script:not([data-executed])').forEach((oldScript) => {
    const newScript = document.createElement('script');

    oldScript.getAttributeNames().forEach((name) => newScript.setAttribute(name, oldScript.getAttribute(name) ?? ''));
    newScript.dataset.executed = 'true';
    newScript.textContent = oldScript.textContent;
    oldScript.replaceWith(newScript);
  });
};

const WebPreview = ({ html }: WebPreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    executeInlineScripts(container);

    import('@alma-oss/spirit-web/src/js/index.esm').then(({ loadComponents }) => loadComponents(container));
  }, [html]);

  return (
    <div
      ref={containerRef}
      // eslint-disable-next-line react/no-danger -- rendering compiled preview HTML, static
      dangerouslySetInnerHTML={{ __html: html }}
      // Component preview pages are SSR'd and their inline scripts may mutate the DOM (e.g.
      // inline styles) between server render and hydration — suppress the mismatch warning.
      suppressHydrationWarning
    />
  );
};

export default WebPreview;
