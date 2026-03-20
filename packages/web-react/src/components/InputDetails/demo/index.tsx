// Because there is no `dist` directory during the CI run

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import InputDetailsCheckbox from './InputDetailsCheckbox';
import InputDetailsCheckboxDisabled from './InputDetailsCheckboxDisabled';
import InputDetailsToggle from './InputDetailsToggle';
import InputDetailsToggleDisabled from './InputDetailsToggleDisabled';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Usage with Checkbox" stackAlignment="start">
        <InputDetailsCheckbox />
      </DocsSection>
      <DocsSection title="Usage with Disabled Checkbox" stackAlignment="start">
        <InputDetailsCheckboxDisabled />
      </DocsSection>
      <DocsSection title="Usage with Toggle" stackAlignment="start">
        <InputDetailsToggle />
      </DocsSection>
      <DocsSection title="Usage with Disabled Toggle" stackAlignment="start">
        <InputDetailsToggleDisabled />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
