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
    <header {...otherProps} {...styleProps} className={classNames(classProps.header, styleProps.className)}>
      {children}
    </header>
  );
};

DrawerPanelHeader.spiritComponent = 'DrawerPanelHeader';

export default DrawerPanelHeader;
