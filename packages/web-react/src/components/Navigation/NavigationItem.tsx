'use client';

import classNames from 'classnames';
import React, { type ReactElement, useRef } from 'react';
import { AlignmentYExtended } from '../../constants';
import { useContextProps } from '../../context';
import { useStyleProps, useToolbarItem } from '../../hooks';
import { type SpiritNavigationItemProps } from '../../types';
import { mergeProps } from '../../utils';
import { useNavigationStyleProps } from './useNavigationStyleProps';

const defaultProps: Partial<SpiritNavigationItemProps> = {
  alignmentY: AlignmentYExtended.CENTER,
};

const NavigationItem = (props: SpiritNavigationItemProps): ReactElement => {
  const mergedProps = useContextProps<Partial<SpiritNavigationItemProps>>(props, 'toolbarItem');
  const propsWithDefaults = mergeProps(defaultProps, mergedProps);
  const { children, ...restProps } = propsWithDefaults;
  const itemRef = useRef<HTMLLIElement>(null);

  const { classProps, props: modifiedProps } = useNavigationStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  useToolbarItem(itemRef);

  return (
    <li
      {...otherProps}
      className={classNames(classProps.item, styleProps.className)}
      style={styleProps.style}
      ref={itemRef}
    >
      {children}
    </li>
  );
};

NavigationItem.spiritComponent = 'NavigationItem';

export default NavigationItem;
