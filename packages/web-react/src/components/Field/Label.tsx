'use client';

import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritLabelProps } from '../../types';
import { mergeStyleProps } from '../../utils';

const defaultProps: Partial<SpiritLabelProps> = {
  elementType: 'label',
};

const Label = <E extends ElementType = 'label'>(props: SpiritLabelProps<E>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, htmlFor, for: labelFor, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, { styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} htmlFor={Component === 'label' ? labelFor || htmlFor : undefined}>
      {children}
    </Component>
  );
};

Label.spiritComponent = 'Label';
Label.displayName = 'Label';

export default Label;
