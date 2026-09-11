'use client';

import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import ProgressBarAnimation from './ProgressBarAnimation';
import ProgressBarColors from './ProgressBarColors';
import ProgressBarCompletion from './ProgressBarCompletion';
import ProgressBarDefault from './ProgressBarDefault';
import ProgressBarDisabled from './ProgressBarDisabled';
import ProgressBarFieldComposition from './ProgressBarFieldComposition';
import ProgressBarValuePlacement from './ProgressBarValuePlacement';
import ProgressBarWithFile from './ProgressBarWithFile';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default" stackAlignment="stretch">
        <ProgressBarDefault />
      </DocsSection>
      <DocsSection title="Completion" stackAlignment="stretch">
        <ProgressBarCompletion />
      </DocsSection>
      <DocsSection title="Animation" stackAlignment="stretch">
        <ProgressBarAnimation />
      </DocsSection>
      <DocsSection title="Value Placement" stackAlignment="stretch">
        <ProgressBarValuePlacement />
      </DocsSection>
      <DocsSection title="Colors" stackAlignment="stretch">
        <ProgressBarColors />
      </DocsSection>
      <DocsSection title="Field Composition" stackAlignment="stretch">
        <ProgressBarFieldComposition />
      </DocsSection>
      <DocsSection title="Disabled State" stackAlignment="stretch">
        <ProgressBarDisabled />
      </DocsSection>
      <DocsSection title="Usage with File" stackAlignment="stretch">
        <ProgressBarWithFile />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
