'use client';

import React, { type ElementType, type HTMLAttributes, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import {
  type DrawerPanelElementType,
  type DrawerPanelProps,
  type PolymorphicComponent,
  type PolymorphicRef,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { useDrawerStyleProps } from './useDrawerStyleProps';

const _DrawerPanel = <E extends ElementType = DrawerPanelElementType>(
  props: DrawerPanelProps<E>,
  ref: PolymorphicRef<E>,
) => {
  const { elementType = 'div', children, ...restProps } = props;

  const Component = elementType as ElementType;

  const { classProps } = useDrawerStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.panel, styleProps, otherProps });

  return (
    <Component {...(otherProps as HTMLAttributes<HTMLElement>)} {...mergedStyleProps} ref={ref}>
      <div className={classProps.content}>{children}</div>
    </Component>
  );
};

const DrawerPanel = forwardRef<HTMLDivElement, DrawerPanelProps<'div'>>(
  _DrawerPanel,
) as unknown as PolymorphicComponent<'div', DrawerPanelProps<ElementType>>;

DrawerPanel.spiritComponent = 'DrawerPanel';
DrawerPanel.displayName = 'DrawerPanel';

export default DrawerPanel;
