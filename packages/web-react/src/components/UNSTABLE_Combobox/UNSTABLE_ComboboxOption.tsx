'use client';

import classNames from 'classnames';
import React, { type ReactNode } from 'react';
import { getNodeText } from '../../hooks';
import { Item } from '../Item';
import { useComboboxPopoverContext } from './ComboboxPopoverContext';
import type { SpiritUnstableComboboxOptionProps } from './types';
import { getComboboxOptionDomId } from './utils';

const UNSTABLE_ComboboxOption = ({
  children,
  isDisabled: optionIsDisabled,
  label,
  UNSAFE_className,
  value,
  ...restProps
}: SpiritUnstableComboboxOptionProps) => {
  const {
    id: comboboxId,
    activeDescendantId,
    activeNestedControlIndex,
    isDisabled: comboboxIsDisabled,
    optionsRole,
    selectedKeysSet,
  } = useComboboxPopoverContext();
  const isSelected = selectedKeysSet.has(value);
  const isDisabled = optionIsDisabled || comboboxIsDisabled;
  const isGrid = optionsRole === 'grid';
  const optionDomId = getComboboxOptionDomId(comboboxId, value);
  const isVisuallyActive = activeDescendantId === optionDomId && activeNestedControlIndex == null;

  return (
    <Item
      {...restProps}
      UNSAFE_className={classNames('cursor-pointer', { 'is-active': isVisuallyActive }, UNSAFE_className)}
      id={optionDomId}
      data-spirit-value={value}
      {...(label ? { 'data-spirit-label': label } : {})}
      role={isGrid ? 'row' : 'option'}
      tabIndex={-1}
      isSelected={isSelected}
      aria-selected={isSelected}
      isDisabled={isDisabled}
      {...(isDisabled ? { 'aria-disabled': true } : {})}
    >
      {isGrid ? (
        <span role="gridcell" aria-colindex={1}>
          {children}
        </span>
      ) : (
        children
      )}
    </Item>
  );
};

UNSTABLE_ComboboxOption.spiritComponent = 'UNSTABLE_ComboboxOption';
UNSTABLE_ComboboxOption.displayName = 'UNSTABLE_ComboboxOption';

UNSTABLE_ComboboxOption.getCollectionNode = function* getCollectionNode(props: Record<string, unknown>) {
  const children = props.children as ReactNode;
  const { label } = props;

  yield {
    type: 'item' as const,
    key: String(props.value ?? ''),
    textValue: label != null ? String(label) : getNodeText(children),
    isDisabled: Boolean(props.isDisabled),
  };
};

export default UNSTABLE_ComboboxOption;
