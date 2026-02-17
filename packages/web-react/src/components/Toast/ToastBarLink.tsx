'use client';

import React, { type ElementType, type ReactNode, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type PolymorphicComponent, type PolymorphicRef, type ToastLinkProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useToastBarStyleProps } from './useToastBarStyleProps';

const defaultProps: Partial<ToastLinkProps> = {
  elementType: 'a',
};

const _ToastBarLink = <E extends ElementType = 'a'>(props: ToastLinkProps, ref: PolymorphicRef<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType, children, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps } = useToastBarStyleProps({ ...restProps });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.link, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children as ReactNode}
    </Component>
  );
};

const ToastBarLink = forwardRef<HTMLAnchorElement, ToastLinkProps>(_ToastBarLink) as unknown as PolymorphicComponent<
  'a',
  ToastLinkProps
>;

ToastBarLink.spiritComponent = 'ToastBarLink';
ToastBarLink.displayName = 'ToastBarLink';

export default ToastBarLink;
