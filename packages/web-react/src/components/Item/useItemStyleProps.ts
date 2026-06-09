import classNames from 'classnames';
import { CLASS_NAME_DISABLED } from '../../constants';
import { useAlignmentClass } from '../../hooks';
import { useClassNamePrefix } from '../../hooks/useClassNamePrefix';
import { type ItemAlignmentYType, type ItemStyleProps } from '../../types';
import { getColorSchemeClassName } from '../../utils';

export interface ItemStyles {
  /** className props */
  classProps: {
    content: string;
    root: string;
    slot: string;
  };
  /** props to be passed to the element */
  props: ItemStyleProps;
}

export function useItemStyleProps<P extends ItemStyleProps>(props: P): ItemStyles {
  const { alignmentY, isDisabled, isSelected, ...restProps } = props;
  const itemClass = useClassNamePrefix('Item');
  const itemSelectedColorSchemeClass = getColorSchemeClassName({ color: 'selected', isSubtle: true });
  const itemContentClass = `${itemClass}__content`;
  const itemSlotClass = `${itemClass}__slot`;

  return {
    classProps: {
      content: itemContentClass,
      root: classNames(itemClass, {
        [useAlignmentClass(itemClass, alignmentY as ItemAlignmentYType, 'alignmentY')]: alignmentY,
        [CLASS_NAME_DISABLED]: isDisabled,
        [itemSelectedColorSchemeClass]: isSelected,
      }),
      slot: itemSlotClass,
    },
    props: restProps,
  };
}
