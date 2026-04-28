'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import UNSTABLE_TableCombined from './UNSTABLE_TableCombined';
import UNSTABLE_TableDefault from './UNSTABLE_TableDefault';
import UNSTABLE_TableStriped from './UNSTABLE_TableStriped';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Basic Table" stackAlignment="stretch">
        <UNSTABLE_TableDefault />
      </DocsSection>
      <DocsSection title="Striped Table" stackAlignment="stretch">
        <UNSTABLE_TableStriped />
      </DocsSection>
      <DocsSection title="Combined Modifiers" stackAlignment="stretch">
        <UNSTABLE_TableCombined />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
