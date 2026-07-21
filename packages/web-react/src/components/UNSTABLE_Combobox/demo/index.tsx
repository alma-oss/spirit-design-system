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
import ComboboxLoading from './ComboboxLoading';
import ComboboxSizes from './ComboboxSizes';
import ComboboxThemes from './ComboboxThemes';
import ComboboxValidationStates from './ComboboxValidationStates';
import ComboboxVariants from './ComboboxVariants';
import ComboboxWithAddon from './ComboboxWithAddon';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <ComboboxDefault />
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
      <DocsSection title="Validation States" stackAlignment="stretch">
        <ComboboxValidationStates />
      </DocsSection>
      <DocsSection title="Disabled" stackAlignment="stretch">
        <ComboboxDisabled />
      </DocsSection>
      <DocsSection title="With Addon" stackAlignment="stretch">
        <ComboboxWithAddon />
      </DocsSection>
      <DocsSection title="Full Width Dropdown" stackAlignment="stretch">
        <ComboboxFullWidth />
      </DocsSection>
      <DocsSection title="Loading State" stackAlignment="stretch">
        <ComboboxLoading />
      </DocsSection>
      <DocsSection title="Custom Content">
        <ComboboxCustomContent />
      </DocsSection>
    </IconsProvider>
  </StrictMode>,
);
