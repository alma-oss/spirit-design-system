import classNames from 'classnames';
import { useAlignmentClass, useClassNamePrefix } from '../../hooks';
import {
  type CardAlignmentXType,
  type CardAlignmentYType,
  type CardDirectionType,
  type CardSizesDictionaryType,
} from '../../types';
import { generateStylePropsClassNames, stringOrObjectKebabCaseToCamelCase } from '../../utils';

export interface UseCardStyleProps {
  alignmentY?: CardAlignmentYType;
  artworkAlignmentX?: CardAlignmentXType;
  direction?: CardDirectionType;
  footerAlignmentX?: CardAlignmentXType;
  hasFilledHeight?: boolean;
  isBoxed?: boolean;
  isExpanded?: boolean;
  isHeading?: boolean;
  isSelectable?: boolean;
  size?: CardSizesDictionaryType;
}

export interface UseCardStylePropsReturn {
  /** className props */
  classProps: {
    artwork: string;
    body: string;
    eyebrow: string;
    footer: string;
    link: string;
    logo: string;
    media: string;
    mediaCanvas: string;
    root: string;
    title: string;
  };
}

export function useCardStyleProps(props?: UseCardStyleProps): UseCardStylePropsReturn {
  const {
    alignmentY,
    artworkAlignmentX,
    direction,
    footerAlignmentX,
    hasFilledHeight,
    isBoxed,
    isExpanded,
    isHeading,
    isSelectable,
    size,
  } = props || {};
  const cardClass = useClassNamePrefix('Card');
  const artworkClass = `${cardClass}Artwork`;
  const bodyClass = `${cardClass}Body`;
  const eyebrowClass = `${cardClass}Eyebrow`;
  const footerClass = `${cardClass}Footer`;
  const linkClass = `${cardClass}Link`;
  const logoClass = `${cardClass}Logo`;
  const mediaClass = `${cardClass}Media`;
  const titleClass = `${cardClass}Title`;

  const bodyIsSelectableClass = `${bodyClass}--selectable`;

  const isBoxedClass = `${cardClass}--boxed`;
  const mediaCanvasClass = `${mediaClass}__canvas`;
  const mediaHasFilledHeightClass = `${mediaClass}--filledHeight`;
  const mediaIsExpandedClass = `${mediaClass}--expanded`;
  const mediaSizeClass = size ? `${mediaClass}--${size}` : '';
  const titleHeadingClass = `${titleClass}--heading`;

  return {
    classProps: {
      artwork: classNames(artworkClass, {
        [useAlignmentClass(artworkClass, artworkAlignmentX!, 'alignmentX')]: artworkAlignmentX,
      }),
      body: classNames(bodyClass, {
        [bodyIsSelectableClass]: isSelectable,
      }),
      eyebrow: eyebrowClass,
      footer: classNames(footerClass, {
        [useAlignmentClass(footerClass, footerAlignmentX!, 'alignmentX')]: footerAlignmentX,
      }),
      link: linkClass,
      logo: logoClass,
      media: classNames(mediaClass, mediaSizeClass, {
        [mediaIsExpandedClass]: isExpanded,
        [mediaHasFilledHeightClass]: hasFilledHeight,
      }),
      mediaCanvas: mediaCanvasClass,
      root: classNames(cardClass, {
        [useAlignmentClass(cardClass, alignmentY!, 'alignmentY')]: alignmentY,
        [generateStylePropsClassNames(cardClass, stringOrObjectKebabCaseToCamelCase(direction!))]: direction,
        [isBoxedClass]: isBoxed,
      }),
      title: classNames(titleClass, {
        [titleHeadingClass]: isHeading,
      }),
    },
  };
}
