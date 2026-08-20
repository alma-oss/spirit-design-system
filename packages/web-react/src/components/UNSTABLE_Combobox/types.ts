import { type ReactNode } from 'react';
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
import type { ComboboxSelectedItem } from './useComboboxItems';
/** Popup options widget role. `null` on the prop means no options widget (tip-only / auxiliary content). */
export type ComboboxOptionsRole = 'listbox' | 'grid';

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
  getKeyboardGridRowProps: (index: number) => SelectionGridRowProps;
  /** Remove a selected item by key (same as default tags) */
  onRemove: (key: string) => void;
  /** Remove by row index; prefer for remove controls so focus moves like default tags */
  removeTagAtIndex: (index: number) => void;
  /** Currently selected items in selection order (value + label) */
  selectedItems: ComboboxSelectedItem[];
}

export interface UnstableComboboxBaseProps<S = void>
  extends
    Omit<SpiritDivElementProps, 'children' | 'ref' | 'id'>,
    HelperTextProps,
    Validation,
    ValidationTextProp,
    UnstableComboboxTranslations {
  /** Option items. Optional for tip-only / custom popover content. */
  children?: ReactNode;
  id: string;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  isRequired?: boolean;
  /** Shows loading slot sibling of the options widget */
  isLoading?: boolean;
  label: string;
  /** Props for the inner `Dropdown`. */
  dropdownProps?: DropdownBaseProps;
  /**
   * Extra popover content rendered as a sibling of the options widget
   * (tips, custom blocks — never inside `role="listbox"` / `role="grid"`).
   */
  auxiliaryContent?: ReactNode;
  /** Clear-all addon when selection is non-empty. @default false */
  hasClearButton?: boolean;
  /**
   * Enables the empty-state slot (sibling of the options widget).
   * Shown when there are no option children; copy from `emptyStateLabel`.
   *
   * @default false
   */
  hasEmptyState?: boolean;
  /** Props for the inner `Label` (style props; `UNSAFE_className` is merged with combobox classes). */
  labelProps?: StyleProps;
  /**
   * Full set of option ids (for “all selected” placeholder / add-more hide).
   * Required whenever not all options stay mounted in the options widget.
   */
  optionKeys?: string[];
  /**
   * ARIA pattern for the options widget.
   * - `'listbox'` (default) — one action per row (`option`)
   * - `'grid'` — multi-cell rows (`row` / `gridcell`), e.g. link + remove
   * - `null` — no options widget (tip-only / `auxiliaryContent` only)
   */
  optionsRole?: ComboboxOptionsRole | null;
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
  tagKeyboardProps?: SelectionGridRowProps;
  isDisabled?: boolean;
  label: ReactNode;
  onRemove: () => void;
  removeLabel?: string;
}

/** Option for the nested select segment on `UNSTABLE_ComboboxSplitTag`. */
export type UnstableComboboxSplitTagSelectOption = string | { value: string; label: ReactNode };

/** Controlled select segment rendered between the label and remove control. */
export interface UnstableComboboxSplitTagSelectProps {
  value: string;
  options: UnstableComboboxSplitTagSelectOption[];
  onChange: (value: string) => void;
  /** Whether the nested select popover is open. */
  isOpen: boolean;
  /** Toggle the nested select popover. */
  onToggle: () => void;
  /** Accessible name for the select trigger. */
  'aria-label'?: string;
  /** Accessible name for the options listbox. @default i18n `combobox.splitTagListboxLabel` */
  listboxLabel?: string;
  /** Stable id prefix for the nested Dropdown / option ids. */
  id?: string;
}

export interface UnstableComboboxSplitTagProps {
  /** Primary label segment (e.g. city name). */
  label: ReactNode;
  onRemove: () => void;
  removeLabel?: string;
  tagKeyboardProps?: SelectionGridRowProps;
  isDisabled?: boolean;
  /** Nested select segment (e.g. distance). */
  select: UnstableComboboxSplitTagSelectProps;
}

export type SpiritUnstableComboboxSplitTagProps = UnstableComboboxSplitTagProps;

export interface UnstableComboboxRef {
  /**
   * Visually activate an option by value (or clear with `null`).
   * Clears nested cell-control highlight and focuses the filter input.
   */
  activateOption: (optionId: string | null) => void;
  close: () => void;
  focus: () => void;
  selectedKeys: string[];
}

export interface UnstableComboboxContextType {
  size: SizesDictionaryType;
  tagDescriptionId?: string;
  /** Whether the Combobox options popover is open (for nested overlays in selection tags). */
  isOpen?: boolean;
  /** Toggle the Combobox options popover. */
  onToggle?: () => void;
  isDisabled?: boolean;
}

export interface UnstableComboboxPopoverContextValue {
  /** Stable id for the combobox (prefix / diagnostics), not a focus-registry key. */
  id: string;
  /** Option DOM id currently referenced by `aria-activedescendant` (visual keyboard active). */
  activeDescendantId?: string;
  /** Nested cell-control index within the active option row (`null` = row itself is active). */
  activeNestedControlIndex?: number | null;
  isDisabled: boolean;
  /** Effective options widget role (`listbox` or `grid`). */
  optionsRole: ComboboxOptionsRole;
  /** Selected keys as a Set for O(1) membership lookups (insertion order preserved). */
  selectedKeysSet: ReadonlySet<string>;
}

export interface UnstableComboboxOptionProps extends Omit<
  SpiritItemProps,
  'id' | 'role' | 'tabIndex' | 'isSelected' | 'aria-selected' | 'children' | 'elementType'
> {
  children: ReactNode;
  /**
   * Short label for selection tags when `children` are rich content.
   * Defaults to plain text extracted from `children`.
   */
  label?: string;
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
