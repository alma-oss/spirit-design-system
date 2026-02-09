'use client';

import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import type { SpiritPricingPlanBodyProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import PricingPlanFeatureTitle from './PricingPlanFeatureTitle';
import { usePricingPlanStyleProps } from './usePricingPlanStyleProps';

const defaultProps: Partial<SpiritPricingPlanBodyProps> = {
  description: undefined,
  features: [],
};

const PricingPlanBody = <E extends ElementType = 'div'>(props: SpiritPricingPlanBodyProps<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };

  const { description, elementType: ElementTag = 'div', features = [], id, ...restProps } = propsWithDefaults;
  const { classProps, props: modifiedProps } = usePricingPlanStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, {
    classProps: classProps.body.root,
    styleProps,
  });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps}>
      {description && <div>{description}</div>}
      <ul className={classProps.body.featureList}>
        {features.map((feature, featureIndex) => {
          const featureItemKey = `featureItem-${featureIndex}`;
          const featureId = `${id}-feature-${featureIndex}`;

          return (
            <li className={classProps.body.featureItem} key={featureItemKey}>
              <PricingPlanFeatureTitle feature={feature} featureId={featureId} />
              <div className={classProps.body.featureDescription}>{feature.description}</div>
            </li>
          );
        })}
      </ul>
    </ElementTag>
  );
};

PricingPlanBody.spiritComponent = 'PricingPlanBody';

export default PricingPlanBody;
