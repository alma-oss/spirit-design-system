// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import NavigationAvatarDemo from './NavigationAvatarDemo';
import NavigationHorizontal from './NavigationHorizontal';
import NavigationHorizontalWithBoxAction from './NavigationHorizontalWithBoxAction';
import NavigationHorizontalWithButtons from './NavigationHorizontalWithButtons';
import NavigationHorizontalWithDropdown from './NavigationHorizontalWithDropdown';
import NavigationHorizontalWithPillAction from './NavigationHorizontalWithPillAction';
import NavigationVertical from './NavigationVertical';
import NavigationVerticalWithBoxAction from './NavigationVerticalWithBoxAction';
import NavigationVerticalWithButtons from './NavigationVerticalWithButtons';
import NavigationVerticalWithCollapse from './NavigationVerticalWithCollapse';
import NavigationVerticalWithPillAction from './NavigationVerticalWithPillAction';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Horizontal Navigation" stackAlignment="stretch">
        <NavigationHorizontal />
      </DocsSection>
      <DocsSection title="Vertical Navigation" stackAlignment="stretch">
        <NavigationVertical />
      </DocsSection>
      <DocsSection title="Horizontal Navigation with Box NavigationAction" stackAlignment="stretch">
        <NavigationHorizontalWithBoxAction />
      </DocsSection>
      <DocsSection title="Vertical Navigation with Box NavigationAction" stackAlignment="stretch">
        <NavigationVerticalWithBoxAction />
      </DocsSection>
      <DocsSection title="Horizontal Navigation with Buttons" stackAlignment="stretch">
        <NavigationHorizontalWithButtons />
      </DocsSection>
      <DocsSection title="Vertical Navigation with Buttons" stackAlignment="stretch">
        <NavigationVerticalWithButtons />
      </DocsSection>
      <DocsSection title="Nested Horizontal Box Navigation with Dropdown" stackAlignment="stretch">
        <NavigationHorizontalWithDropdown />
      </DocsSection>
      <DocsSection title="Nested Vertical Box Navigation with Collapse" stackAlignment="stretch">
        <NavigationVerticalWithCollapse />
      </DocsSection>
      <DocsSection title="Horizontal Navigation with Pill NavigationAction" stackAlignment="stretch">
        <NavigationHorizontalWithPillAction />
      </DocsSection>
      <DocsSection title="Vertical Navigation with Pill NavigationAction" stackAlignment="stretch">
        <NavigationVerticalWithPillAction />
      </DocsSection>
      <DocsSection title="NavigationAvatar" stackAlignment="stretch">
        <NavigationAvatarDemo />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
