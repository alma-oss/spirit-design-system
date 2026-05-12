'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import UNSTABLE_TableBordered from './UNSTABLE_TableBordered';
import UNSTABLE_TableCombined from './UNSTABLE_TableCombined';
import UNSTABLE_TableCompact from './UNSTABLE_TableCompact';
import UNSTABLE_TableDefault from './UNSTABLE_TableDefault';
import UNSTABLE_TableHoverable from './UNSTABLE_TableHoverable';
import UNSTABLE_TableStriped from './UNSTABLE_TableStriped';
import UNSTABLE_TableWithCaption from './UNSTABLE_TableWithCaption';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Basic Table" stackAlignment="stretch">
        <UNSTABLE_TableDefault />
      </DocsSection>
      <DocsSection title="Striped Table" stackAlignment="stretch">
        <UNSTABLE_TableStriped />
      </DocsSection>
      <DocsSection title="Bordered Table" stackAlignment="stretch">
        <UNSTABLE_TableBordered />
      </DocsSection>
      <DocsSection title="Compact Table" stackAlignment="stretch">
        <UNSTABLE_TableCompact />
      </DocsSection>
      <DocsSection title="Hoverable Table" stackAlignment="stretch">
        <UNSTABLE_TableHoverable />
      </DocsSection>
      <DocsSection title="Combined Modifiers" stackAlignment="stretch">
        <UNSTABLE_TableCombined />
      </DocsSection>
      <DocsSection title="With Caption (Accessibility)" stackAlignment="stretch">
        <UNSTABLE_TableWithCaption />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
