import type { ChildrenProps, SpiritDivElementProps, StyleProps } from '../../types/shared';
import type { TagColor, TagSize } from '../../types/tag';

export interface UnstableSplitTagProps<C = void, S = void>
  extends ChildrenProps, StyleProps, Omit<SpiritDivElementProps, 'color'> {
  color?: TagColor<C>;
  isDisabled?: boolean;
  isSubtle?: boolean;
  size?: TagSize<S>;
}

export type SpiritUnstableSplitTagProps<C = void, S = void> = UnstableSplitTagProps<C, S>;
