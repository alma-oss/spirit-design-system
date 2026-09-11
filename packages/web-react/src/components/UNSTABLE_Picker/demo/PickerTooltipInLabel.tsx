'use client';

import React from 'react';
import { ControlButton } from '../../ControlButton';
import { Icon } from '../../Icon';
import { TooltipPopover, TooltipTrigger, UncontrolledTooltip } from '../../Tooltip';
import { VisuallyHidden } from '../../VisuallyHidden';
import { UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '..';
import { renderPickerLanguageItems } from './PickerLanguageItems';

const HINT_ID = 'demo-picker-tooltip-in-label-hint';
const HINT_TEXT = 'Only languages supported by our editorial team are offered.';

const PickerTooltipInLabel = () => (
  <>
    <UNSTABLE_UncontrolledPicker
      aria-describedby={HINT_ID}
      id="demo-picker-tooltip-in-label"
      label={
        <>
          Languages{' '}
          <UncontrolledTooltip
            id="demo-picker-tooltip-in-label-tooltip"
            placement="top"
            flipFallbackPlacements={['bottom']}
            trigger={['hover', 'focus', 'click']}
            UNSAFE_className="d-inline-block"
          >
            {/* Size comes from the Picker context, same as the tag remove controls. */}
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
    >
      <UNSTABLE_PickerGroup label="Languages">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
    <VisuallyHidden id={HINT_ID}>{HINT_TEXT}</VisuallyHidden>
  </>
);

export default PickerTooltipInLabel;
