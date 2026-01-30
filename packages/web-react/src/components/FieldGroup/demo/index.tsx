// Because there is no `dist` directory during the CI run
/* eslint-disable import/no-extraneous-dependencies, import/extensions, import/no-unresolved */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment, import/extensions, import/no-unresolved
// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import FieldGroupDefault from './FieldGroupDefault';
import FieldGroupDisabled from './FieldGroupDisabled';
import FieldGroupFluid from './FieldGroupFluid';
import FieldGroupGroupedCheckboxes from './FieldGroupGroupedCheckboxes';
import FieldGroupGroupedRadios from './FieldGroupGroupedRadios';
import FieldGroupHelperText from './FieldGroupHelperText';
import FieldGroupHiddenLabel from './FieldGroupHiddenLabel';
import FieldGroupRequired from './FieldGroupRequired';
import FieldGroupValidationState from './FieldGroupValidationState';
import FieldGroupValidationWithIcon from './FieldGroupValidationWithIcon';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <FieldGroupDefault />
      </DocsSection>
      <DocsSection title="Required">
        <FieldGroupRequired />
      </DocsSection>
      <DocsSection title="Hidden Label">
        <FieldGroupHiddenLabel />
      </DocsSection>
      <DocsSection title="Helper Text">
        <FieldGroupHelperText />
      </DocsSection>
      <DocsSection title="Disabled">
        <FieldGroupDisabled />
      </DocsSection>
      <DocsSection title="Validation State with Validation Text">
        <FieldGroupValidationState />
      </DocsSection>
      <DocsSection title="Validation Text with Icon">
        <FieldGroupValidationWithIcon />
      </DocsSection>
      <DocsSection title="Fluid">
        <FieldGroupFluid />
      </DocsSection>
      <DocsSection title="Grouped Checkboxes">
        <FieldGroupGroupedCheckboxes />
      </DocsSection>
      <DocsSection title="Grouped Radios">
        <FieldGroupGroupedRadios />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
