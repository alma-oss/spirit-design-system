import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type ScrollViewDirectionType, type ScrollViewOverflowDecoratorsType } from '../../types';
import { SCROLL_VIEW_DEFAULT_OVERFLOW_DECORATOR } from './constants';

export interface UseScrollViewStyleProps {
  direction: ScrollViewDirectionType;
  isScrollbarDisabled?: boolean;
  isScrolledAtEnd: boolean;
  isScrolledAtStart: boolean;
  overflowDecorators: ScrollViewOverflowDecoratorsType;
}

export interface UseScrollViewStyleReturn {
  /** className props */
  classProps: {
    root: string;
    viewport: string;
    content: string;
    overflowDecorators: string;
    arrows: string;
  };
}

export const useScrollViewStyleProps = ({
  direction,
  isScrollbarDisabled,
  isScrolledAtEnd,
  isScrolledAtStart,
  overflowDecorators = SCROLL_VIEW_DEFAULT_OVERFLOW_DECORATOR,
}: Partial<UseScrollViewStyleProps>): UseScrollViewStyleReturn => {
  const scrollViewClass = useClassNamePrefix('ScrollView');
  const scrollViewDirectionClass = `${scrollViewClass}--${direction}`;
  const scrollViewScrollbarDisabledClass = `${scrollViewClass}--scrollbarDisabled`;
  const scrollViewViewportClass = `${scrollViewClass}__viewport`;
  const scrollViewContentClass = `${scrollViewClass}__content`;
  const scrollViewOverflowDecoratorsClass = `${scrollViewClass}__overflowDecorators`;
  const scrollViewOverflowDecoratorsVariantClasses = {
    shadows: `${scrollViewOverflowDecoratorsClass}--shadows`,
    borders: `${scrollViewOverflowDecoratorsClass}--borders`,
    both: classNames(`${scrollViewOverflowDecoratorsClass}--shadows`, `${scrollViewOverflowDecoratorsClass}--borders`),
  };
  const scrollViewOverflowDecoratorsVariantClass = scrollViewOverflowDecoratorsVariantClasses[overflowDecorators];
  const scrollViewAtStartClass = 'is-scrolled-at-start';
  const scrollViewAtEndClass = 'is-scrolled-at-end';
  const scrollViewArrowsClass = `${scrollViewClass}__arrows`;

  return {
    classProps: {
      root: classNames(scrollViewClass, scrollViewDirectionClass, {
        [scrollViewScrollbarDisabledClass]: isScrollbarDisabled,
        [scrollViewAtEndClass]: isScrolledAtEnd,
        [scrollViewAtStartClass]: isScrolledAtStart,
      }),
      viewport: scrollViewViewportClass,
      content: scrollViewContentClass,
      overflowDecorators: classNames(scrollViewOverflowDecoratorsClass, scrollViewOverflowDecoratorsVariantClass),
      arrows: scrollViewArrowsClass,
    },
  };
};
