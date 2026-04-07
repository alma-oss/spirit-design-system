import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import TextAreaAutoResize from './TextAreaAutoResize';
import TextAreaCounter from './TextAreaCounter';
import TextAreaDefault from './TextAreaDefault';
import TextAreaDisabled from './TextAreaDisabled';
import TextAreaFluid from './TextAreaFluid';
import TextAreaHelperText from './TextAreaHelperText';
import TextAreaHiddenLabel from './TextAreaHiddenLabel';
import TextAreaInline from './TextAreaInline';
import TextAreaRequired from './TextAreaRequired';
import TextAreaSizes from './TextAreaSizes';
import TextAreaValidation from './TextAreaValidation';
import TextAreaValidationWithIcon from './TextAreaValidationWithIcon';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <TextAreaDefault />
      </DocsSection>
      <DocsSection title="Sizes">
        <TextAreaSizes />
      </DocsSection>
      <DocsSection title="Required">
        <TextAreaRequired />
      </DocsSection>
      <DocsSection title="Hidden Label">
        <TextAreaHiddenLabel />
      </DocsSection>
      <DocsSection title="Helper Text">
        <TextAreaHelperText />
      </DocsSection>
      <DocsSection title="Disabled">
        <TextAreaDisabled />
      </DocsSection>
      <DocsSection title="Validation State with Validation Text">
        <TextAreaValidation />
      </DocsSection>
      <DocsSection title="Validation Text with Icon">
        <TextAreaValidationWithIcon />
      </DocsSection>
      <DocsSection title="Fluid">
        <TextAreaFluid />
      </DocsSection>
      <DocsSection title="Inline">
        <TextAreaInline />
      </DocsSection>
      <DocsSection title="AutoResize">
        <TextAreaAutoResize />
      </DocsSection>
      <DocsSection title="Counter">
        <TextAreaCounter />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
