'use client';

import classNames from 'classnames';
import React from 'react';
import { ComponentButtonColors, Sizes } from '../../constants';
import { PropsProvider } from '../../context';
import { useStyleProps } from '../../hooks';
import { type SpiritSplitButtonProps } from '../../types';
import { useSplitButtonStyleProps } from './useSplitButtonStyleProps';

const defaultProps: Partial<SpiritSplitButtonProps> = {
  color: ComponentButtonColors.PRIMARY,
  size: Sizes.MEDIUM,
};

const SplitButton = (props: SpiritSplitButtonProps) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, color, size, isDisabled, ...restProps } = propsWithDefaults;
  const { classProps } = useSplitButtonStyleProps();
  const { styleProps, props: otherProps } = useStyleProps(restProps);

  return (
    <PropsProvider
      value={{
        isDisabled,
        button: { color, size },
      }}
    >
      <div {...styleProps} {...otherProps} className={classNames(classProps, styleProps.className)}>
        {children}
      </div>
    </PropsProvider>
  );
};

export default SplitButton;
