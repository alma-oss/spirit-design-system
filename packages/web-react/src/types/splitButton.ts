import { type ButtonSize } from './button';
import type {
  ChildrenProps,
  ComponentButtonColorNamesType,
  PlacementDictionaryType,
  SpiritDivElementProps,
  StyleProps,
} from './shared';

export interface SplitButtonProps extends StyleProps, ChildrenProps, Omit<SpiritDivElementProps, 'color'> {}

export type SplitButtonColorType<C> = Exclude<ComponentButtonColorNamesType<C>, 'plain'>;

export interface SpiritSplitButtonProps<C = void, S = void> extends SplitButtonProps {
  color?: SplitButtonColorType<C>;
  isDisabled?: boolean;
  size?: ButtonSize<S>;
}

export type UncontrolledSplitButtonProps<C = void, S = void> = {
  buttonLabel: string;
  buttonOnClick: () => void;
  dropdownTriggerIconName?: string;
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
  SpiritSplitButtonProps<C, S>;
