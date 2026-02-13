'use client';

import React, { type ElementType, forwardRef } from 'react';
import { ShapeVariants } from '../../constants';
import { useStyleProps } from '../../hooks';
import {
  type NavigationActionProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritNavigationActionProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { useNavigationActionProps } from './useNavigationActionProps';
import { useNavigationStyleProps } from './useNavigationStyleProps';

const defaultProps: Partial<SpiritNavigationActionProps> = {
  elementType: 'a',
  variant: ShapeVariants.BOX,
};

const _NavigationAction = <E extends ElementType = 'a'>(
  props: SpiritNavigationActionProps<E>,
  ref: PolymorphicRef<E>,
) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType as ElementType, children, ...restProps } = propsWithDefaults;
  const ElementTag = propsWithDefaults.isDisabled ? 'span' : elementType;

  const { navigationActionProps } = useNavigationActionProps(propsWithDefaults);
  const { classProps, props: modifiedProps } = useNavigationStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.action, styleProps, otherProps });

  return (
    <ElementTag {...otherProps} {...navigationActionProps} {...mergedStyleProps} ref={ref}>
      {children}
    </ElementTag>
  );
};

const NavigationAction = forwardRef<HTMLAnchorElement, SpiritNavigationActionProps<'a'>>(
  _NavigationAction,
) as unknown as PolymorphicComponent<'a', NavigationActionProps<ElementType>>;

NavigationAction.spiritComponent = 'NavigationAction';
NavigationAction.displayName = 'NavigationAction';

export default NavigationAction;
