'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import PillColors from './PillColors';
import PillLongText from './PillLongText';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="Colors">
      <PillColors />
    </DocsSection>
    <DocsSection title="Long Text">
      <PillLongText />
    </DocsSection>
  </StrictMode>
);
