import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import BoxDefault from './BoxDefault';
import BoxWithAll from './BoxWithAll';
import BoxWithBackgroundColor from './BoxWithBackgroundColor';
import BoxWithBackgroundGradient from './BoxWithBackgroundGradient';
import BoxWithBorder from './BoxWithBorder';
import BoxWithCustomPadding from './BoxWithCustomPadding';
import BoxWithRadius from './BoxWithRadius';
import BoxWithTextColor from './BoxWithTextColor';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DocsSection title="Default">
      <BoxDefault />
    </DocsSection>
    <DocsSection title="With Custom Padding">
      <BoxWithCustomPadding />
    </DocsSection>
    <DocsSection title="With Border">
      <BoxWithBorder />
    </DocsSection>
    <DocsSection title="With Background Color">
      <BoxWithBackgroundColor />
    </DocsSection>
    <DocsSection title="With Background Gradient">
      <BoxWithBackgroundGradient />
    </DocsSection>
    <DocsSection title="With Radius">
      <BoxWithRadius />
    </DocsSection>
    <DocsSection title="With Text Color">
      <BoxWithTextColor />
    </DocsSection>
    <DocsSection title="With All">
      <BoxWithAll />
    </DocsSection>
  </StrictMode>,
);
