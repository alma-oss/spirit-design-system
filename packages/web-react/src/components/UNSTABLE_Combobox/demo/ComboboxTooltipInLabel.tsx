'use client';

import React from 'react';
import { ControlButton } from '../../ControlButton';
import { Icon } from '../../Icon';
import { TooltipPopover, TooltipTrigger, UncontrolledTooltip } from '../../Tooltip';
import { VisuallyHidden } from '../../VisuallyHidden';
import { UNSTABLE_Combobox } from '..';
import { renderComboboxLanguageItems } from './ComboboxLanguageItems';
import { useComboboxDemoState } from './useComboboxDemoState';

const HINT_ID = 'demo-combobox-tooltip-in-label-hint';
const HINT_TEXT = 'Only languages supported by our editorial team are offered.';

const ComboboxTooltipInLabel = () => {
  const state = useComboboxDemoState();

  return (
    <>
      <UNSTABLE_Combobox
        aria-describedby={HINT_ID}
        hasEmptyState={state.hasEmptyState}
        id="demo-combobox-tooltip-in-label"
        inputValue={state.inputValue}
        isOpen={state.isOpen}
        label={
          <>
            Languages{' '}
            <UncontrolledTooltip
              id="demo-combobox-tooltip-in-label-tooltip"
              placement="top"
              flipFallbackPlacements={['bottom']}
              trigger={['hover', 'focus', 'click']}
              UNSAFE_className="d-inline-block"
            >
              {/* Size comes from the Combobox context, same as the tag and clear controls. */}
              <TooltipTrigger
                elementType={ControlButton}
                aria-label="More information about languages"
                isSubtle
                isSymmetrical
              >
                <Icon name="info" />
              </TooltipTrigger>
              {/* Shown to sighted users only; assistive technologies get the same text from `aria-describedby`. */}
              <TooltipPopover aria-hidden>{HINT_TEXT}</TooltipPopover>
            </UncontrolledTooltip>
          </>
        }
        onInputChange={state.onInputChange}
        onSelectionChange={state.onSelectionChange}
        onToggle={state.onToggle}
        optionKeys={state.optionKeys}
        selectedKeys={state.selectedKeys}
      >
        {renderComboboxLanguageItems(state.filteredOptions)}
      </UNSTABLE_Combobox>
      <VisuallyHidden id={HINT_ID}>{HINT_TEXT}</VisuallyHidden>
    </>
  );
};

export default ComboboxTooltipInLabel;
