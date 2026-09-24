import { type SpiritControlButtonProps, type StringsProps, type TranslatableString } from '../../types';

export type CloseButtonStrings = {
  ariaLabel?: TranslatableString;
};

export interface CloseButtonProps
  extends Omit<SpiritControlButtonProps<'button'>, 'children'>, StringsProps<CloseButtonStrings> {
  /** @deprecated Use `strings.ariaLabel` instead. */
  label?: string;
}
