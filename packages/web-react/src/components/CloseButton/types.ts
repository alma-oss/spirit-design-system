import { type SpiritControlButtonProps } from '../../types';

export interface CloseButtonProps extends Omit<SpiritControlButtonProps<'button'>, 'children'> {
  /** Accessible label for the close button. Falls back to the localized "Close" string. */
  label?: string;
}
