// Because there is no `dist` directory during the CI run
/* eslint-disable import/no-extraneous-dependencies, import/extensions, import/no-unresolved */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment, import/extensions, import/no-unresolved
// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import SliderDefault from './SliderDefault';
import SliderDisabled from './SliderDisabled';
import SliderFluid from './SliderFluid';
import SliderHelperText from './SliderHelperText';
import SliderHiddenLabel from './SliderHiddenLabel';
import SliderValidation from './SliderValidation';
import SliderValidationWithIcon from './SliderValidationWithIcon';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default" stackAlignment="stretch">
        <SliderDefault />
      </DocsSection>
      <DocsSection title="Hidden Label" stackAlignment="stretch">
        <SliderHiddenLabel />
      </DocsSection>
      <DocsSection title="Helper Text" stackAlignment="stretch">
        <SliderHelperText />
      </DocsSection>
      <DocsSection title="Disabled" stackAlignment="stretch">
        <SliderDisabled />
      </DocsSection>
      <DocsSection title="Validation State with Validation Text" stackAlignment="stretch">
        <SliderValidation />
      </DocsSection>
      <DocsSection title="Validation Text with Icon" stackAlignment="stretch">
        <SliderValidationWithIcon />
      </DocsSection>
      <DocsSection title="Fluid" stackAlignment="stretch">
        <SliderFluid />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
