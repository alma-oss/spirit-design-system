// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import ValidationTextAsList from './ValidationTextAsList';
import ValidationTextDisabled from './ValidationTextDisabled';
import ValidationTextInlineCheckbox from './ValidationTextInlineCheckbox';
import ValidationTextItemVariant from './ValidationTextItemVariant';
import ValidationTextValidationStates from './ValidationTextValidationStates';
import ValidationTextWithIcon from './ValidationTextWithIcon';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Validation States" stackAlignment="start">
        <ValidationTextValidationStates />
      </DocsSection>
      <DocsSection title="With Icon" stackAlignment="start">
        <ValidationTextWithIcon />
      </DocsSection>
      <DocsSection title="As List" stackAlignment="start">
        <ValidationTextAsList />
      </DocsSection>
      <DocsSection title="Disabled" stackAlignment="start">
        <ValidationTextDisabled />
      </DocsSection>
      <DocsSection title="Inline Field (Checkbox)" stackAlignment="start">
        <ValidationTextInlineCheckbox />
      </DocsSection>
      <DocsSection title="Item Variant (Checkbox Item)" stackAlignment="start">
        <ValidationTextItemVariant />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
