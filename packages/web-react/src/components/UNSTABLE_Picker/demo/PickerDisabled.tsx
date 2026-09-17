'use client';

import React from 'react';
import { ContextualHelp, UNSTABLE_PickerGroup, UNSTABLE_UncontrolledPicker } from '../..';
import { renderPickerLanguageItems } from './PickerLanguageItems';

const PickerDisabled = () => (
  <>
    <UNSTABLE_UncontrolledPicker id="demo-picker-disabled-empty" isDisabled label="Languages">
      <UNSTABLE_PickerGroup label="Language">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
    <UNSTABLE_UncontrolledPicker
      id="demo-picker-disabled-preselected"
      defaultSelectedKeys={['cs', 'dk']}
      isDisabled
      label="Languages"
      contextualHelp={
        <ContextualHelp label="More information about Languages">
          Pick every language you can use at work, not only your native one.
        </ContextualHelp>
      }
    >
      <UNSTABLE_PickerGroup label="Language">{renderPickerLanguageItems()}</UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
  </>
);

export default PickerDisabled;
