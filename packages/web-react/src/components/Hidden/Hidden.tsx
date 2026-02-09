'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type HiddenProps, type PolymorphicComponent, type PolymorphicRef, type SpiritHiddenProps } from '../../types';
import { mergeStyleProps } from '../../utils';

const defaultProps = {
  elementType: 'span',
};

const _Hidden = <E extends ElementType = 'span'>(props: SpiritHiddenProps<E>, ref: PolymorphicRef<E>) => {
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

const Hidden = forwardRef(_Hidden) as unknown as PolymorphicComponent<'span', HiddenProps>;

Hidden.spiritComponent = 'Hidden';
Hidden.displayName = 'Hidden';

export default Hidden;
