import { type SpiritControlButtonProps, type StringsProps, type TranslatableString } from '../../types';

export type CloseButtonStrings = {
  ariaLabel?: {
    close?: TranslatableString;
  };
};

export interface CloseButtonProps
  extends Omit<SpiritControlButtonProps<'button'>, 'children'>, StringsProps<CloseButtonStrings> {
  /** @deprecated Use `strings.ariaLabel.close` instead. */
  label?: string;
}
