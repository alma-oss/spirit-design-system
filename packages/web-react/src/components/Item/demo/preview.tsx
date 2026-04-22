'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import CheckboxItem from './CheckboxItem';
import ItemDefault from './ItemDefault';
import ItemDisabled from './ItemDisabled';
import ItemHelperText from './ItemHelperText';
import ItemIcon from './ItemIcon';
import ItemSelected from './ItemSelected';
import RadioItem from './RadioItem';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <ItemDefault />
      </DocsSection>
      <DocsSection title="Selected" stackAlignment="stretch">
        <ItemSelected />
      </DocsSection>
      <DocsSection title="Disabled">
        <ItemDisabled />
      </DocsSection>
      <DocsSection title="Helper Text">
        <ItemHelperText />
      </DocsSection>
      <DocsSection title="Icon">
        <ItemIcon />
      </DocsSection>
      <DocsSection title="Checkbox Item">
        <CheckboxItem />
      </DocsSection>
      <DocsSection title="Radio Item">
        <RadioItem />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
