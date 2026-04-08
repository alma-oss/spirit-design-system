import { cssVariablePrefix } from '@alma-oss/spirit-design-tokens';
import classNames from 'classnames';
import type { CSSProperties, ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import type {
  SpiritPricingPlanBodyProps,
  SpiritPricingPlanFooterProps,
  SpiritPricingPlanHeaderProps,
  SpiritPricingPlanProps,
} from '../../types';
import { NUMBER_OF_PLAN_ROWS_DEFAULT } from './constants';

type PricingPlanStyleProps = Partial<SpiritPricingPlanProps<ElementType>> &
  Partial<SpiritPricingPlanHeaderProps<ElementType>> &
  Partial<SpiritPricingPlanBodyProps<ElementType>> &
  Partial<SpiritPricingPlanFooterProps<ElementType>>;

interface PricingPlanCSSProperties extends CSSProperties {
  [key: string]: string | undefined | number;
}

export interface PricingPlanReturnStyles<T> {
  classProps: {
    root: string;
    layout: string;
    header: {
      root: string;
      badge?: string;
      content: string;
      title?: string;
      subtitle?: string;
      price?: string;
      action?: string;
      note?: string;
    };
    body: {
      root: string;
      featureList: string;
      featureItem: string;
      featureTitle: string;
      featureTitleText: string;
      featureDescription: string;
    };
    footer: string;
  };
  props: Omit<T, keyof PricingPlanStyleProps>;
  styleProps: PricingPlanCSSProperties;
}

export const usePricingPlanStyleProps = <T extends PricingPlanStyleProps>(props: T): PricingPlanReturnStyles<T> => {
  const { hasComparableFeatures, isHighlighted, action, badge, title, subtitle, note, price, rows, ...restProps } =
    props;

  const pricingPlanClass = useClassNamePrefix('PricingPlan');
  const pricingPlanComparableClass = `${pricingPlanClass}--comparableFeatures`;
  const pricingPlanLayoutClass = `${pricingPlanClass}__layout`;
  const pricingPlanHighlightedClass = `${pricingPlanClass}--highlighted`;

  const pricingPlanHeaderClass = useClassNamePrefix('PricingPlanHeader');
  const pricingPlanHeaderBadgeClassName = `${pricingPlanHeaderClass}__badge`;
  const pricingPlanHeaderTitleClassName = `${pricingPlanHeaderClass}__title`;
  const pricingPlanHeaderSubtitleClassName = `${pricingPlanHeaderClass}__subtitle`;
  const pricingPlanHeaderPriceClassName = `${pricingPlanHeaderClass}__price`;
  const pricingPlanHeaderActionClassName = `${pricingPlanHeaderClass}__action`;
  const pricingPlanHeaderNoteClassName = `${pricingPlanHeaderClass}__note`;
  const pricingPlanHeaderContentClassName = `${pricingPlanHeaderClass}__content`;

  const pricingPlanBodyClass = useClassNamePrefix('PricingPlanBody');
  const pricingPlanBodyFeatureListClassName = `${pricingPlanBodyClass}__featureList`;
  const pricingPlanBodyFeatureItemClassName = `${pricingPlanBodyClass}__featureItem`;
  const pricingPlanBodyFeatureTitleClassName = `${pricingPlanBodyClass}__featureTitle`;
  const pricingPlanBodyFeatureTitleTextClassName = `${pricingPlanBodyClass}__featureTitleText`;
  const pricingPlanBodyFeatureDescriptionClassName = `${pricingPlanBodyClass}__featureDescription`;

  const pricingPlanFooterClass = useClassNamePrefix('PricingPlanFooter');

  const pricingPlanStyle: PricingPlanCSSProperties = {};

  if (rows !== NUMBER_OF_PLAN_ROWS_DEFAULT) {
    pricingPlanStyle[`--${cssVariablePrefix}pricing-plan-rows`] = rows?.toString();
  }

  return {
    classProps: {
      root: classNames(pricingPlanClass, {
        [pricingPlanComparableClass]: hasComparableFeatures,
        [pricingPlanHighlightedClass]: isHighlighted,
      }),
      layout: pricingPlanLayoutClass,
      header: {
        root: pricingPlanHeaderClass,
        badge: badge ? pricingPlanHeaderBadgeClassName : undefined,
        content: pricingPlanHeaderContentClassName,
        title: title ? pricingPlanHeaderTitleClassName : undefined,
        subtitle: subtitle ? pricingPlanHeaderSubtitleClassName : undefined,
        price: price ? pricingPlanHeaderPriceClassName : undefined,
        action: action ? pricingPlanHeaderActionClassName : undefined,
        note: note ? pricingPlanHeaderNoteClassName : undefined,
      },
      body: {
        root: pricingPlanBodyClass,
        featureList: pricingPlanBodyFeatureListClassName,
        featureItem: pricingPlanBodyFeatureItemClassName,
        featureTitle: pricingPlanBodyFeatureTitleClassName,
        featureTitleText: pricingPlanBodyFeatureTitleTextClassName,
        featureDescription: pricingPlanBodyFeatureDescriptionClassName,
      },
      footer: pricingPlanFooterClass,
    },
    props: restProps as Omit<T, keyof PricingPlanStyleProps>,
    styleProps: pricingPlanStyle,
  };
};
