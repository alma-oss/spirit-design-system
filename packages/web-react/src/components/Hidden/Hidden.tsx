'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type HiddenBaseProps, type HiddenProps, type PolymorphicComponent, type PolymorphicRef } from '../../types';
import { mergeStyleProps } from '../../utils';

const defaultProps = {
  elementType: 'span',
};

const _Hidden = <T extends ElementType = 'span'>(props: HiddenProps<T>, ref: PolymorphicRef<T>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType, children, on, from, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const stylePropsWithMapping = {
    ...restProps,
    hideOn: on || restProps.hideOn,
    hideFrom: from || restProps.hideFrom,
  };

  const { styleProps, props: otherProps } = useStyleProps(stylePropsWithMapping);
  const mergedStyleProps = mergeStyleProps(Component, { styleProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </Component>
  );
};

const Hidden = forwardRef(_Hidden) as unknown as PolymorphicComponent<'span', HiddenBaseProps>;

Hidden.spiritComponent = 'Hidden';
Hidden.displayName = 'Hidden';

export default Hidden;
