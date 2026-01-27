import type { ElementType, JSXElementConstructor, ReactNode } from 'react';
import type { ChildrenProps, RequiredProps, SpiritPolymorphicElementPropsWithRef, StyleProps } from './shared';

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

export type PricingPlanProps<E extends ElementType> = {
  /**
   * The HTML element or React element used to render the plan, e.g. 'div', 'a', or `RouterLink`.
   *
   * @default 'article'
   */
  elementType?: E | JSXElementConstructor<unknown>;
};

export type SpiritPricingPlanProps<E extends ElementType = 'article'> = PricingPlanProps<E> &
  PricingPlanBaseProps &
  SpiritPolymorphicElementPropsWithRef<E, PricingPlanProps<E>>;
export type SpiritPricingPlanHeaderProps<E extends ElementType = 'header'> = PricingPlanProps<E> &
  PricingPlanHeaderBaseProps &
  Omit<SpiritPolymorphicElementPropsWithRef<E, PricingPlanProps<E>>, 'title'>;
export type SpiritPricingPlanBodyProps<E extends ElementType = 'div'> = PricingPlanProps<E> &
  PricingPlanBodyBaseProps &
  SpiritPolymorphicElementPropsWithRef<E, PricingPlanProps<E>>;
export type SpiritPricingPlanFooterProps<E extends ElementType = 'footer'> = PricingPlanProps<E> &
  StyleProps &
  ChildrenProps &
  SpiritPolymorphicElementPropsWithRef<E, PricingPlanProps<E>>;
