import { type ElementType } from 'react';
import type { ChildrenProps, PolymorphicComponentProps, SingleOrResponsive, SpaceToken, StyleProps } from '../../types';

/** ===== INTERNAL API ===== */
export interface TileBaseProps extends ChildrenProps, StyleProps {
  /** Whether the tile is raised with a shadow. */
  hasShadow?: boolean;
  /** Padding of the tile. */
  padding?: SingleOrResponsive<SpaceToken>;
  /** Padding bottom of the tile. */
  paddingBottom?: SingleOrResponsive<SpaceToken>;
  /** Padding left of the tile. */
  paddingLeft?: SingleOrResponsive<SpaceToken>;
  /** Padding right of the tile. */
  paddingRight?: SingleOrResponsive<SpaceToken>;
  /** Padding top of the tile. */
  paddingTop?: SingleOrResponsive<SpaceToken>;
  /** Horizontal padding of the tile. */
  paddingX?: SingleOrResponsive<SpaceToken>;
  /** Vertical padding of the tile. */
  paddingY?: SingleOrResponsive<SpaceToken>;
}

export type TileProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, TileBaseProps>;

/** ===== PUBLIC API ===== */
export type SpiritTileProps<E extends ElementType = 'div'> = TileProps<E>;
