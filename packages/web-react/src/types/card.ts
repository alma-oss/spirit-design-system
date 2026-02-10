import { type ElementType, type JSXElementConstructor } from 'react';
import { type ObjectFit, Sizes } from '../constants';
import {
  type AlignmentXDictionaryType,
  type AlignmentYDictionaryType,
  type BackgroundAccentColorsType,
  type BackgroundColorsDictionaryType,
  type BackgroundEmotionColorsType,
  type ChildrenProps,
  type DirectionExtendedDictionaryType,
  type SingleOrResponsive,
  type StyleProps,
  type TransferProps,
} from './shared';

export const CardSizes = {
  ...Sizes,
  AUTO: 'auto',
} as const;

export type CardSizesDictionaryKeys = keyof typeof CardSizes;
export type CardSizesDictionaryType<T = undefined> = (typeof CardSizes)[CardSizesDictionaryKeys] | T;

export type CardAlignmentXType = SingleOrResponsive<NonNullable<AlignmentXDictionaryType>>;

export type CardAlignmentYType = SingleOrResponsive<NonNullable<AlignmentYDictionaryType>>;

export interface CardElementTypeProps<T extends ElementType = 'article'> {
  /**
   * The HTML element or React element used to render the Card, e.g. 'div'.
   *
   * @default 'article'
   */
  elementType?: T | JSXElementConstructor<unknown>;
}

// Card types
export type CardDirectionType =
  | NonNullable<DirectionExtendedDictionaryType>
  | { [key: string]: NonNullable<DirectionExtendedDictionaryType> };

export interface CardProps<T extends ElementType = 'article'> extends CardElementTypeProps<T> {
  alignmentY?: CardAlignmentYType;
  direction?: CardDirectionType;
  isBoxed?: boolean;
}

export interface SpiritCardProps<T extends ElementType = 'article'>
  extends CardProps<T>, ChildrenProps, StyleProps, TransferProps {}

export type CardMediaBackgroundColorsType =
  | BackgroundColorsDictionaryType
  | BackgroundAccentColorsType
  | BackgroundEmotionColorsType;

export type CardMediaObjectFitType = (typeof ObjectFit)[keyof typeof ObjectFit];

export interface CardMediaProps {
  backgroundColor?: CardMediaBackgroundColorsType;
  fit?: CardMediaObjectFitType;
  hasFilledHeight?: boolean;
  isExpanded?: boolean;
  size?: CardSizesDictionaryType;
}

export interface SpiritCardMediaProps extends CardMediaProps, ChildrenProps, StyleProps, TransferProps {}

// CardLogo types
export interface SpiritCardLogoProps extends ChildrenProps, StyleProps, TransferProps {}

// CardArtwork types
export interface CardArtworkProps {
  alignmentX?: CardAlignmentXType;
}
export interface SpiritCardArtworkProps extends CardArtworkProps, ChildrenProps, StyleProps, TransferProps {}

// CardBody types
export interface CardBodyProps {
  isSelectable?: boolean;
}

export interface SpiritCardBodyProps extends CardBodyProps, ChildrenProps, StyleProps, TransferProps {}

// CardEyebrow types
export interface SpiritCardEyebrowProps extends ChildrenProps, StyleProps, TransferProps {}

// CardTitle types
export interface CardTitleProps {
  isHeading?: boolean;
}

export interface SpiritCardTitleProps<T extends ElementType = 'h4'>
  extends CardTitleProps, CardElementTypeProps<T>, ChildrenProps, StyleProps, TransferProps {}

// CardFooter types
export interface CardFooterProps {
  alignmentX?: CardAlignmentXType;
}

export interface SpiritCardFooterProps extends CardFooterProps, ChildrenProps, StyleProps, TransferProps {}

// CardLink types
export type CardLinkProps<E extends ElementType = 'a'> = {
  /**
   * The HTML element or React element used to render the Link, e.g. 'a'.
   *
   * @default 'a'
   */
  elementType?: E;
};

export type SpiritCardLinkProps<E extends ElementType = 'a'> = CardLinkProps<E> &
  ChildrenProps & {
    href: string;
  };
