// Because there is no `dist` directory during the CI run
/* eslint-disable import/no-extraneous-dependencies, import/extensions, import/no-unresolved */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import CardContentOptions from './CardContentOptions';
import CardCustom from './CardCustom';
import CardFooterAlignment from './CardFooterAlignment';
import CardFooterContent from './CardFooterContent';
import CardGeneralOptions from './CardGeneralOptions';
import CardHorizontalLayout from './CardHorizontalLayout';
import CardLogoDemo from './CardLogo';
import { CardMediaOptions } from './CardMediaOptions';
import CardMediaSizes from './CardMediaSizes';
import CardResponsiveCard from './CardResponsiveCard';
import CardReversedHorizontalLayout from './CardReversedHorizontalLayout';
import CardText from './CardText';
import CardTitleOptions from './CardTitleOptions';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="General Options">
        <CardGeneralOptions />
      </DocsSection>
      <DocsSection title="Content Options">
        <CardContentOptions />
      </DocsSection>
      <DocsSection title="Logo">
        <CardLogoDemo />
      </DocsSection>
      <DocsSection title="Horizontal Card Layout">
        <CardHorizontalLayout />
      </DocsSection>
      <DocsSection title="Reversed Horizontal Card Layout">
        <CardReversedHorizontalLayout />
      </DocsSection>
      <DocsSection title="Responsive Card Layout">
        <CardResponsiveCard />
      </DocsSection>
      <DocsSection title="Media Options">
        <CardMediaOptions />
      </DocsSection>
      <DocsSection title="Media Sizes">
        <CardMediaSizes />
      </DocsSection>
      <DocsSection title="Title Options">
        <CardTitleOptions />
      </DocsSection>
      <DocsSection title="Footer Alignment">
        <CardFooterAlignment />
      </DocsSection>
      <DocsSection title="Footer Content">
        <CardFooterContent />
      </DocsSection>
      <DocsSection title="Text Cards">
        <CardText />
      </DocsSection>
      <DocsSection title="Custom Cards">
        <CardCustom />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
