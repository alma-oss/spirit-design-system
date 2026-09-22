'use client';

import React, { type ElementType, forwardRef } from 'react';
import { PaddingStyleProps } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type PolymorphicComponent, type PolymorphicRef } from '../../types';
import { mergeStyleProps } from '../../utils';
import { type TileProps } from './types';
import { useTileStyleProps } from './useTileStyleProps';

const defaultProps = {
  elementType: 'div',
};

const _Tile = <E extends ElementType = 'div'>(props: TileProps<E>, ref: PolymorphicRef<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType, children, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps } = useTileStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps, {
    ...PaddingStyleProps,
  });
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </Component>
  );
};

const UNSTABLE_Tile = forwardRef<HTMLDivElement, TileProps<'div'>>(_Tile) as unknown as PolymorphicComponent<
  'div',
  TileProps<ElementType>
>;

UNSTABLE_Tile.spiritComponent = 'UNSTABLE_Tile';
UNSTABLE_Tile.displayName = 'UNSTABLE_Tile';

export default UNSTABLE_Tile;
