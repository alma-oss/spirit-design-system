'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import RadioDefault from './RadioDefault';
import RadioDisabled from './RadioDisabled';
import RadioHelperText from './RadioHelperText';
import RadioHiddenLabel from './RadioHiddenLabel';
import RadioInputPosition from './RadioInputPosition';
import RadioItem from './RadioItem';
import RadioLongLabelText from './RadioLongLabelText';
import RadioValidation from './RadioValidation';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <RadioDefault />
      </DocsSection>
      <DocsSection title="With Long Label Text">
        <RadioLongLabelText />
      </DocsSection>
      <DocsSection title="Hidden Label">
        <RadioHiddenLabel />
      </DocsSection>
      <DocsSection title="Helper Text">
        <RadioHelperText />
      </DocsSection>
      <DocsSection title="Disabled">
        <RadioDisabled />
      </DocsSection>
      <DocsSection title="Validation State">
        <RadioValidation />
      </DocsSection>
      <DocsSection title="Input Position">
        <RadioInputPosition />
      </DocsSection>
      <DocsSection title="Item">
        <RadioItem />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
