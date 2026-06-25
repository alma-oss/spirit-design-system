'use client';

import classNames from 'classnames';
import React from 'react';
import { useStyleProps } from '../../hooks';
import { type DrawerPanelBodyProps } from '../../types';
import { useDrawerStyleProps } from './useDrawerStyleProps';

const DrawerPanelBody = ({ children, hasSpacing = false, ...restProps }: DrawerPanelBodyProps) => {
  const { classProps } = useDrawerStyleProps({ hasSpacing });
  const { styleProps, props: otherProps } = useStyleProps(restProps);

  return (
    <div {...otherProps} {...styleProps} className={classNames(classProps.content, styleProps.className)}>
      {children}
    </div>
  );
};

DrawerPanelBody.spiritComponent = 'DrawerPanelBody';

export default DrawerPanelBody;
