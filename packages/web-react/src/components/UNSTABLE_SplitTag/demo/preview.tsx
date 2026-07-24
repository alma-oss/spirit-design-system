'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import SplitTagDisabled from './SplitTagDisabled';
import SplitTagPragueRadius from './SplitTagPragueRadius';
import SplitTagSizes from './SplitTagSizes';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <SplitTagPragueRadius />
      </DocsSection>
      <DocsSection title="Tag as button">
        <SplitTagPragueRadius id="split-tag-prague-radius-tag-button" />
      </DocsSection>
      <DocsSection title="ControlButton as button">
        <SplitTagPragueRadius id="split-tag-prague-radius-control-button" removeSegmentVariant="control-button" />
      </DocsSection>
      <DocsSection title="Sizes">
        <SplitTagSizes />
      </DocsSection>
      <DocsSection title="Disabled">
        <SplitTagDisabled />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
