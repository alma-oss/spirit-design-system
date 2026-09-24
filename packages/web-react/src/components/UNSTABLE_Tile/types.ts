import { type ElementType } from 'react';
import type {
  BackgroundColorsDictionaryType,
  ChildrenProps,
  PaddingProps,
  PolymorphicComponentProps,
  StyleProps,
} from '../../types';

/** ===== INTERNAL API ===== */
export interface TileBaseProps extends ChildrenProps, StyleProps, PaddingProps {
  /** The background color of the tile. */
  backgroundColor?: BackgroundColorsDictionaryType;
  /** Whether the tile is raised with a shadow. */
  hasShadow?: boolean;
}

export type TileProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, TileBaseProps>;

/** ===== PUBLIC API ===== */
export type SpiritTileProps<E extends ElementType = 'div'> = TileProps<E>;
