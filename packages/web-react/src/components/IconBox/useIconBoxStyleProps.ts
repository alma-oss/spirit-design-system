import { cssVariablePrefix } from '@alma-oss/spirit-design-tokens';
import { type CSSProperties, type ElementType } from 'react';
import { SizesExtended } from '../../constants';
import type { Responsive, SpaceToken, SpiritIconBoxProps } from '../../types';
import { isResponsive } from '../../utils';
import { IconBoxShapes, IconBoxShapesRadii, IconBoxSizes } from './constants';

export interface UseIconBoxStyleProps<E> {
  iconBoxStyles: CSSProperties;
  props: E;
  shapesProps: (typeof IconBoxShapesRadii)[keyof typeof IconBoxShapesRadii];
  sizeProps:
    | (typeof IconBoxSizes)[keyof typeof IconBoxSizes]
    | {
        padding: Responsive<SpaceToken>;
        iconSize: Responsive<number>;
      };
}

export const useIconBoxStyleProps = (
  props: Partial<SpiritIconBoxProps<ElementType>>,
): UseIconBoxStyleProps<Partial<SpiritIconBoxProps<ElementType>>> => {
  const { shape = IconBoxShapes.ROUNDED, size = SizesExtended.MEDIUM, ...restProps } = props || {};
  const shapesProps = IconBoxShapesRadii[shape];
  const iconBoxStyles: CSSProperties = {
    padding: `calc(var(--${cssVariablePrefix}local-padding) - var(--${cssVariablePrefix}local-border-width, 0px)) !important`,
  };

  let sizeProps: UseIconBoxStyleProps<Partial<SpiritIconBoxProps<ElementType>>>['sizeProps'];

  if (isResponsive<(typeof SizesExtended)[keyof typeof SizesExtended]>(size)) {
    const responsivePadding: Responsive<SpaceToken> = {};
    const responsiveIconSize: Responsive<number> = {};

    Object.entries(size).forEach(([breakpoint, breakpointSize]) => {
      const sizeConfig = IconBoxSizes[breakpointSize as keyof typeof IconBoxSizes];
      responsivePadding[breakpoint as keyof Responsive<SpaceToken>] = sizeConfig.padding as SpaceToken;
      responsiveIconSize[breakpoint as keyof Responsive<number>] = sizeConfig.iconSize;
    });

    sizeProps = {
      padding: responsivePadding,
      iconSize: responsiveIconSize,
    };
  } else {
    sizeProps = IconBoxSizes[size as keyof typeof IconBoxSizes];
  }

  return {
    iconBoxStyles,
    props: restProps,
    shapesProps,
    sizeProps,
  };
};
