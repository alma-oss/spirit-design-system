'use client';

import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import type { SpiritPricingPlanFooterProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { usePricingPlanStyleProps } from './usePricingPlanStyleProps';

const PricingPlanFooter = <E extends ElementType = 'footer'>(props: SpiritPricingPlanFooterProps<E>) => {
  const { children, elementType: ElementTag = 'footer', ...restProps } = props;

  const { classProps, props: modifiedProps } = usePricingPlanStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.footer, styleProps });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps}>
      {children}
    </ElementTag>
  );
};

PricingPlanFooter.spiritComponent = 'PricingPlanFooter';

export default PricingPlanFooter;
