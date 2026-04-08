import classNames from 'classnames';
import { type ElementType } from 'react';
import { CLASS_NAME_OPEN } from '../../constants';
import { useClassNamePrefix } from '../../hooks';

export interface CollapseStyles {
  /** className props */
  classProps: {
    root: string;
    content: string;
  };
  /** style props */
  styleProps?: {
    height?: string | number;
  };
}

export const useCollapseStyleProps = (
  isOpen: boolean,
  elementType: ElementType,
  collapseHeight?: string,
): CollapseStyles => {
  const collapseClass = useClassNamePrefix('Collapse');
  const collapseContentClass = `${collapseClass}__content`;
  const openClass = isOpen ? CLASS_NAME_OPEN : '';
  // For span elements, don't use height-based transitions as they use display: none/inline
  const isSpanElement = elementType === 'span';
  const styleProps = isSpanElement ? {} : { height: isOpen ? collapseHeight : 0 };

  return {
    classProps: {
      root: classNames(collapseClass, openClass),
      content: collapseContentClass,
    },
    styleProps,
  };
};
