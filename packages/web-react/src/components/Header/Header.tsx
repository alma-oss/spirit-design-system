'use client';

import classNames from 'classnames';
import React, { type ReactElement } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritHeaderProps } from '../../types';
import { useHeaderStyleProps } from './useHeaderStyleProps';

const Header = (props: SpiritHeaderProps): ReactElement => {
  const { children, ...restProps } = props;

  const { classProps, props: modifiedProps } = useHeaderStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);

  return (
    <header {...otherProps} className={classNames(classProps.root, styleProps.className)} style={styleProps.style}>
      {children}
    </header>
  );
};

Header.spiritComponent = 'Header';

export default Header;
