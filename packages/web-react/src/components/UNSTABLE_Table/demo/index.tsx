// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React from 'react';
import ReactDOM from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import UNSTABLE_TableCombined from './UNSTABLE_TableCombined';
import UNSTABLE_TableDefault from './UNSTABLE_TableDefault';
import UNSTABLE_TableStriped from './UNSTABLE_TableStriped';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Basic Table" stackAlignment="stretch">
        <UNSTABLE_TableDefault />
      </DocsSection>
      <DocsSection title="Striped Table" stackAlignment="stretch">
        <UNSTABLE_TableStriped />
      </DocsSection>
      <DocsSection title="Combined Modifiers" stackAlignment="stretch">
        <UNSTABLE_TableCombined />
      </DocsSection>
    </IconsProvider>
  </React.StrictMode>,
);
