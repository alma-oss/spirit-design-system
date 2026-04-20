import {
  type ChildrenProps,
  type FillVariantDictionaryType,
  type SpiritInputElementProps,
  type SpiritSegmentedControlElementProps,
  type StyleProps,
} from './shared';

export interface SegmentedControlBaseProps extends SegmentedControlMultiselectProps {
  isFluid?: boolean;
  label: string;
  name: string;
  onSelectionChange?: (value: string | string[]) => void;
  variant?: FillVariantDictionaryType;
}

export interface SegmentedControlMultiselectProps {
  isMultiselect?: boolean;
}

export interface SegmentedControlItemProps extends StyleProps, SpiritInputElementProps, ChildrenProps {
  isDisabled?: boolean;
}

export interface SegmentedControlProps extends ChildrenProps, StyleProps, SpiritSegmentedControlElementProps {}

export interface SpiritSegmentedControlItemProps extends SegmentedControlItemProps {}

export interface SpiritSegmentedControlProps extends SegmentedControlProps, SegmentedControlBaseProps {
  selectedValue: string | string[];
  setSelectedValue: (value: string | string[]) => void;
}

export interface SpiritUncontrolledSegmentedControlProps
  extends SegmentedControlProps, SegmentedControlBaseProps, SegmentedControlMultiselectProps {
  defaultSelectedValue?: string | string[];
}
