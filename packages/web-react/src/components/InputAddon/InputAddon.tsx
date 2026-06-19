'use client';

import React, { type ElementType } from 'react';
import { Sizes } from '../../constants';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type FormFieldContextValue } from '../../types';
import { mergeStyleProps } from '../../utils';
import { type SpiritInputAddonProps } from './types';
import { useInputAddonStyleProps } from './useInputAddonStyleProps';

const defaultProps: Partial<SpiritInputAddonProps> = {
  elementType: 'div',
  size: Sizes.MEDIUM,
};

const InputAddon = <E extends ElementType = 'div'>(props: SpiritInputAddonProps<E>) => {
  const contextProps = useContextProps<Partial<FormFieldContextValue>>({}, 'inputAddon');
  const propsWithDefaults = {
    ...defaultProps,
    size: contextProps.size ?? defaultProps.size,
    ...props,
  };
  const { classProps, props: modifiedProps } = useInputAddonStyleProps(propsWithDefaults);
  const { children, elementType, ...restProps } = modifiedProps;
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const Component = (elementType || defaultProps.elementType) as ElementType;
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps}>
      {children}
    </Component>
  );
};

InputAddon.spiritComponent = 'InputAddon';
InputAddon.displayName = 'InputAddon';

export default InputAddon;
