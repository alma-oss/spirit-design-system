'use client';

import React, { useId } from 'react';
import { FieldGroup } from '../FieldGroup';
import { usePickerPopoverContext } from './PickerPopoverContext';
import type { SpiritUnstablePickerGroupProps } from './types';

const UNSTABLE_PickerGroup = ({ children, label, ...restProps }: SpiritUnstablePickerGroupProps) => {
  const pickerPopoverContext = usePickerPopoverContext();
  const generatedId = useId();
  const id = pickerPopoverContext.id ? `${pickerPopoverContext.id}-group-${generatedId}` : generatedId;

  return (
    <FieldGroup {...restProps} id={id} isFluid isLabelHidden label={label}>
      {children}
    </FieldGroup>
  );
};

UNSTABLE_PickerGroup.spiritComponent = 'UNSTABLE_PickerGroup';

export default UNSTABLE_PickerGroup;
