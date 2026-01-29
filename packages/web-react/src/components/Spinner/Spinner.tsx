'use client';

import classNames from 'classnames';
import React from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritSpinnerProps } from '../../types';
import { Icon } from '../Icon';
import { useSpinnerStyleProps } from './useSpinnerStyleProps';

const Spinner = <C extends undefined = undefined>(props: SpiritSpinnerProps<C>): JSX.Element => {
  const { classProps, props: modifiedProps } = useSpinnerStyleProps(props);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);

  return (
    // @ts-ignore: Incompatible HTMLElement and SVGSVGElement
    <Icon
      {...otherProps}
      name="spinner"
      UNSAFE_className={classNames(classProps, styleProps.className)}
      UNSAFE_style={styleProps.style}
    />
  );
};

Spinner.spiritComponent = 'Spinner';

export default Spinner;
