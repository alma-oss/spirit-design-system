import { type ButtonSize } from './button';
import type {
  ChildrenProps,
  ComponentButtonColorNamesType,
  PlacementDictionaryType,
  SpiritDivElementProps,
  StringsProps,
  StyleProps,
  TranslatableString,
} from './shared';

export interface SplitButtonProps extends StyleProps, ChildrenProps, Omit<SpiritDivElementProps, 'color'> {}

export type SplitButtonColorType<C> = Exclude<ComponentButtonColorNamesType<C>, 'plain'>;

export interface SpiritSplitButtonProps<C = void, S = void> extends SplitButtonProps {
  color?: SplitButtonColorType<C>;
  isDisabled?: boolean;
  size?: ButtonSize<S>;
}

export type UncontrolledSplitButtonStrings = {
  label?: {
    dropdown?: {
      trigger?: TranslatableString;
    };
  };
};

type UncontrolledSplitButtonLabelProps =
  | {
      labelButton: TranslatableString;
      /** @deprecated Use `labelButton` instead. */
      buttonLabel?: string;
    }
  | {
      labelButton?: never;
      /** @deprecated Use `labelButton` instead. */
      buttonLabel: string;
    };

export type UncontrolledSplitButtonProps<C = void, S = void> = {
  buttonOnClick: () => void;
  dropdownTriggerIconName?: string;
  /** @deprecated Use `strings.label.dropdown.trigger` instead. */
  dropdownTriggerLabel?: string;
  dropdownPlacement?: PlacementDictionaryType;
  id: string;
  isButtonLabelHidden?: boolean;
  isDisabled?: boolean;
  isDropdownTriggerLabelHidden?: boolean;
} & (
  | {
      isButtonLabelHidden?: true;
      buttonIconName: string;
    }
  | {
      isButtonLabelHidden?: false;
      buttonIconName?: string;
    }
) &
  UncontrolledSplitButtonLabelProps &
  StringsProps<UncontrolledSplitButtonStrings> &
  SpiritSplitButtonProps<C, S>;
