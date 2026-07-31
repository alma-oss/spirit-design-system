'use client';

import React, { type ElementType } from 'react';
import { Sizes } from '../../constants';
import { useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type WithFormFieldContext } from '../../types';
import { filterDOMProps, mergeProps, mergeStyleProps } from '../../utils';
import { type SpiritInputAddonProps } from './types';
import { useInputAddonStyleProps } from './useInputAddonStyleProps';

const defaultProps: Partial<SpiritInputAddonProps> = {
  elementType: 'div',
  size: Sizes.MEDIUM,
};

const InputAddon = <E extends ElementType = 'div'>(props: SpiritInputAddonProps<E>) => {
  const formFieldsProps = useContext(FormFieldsContext) ?? {};
  const mergedProps = useContextProps<WithFormFieldContext<SpiritInputAddonProps<E>>>(props, 'inputAddon');
  const propsWithDefaults = mergeProps(defaultProps, formFieldsProps, mergedProps);
  const { classProps, props: modifiedProps } = useInputAddonStyleProps(propsWithDefaults as SpiritInputAddonProps<E>);
  const { children, elementType, ...restProps } = modifiedProps;
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const Component = (elementType || defaultProps.elementType) as ElementType;
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...filterDOMProps(otherProps)} {...mergedStyleProps}>
      {children}
    </Component>
  );
};

InputAddon.spiritComponent = 'InputAddon';
InputAddon.displayName = 'InputAddon';

export default InputAddon;
