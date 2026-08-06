'use client';

import React, { type ReactNode, useCallback, useId, useMemo, useRef } from 'react';
import { isSingleSelectionMode } from '../../hooks';
import { FieldGroup } from '../FieldGroup';
import { PickerOptionsRoles } from './constants';
import { PickerListboxContextProvider } from './PickerListboxContext';
import { usePickerPopoverContext } from './PickerPopoverContext';
import type { SpiritUnstablePickerGroupProps } from './types';
import { usePickerListboxKeyboard } from './usePickerListboxKeyboard';
import { collectPickerItems } from './utils';

interface PickerListboxProps {
  id: string;
  label: string;
  children: ReactNode;
}

/**
 * `role="listbox"` container used when `optionsRole="listbox"`. Owns the roving-tabindex state and
 * publishes per-option props to its `UNSTABLE_PickerItem` children. Group-level `FieldGroup`
 * features (helper text, validation) do not apply here — a listbox owns only `option` children.
 *
 * @param root0
 * @param root0.id
 * @param root0.label
 * @param root0.children
 */
const PickerListbox = ({ id, label, children }: PickerListboxProps) => {
  const { id: pickerId, isDisabled, onSelectionChange, selectedKeys, selectionMode } = usePickerPopoverContext();
  const listboxRef = useRef<HTMLDivElement>(null);

  const optionValues = useMemo(() => collectPickerItems(children).map((item) => item.value), [children]);
  const getOptionId = useCallback((value: string) => `${pickerId}-${value}`, [pickerId]);

  const { getOptionProps } = usePickerListboxKeyboard({
    getOptionId,
    isDisabled,
    listboxRef,
    onSelectionChange,
    optionValues,
    selectedKeys,
    selectionMode,
  });

  const listboxContextValue = useMemo(() => ({ getOptionProps, isListbox: true }), [getOptionProps]);

  return (
    <PickerListboxContextProvider value={listboxContextValue}>
      <div
        ref={listboxRef}
        id={id}
        role="listbox"
        aria-label={label}
        {...(isSingleSelectionMode(selectionMode) ? {} : { 'aria-multiselectable': true })}
      >
        {children}
      </div>
    </PickerListboxContextProvider>
  );
};

const UNSTABLE_PickerGroup = ({ children, label, ...restProps }: SpiritUnstablePickerGroupProps) => {
  const { id: pickerPopoverId, optionsRole } = usePickerPopoverContext();
  const generatedId = useId();
  const id = pickerPopoverId ? `${pickerPopoverId}-group-${generatedId}` : generatedId;

  if (optionsRole === PickerOptionsRoles.LISTBOX) {
    return (
      <PickerListbox id={id} label={label}>
        {children}
      </PickerListbox>
    );
  }

  return (
    <FieldGroup {...restProps} id={id} isLabelHidden label={label}>
      {children}
    </FieldGroup>
  );
};

UNSTABLE_PickerGroup.spiritComponent = 'UNSTABLE_PickerGroup';

export default UNSTABLE_PickerGroup;
