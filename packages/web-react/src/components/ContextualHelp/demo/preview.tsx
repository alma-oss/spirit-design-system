'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import { Flex } from '../../Flex';
import { Label } from '../../Label';
import { ContextualHelp } from '..';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <Flex alignmentY="center" spacingX="space-100">
          <Label elementType="span">Languages</Label>
          <ContextualHelp id="contextual-help-demo-default" label="More information about Languages">
            Choose all languages you can use.
          </ContextualHelp>
        </Flex>
      </DocsSection>
      <DocsSection title="Help icon">
        <Flex alignmentY="center" spacingX="space-100">
          <Label elementType="span">Segment</Label>
          <ContextualHelp id="contextual-help-demo-help" icon="help" label="What is a segment?">
            Segments identify who your visitors are.
          </ContextualHelp>
        </Flex>
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
