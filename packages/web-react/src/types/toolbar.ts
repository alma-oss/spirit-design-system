import { type ChildrenProps, type DirectionDictionaryType, type SpiritDivElementProps } from './shared';

export interface ToolbarProps extends ChildrenProps {
  /** Orientation of the toolbar; sets `aria-orientation` and which arrow keys move the focus */
  orientation?: DirectionDictionaryType;
}

export interface SpiritToolbarProps extends ToolbarProps, Omit<SpiritDivElementProps, 'role'> {}
