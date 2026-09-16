'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Some helpers (e.g. dynamic-color/preview.html) mutate descendant elements' inline styles
// synchronously as soon as their script runs, before any user interaction. If this were SSR'd,
// the browser would run that script natively during the initial HTML parse (before React
// hydrates), so those descendant elements would already differ from what hydration expects.
// WebPreview's suppressHydrationWarning only covers its own container element, not mutations on
// elements nested inside it, so it doesn't cover this case. Importing with ssr:false keeps the
// preview out of the server-rendered HTML entirely so no mismatch is possible.
const WebPreview = dynamic(() => import('@local/domains/components/ui/WebPreview'), { ssr: false });

interface HelperPreviewProps {
  html: string;
}

const HelperPreview = ({ html }: HelperPreviewProps) => <WebPreview html={html} />;

export default HelperPreview;
