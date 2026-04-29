import { type ElementType } from 'react';
import { type ObjectFit, Sizes } from '../constants';
import {
  type AlignmentXDictionaryType,
  type AlignmentYDictionaryType,
  type BackgroundAccentColorsType,
  type BackgroundColorsDictionaryType,
  type BackgroundEmotionColorsType,
  type ChildrenProps,
  type DirectionExtendedDictionaryType,
  type PolymorphicComponentProps,
  type SingleOrResponsive,
  type StyleProps,
} from './shared';

export const CardSizes = {
  ...Sizes,
  AUTO: 'auto',
} as const;

export type CardSizesDictionaryKeys = keyof typeof CardSizes;
export type CardSizesDictionaryType<C = undefined> = (typeof CardSizes)[CardSizesDictionaryKeys] | C;

export type CardAlignmentXType = SingleOrResponsive<NonNullable<AlignmentXDictionaryType>>;

export type CardAlignmentYType = SingleOrResponsive<NonNullable<AlignmentYDictionaryType>>;

// Card types
export type CardDirectionType =
  | NonNullable<DirectionExtendedDictionaryType>
  | { [key: string]: NonNullable<DirectionExtendedDictionaryType> };

/** ===== INTERNAL API ===== */
export interface CardProps extends ChildrenProps, StyleProps {
  alignmentY?: CardAlignmentYType;
  direction?: CardDirectionType;
  isBoxed?: boolean;
}

/** ===== PUBLIC API ===== */
export type SpiritCardProps<E extends ElementType = 'article'> = PolymorphicComponentProps<E, CardProps>;

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

export interface SpiritCardMediaProps extends CardMediaProps, ChildrenProps, StyleProps {}

// CardLogo types
export interface SpiritCardLogoProps extends ChildrenProps, StyleProps {}

// CardArtwork types
export interface CardArtworkProps {
  alignmentX?: CardAlignmentXType;
}
export interface SpiritCardArtworkProps extends CardArtworkProps, ChildrenProps, StyleProps {}

// CardBody types
export interface CardBodyProps {
  isSelectable?: boolean;
}

export interface SpiritCardBodyProps extends CardBodyProps, ChildrenProps, StyleProps {}

// CardEyebrow types
export interface SpiritCardEyebrowProps extends ChildrenProps, StyleProps {}

// CardTitle types
export interface CardTitleProps extends ChildrenProps, StyleProps {
  isHeading?: boolean;
}

export type SpiritCardTitleProps<E extends ElementType = 'h4'> = PolymorphicComponentProps<E, CardTitleProps>;

// CardFooter types
export interface CardFooterProps {
  alignmentX?: CardAlignmentXType;
}

export interface SpiritCardFooterProps extends CardFooterProps, ChildrenProps, StyleProps {}

// CardLink types
export interface CardLinkProps extends ChildrenProps, StyleProps {
  href?: string;
}

export type SpiritCardLinkProps<E extends ElementType = 'a'> = PolymorphicComponentProps<E, CardLinkProps>;
