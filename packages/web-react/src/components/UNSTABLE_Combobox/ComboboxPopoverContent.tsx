'use client';

import React, { type FocusEvent, type MouseEvent, type ReactNode, type RefObject } from 'react';
import { ContextPropsProvider } from '../../context';
import type { StyleProps } from '../../types';
import { DropdownPopover } from '../Dropdown';
import { Stack } from '../Stack';
import { ComboboxPopoverContextProvider } from './ComboboxPopoverContext';
import type { ComboboxOptionsRole, UnstableComboboxPopoverContextValue } from './types';

export interface ComboboxPopoverContentProps {
  auxiliaryContent?: ReactNode;
  children?: ReactNode;
  emptyStateClassName: string;
  emptyStateLabel: ReactNode;
  handleListboxFocusCapture: (event: FocusEvent<HTMLElement>) => void;
  handleListboxMouseDown: (event: MouseEvent<HTMLElement>) => void;
  hasEmptyState: boolean;
  isLoading: boolean;
  labelId: string;
  listboxId: string;
  listboxRef: RefObject<HTMLDivElement>;
  loadingClassName: string;
  loadingLabel: ReactNode;
  optionsRole: ComboboxOptionsRole | null;
  popoverContextValue: UnstableComboboxPopoverContextValue;
  popoverProps?: StyleProps;
  shouldRenderOptions: boolean;
  showEmptyState: boolean;
}

/**
 * Combobox popover content: loading, options widget, empty state, and auxiliary content.
 *
 * @param props Combobox popover content props
 */
const ComboboxPopoverContent = (props: ComboboxPopoverContentProps) => {
  const {
    auxiliaryContent,
    children,
    emptyStateClassName,
    emptyStateLabel,
    handleListboxFocusCapture,
    handleListboxMouseDown,
    hasEmptyState,
    isLoading,
    labelId,
    listboxId,
    listboxRef,
    loadingClassName,
    loadingLabel,
    optionsRole,
    popoverContextValue,
    popoverProps,
    shouldRenderOptions,
    showEmptyState,
  } = props;

  return (
    // Field-level label props must not reach the popover content, options render their own labels.
    <ContextPropsProvider value={{ isRequired: null, label: { isLabelHidden: null } }}>
      {/* Pure aria-activedescendant: DOM focus stays on the filter input. */}
      <DropdownPopover enableAutoFocus={false} {...popoverProps} aria-labelledby={labelId}>
        {isLoading && (
          <div className={loadingClassName} role="status" aria-live="polite">
            {loadingLabel}
          </div>
        )}
        {shouldRenderOptions && optionsRole && (
          <Stack
            ref={listboxRef}
            spacing="space-300"
            role={optionsRole}
            id={listboxId}
            aria-labelledby={labelId}
            aria-multiselectable="true"
            onFocusCapture={handleListboxFocusCapture}
            onMouseDown={handleListboxMouseDown}
            {...(isLoading ? { hidden: true } : {})}
          >
            <ComboboxPopoverContextProvider value={popoverContextValue}>{children}</ComboboxPopoverContextProvider>
          </Stack>
        )}
        {hasEmptyState && (
          <div
            className={emptyStateClassName}
            role="status"
            aria-live="polite"
            {...(!showEmptyState ? { hidden: true } : {})}
          >
            {emptyStateLabel}
          </div>
        )}
        {auxiliaryContent}
      </DropdownPopover>
    </ContextPropsProvider>
  );
};

export default ComboboxPopoverContent;
