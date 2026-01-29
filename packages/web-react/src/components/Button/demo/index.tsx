// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React from 'react';
import ReactDOM from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import ButtonDefault from './ButtonDefault';
import ButtonDisabled from './ButtonDisabled';
import ButtonFluid from './ButtonFluid';
import ButtonLoading from './ButtonLoading';
import ButtonResponsiveSymmetrical from './ButtonResponsiveSymmetrical';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default" stackAlignment="stretch">
        <ButtonDefault />
      </DocsSection>
      <DocsSection title="Disabled" stackAlignment="stretch">
        <ButtonDisabled />
      </DocsSection>
      <DocsSection title="Loading" stackAlignment="stretch">
        <ButtonLoading />
      </DocsSection>
      <DocsSection title="Fluid" stackAlignment="stretch">
        <ButtonFluid />
      </DocsSection>
      <DocsSection title="Responsive Symmetrical" stackAlignment="start">
        <ButtonResponsiveSymmetrical />
      </DocsSection>
    </IconsProvider>
  </React.StrictMode>,
);
