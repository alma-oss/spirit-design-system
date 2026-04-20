'use client';

import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import type { SpiritPricingPlanFooterProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { usePricingPlanStyleProps } from './usePricingPlanStyleProps';

const defaultProps: Partial<SpiritPricingPlanFooterProps> = {
  elementType: 'footer',
};

const PricingPlanFooter = <E extends ElementType = 'footer'>(props: SpiritPricingPlanFooterProps<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, elementType, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps } = usePricingPlanStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.footer, styleProps });

  return (
    <Component {...otherProps} {...mergedStyleProps}>
      {children}
    </Component>
  );
};

PricingPlanFooter.spiritComponent = 'PricingPlanFooter';

export default PricingPlanFooter;
