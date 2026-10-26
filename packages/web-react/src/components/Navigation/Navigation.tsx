'use client';

import React, { type ElementType, forwardRef } from 'react';
import { Direction } from '../../constants';
import { ToolbarContextProvider, type ToolbarOrientation, useStyleProps, useToolbar } from '../../hooks';
import {
  type NavigationProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritNavigationProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { useNavigationStyleProps } from './useNavigationStyleProps';

const defaultProps: Partial<SpiritNavigationProps> = {
  direction: Direction.HORIZONTAL,
};

const _Navigation = <E extends ElementType = 'nav'>(props: SpiritNavigationProps<E>, ref: PolymorphicRef<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { 'aria-orientation': ariaOrientation, children, elementType, ...restProps } = propsWithDefaults;
  const isToolbar = restProps.role === 'toolbar';
  // ARIA in HTML does not allow the `toolbar` role on `nav`.
  const Component = (elementType ?? (isToolbar ? 'div' : 'nav')) as ElementType;
  const orientation = (ariaOrientation ?? propsWithDefaults.direction ?? Direction.HORIZONTAL) as ToolbarOrientation;

  const toolbarContext = useToolbar({ isEnabled: isToolbar, orientation });
  const { classProps, props: modifiedProps } = useNavigationStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.root, styleProps, otherProps });

  return (
    <Component
      {...otherProps}
      {...mergedStyleProps}
      aria-orientation={isToolbar ? orientation : ariaOrientation}
      ref={ref}
    >
      <ToolbarContextProvider value={toolbarContext}>
        <ul>{children}</ul>
      </ToolbarContextProvider>
    </Component>
  );
};

const Navigation = forwardRef<HTMLElement, SpiritNavigationProps<'nav'>>(
  _Navigation,
) as unknown as PolymorphicComponent<'nav', NavigationProps>;

Navigation.spiritComponent = 'Navigation';
Navigation.displayName = 'Navigation';

export default Navigation;
