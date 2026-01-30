import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import TextAlignment from './TextAlignment';
import TextBalanced from './TextBalanced';
import TextColor from './TextColor';
import TextDefault from './TextDefault';
import TextEmphasis from './TextEmphasis';
import TextHyphens from './TextHyphens';
import TextSizes from './TextSizes';
import TextWordBreak from './TextWordBreak';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DocsSection title="Default">
      <TextDefault />
    </DocsSection>
    <DocsSection title="Sizes">
      <TextSizes />
    </DocsSection>
    <DocsSection title="Emphasis">
      <TextEmphasis />
    </DocsSection>
    <DocsSection title="Colors">
      <TextColor />
    </DocsSection>
    <DocsSection title="Alignment" stackAlignment="stretch">
      <TextAlignment />
    </DocsSection>
    <DocsSection title="Balanced Wrapping" stackAlignment="stretch">
      <TextBalanced />
    </DocsSection>
    <DocsSection title="Word Break" stackAlignment="stretch">
      <TextWordBreak />
    </DocsSection>
    <DocsSection title="Hyphens" stackAlignment="stretch">
      <TextHyphens />
    </DocsSection>
  </StrictMode>,
);
