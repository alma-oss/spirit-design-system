import type { ReactNode } from 'react';
import { type SizesExtended } from '../../constants';
import type { ChildrenProps, ContextProps, SpiritIconProps, StyleProps, TooltipProps } from '../../types';

export type ContextualHelpSize = (typeof SizesExtended)[keyof typeof SizesExtended];

export interface ContextualHelpProps extends ChildrenProps, ContextProps, StyleProps {
  /** Tooltip content. */
  children: ReactNode;
  iconProps?: Partial<SpiritIconProps>;
  isDismissible?: boolean;
  label?: string;
  placement?: TooltipProps['placement'];
  size?: ContextualHelpSize;
}

export type SpiritContextualHelpProps = ContextualHelpProps;

/** Props after `useContextProps`, including the tooltip `id` a parent field can supply. */
export type ContextualHelpResolvedProps = Partial<ContextualHelpProps & { id?: string }>;
