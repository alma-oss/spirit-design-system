'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import SpinnerColors from './SpinnerColors';
import SpinnerDefault from './SpinnerDefault';
import SpinnerIconProps from './SpinnerIconProps';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <SpinnerDefault />
      </DocsSection>
      <DocsSection title="Colors">
        <SpinnerColors />
      </DocsSection>
      <DocsSection title="Icon Props">
        <SpinnerIconProps />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
