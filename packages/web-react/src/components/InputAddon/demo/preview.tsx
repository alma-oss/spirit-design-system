'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import InputAddonCurrency from './InputAddonCurrency';
import InputAddonDefault from './InputAddonDefault';
import InputAddonIcon from './InputAddonIcon';
import InputAddonMultiple from './InputAddonMultiple';
import InputAddonSizes from './InputAddonSizes';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <InputAddonDefault />
      </DocsSection>
      <DocsSection title="Icon">
        <InputAddonIcon />
      </DocsSection>
      <DocsSection title="Currency">
        <InputAddonCurrency />
      </DocsSection>
      <DocsSection title="Multiple Addons">
        <InputAddonMultiple />
      </DocsSection>
      <DocsSection title="Sizes">
        <InputAddonSizes />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
