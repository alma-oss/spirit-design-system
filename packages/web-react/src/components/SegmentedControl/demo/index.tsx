// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import SegmentedControlContentVariants from './SegmentedControlContentVariants';
import SegmentedControlDesignVariants from './SegmentedControlDesignVariants';
import SegmentedControlFluid from './SegmentedControlFluid';
import SegmentedControlMultipleSelection from './SegmentedControlMultipleSelection';
import SegmentedControlWithDisableItem from './SegmentedControlWithDisableItem';
import SegmentedControlWithTooltip from './SegmentedControlWithTooltip';
import SegmentedControlWithTooltipAndLargerItemSet from './SegmentedControlWithTooltipAndLargerItemSet';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Design Variants">
        <SegmentedControlDesignVariants />
      </DocsSection>
      <DocsSection title="Content Variants">
        <SegmentedControlContentVariants />
      </DocsSection>
      <DocsSection title="Multiple Selection">
        <SegmentedControlMultipleSelection />
      </DocsSection>
      <DocsSection title="Variant with Disabled Item">
        <SegmentedControlWithDisableItem />
      </DocsSection>
      <DocsSection title="Fluid">
        <SegmentedControlFluid />
      </DocsSection>
      <DocsSection title="Variant with Tooltip">
        <SegmentedControlWithTooltip />
      </DocsSection>
      <DocsSection title="Variant with Tooltip and Larger Item Set">
        <SegmentedControlWithTooltipAndLargerItemSet />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
