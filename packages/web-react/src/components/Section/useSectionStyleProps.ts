import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SectionStyleProps } from '../../types';

export const useSectionStyleProps = (props: SectionStyleProps) => {
  const { backgroundColor } = props || {};

  const sectionBackgroundClassName = useClassNamePrefix(`bg-${backgroundColor}`);

  const sectionBackgroundColor = backgroundColor ? sectionBackgroundClassName : '';

  const classProps = classNames({
    [sectionBackgroundColor]: backgroundColor,
  });

  return {
    classProps,
  };
};
