'use client';

import classNames from 'classnames';
import React from 'react';
import { useStyleProps } from '../../hooks';
import { type DrawerPanelContentProps } from '../../types';
import { useDrawerStyleProps } from './useDrawerStyleProps';

const DrawerPanelContent = ({ children, hasSpacing = false, ...restProps }: DrawerPanelContentProps) => {
  const { classProps } = useDrawerStyleProps({ hasSpacing });
  const { styleProps, props: otherProps } = useStyleProps(restProps);

  return (
    <div {...otherProps} {...styleProps} className={classNames(classProps.content, styleProps.className)}>
      {children}
    </div>
  );
};

DrawerPanelContent.spiritComponent = 'DrawerPanelContent';

export default DrawerPanelContent;
