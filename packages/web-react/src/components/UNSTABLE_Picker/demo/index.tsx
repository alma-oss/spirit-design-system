import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import { UNSTABLE_PICKER_DOCS_DEMO_WRAPPER_CLASSNAME } from './constants';
import PickerAggregated from './PickerAggregated';
import PickerDefault from './PickerDefault';
import PickerDisabled from './PickerDisabled';
import PickerFluid from './PickerFluid';
import PickerGroupedJobFilters from './PickerGroupedJobFilters';
import PickerHelperText from './PickerHelperText';
import PickerHiddenLabel from './PickerHiddenLabel';
import PickerRequired from './PickerRequired';
import PickerSalary from './PickerSalary';
import PickerSingle from './PickerSingle';
import PickerSizes from './PickerSizes';
import PickerValidationStates from './PickerValidationStates';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <IconsProvider value={icons}>
      <div className={`${UNSTABLE_PICKER_DOCS_DEMO_WRAPPER_CLASSNAME} pb-1700`}>
        <DocsSection title="Default">
          <PickerDefault />
        </DocsSection>
        <DocsSection title="Sizes" stackAlignment="stretch">
          <PickerSizes />
        </DocsSection>
        <DocsSection title="Aggregated Tags">
          <PickerAggregated />
        </DocsSection>
        <DocsSection title="Hidden Label">
          <PickerHiddenLabel />
        </DocsSection>
        <DocsSection title="Required">
          <PickerRequired />
        </DocsSection>
        <DocsSection title="Helper Text">
          <PickerHelperText />
        </DocsSection>
        <DocsSection title="Validation States">
          <PickerValidationStates />
        </DocsSection>
        <DocsSection title="Disabled">
          <PickerDisabled />
        </DocsSection>
        <DocsSection title="Fluid">
          <PickerFluid />
        </DocsSection>
        <DocsSection title="Salary Picker">
          <PickerSalary />
        </DocsSection>
        <DocsSection title="Single with any option">
          <PickerSingle />
        </DocsSection>
        <DocsSection title="Grouped sections with Button">
          <PickerGroupedJobFilters />
        </DocsSection>
      </div>
    </IconsProvider>
  </StrictMode>,
);
