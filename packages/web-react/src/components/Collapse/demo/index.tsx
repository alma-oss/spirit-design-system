// Because there is no `dist` directory during the CI run
/* eslint-disable import/no-extraneous-dependencies, import/extensions, import/no-unresolved */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import CollapseDefault from './CollapseDefault';
import CollapseHelperClass from './CollapseHelperClass';
import CollapseHideTrigger from './CollapseHideTrigger';
import CollapseMultipleTriggers from './CollapseMultipleTriggers';
import CollapseOpenOnInit from './CollapseOpenOnInit';
import CollapseVisibilityBreakpointDesktop from './CollapseVisibilityBreakpointDesktop';
import CollapseVisibilityBreakpointTablet from './CollapseVisibilityBreakpointTablet';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <CollapseDefault />
      </DocsSection>
      <DocsSection title="Open on Load">
        <CollapseOpenOnInit />
      </DocsSection>
      <DocsSection title="Destroy Collapsing on Tablet" tag="Resize your viewport to test">
        <CollapseVisibilityBreakpointTablet />
      </DocsSection>
      <DocsSection title="Destroy Collapsing on Desktop" tag="Resize your viewport to test">
        <CollapseVisibilityBreakpointDesktop />
      </DocsSection>
      <DocsSection title="One-time Inline Expanding">
        <CollapseHideTrigger />
      </DocsSection>
      <DocsSection title="Toggle Trigger Text">
        <CollapseHelperClass />
      </DocsSection>
      <DocsSection title="Multiple Triggers">
        <CollapseMultipleTriggers />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
