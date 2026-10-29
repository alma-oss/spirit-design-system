'use client';

import React, { type ElementType, forwardRef } from 'react';
import warning from '../../common/utilities/warning';
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
  const hasAccessibleName = Boolean(restProps['aria-label'] || restProps['aria-labelledby']);

  warning(
    !isToolbar || hasAccessibleName,
    'Navigation: `role="toolbar"` requires `aria-label` or `aria-labelledby` so the toolbar has an accessible name.',
  );

  // ARIA in HTML does not allow the `toolbar` role on `nav`, including an explicit `elementType="nav"`.
  warning(
    !(isToolbar && elementType === 'nav'),
    'Navigation: `role="toolbar"` is not allowed on `nav`. Rendering a `div` instead.',
  );

  const Component = (
    isToolbar && (elementType == null || elementType === 'nav') ? 'div' : (elementType ?? 'nav')
  ) as ElementType;
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
        {/* The list is presentational inside a toolbar so it is not announced on top of the toolbar. */}
        <ul {...(isToolbar ? { role: 'presentation' } : undefined)}>{children}</ul>
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
