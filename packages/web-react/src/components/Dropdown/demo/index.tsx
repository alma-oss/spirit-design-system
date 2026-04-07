import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import DropdownAlignment from './DropdownAlignment';
import DropdownDisabledAutoclose from './DropdownDisabledAutoclose';
import DropdownFullwidthAll from './DropdownFullwidthAll';
import DropdownFullwidthMobileOnly from './DropdownFullwidthMobileOnly';
import DropdownLongerContent from './DropdownLongerContent';
import DropdownPlacements from './DropdownPlacements';
import DropdownVariousItems from './DropdownVariousItems';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Placements" stackAlignment="stretch">
        <DropdownPlacements />
      </DocsSection>
      <DocsSection title="Alignment" stackAlignment="stretch">
        <DropdownAlignment />
      </DocsSection>
      <DocsSection title="Various items">
        <DropdownVariousItems />
      </DocsSection>
      <DocsSection title="Usage with disabled auto close">
        <DropdownDisabledAutoclose />
      </DocsSection>
      <DocsSection title="Longer content">
        <DropdownLongerContent />
      </DocsSection>
      <DocsSection title="Full-width mode 'all'">
        <DropdownFullwidthAll />
      </DocsSection>
      <DocsSection title="Full-width mode 'mobile-only'">
        <DropdownFullwidthMobileOnly />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
