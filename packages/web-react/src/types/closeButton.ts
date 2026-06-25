import { type SpiritControlButtonProps } from './controlButton';

/** ===== PUBLIC API ===== */
export interface CloseButtonProps extends Omit<SpiritControlButtonProps<'button'>, 'children'> {
  /** Accessible label for the close button. Falls back to the localized "Close" string. */
  label?: string;
}
