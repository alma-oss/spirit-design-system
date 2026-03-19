// Because there is no `dist` directory during the CI run

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import { Section } from '../../Section';
import { Text } from '../../Text';
import LabelBoxTextField from './LabelBoxTextField';
import LabelCombinedCheckboxRadioItem from './LabelCombinedCheckboxRadioItem';
import LabelInlineCheckbox from './LabelInlineCheckbox';
import LabelItemComponent from './LabelItemComponent';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <Section size="small" UNSAFE_className="hide-from-visual-tests">
        <Text>
          <strong>Note:</strong> For demonstration purposes and to fulfill accessibility and HTML semantics
          requirements, all labels on this page are associated with related form component.
        </Text>
      </Section>
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
  </StrictMode>,
);
