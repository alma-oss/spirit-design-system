'use client';

import React, { forwardRef, type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type HiddenProps, type PolymorphicRef, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';

const defaultProps = {
  elementType: 'span' as const,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_Hidden'] }] */
const _Hidden = <T extends ElementType = 'span'>(
  props: HiddenProps<T>,
  ref: PolymorphicRef<T>,
) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType, children, on, from, ...restProps } = propsWithDefaults;

  const Component = elementType as React.ElementType;

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

const Hidden = forwardRef(_Hidden) as unknown as (<T extends ElementType = 'span'>(
  props: HiddenProps<T> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

Hidden.spiritComponent = 'Hidden';
Hidden.displayName = 'Hidden';

export default Hidden;
