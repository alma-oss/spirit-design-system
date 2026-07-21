import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import CheckboxConsentCollapseExample from './CheckboxConsentCollapseExample';
import CheckboxConsentModalExample from './CheckboxConsentModalExample';
import CheckboxDefault from './CheckboxDefault';
import CheckboxDisabled from './CheckboxDisabled';
import CheckboxHelperText from './CheckboxHelperText';
import CheckboxHiddenLabel from './CheckboxHiddenLabel';
import CheckboxIndeterminate from './CheckboxIndeterminate';
import CheckboxInputPosition from './CheckboxInputPosition';
import CheckboxItem from './CheckboxItem';
import CheckboxRequired from './CheckboxRequired';
import CheckboxValidation from './CheckboxValidation';
import CheckboxValidationWithIcon from './CheckboxValidationWithIcon';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <CheckboxDefault />
      </DocsSection>
      <DocsSection title="Indeterminate">
        <CheckboxIndeterminate />
      </DocsSection>
      <DocsSection title="Required">
        <CheckboxRequired />
      </DocsSection>
      <DocsSection title="Hidden Label">
        <CheckboxHiddenLabel />
      </DocsSection>
      <DocsSection title="Helper Text">
        <CheckboxHelperText />
      </DocsSection>
      <DocsSection title="Disabled">
        <CheckboxDisabled />
      </DocsSection>
      <DocsSection title="Validation State with Validation Text">
        <CheckboxValidation />
      </DocsSection>
      <DocsSection title="Validation Text with Icon">
        <CheckboxValidationWithIcon />
      </DocsSection>
      <DocsSection title="Input Position">
        <CheckboxInputPosition />
      </DocsSection>
      <DocsSection title="Item">
        <CheckboxItem />
      </DocsSection>
      <DocsSection title="Consent with Modal">
        <CheckboxConsentModalExample />
      </DocsSection>
      <DocsSection title="Consent with Collapse">
        <CheckboxConsentCollapseExample />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
