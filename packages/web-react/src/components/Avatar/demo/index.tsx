// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import AvatarIcon from './AvatarIcon';
import AvatarImage from './AvatarImage';
import AvatarResponsiveSizes from './AvatarResponsiveSizes';
import AvatarText from './AvatarText';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Icon">
        <AvatarIcon />
      </DocsSection>
      <DocsSection title="Text">
        <AvatarText />
      </DocsSection>
      <DocsSection title="Image">
        <AvatarImage />
      </DocsSection>
      <DocsSection title="Responsive Sizes">
        <AvatarResponsiveSizes />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
