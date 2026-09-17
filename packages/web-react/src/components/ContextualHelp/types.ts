import type { ReactNode } from 'react';
import { type SizesExtended } from '../../constants';
import type { IconBoxSize, TooltipProps } from '../../types';

export type ContextualHelpSize = (typeof SizesExtended)[keyof typeof SizesExtended];

export type ContextualHelpIcon =
  | string
  | {
      name?: string;
      boxSize?: IconBoxSize;
    };

export interface ContextualHelpProps extends Omit<TooltipProps, 'children' | 'isOpen' | 'onToggle'> {
  /** Tooltip content. */
  children: ReactNode;
  icon?: ContextualHelpIcon;
  /** Controlled open state. */
  isOpen?: boolean;
  label?: string;
  onToggle?: (isOpen: boolean) => void;
  size?: ContextualHelpSize;
}

export type SpiritContextualHelpProps = ContextualHelpProps;
