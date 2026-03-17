// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import { Section } from '../../Section';
import { Text } from '../../Text';
import HelperTextCheckboxRadioItem from './HelperTextCheckboxRadioItem';
import HelperTextDefault from './HelperTextDefault';
import HelperTextInlineCheckbox from './HelperTextInlineCheckbox';
import HelperTextItemComponent from './HelperTextItemComponent';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <Section size="small" UNSAFE_className="hide-from-visual-tests">
        <Text>
          <strong>Note:</strong> For demonstration purposes and to fulfill accessibility and HTML semantics
          requirements, all HelperText on this page are associated with related form component.
        </Text>
      </Section>
      <DocsSection title="Default">
        <HelperTextDefault />
      </DocsSection>
      <DocsSection title="Inline with Checkbox">
        <HelperTextInlineCheckbox />
      </DocsSection>
      <DocsSection title="Combined with Item component">
        <HelperTextItemComponent />
      </DocsSection>
      <DocsSection title="Combined with Checkbox Item and Radio Item">
        <HelperTextCheckboxRadioItem />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
