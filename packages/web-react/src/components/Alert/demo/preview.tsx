'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import AlertCentered from './AlertCentered';
import AlertColors from './AlertColors';
import AlertIcons from './AlertIcons';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Alert Colors" stackAlignment="stretch">
        <AlertColors />
      </DocsSection>
      <DocsSection title="Alert Centered" stackAlignment="stretch">
        <AlertCentered />
      </DocsSection>
      <DocsSection title="Alert Icons" stackAlignment="stretch">
        <AlertIcons />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
