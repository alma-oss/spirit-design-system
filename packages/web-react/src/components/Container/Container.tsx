'use client';

import classNames from 'classnames';
import React from 'react';
import { SizesExtended, TextStyleProps } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type SpiritContainerProps } from '../../types';
import { useContainerStyleProps } from './useContainerStyleProps';

const defaultProps: SpiritContainerProps = {
  isFluid: false,
  size: SizesExtended.XLARGE,
};

const Container = (props: SpiritContainerProps): React.JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, ...restProps } = propsWithDefaults;
  const { classProps, props: modifiedProps } = useContainerStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps, {
    textAlignment: TextStyleProps.textAlignment,
  });

  return (
    <div {...otherProps} {...styleProps} className={classNames(classProps, styleProps.className)}>
      {children}
    </div>
  );
};

Container.spiritComponent = 'Container';

export default Container;
