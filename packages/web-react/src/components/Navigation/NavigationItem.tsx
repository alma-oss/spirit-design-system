'use client';

import classNames from 'classnames';
import React, { type ReactElement } from 'react';
import { AlignmentYExtended } from '../../constants';
import { useStyleProps, useToolbarContext } from '../../hooks';
import { type SpiritNavigationItemProps } from '../../types';
import { useNavigationStyleProps } from './useNavigationStyleProps';

const defaultProps: Partial<SpiritNavigationItemProps> = {
  alignmentY: AlignmentYExtended.CENTER,
};

const NavigationItem = (props: SpiritNavigationItemProps): ReactElement => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, ...restProps } = propsWithDefaults;

  const { classProps, props: modifiedProps } = useNavigationStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const { isEnabled: isToolbar } = useToolbarContext();

  return (
    <li
      {...otherProps}
      className={classNames(classProps.item, styleProps.className)}
      style={styleProps.style}
      {...(isToolbar ? { role: 'presentation' } : undefined)}
    >
      {children}
    </li>
  );
};

NavigationItem.spiritComponent = 'NavigationItem';

export default NavigationItem;
