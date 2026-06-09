import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import CheckboxItem from './CheckboxItem';
import ItemAlignment from './ItemAlignment';
import ItemDefault from './ItemDefault';
import ItemDisabled from './ItemDisabled';
import ItemEndSlotControl from './ItemEndSlotControl';
import ItemHelperText from './ItemHelperText';
import ItemIcon from './ItemIcon';
import ItemSearchSuggestions from './ItemSearchSuggestions';
import ItemSelected from './ItemSelected';
import ItemText from './ItemText';
import RadioItem from './RadioItem';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <ItemDefault />
      </DocsSection>
      <DocsSection title="Selected" stackAlignment="stretch">
        <ItemSelected />
      </DocsSection>
      <DocsSection title="Disabled">
        <ItemDisabled />
      </DocsSection>
      <DocsSection title="Helper Text">
        <ItemHelperText />
      </DocsSection>
      <DocsSection title="Text Content">
        <ItemText />
      </DocsSection>
      <DocsSection title="Alignment" stackAlignment="stretch">
        <ItemAlignment />
      </DocsSection>
      <DocsSection title="Icon">
        <ItemIcon />
      </DocsSection>
      <DocsSection title="End Slot Control">
        <ItemEndSlotControl />
      </DocsSection>
      <DocsSection title="Search Suggestions" stackAlignment="stretch">
        <ItemSearchSuggestions />
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
