/* istanbul ignore file -- used for demo app */
// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { IconsProvider } from '../context';
import Icons from './demo/icons';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IconsProvider value={icons}>
      <Icons />
    </IconsProvider>
  </React.StrictMode>,
);
