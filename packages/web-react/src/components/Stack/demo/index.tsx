// Because there is no `dist` directory during the CI run
/* eslint-disable import/no-extraneous-dependencies, import/extensions, import/no-unresolved */
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import StackBlocks from './StackBlocks';
import StackBlocksWithCustomSpacing from './StackBlocksWithCustomSpacing';
import StackBlocksWithCustomSpacingAndDividers from './StackBlocksWithCustomSpacingAndDividers';
import StackBlocksWithCustomSpacingForEachBreakpoint from './StackBlocksWithCustomSpacingForEachBreakpoint';
import StackBlocksWithCustomSpacingFromTabletBreakpoint from './StackBlocksWithCustomSpacingFromTabletBreakpoint';
import StackBlocksWithInnerAndOuterDividersAndVerticalSpacing from './StackBlocksWithInnerAndOuterDividersAndVerticalSpacing';
import StackBlocksWithInnerDividersAndVerticalSpacing from './StackBlocksWithInnerDividersAndVerticalSpacing';
import StackBlocksWithInnerDividersWithoutVerticalSpacing from './StackBlocksWithInnerDividersWithoutVerticalSpacing';
import StackBlocksWithVerticalSpacing from './StackBlocksWithVerticalSpacing';
import StackFormFields from './StackFormFields';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DocsSection title="Stacked Form Fields" stackAlignment="stretch">
      <StackFormFields />
    </DocsSection>
    <DocsSection title="Stacked Blocks" stackAlignment="stretch">
      <StackBlocks />
    </DocsSection>
    <DocsSection title="Stacked Blocks with Vertical Spacing" stackAlignment="stretch">
      <StackBlocksWithVerticalSpacing />
    </DocsSection>
    <DocsSection title="Stacked Blocks with Inner Dividers and Vertical Spacing" stackAlignment="stretch">
      <StackBlocksWithInnerDividersAndVerticalSpacing />
    </DocsSection>
    <DocsSection title="Stacked Blocks with Inner and Outer Dividers and Vertical Spacing" stackAlignment="stretch">
      <StackBlocksWithInnerAndOuterDividersAndVerticalSpacing />
    </DocsSection>
    <DocsSection title="Stacked Blocks with Inner Dividers without Vertical Spacing" stackAlignment="stretch">
      <StackBlocksWithInnerDividersWithoutVerticalSpacing />
    </DocsSection>
    <DocsSection title="Stacked Blocks with Custom Spacing" stackAlignment="stretch">
      <StackBlocksWithCustomSpacing />
    </DocsSection>
    <DocsSection title="Stacked Blocks with Custom Spacing from Tablet Breakpoint" stackAlignment="stretch">
      <StackBlocksWithCustomSpacingFromTabletBreakpoint />
    </DocsSection>
    <DocsSection title="Stacked Blocks with Custom Spacing for Each Breakpoint" stackAlignment="stretch">
      <StackBlocksWithCustomSpacingForEachBreakpoint />
    </DocsSection>
    <DocsSection title="Stacked Blocks with Custom Spacing and Inner and Outer Dividers" stackAlignment="stretch">
      <StackBlocksWithCustomSpacingAndDividers />
    </DocsSection>
  </StrictMode>,
);
