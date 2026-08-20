import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import ComboboxCustomContent from './ComboboxCustomContent';
import ComboboxDefault from './ComboboxDefault';
import ComboboxDisabled from './ComboboxDisabled';
import ComboboxFullWidth from './ComboboxFullWidth';
import ComboboxHelperText from './ComboboxHelperText';
import ComboboxLastSearchesGrid from './ComboboxLastSearchesGrid';
import ComboboxLoading from './ComboboxLoading';
import ComboboxLocations from './ComboboxLocations';
import ComboboxRequired from './ComboboxRequired';
import ComboboxSearchResults from './ComboboxSearchResults';
import ComboboxSizes from './ComboboxSizes';
import ComboboxThemes from './ComboboxThemes';
import ComboboxValidationStates from './ComboboxValidationStates';
import ComboboxVariants from './ComboboxVariants';
import ComboboxWithClearButton from './ComboboxWithClearButton';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <ComboboxDefault />
      </DocsSection>
      <DocsSection title="Locations">
        <ComboboxLocations />
      </DocsSection>
      <DocsSection title="Themes">
        <ComboboxThemes />
      </DocsSection>
      <DocsSection title="Variants">
        <ComboboxVariants />
      </DocsSection>
      <DocsSection title="Sizes" stackAlignment="stretch">
        <ComboboxSizes />
      </DocsSection>
      <DocsSection title="Helper Text" stackAlignment="stretch">
        <ComboboxHelperText />
      </DocsSection>
      <DocsSection title="Required" stackAlignment="stretch">
        <ComboboxRequired />
      </DocsSection>
      <DocsSection title="Validation States" stackAlignment="stretch">
        <ComboboxValidationStates />
      </DocsSection>
      <DocsSection title="Disabled" stackAlignment="stretch">
        <ComboboxDisabled />
      </DocsSection>
      <DocsSection title="With Clear Button" stackAlignment="stretch">
        <ComboboxWithClearButton />
      </DocsSection>
      <DocsSection title="Full Width Dropdown" stackAlignment="stretch">
        <ComboboxFullWidth />
      </DocsSection>
      <DocsSection title="Loading State" stackAlignment="stretch">
        <ComboboxLoading />
      </DocsSection>
      <DocsSection title="Search Results" stackAlignment="stretch">
        <ComboboxSearchResults />
      </DocsSection>
      <DocsSection title="Last Searches" stackAlignment="stretch">
        <ComboboxLastSearchesGrid />
      </DocsSection>
      <DocsSection title="Custom Content">
        <ComboboxCustomContent />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
