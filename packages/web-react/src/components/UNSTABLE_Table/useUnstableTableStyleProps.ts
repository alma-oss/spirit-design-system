import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritTableProps } from './types';

export interface TableStyles<T> {
  classProps: {
    root: string;
  };
  props: T;
}

export const useUnstableTableStyleProps = (props: SpiritTableProps): TableStyles<SpiritTableProps> => {
  const {
    isStriped = false,
    isBordered = false,
    isCompact = false,
    isHoverable = false,
    isResponsive = false,
    ...restProps
  } = props;

  const tableClass = useClassNamePrefix('UNSTABLE_Table');
  const tableStripedClass = `${tableClass}--striped`;
  const tableBorderedClass = `${tableClass}--bordered`;
  const tableCompactClass = `${tableClass}--compact`;
  const tableHoverableClass = `${tableClass}--hoverable`;
  const tableResponsiveClass = `${tableClass}--responsive`;

  const rootClass = classNames(tableClass, {
    [tableStripedClass]: isStriped,
    [tableBorderedClass]: isBordered,
    [tableCompactClass]: isCompact,
    [tableHoverableClass]: isHoverable,
    [tableResponsiveClass]: isResponsive,
  });

  return {
    classProps: {
      root: rootClass,
    },
    props: restProps,
  };
};
