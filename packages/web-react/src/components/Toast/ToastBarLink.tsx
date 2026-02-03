'use client';

import React, { type ElementType, type ForwardedRef, type ReactNode, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type ToastLinkProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useToastBarStyleProps } from './useToastBarStyleProps';

const defaultProps: Partial<ToastLinkProps> = {
  elementType: 'a',
};

const _ToastBarLink = (props: ToastLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType: ElementTag = defaultProps.elementType as ElementType,
    children,
    ...restProps
  } = propsWithDefaults;
  const { classProps, props: modifiedProps } = useToastBarStyleProps({ ...restProps });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.link, styleProps, otherProps });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps} ref={ref}>
      {children as ReactNode}
    </ElementTag>
  );
};

const ToastBarLink = forwardRef<HTMLAnchorElement, ToastLinkProps>(_ToastBarLink);

ToastBarLink.spiritComponent = 'ToastBarLink';

export default ToastBarLink;
