'use client';

import classNames from 'classnames';
import React from 'react';
import { useStyleProps } from '../../hooks';
import { type DrawerPanelHeaderProps } from '../../types';
import { useDrawerStyleProps } from './useDrawerStyleProps';

const DrawerPanelHeader = ({ children, ...restProps }: DrawerPanelHeaderProps) => {
  const { classProps } = useDrawerStyleProps();
  const { styleProps, props: otherProps } = useStyleProps(restProps);

  return (
    <div {...otherProps} {...styleProps} className={classNames(classProps.header, styleProps.className)}>
      {children}
    </div>
  );
};

DrawerPanelHeader.spiritComponent = 'DrawerPanelHeader';

export default DrawerPanelHeader;
