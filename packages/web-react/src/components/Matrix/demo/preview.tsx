'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import MatrixColumnsWithScrollView from './MatrixColumnsWithScrollView';
import MatrixDefault from './MatrixDefault';
import MatrixResponsiveColumnsGap from './MatrixResponsiveColumnsGap';
import MatrixScrollView from './MatrixScrollView';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="Default" stackAlignment="stretch">
      <MatrixDefault />
    </DocsSection>
    <DocsSection title="Stacks with Scroll View" stackAlignment="stretch">
      <MatrixScrollView />
    </DocsSection>
    <DocsSection title="Custom Columns and Column Gap with Scroll View" stackAlignment="stretch">
      <MatrixColumnsWithScrollView />
    </DocsSection>
    <DocsSection title="Responsive Custom Columns, Column Gap, and Row Gap" stackAlignment="stretch">
      <MatrixResponsiveColumnsGap />
    </DocsSection>
  </StrictMode>
);
