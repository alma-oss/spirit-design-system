/* istanbul ignore file -- used for demo app */
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { IconsProvider } from '../context';
import Icons from './demo/icons';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <Icons />
    </IconsProvider>
  </StrictMode>,
);
