'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import ScrollViewDefault from './ScrollViewDefault';
import ScrollViewHiddenScrollbar from './ScrollViewHiddenScrollbar';
import ScrollViewHorizontal from './ScrollViewHorizontal';
import ScrollViewHorizontalBreakout from './ScrollViewHorizontalBreakout';
import ScrollViewHorizontalWithControls from './ScrollViewHorizontalWithControls';
import ScrollViewHorizontalWithControlsAndHiddenScrollbar from './ScrollViewHorizontalWithControlsAndHiddenScrollbar';
import ScrollViewOverflowDecorators from './ScrollViewOverflowDecorators';
import ScrollViewVerticalWithControls from './ScrollViewVerticalWithControls';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Horizontal Scrolling">
        <ScrollViewHorizontal />
      </DocsSection>
      <DocsSection title="Horizontal Scrolling with Container Breakout" hasStack={false}>
        <ScrollViewHorizontalBreakout />
      </DocsSection>
      <DocsSection title="Vertical Scrolling">
        <ScrollViewDefault />
      </DocsSection>
      <DocsSection title="Overflow Decorators">
        <ScrollViewOverflowDecorators />
      </DocsSection>
      <DocsSection title="Hidden Scrollbar">
        <ScrollViewHiddenScrollbar />
      </DocsSection>
      <DocsSection title="Horizontal Scrolling with Controls">
        <ScrollViewHorizontalWithControls />
      </DocsSection>
      <DocsSection title="Horizontal Scrolling with Controls and Hidden Scrollbar">
        <ScrollViewHorizontalWithControlsAndHiddenScrollbar />
      </DocsSection>
      <DocsSection title="Vertical Scrolling with Controls">
        <ScrollViewVerticalWithControls />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
