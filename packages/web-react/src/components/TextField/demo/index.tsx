// Because there is no `dist` directory during the CI run
/* eslint-disable import/no-extraneous-dependencies, import/extensions, import/no-unresolved */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment, import/extensions, import/no-unresolved
// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import TextFieldDefault from './TextFieldDefault';
import TextFieldDisabled from './TextFieldDisabled';
import TextFieldFluid from './TextFieldFluid';
import TextFieldHelperText from './TextFieldHelperText';
import TextFieldHiddenLabel from './TextFieldHiddenLabel';
import TextFieldInline from './TextFieldInline';
import TextFieldInputSize from './TextFieldInputSize';
import TextFieldPasswordToggle from './TextFieldPasswordToggle';
import TextFieldRequired from './TextFieldRequired';
import TextFieldSizes from './TextFieldSizes';
import TextFieldValidation from './TextFieldValidation';
import TextFieldValidationWithIcon from './TextFieldValidationWithIcon';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <TextFieldDefault />
      </DocsSection>
      <DocsSection title="Password Toggle">
        <TextFieldPasswordToggle />
      </DocsSection>
      <DocsSection title="Sizes">
        <TextFieldSizes />
      </DocsSection>
      <DocsSection title="Required">
        <TextFieldRequired />
      </DocsSection>
      <DocsSection title="Hidden Label">
        <TextFieldHiddenLabel />
      </DocsSection>
      <DocsSection title="Helper Text">
        <TextFieldHelperText />
      </DocsSection>
      <DocsSection title="Disabled">
        <TextFieldDisabled />
      </DocsSection>
      <DocsSection title="Validation State with Validation Text">
        <TextFieldValidation />
      </DocsSection>
      <DocsSection title="Validation Text with Icon">
        <TextFieldValidationWithIcon />
      </DocsSection>
      <DocsSection title="Fluid">
        <TextFieldFluid />
      </DocsSection>
      <DocsSection title="Input Size">
        <TextFieldInputSize />
      </DocsSection>
      <DocsSection title="Inline">
        <TextFieldInline />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
