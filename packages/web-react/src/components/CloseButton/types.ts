import { type SpiritControlButtonProps, type TranslatableString, type WithStrings } from '../../types';

export type CloseButtonStrings = {
  ariaLabel?: TranslatableString;
};

export interface CloseButtonProps
  extends Omit<SpiritControlButtonProps<'button'>, 'children'>, WithStrings<CloseButtonStrings> {
  /** @deprecated Use `strings.ariaLabel` instead. */
  label?: string;
}
