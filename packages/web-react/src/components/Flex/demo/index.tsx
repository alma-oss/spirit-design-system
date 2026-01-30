import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import FlexCustomSpacing from './FlexCustomSpacing';
import FlexHorizontalLayout from './FlexHorizontalLayout';
import FlexHorizontalLayoutHorizontalAlignment from './FlexHorizontalLayoutHorizontalAlignment';
import FlexHorizontalReversedLayout from './FlexHorizontalReversedLayout';
import FlexResponsiveAlignment from './FlexResponsiveAlignment';
import FlexResponsiveCustomHorizontalSpacing from './FlexResponsiveCustomHorizontalSpacing';
import FlexResponsiveCustomVerticalSpacing from './FlexResponsiveCustomVerticalSpacing';
import FlexResponsiveLayout from './FlexResponsiveLayout';
import FlexResponsiveSpacing from './FlexResponsiveSpacing';
import FlexVerticalAlignment from './FlexVerticalAlignment';
import FlexVerticalLayout from './FlexVerticalLayout';
import FlexVerticalLayoutHorizontalAlignment from './FlexVerticalLayoutHorizontalAlignment';
import FlexWrapping from './FlexWrapping';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DocsSection title="Horizontal Layout">
      <FlexHorizontalLayout />
    </DocsSection>
    <DocsSection title="Horizontal Reversed Layout">
      <FlexHorizontalReversedLayout />
    </DocsSection>
    <DocsSection title="Vertical Layout">
      <FlexVerticalLayout />
    </DocsSection>
    <DocsSection title="Responsive Layout">
      <FlexResponsiveLayout />
    </DocsSection>
    <DocsSection title="Wrapping">
      <FlexWrapping />
    </DocsSection>
    <DocsSection title="Horizontal Layout and Horizontal Alignment" stackAlignment="stretch">
      <FlexHorizontalLayoutHorizontalAlignment />
    </DocsSection>
    <DocsSection title="Vertical Layout and Horizontal Alignment" stackAlignment="stretch">
      <FlexVerticalLayoutHorizontalAlignment />
    </DocsSection>
    <DocsSection title="Vertical Alignment">
      <FlexVerticalAlignment />
    </DocsSection>
    <DocsSection title="Responsive Alignment" stackAlignment="stretch">
      <FlexResponsiveAlignment />
    </DocsSection>
    <DocsSection title="Custom Spacing">
      <FlexCustomSpacing />
    </DocsSection>
    <DocsSection title="Responsive Spacing">
      <FlexResponsiveSpacing />
    </DocsSection>
    <DocsSection title="Responsive Custom Horizontal Spacing">
      <FlexResponsiveCustomHorizontalSpacing />
    </DocsSection>
    <DocsSection title="Responsive Custom Vertical Spacing">
      <FlexResponsiveCustomVerticalSpacing />
    </DocsSection>
  </StrictMode>,
);
