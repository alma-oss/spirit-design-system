import { type ElementType, type LegacyRef, type ReactNode } from 'react';
import {
  type AlignmentXExtendedDictionaryType,
  type AlignmentYExtendedDictionaryType,
  type Booleanish,
  type ChildrenProps,
  type ClickEvent,
  type PlacementDictionaryType,
  type PolymorphicComponentProps,
  type StyleProps,
} from './shared';

export const DropdownFullWidthModes = {
  OFF: 'off',
  MOBILE_ONLY: 'mobile-only',
  ALL: 'all',
} as const;

export type DropdownFullWidthModeKeys = keyof typeof DropdownFullWidthModes;
export type DropdownFullWidthMode = (typeof DropdownFullWidthModes)[DropdownFullWidthModeKeys];

export type DropdownTriggerRenderProps = {
  onClick: (event: ClickEvent) => void;
  className?: string | undefined;
  'aria-expanded': Booleanish;
  'aria-controls': string;
  ref: LegacyRef<HTMLButtonElement & HTMLAnchorElement>;
};

export type DropdownAlignmentXType =
  | AlignmentXExtendedDictionaryType
  | { [key: string]: AlignmentXExtendedDictionaryType };
export type DropdownAlignmentYType =
  | AlignmentYExtendedDictionaryType
  | { [key: string]: AlignmentYExtendedDictionaryType };

export interface DropdownAlignmentProps {
  alignmentX?: DropdownAlignmentXType;
  alignmentY?: DropdownAlignmentYType;
}

export interface DropdownBaseProps extends DropdownAlignmentProps, StyleProps {
  enableAutoClose?: boolean;
  fullWidthMode?: DropdownFullWidthMode;
  onAutoClose?: (event: Event) => void;
  placement?: PlacementDictionaryType;
}

/** Full `Dropdown` shell props (`DropdownBaseProps` plus `children` and `id`). */
export interface DropdownProps extends DropdownBaseProps, ChildrenProps {
  id: string;
}

export interface DropdownStyleProps extends DropdownAlignmentProps, StyleProps {
  isOpen?: boolean;
}

export interface UncontrolledDropdownProps extends DropdownProps {}

export interface SpiritDropdownProps extends DropdownProps {
  isOpen: boolean;
  onToggle: () => void;
}

/** ===== INTERNAL API ===== */
export interface DropdownTriggerBaseProps extends StyleProps {
  children: string | ReactNode | ((props: { isOpen: boolean }) => ReactNode);
}

/** ===== PUBLIC API ===== */
export type DropdownTriggerProps<E extends ElementType = 'button'> = PolymorphicComponentProps<
  E,
  DropdownTriggerBaseProps
>;
