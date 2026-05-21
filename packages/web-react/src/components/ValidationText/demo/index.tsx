// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import ValidationTextAsList from './ValidationTextAsList';
import ValidationTextDisabled from './ValidationTextDisabled';
import ValidationTextInlineCheckbox from './ValidationTextInlineCheckbox';
import ValidationTextItemType from './ValidationTextItemType';
import ValidationTextValidationStates from './ValidationTextValidationStates';
import ValidationTextWithIcon from './ValidationTextWithIcon';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Validation States">
        <ValidationTextValidationStates />
      </DocsSection>
      <DocsSection title="With Icon">
        <ValidationTextWithIcon />
      </DocsSection>
      <DocsSection title="As List">
        <ValidationTextAsList />
      </DocsSection>
      <DocsSection title="Disabled">
        <ValidationTextDisabled />
      </DocsSection>
      <DocsSection title="Inline Field (Checkbox)">
        <ValidationTextInlineCheckbox />
      </DocsSection>
      <DocsSection title="Item Mode (Checkbox Item)">
        <ValidationTextItemType />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
