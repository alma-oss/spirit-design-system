import { type ChangeEvent, type ReactNode } from 'react';
import type { SelectionGridRowProps } from '../../hooks';
import type {
  DropdownBaseProps,
  FillVariantDictionaryType,
  HelperTextProps,
  SizesDictionaryType,
  SpiritDivElementProps,
  SpiritItemProps,
  SpiritTagProps,
  StyleProps,
  Validation,
  ValidationTextProp,
} from '../../types';

/** Row props produced by selection-grid keyboard for roving tabindex and grid keys */
export type UnstableComboboxSelectionGridRowProps = SelectionGridRowProps;

export interface UnstableComboboxTranslations {
  addMoreLabel?: string;
  addMoreDescriptionText?: string;
  emptySelectionLabel?: string;
  emptyStateLabel?: ReactNode;
  loadingLabel?: ReactNode;
  removeAllLabel?: string;
  removeItemLabel?: string;
  selectionAriaLabel?: string;
  selectionCountLabel?: string;
  selectionCountLabelSingular?: string;
  tagDescriptionText?: string;
}

/** Arguments passed to `renderTags` for custom selection UI */
export interface UnstableComboboxRenderTagsOptions {
  /** Row keyboard props for `UNSTABLE_ComboboxTag` — use index `0..n-1` matching DOM order of `role="row"` */
  getKeyboardGridRowProps: (index: number) => UnstableComboboxSelectionGridRowProps;
  /** Remove a selected item by key (same as default tags) */
  onRemove: (key: string) => void;
  /** Remove by row index; prefer for remove controls so focus moves like default tags */
  removeTagAtIndex: (index: number) => void;
}

export interface UnstableComboboxBaseProps<S = void>
  extends
    Omit<SpiritDivElementProps, 'children' | 'ref' | 'id'>,
    HelperTextProps,
    Validation,
    ValidationTextProp,
    UnstableComboboxTranslations {
  /** Option rows (`role="row"`). Optional for tip-only / custom popover content. */
  children?: ReactNode;
  id: string;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  isRequired?: boolean;
  /** Shows loading slot sibling of the option grid */
  isLoading?: boolean;
  label: string;
  /** Props for the inner `Dropdown`. */
  dropdownProps?: DropdownBaseProps;
  /**
   * Extra popover content rendered as a sibling of the option grid
   * (tips, custom blocks — never inside `role="grid"`).
   */
  auxiliaryContent?: ReactNode;
  /** Clear-all addon when selection is non-empty. @default false */
  hasClearButton?: boolean;
  /**
   * Enables the empty-state slot (sibling of the option grid).
   * Shown when there are no option children; copy from `emptyStateLabel`.
   *
   * @default false
   */
  hasEmptyState?: boolean;
  /** Props for the inner `Label` (style props; `UNSAFE_className` is merged with combobox classes). */
  labelProps?: StyleProps;
  /**
   * Full set of option ids (for “all selected” placeholder / add-more hide).
   * Required whenever not all options stay mounted in the grid.
   */
  optionKeys?: string[];
  /** Props for the inner `DropdownPopover`. */
  popoverProps?: StyleProps;
  /** Props for the inner `Tag` elements (style props; `UNSAFE_className` is merged with tag classes). */
  tagProps?: StyleProps;
  renderTags?: (options: UnstableComboboxRenderTagsOptions) => ReactNode;
  size?: SizesDictionaryType<S>;
  variant?: FillVariantDictionaryType;
}

/** Popover open state and filter string are always controlled (same contract as `Dropdown` for open). */
export interface UnstableComboboxProps<S = void> extends UnstableComboboxBaseProps<S> {
  inputValue: string;
  isOpen: boolean;
  onInputChange: (value: string) => void;
  onSelectionChange: (keys: string[]) => void;
  onToggle: () => void;
  selectedKeys: string[];
}

export interface UnstableUncontrolledComboboxProps<S = void> extends UnstableComboboxBaseProps<S> {
  /** Initial popover open state (internal). @default false */
  defaultIsOpen?: boolean;
  defaultSelectedKeys?: string[];
  onInputChange?: (value: string) => void;
  onSelectionChange?: (keys: string[]) => void;
}

export interface UnstableComboboxTagProps extends Omit<
  SpiritTagProps<'div'>,
  'color' | 'elementType' | 'size' | 'children' | 'role' | 'tabIndex' | 'aria-label' | 'aria-describedby'
> {
  children?: ReactNode;
  tagKeyboardProps?: UnstableComboboxSelectionGridRowProps;
  isDisabled?: boolean;
  label: ReactNode;
  onRemove: () => void;
  removeLabel?: string;
}

export interface UnstableComboboxRef {
  close: () => void;
  focus: () => void;
  selectedKeys: string[];
}

export interface UnstableComboboxContextType {
  size: SizesDictionaryType;
  tagDescriptionId?: string;
}

export interface UnstableComboboxPopoverContextValue {
  /** Stable id for the combobox (prefix / diagnostics), not a focus-registry key. */
  id: string;
  isDisabled: boolean;
  selectedKeys: string[];
}

export interface UnstableComboboxOptionProps extends Omit<
  SpiritItemProps,
  'id' | 'role' | 'tabIndex' | 'isSelected' | 'aria-selected' | 'children' | 'elementType'
> {
  children: ReactNode;
  /** Option selection key (`data-spirit-value`; DOM `id` is namespaced per Combobox). */
  value: string;
}

export interface UnstableComboboxSelectionProps extends SpiritDivElementProps {
  isDisabled?: boolean;
}

export type SpiritUnstableComboboxProps<S = void> = UnstableComboboxProps<S>;
export type SpiritUnstableUncontrolledComboboxProps<S = void> = UnstableUncontrolledComboboxProps<S>;
export type SpiritUnstableComboboxRenderTagsOptions = UnstableComboboxRenderTagsOptions;
export type SpiritUnstableComboboxOptionProps = UnstableComboboxOptionProps;
export type SpiritUnstableComboboxSelectionProps = UnstableComboboxSelectionProps;
export type SpiritUnstableComboboxTagProps = UnstableComboboxTagProps;
export type SpiritUnstableComboboxRef = UnstableComboboxRef;

/** @internal */
export type ComboboxInputChangeEvent = ChangeEvent<HTMLInputElement>;
