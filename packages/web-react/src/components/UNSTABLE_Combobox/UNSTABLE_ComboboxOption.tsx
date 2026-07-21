'use client';

import React from 'react';
import { Item } from '../Item';
import { useComboboxPopoverContext } from './ComboboxPopoverContext';
import type { SpiritUnstableComboboxOptionProps } from './types';
import { getComboboxOptionDomId } from './utils';

const UNSTABLE_ComboboxOption = ({
  children,
  isDisabled: optionIsDisabled,
  value,
  ...restProps
}: SpiritUnstableComboboxOptionProps) => {
  const { id: comboboxId, isDisabled: comboboxIsDisabled, selectedKeys } = useComboboxPopoverContext();
  const isSelected = selectedKeys.includes(value);
  const isDisabled = optionIsDisabled || comboboxIsDisabled;

  return (
    <Item
      {...restProps}
      id={getComboboxOptionDomId(comboboxId, value)}
      data-spirit-value={value}
      role="row"
      tabIndex={-1}
      isSelected={isSelected}
      aria-selected={isSelected}
      isDisabled={isDisabled}
    >
      <div role="gridcell">{children}</div>
    </Item>
  );
};

UNSTABLE_ComboboxOption.spiritComponent = 'UNSTABLE_ComboboxOption';
UNSTABLE_ComboboxOption.displayName = 'UNSTABLE_ComboboxOption';

export default UNSTABLE_ComboboxOption;
