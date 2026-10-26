'use client';

import classNames from 'classnames';
import React, { type ReactElement, useRef } from 'react';
import { AlignmentYExtended } from '../../constants';
import { useStyleProps, useToolbarItem } from '../../hooks';
import { type SpiritNavigationItemProps } from '../../types';
import { useNavigationStyleProps } from './useNavigationStyleProps';

const defaultProps: Partial<SpiritNavigationItemProps> = {
  alignmentY: AlignmentYExtended.CENTER,
};

const NavigationItem = (props: SpiritNavigationItemProps): ReactElement => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, ...restProps } = propsWithDefaults;
  const itemRef = useRef<HTMLLIElement>(null);

  const { classProps, props: modifiedProps } = useNavigationStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const { isInToolbar } = useToolbarItem(itemRef);

  return (
    <li
      {...otherProps}
      className={classNames(classProps.item, styleProps.className)}
      style={styleProps.style}
      ref={itemRef}
      {...(isInToolbar ? { role: 'presentation' } : undefined)}
    >
      {children}
    </li>
  );
};

NavigationItem.spiritComponent = 'NavigationItem';

export default NavigationItem;
