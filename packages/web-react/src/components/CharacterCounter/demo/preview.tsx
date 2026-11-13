'use client';

import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import CharacterCounterDefault from './CharacterCounterDefault';
import CharacterCounterDisabled from './CharacterCounterDisabled';
import CharacterCounterValidationStates from './CharacterCounterValidationStates';
import CharacterCounterWithTextArea from './CharacterCounterWithTextArea';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <CharacterCounterDefault />
      </DocsSection>
      <DocsSection title="Validation States">
        <CharacterCounterValidationStates />
      </DocsSection>
      <DocsSection title="Disabled">
        <CharacterCounterDisabled />
      </DocsSection>
      <DocsSection title="With TextArea">
        <CharacterCounterWithTextArea />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
