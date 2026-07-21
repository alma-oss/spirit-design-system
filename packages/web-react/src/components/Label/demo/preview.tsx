'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import LabelBoxTextField from './LabelBoxTextField';
import LabelCombinedCheckboxRadioItem from './LabelCombinedCheckboxRadioItem';
import LabelInlineCheckbox from './LabelInlineCheckbox';
import LabelItemComponent from './LabelItemComponent';
import LabelSizes from './LabelSizes';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Sizes">
        <LabelSizes />
      </DocsSection>
      <DocsSection title="Box Label with TextField">
        <LabelBoxTextField />
      </DocsSection>
      <DocsSection title="Inline Label with Checkbox">
        <LabelInlineCheckbox />
      </DocsSection>
      <DocsSection title="Item Label with Item Component">
        <LabelItemComponent />
      </DocsSection>
      <DocsSection title="Combined Label with Checkbox Item">
        <LabelCombinedCheckboxRadioItem />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
