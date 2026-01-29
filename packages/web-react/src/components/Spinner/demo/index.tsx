// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React from 'react';
import ReactDOM from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import SpinnerColors from './SpinnerColors';
import SpinnerDefault from './SpinnerDefault';
import SpinnerIconProps from './SpinnerIconProps';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <SpinnerDefault />
      </DocsSection>
      <DocsSection title="Colors">
        <SpinnerColors />
      </DocsSection>
      <DocsSection title="Icon Props">
        <SpinnerIconProps />
      </DocsSection>
    </IconsProvider>
  </React.StrictMode>,
);
