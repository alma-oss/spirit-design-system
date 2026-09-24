import { type ReactNode } from 'react';
import type { SelectionGridRowProps, SelectionMode } from '../../hooks';
import type {
  DropdownBaseProps,
  FillVariantDictionaryType,
  HelperTextProps,
  SizesDictionaryType,
  SpiritButtonElementProps,
  SpiritCheckboxProps,
  SpiritDivElementProps,
  SpiritFieldGroupProps,
  SpiritTagProps,
  StringsProps,
  StyleProps,
  TranslatableString,
  Validation,
  ValidationTextProp,
} from '../../types';

export type UnstablePickerSelectionMode = SelectionMode;

export type UnstablePickerStrings = {
  ariaLabel?: {
    add?: TranslatableString;
    close?: TranslatableString;
    removeAll?: TranslatableString;
    removeItem?: TranslatableString;
    selection?: TranslatableString;
    tagDescription?: TranslatableString;
  };
  label?: {
    emptySelection?: TranslatableString;
  };
};

export interface UnstablePickerTranslations {
  /** @deprecated Use `strings.ariaLabel.add` instead. */
  addButtonLabel?: string;
  /** @deprecated Use `strings.ariaLabel.close` instead. */
  closeButtonLabel?: string;
  /** @deprecated Use `strings.label.emptySelection` instead. */
  emptySelectionLabel?: string;
  /** @deprecated Use `strings.ariaLabel.removeAll` instead. */
  removeAllLabel?: string;
  /** @deprecated Use `strings.ariaLabel.removeItem` instead. */
  removeItemLabel?: string;
  /** @deprecated Use `strings.ariaLabel.selection` instead. */
  selectionAriaLabel?: string;
  /** @deprecated Use `strings.ariaLabel.tagDescription` instead. */
  tagDescriptionText?: string;
}

/** Arguments passed to `renderTags` for custom selection UI */
export interface UnstablePickerRenderTagsOptions {
  /** Row keyboard props for `UNSTABLE_PickerTag` — use index `0..n-1` matching DOM order of `role="row"` */
  getKeyboardGridRowProps: (index: number) => SelectionGridRowProps;
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
    UnstablePickerTranslations,
    StringsProps<UnstablePickerStrings> {
  children: ReactNode;
  id: string;
  isAggregated?: boolean;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  isRequired?: boolean;
  label: string;
  /** Props for the inner `Dropdown`. */
  dropdownProps?: DropdownBaseProps;
  /** Props for the inner `Label` (style props; `UNSAFE_className` is merged with picker classes). */
  labelProps?: StyleProps;
  /** Props for the inner `DropdownPopover`. */
  popoverProps?: StyleProps;
  /** Props for the inner `Tag` elements (style props; `UNSAFE_className` is merged with tag classes). */
  tagProps?: StyleProps;
  renderTags?: (options: UnstablePickerRenderTagsOptions) => ReactNode;
  selectionMode?: UnstablePickerSelectionMode;
  size?: SizesDictionaryType<S>;
  variant?: FillVariantDictionaryType;
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
  tagKeyboardProps?: SelectionGridRowProps;
  isDisabled?: boolean;
  label: ReactNode;
  onRemove: () => void;
  removeLabel?: TranslatableString;
}

export interface UnstablePickerGroupProps extends Omit<SpiritFieldGroupProps, 'id' | 'isLabelHidden'> {
  children: ReactNode;
  label: string;
}

export interface UnstablePickerItemProps extends Omit<
  SpiritCheckboxProps,
  'id' | 'label' | 'isChecked' | 'isDisabled' | 'value' | 'onChange' | 'inputPosition' | 'isItem'
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

export interface UnstablePickerSelectionProps extends SpiritDivElementProps {
  isDisabled?: boolean;
}

export interface UnstablePickerTriggerProps extends SpiritButtonElementProps {}

export type SpiritUnstablePickerProps<S = void> = UnstablePickerProps<S>;
export type SpiritUnstableUncontrolledPickerProps<S = void> = UnstableUncontrolledPickerProps<S>;
export type SpiritUnstablePickerRenderTagsOptions = UnstablePickerRenderTagsOptions;
export type SpiritUnstablePickerGroupProps = UnstablePickerGroupProps;
export type SpiritUnstablePickerSelectionProps = UnstablePickerSelectionProps;
export type SpiritUnstablePickerTagProps = UnstablePickerTagProps;
export type SpiritUnstablePickerTriggerProps = UnstablePickerTriggerProps;
export type SpiritUnstablePickerItemProps = UnstablePickerItemProps;
export type SpiritUnstablePickerRef = UnstablePickerRef;
