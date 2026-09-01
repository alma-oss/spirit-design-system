'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import DisplayHeadingAlignment from './DisplayHeadingAlignment';
import DisplayHeadingBalanced from './DisplayHeadingBalanced';
import DisplayHeadingColors from './DisplayHeadingColors';
import DisplayHeadingDefault from './DisplayHeadingDefault';
import DisplayHeadingHyphens from './DisplayHeadingHyphens';
import DisplayHeadingItalic from './DisplayHeadingItalic';
import DisplayHeadingSizes from './DisplayHeadingSizes';
import DisplayHeadingWordBreak from './DisplayHeadingWordBreak';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="Default">
      <DisplayHeadingDefault />
    </DocsSection>
    <DocsSection title="Sizes">
      <DisplayHeadingSizes />
    </DocsSection>
    <DocsSection title="Italic">
      <DisplayHeadingItalic />
    </DocsSection>
    <DocsSection title="Colors">
      <DisplayHeadingColors />
    </DocsSection>
    <DocsSection title="Alignment" stackAlignment="stretch">
      <DisplayHeadingAlignment />
    </DocsSection>
    <DocsSection title="Balanced Wrapping" stackAlignment="stretch">
      <DisplayHeadingBalanced />
    </DocsSection>
    <DocsSection title="Word Break" stackAlignment="stretch">
      <DisplayHeadingWordBreak />
    </DocsSection>
    <DocsSection title="Text Hyphens" stackAlignment="stretch">
      <DisplayHeadingHyphens />
    </DocsSection>
  </StrictMode>
);
