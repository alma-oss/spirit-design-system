'use client';

import React, { type ElementType, type ForwardedRef, type HTMLAttributes, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type DrawerPanelElementType, type DrawerPanelProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useDrawerStyleProps } from './useDrawerStyleProps';

const _DrawerPanel = <E extends ElementType = DrawerPanelElementType>(
  props: DrawerPanelProps<E>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { elementType: ElementTag = 'div', children, ...restProps } = props;

  const { classProps } = useDrawerStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.panel, styleProps, otherProps });

  return (
    <ElementTag {...(otherProps as HTMLAttributes<HTMLElement>)} {...mergedStyleProps} ref={ref}>
      <div className={classProps.content}>{children}</div>
    </ElementTag>
  );
};

const DrawerPanel = forwardRef<HTMLDivElement, DrawerPanelProps<ElementType>>(_DrawerPanel);

DrawerPanel.spiritComponent = 'DrawerPanel';

export default DrawerPanel;
