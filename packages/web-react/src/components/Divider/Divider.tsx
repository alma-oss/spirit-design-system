'use client';

import classNames from 'classnames';
import React from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritDividerProps } from '../../types';
import { useDividerStyleProps } from './useDividerStyleProps';

const Divider = (props: SpiritDividerProps): React.JSX.Element => {
  const { classProps, props: modifiedProps } = useDividerStyleProps(props);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);

  return <hr {...otherProps} {...styleProps} className={classNames(classProps, styleProps.className)} />;
};

Divider.spiritComponent = 'Divider';

export default Divider;
