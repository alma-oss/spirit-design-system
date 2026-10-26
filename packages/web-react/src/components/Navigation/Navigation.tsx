'use client';

import React, { type ElementType, forwardRef } from 'react';
import warning from '../../common/utilities/warning';
import { Direction } from '../../constants';
import { useStyleProps, useToolbarContext } from '../../hooks';
import {
  type NavigationProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritNavigationProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { useNavigationStyleProps } from './useNavigationStyleProps';

const _Navigation = <E extends ElementType = 'nav'>(props: SpiritNavigationProps<E>, ref: PolymorphicRef<E>) => {
  const { children, direction, elementType, ...restProps } = props;
  const toolbar = useToolbarContext();

  warning(
    !(toolbar && elementType === 'nav'),
    'Navigation: `elementType="nav"` is not allowed inside a `Toolbar`. Rendering a `div` instead.',
  );

  const Component = (
    toolbar && (elementType == null || elementType === 'nav') ? 'div' : (elementType ?? 'nav')
  ) as ElementType;
  const resolvedDirection = toolbar?.orientation ?? direction ?? Direction.HORIZONTAL;

  const { classProps, props: modifiedProps } = useNavigationStyleProps({ ...restProps, direction: resolvedDirection });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.root, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {/* The list is presentational inside a toolbar so it is not announced on top of the toolbar. */}
      <ul {...(toolbar ? { role: 'presentation' } : undefined)}>{children}</ul>
    </Component>
  );
};

const Navigation = forwardRef<HTMLElement, SpiritNavigationProps<'nav'>>(
  _Navigation,
) as unknown as PolymorphicComponent<'nav', NavigationProps>;

Navigation.spiritComponent = 'Navigation';
Navigation.displayName = 'Navigation';

export default Navigation;
