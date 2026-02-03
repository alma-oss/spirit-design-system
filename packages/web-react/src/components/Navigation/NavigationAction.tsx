'use client';

import React, { type ElementType, type ReactElement, forwardRef } from 'react';
import { ShapeVariants } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type PolymorphicRef, type SpiritNavigationActionProps } from '../../types';
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
): ReactElement => {
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

const NavigationAction = forwardRef<HTMLElement, SpiritNavigationActionProps<ElementType>>(_NavigationAction);

NavigationAction.spiritComponent = 'NavigationAction';

export default NavigationAction;
