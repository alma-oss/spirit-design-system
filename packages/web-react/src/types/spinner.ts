import { type IconProps } from './icon';
import type { TextColorNamesType } from './shared';

export interface SpinnerProps extends Omit<IconProps, 'name' | 'color'> {}

export interface SpiritSpinnerProps<C extends string | undefined = undefined> extends SpinnerProps {
  /** Color of the Spinner */
  color?: TextColorNamesType<C>;
}
