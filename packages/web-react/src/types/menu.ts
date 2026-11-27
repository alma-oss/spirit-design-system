import { type ChildrenProps, type SpiritDivElementProps } from './shared';

export interface MenuProps extends ChildrenProps {}

export interface SpiritMenuProps extends MenuProps, Omit<SpiritDivElementProps, 'role'> {}
