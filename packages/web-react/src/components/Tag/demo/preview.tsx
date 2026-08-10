'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import TagDefault from './TagDefault';
import TagDisabled from './TagDisabled';
import TagInteractive from './TagInteractive';
import TagWithCloseButton from './TagWithCloseButton';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default" stackAlignment="stretch">
        <TagDefault />
      </DocsSection>
      <DocsSection title="With CloseButton">
        <TagWithCloseButton />
      </DocsSection>
      <DocsSection title="Interactive">
        <TagInteractive />
      </DocsSection>
      <DocsSection title="Disabled">
        <TagDisabled />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
