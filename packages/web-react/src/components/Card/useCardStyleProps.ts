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

  const directionClass = generateStylePropsClassNames(cardClass, stringOrObjectKebabCaseToCamelCase(direction!));

  const isBoxedClass = `${cardClass}--boxed`;
  const mediaCanvasClass = `${mediaClass}__canvas`;
  const mediaHasFilledHeightClass = `${mediaClass}--filledHeight`;
  const mediaIsExpandedClass = `${mediaClass}--expanded`;
  const mediaSizeClass = size ? `${mediaClass}--${size}` : '';
  const titleHeadingClass = `${titleClass}--heading`;

  const artworkClasses = classNames(artworkClass, {
    [useAlignmentClass(artworkClass, artworkAlignmentX!, 'alignmentX')]: artworkAlignmentX,
  });
  const bodyClasses = classNames(bodyClass, {
    [bodyIsSelectableClass]: isSelectable,
  });
  const footerClasses = classNames(footerClass, {
    [useAlignmentClass(footerClass, footerAlignmentX!, 'alignmentX')]: footerAlignmentX,
  });
  const mediaClasses = classNames(mediaClass, mediaSizeClass, {
    [mediaIsExpandedClass]: isExpanded,
    [mediaHasFilledHeightClass]: hasFilledHeight,
  });
  const rootClasses = classNames(cardClass, {
    [useAlignmentClass(cardClass, alignmentY!, 'alignmentY')]: alignmentY,
    [directionClass]: direction,
    [isBoxedClass]: isBoxed,
  });
  const titleClasses = classNames(titleClass, {
    [titleHeadingClass]: isHeading,
  });

  return {
    classProps: {
      artwork: artworkClasses,
      body: bodyClasses,
      eyebrow: eyebrowClass,
      footer: footerClasses,
      link: linkClass,
      logo: logoClass,
      media: mediaClasses,
      mediaCanvas: mediaCanvasClass,
      root: rootClasses,
      title: titleClasses,
    },
  };
}
