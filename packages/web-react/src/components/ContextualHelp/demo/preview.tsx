'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import { ContextualHelp } from '..';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <ContextualHelp label="More information about Languages">Choose all languages you can use.</ContextualHelp>
      </DocsSection>
      <DocsSection title="Dismissible">
        <ContextualHelp isDismissible iconProps={{ name: 'help' }} label="What is a segment?">
          Segments identify who your visitors are.
        </ContextualHelp>
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
