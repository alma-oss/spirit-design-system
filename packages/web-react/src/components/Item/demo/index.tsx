// Because there is no `dist` directory during the CI run
/* eslint-disable import/no-extraneous-dependencies, import/extensions, import/no-unresolved */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import CheckboxItem from './CheckboxItem';
import ItemDefault from './ItemDefault';
import ItemDisabled from './ItemDisabled';
import ItemHelperText from './ItemHelperText';
import ItemIcon from './ItemIcon';
import ItemSelected from './ItemSelected';
import RadioItem from './RadioItem';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <ItemDefault />
      </DocsSection>
      <DocsSection title="Selected">
        <ItemSelected />
      </DocsSection>
      <DocsSection title="Disabled">
        <ItemDisabled />
      </DocsSection>
      <DocsSection title="Helper Text">
        <ItemHelperText />
      </DocsSection>
      <DocsSection title="Icon">
        <ItemIcon />
      </DocsSection>
      <DocsSection title="Checkbox Item">
        <CheckboxItem />
      </DocsSection>
      <DocsSection title="Radio Item">
        <RadioItem />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
