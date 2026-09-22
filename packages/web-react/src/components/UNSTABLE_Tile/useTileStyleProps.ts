import classNames from 'classnames';
import { type ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type TileProps } from './types';

export interface UseTileStyleProps<E> {
  /** className props */
  classProps: string;
  /** Props for the tile element. */
  props: E;
}

export const useTileStyleProps = (
  props: Partial<TileProps<ElementType>>,
): UseTileStyleProps<Partial<TileProps<ElementType>>> => {
  const { backgroundColor, hasShadow, ...restProps } = props || {};

  const tileClass = useClassNamePrefix('UNSTABLE_Tile');
  const backgroundColorClass = useClassNamePrefix(backgroundColor ? `bg-${backgroundColor}` : '');
  const hasShadowClass = `${tileClass}--shadow`;

  const classProps = classNames(tileClass, {
    [backgroundColorClass]: Boolean(backgroundColor),
    [hasShadowClass]: hasShadow,
  });

  return {
    classProps,
    props: restProps,
  };
};
