'use client';

import React, { type ElementType, type HTMLAttributes, forwardRef } from 'react';
import { Direction } from '../../constants';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import {
  type NavigationProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritNavigationProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { useNavigationStyleProps } from './useNavigationStyleProps';

type NavigationContextProps = {
  /** Props of the list element, provided by a surrounding `Toolbar` */
  listProps?: HTMLAttributes<HTMLUListElement>;
};

const _Navigation = <E extends ElementType = 'nav'>(props: SpiritNavigationProps<E>, ref: PolymorphicRef<E>) => {
  const mergedProps = useContextProps(props, 'toolbar') as SpiritNavigationProps<E> & NavigationContextProps;
  const { children, direction = Direction.HORIZONTAL, elementType = 'nav', listProps, ...restProps } = mergedProps;
  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps } = useNavigationStyleProps({ ...restProps, direction });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.root, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      <ul {...listProps}>{children}</ul>
    </Component>
  );
};

const Navigation = forwardRef<HTMLElement, SpiritNavigationProps<'nav'>>(
  _Navigation,
) as unknown as PolymorphicComponent<'nav', NavigationProps>;

Navigation.spiritComponent = 'Navigation';
Navigation.displayName = 'Navigation';

export default Navigation;
