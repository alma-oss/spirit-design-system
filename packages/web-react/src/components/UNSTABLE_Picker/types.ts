import { type FocusEvent, type KeyboardEvent, type ReactNode } from 'react';
import type { SelectionMode } from '../../hooks';
import type {
  HelperTextProps,
  SizesDictionaryType,
  SpiritCheckboxProps,
  SpiritDivElementProps,
  SpiritFieldGroupProps,
  SpiritTagProps,
  Validation,
  ValidationTextProp,
} from '../../types';

export type UnstablePickerSelectionMode = SelectionMode;

/** Row props produced by `usePickerSelectionGridKeyboard` for roving tabindex and grid keys */
export interface UnstablePickerSelectionGridRowProps {
  tabIndex: 0 | -1;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  onFocusCapture: (event: FocusEvent<HTMLElement>) => void;
  onBlurCapture: (event: FocusEvent<HTMLElement>) => void;
  removeButtonTabIndex: 0 | -1;
}

export interface UnstablePickerTranslations {
  addButtonLabel?: string;
  closeButtonLabel?: string;
  emptySelectionLabel?: string;
  removeAllLabel?: string;
  removeItemLabel?: string;
  selectionAriaLabel?: string;
  tagDescriptionText?: string;
}

/** Arguments passed to `renderTags` for custom selection UI */
export interface UnstablePickerRenderTagsOptions {
  /** Row keyboard props for `UNSTABLE_PickerTag` — use index `0..n-1` matching DOM order of `role="row"` */
  getKeyboardGridRowProps: (index: number) => UnstablePickerSelectionGridRowProps;
  /** Remove a selected item by key (same as default tags) */
  onRemove: (key: string) => void;
  /** Remove by row index; prefer for remove controls so focus moves like default tags */
  removeTagAtIndex: (index: number) => void;
}

export interface UnstablePickerBaseProps<S = void>
  extends
    Omit<SpiritDivElementProps, 'children' | 'ref' | 'id'>,
    HelperTextProps,
    Validation,
    ValidationTextProp,
    UnstablePickerTranslations {
  children: ReactNode;
  id: string;
  isAggregated?: boolean;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  isRequired?: boolean;
  label: string;
  renderTags?: (options: UnstablePickerRenderTagsOptions) => ReactNode;
  selectionMode?: UnstablePickerSelectionMode;
  size?: SizesDictionaryType<S>;
}

/** Popover open state is always controlled (same contract as `Dropdown`). */
export interface UnstablePickerProps<S = void> extends UnstablePickerBaseProps<S> {
  isOpen: boolean;
  onSelectionChange: (keys: string[]) => void;
  onToggle: () => void;
  selectedKeys: string[];
}

export interface UnstableUncontrolledPickerProps<S = void> extends UnstablePickerBaseProps<S> {
  /** Initial popover open state (internal). @default false */
  defaultIsOpen?: boolean;
  defaultSelectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
}

export interface UnstablePickerTagProps extends Omit<
  SpiritTagProps<'div'>,
  'color' | 'elementType' | 'size' | 'children' | 'role' | 'tabIndex' | 'aria-label' | 'aria-describedby'
> {
  children?: ReactNode;
  tagKeyboardProps?: UnstablePickerSelectionGridRowProps;
  isDisabled?: boolean;
  label: ReactNode;
  onRemove: () => void;
  removeLabel?: string;
}

export interface UnstablePickerGroupProps extends Omit<SpiritFieldGroupProps, 'id' | 'isLabelHidden'> {
  children: ReactNode;
  label: string;
}

export interface UnstablePickerItemProps extends Omit<
  SpiritCheckboxProps,
  'id' | 'label' | 'isChecked' | 'isDisabled' | 'value' | 'onChange' | 'inputPosition' | 'isItem' | 'name'
> {
  children: ReactNode;
  value: string;
}

export type UnstablePickerItemData = { label: ReactNode; value: string };

export interface UnstablePickerRef {
  close: () => void;
  selectedKeys: string[];
}

export interface UnstablePickerContextType {
  size: SizesDictionaryType;
  tagDescriptionId?: string;
}

export interface UnstablePickerPopoverContextValue {
  /** Stable id for the picker popover (prefix for item control ids), not a focus-registry key. */
  id: string;
  isDisabled: boolean;
  onSelectionChange: (keys: string[]) => void;
  selectedKeys: string[];
  selectionMode: UnstablePickerSelectionMode;
}

export type SpiritUnstablePickerProps<S = void> = UnstablePickerProps<S>;
export type SpiritUnstableUncontrolledPickerProps<S = void> = UnstableUncontrolledPickerProps<S>;
export type SpiritUnstablePickerRenderTagsOptions = UnstablePickerRenderTagsOptions;
export type SpiritUnstablePickerGroupProps = UnstablePickerGroupProps;
export type SpiritUnstablePickerTagProps = UnstablePickerTagProps;
export type SpiritUnstablePickerItemProps = UnstablePickerItemProps;
export type SpiritUnstablePickerRef = UnstablePickerRef;
