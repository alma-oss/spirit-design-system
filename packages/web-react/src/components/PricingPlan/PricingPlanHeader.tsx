'use client';

import classNames from 'classnames';
import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import type { SpiritPricingPlanHeaderProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { usePricingPlanStyleProps } from './usePricingPlanStyleProps';

const defaultProps: Partial<SpiritPricingPlanHeaderProps> = {
  action: undefined,
  badge: undefined,
  elementType: 'header',
  note: undefined,
  price: undefined,
  subtitle: undefined,
  title: undefined,
};

const PricingPlanHeader = <E extends ElementType = 'header'>(props: SpiritPricingPlanHeaderProps<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps } = usePricingPlanStyleProps(restProps);
  const { badge, title, subtitle, price, action, note } = propsWithDefaults;
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps: classProps.header.root,
    styleProps,
  });

  return (
    <Component {...otherProps} {...mergedStyleProps}>
      {badge && <div className={classProps.header.badge}>{badge}</div>}
      <div className={classProps.header.content}>
        {title && <h3 className={classProps.header.title}>{title}</h3>}
        {subtitle && <div className={classNames(classProps.header.subtitle)}>{subtitle}</div>}
        {price && <div className={classProps.header.price}>{price}</div>}
        {action && <div className={classProps.header.action}>{action}</div>}
        {note && <div className={classProps.header.note}>{note}</div>}
      </div>
    </Component>
  );
};

PricingPlanHeader.spiritComponent = 'PricingPlanHeader';

export default PricingPlanHeader;
