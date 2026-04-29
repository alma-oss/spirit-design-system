import type { ElementType, ReactNode } from 'react';
import type { ChildrenProps, PolymorphicComponentProps, RequiredProps, StyleProps } from './shared';

export interface PricingPlanBaseProps extends ChildrenProps, StyleProps {
  /** If pricing plan has comparable features  */
  hasComparableFeatures?: boolean;
  /** If pricing plan is highlighted */
  isHighlighted?: boolean;
  /** Number of grid rows in the plan layout */
  rows?: number;
}

export interface PricingPlanHeaderBaseProps extends StyleProps {
  /** Action element, e.g. a button or link */
  action?: ReactNode;
  /** Badge text or element */
  badge?: ReactNode;
  /** Note or additional information */
  note?: string;
  /** Price of the plan */
  price?: string;
  /** Subtitle of the plan */
  subtitle?: string;
  /** Title of the plan */
  title?: ReactNode;
}

export type PricingPlanFeature = {
  description?: string | ReactNode;
  modalContent?: string | ReactNode;
  title: string;
  tooltipContent?: string | ReactNode;
};

export interface PricingPlanBodyBaseProps extends StyleProps, RequiredProps {
  /** Description of the plan body */
  description?: string;
  /** Features of the plan body */
  features?: PricingPlanFeature[];
}

export interface PricingPlanFooterBaseProps extends StyleProps, ChildrenProps {}

/** ===== PUBLIC API ===== */
export type SpiritPricingPlanProps<E extends ElementType = 'article'> = PolymorphicComponentProps<
  E,
  PricingPlanBaseProps
>;
export type SpiritPricingPlanHeaderProps<E extends ElementType = 'header'> = PolymorphicComponentProps<
  E,
  PricingPlanHeaderBaseProps
>;
export type SpiritPricingPlanBodyProps<E extends ElementType = 'div'> = PolymorphicComponentProps<
  E,
  PricingPlanBodyBaseProps
>;
export type SpiritPricingPlanFooterProps<E extends ElementType = 'footer'> = PolymorphicComponentProps<
  E,
  PricingPlanFooterBaseProps
>;
