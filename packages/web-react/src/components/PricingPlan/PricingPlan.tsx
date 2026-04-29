'use client';

import classNames from 'classnames';
import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritPricingPlanProps } from '../../types/pricingPlan';
import { mergeStyleProps } from '../../utils';
import { NUMBER_OF_PLAN_ROWS_DEFAULT } from './constants';
import { usePricingPlanStyleProps } from './usePricingPlanStyleProps';

const defaultProps: Partial<SpiritPricingPlanProps> = {
  elementType: 'article',
  hasComparableFeatures: false,
  isHighlighted: false,
  rows: NUMBER_OF_PLAN_ROWS_DEFAULT,
};

const PricingPlan = <E extends ElementType = 'article'>(props: SpiritPricingPlanProps<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps, styleProps: pricingPlanStyleProps } = usePricingPlanStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps: classProps.root,
    pricingPlanStyleProps,
    styleProps,
  });

  return (
    <Component {...otherProps} {...mergedStyleProps}>
      <div className={classNames(classProps.layout)}>{children}</div>
    </Component>
  );
};

PricingPlan.spiritComponent = 'PricingPlan';
PricingPlan.displayName = 'PricingPlan';

export default PricingPlan;
