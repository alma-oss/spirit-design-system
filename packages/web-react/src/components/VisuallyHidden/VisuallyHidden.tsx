'use client';

import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritVisuallyHiddenProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useVisuallyHiddenProps } from './useVisuallyHiddenProps';

const defaultProps: Partial<SpiritVisuallyHiddenProps> = {
  elementType: 'span',
};

const VisuallyHidden = <E extends ElementType = 'span'>(props: SpiritVisuallyHiddenProps<E>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, elementType, ...rest } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps } = useVisuallyHiddenProps(rest);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps}>
      {children}
    </Component>
  );
};

VisuallyHidden.spiritComponent = 'VisuallyHidden';
VisuallyHidden.displayName = 'VisuallyHidden';

export default VisuallyHidden;
