import { type SpiritControlButtonProps, type StringsProps, type TranslatableString } from '../../types';

export type CloseButtonStrings = {
  closeAria?: TranslatableString;
};

export interface CloseButtonProps
  extends Omit<SpiritControlButtonProps<'button'>, 'children'>, StringsProps<CloseButtonStrings> {
  /** @deprecated Use `strings.closeAria` instead. */
  label?: string;
}
