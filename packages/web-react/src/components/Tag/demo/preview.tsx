'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import TagAppearance from './TagAppearance';
import TagDefault from './TagDefault';
import TagDisabled from './TagDisabled';
import TagWithControlButton from './TagWithControlButton';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default" stackAlignment="stretch">
        <TagDefault />
      </DocsSection>
      <DocsSection title="Feature Flag: Appearance" stackAlignment="stretch">
        <TagAppearance />
      </DocsSection>
      <DocsSection title="With ControlButton">
        <TagWithControlButton />
      </DocsSection>
      <DocsSection title="Disabled">
        <TagDisabled />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
