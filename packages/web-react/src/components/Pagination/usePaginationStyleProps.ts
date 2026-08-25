import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';

export interface UsePaginationStyleProps {
  isCurrent?: boolean;
  isDisabled?: boolean;
}

export interface UsePaginationStyleReturn {
  /** className props */
  classProps: {
    root: string;
    item: string;
    link: string;
  };
}

export const usePaginationStyleProps = (props?: UsePaginationStyleProps): UsePaginationStyleReturn => {
  const paginationClass = useClassNamePrefix('Pagination');
  const paginationItemClass = `${paginationClass}__item`;
  const paginationLinkClass = `${paginationClass}__link`;
  const paginationLinkCurrentClass = `${paginationLinkClass}--current`;
  const paginationLinkDisabledClass = `${paginationLinkClass}--disabled`;

  return {
    classProps: {
      root: paginationClass,
      item: paginationItemClass,
      link: classNames(paginationLinkClass, {
        [paginationLinkCurrentClass]: props?.isCurrent,
        [paginationLinkDisabledClass]: props?.isDisabled,
      }),
    },
  };
};
