import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks/useClassNamePrefix';
import { ITEM_SELECTION_DECORATOR_BACKGROUND, ITEM_SELECTION_DECORATOR_BOTH, type ItemStyleProps } from '../../types';

export interface ItemStyles {
  /** className props */
  classProps: {
    helperText: string;
    icon: {
      root: string;
      start: string;
      end: string;
    };
    label: string;
    root: string;
  };
  /** props to be passed to the element */
  props: ItemStyleProps;
}

export function useItemStyleProps<P extends ItemStyleProps>(props: P): ItemStyles {
  const { isDisabled, isSelected, selectionDecorator, ...restProps } = props;
  const itemClass = useClassNamePrefix('Item');
  const itemDisabledClass = `${itemClass}--disabled`;
  const itemSelectedClass = `${itemClass}--selected`;
  const itemHelperTextClass = `${itemClass}__helperText`;
  const itemLabelClass = `${itemClass}__label`;
  const itemIconClass = `${itemClass}__icon`;
  const itemIconStartClass = `${itemIconClass}--start`;
  const itemIconEndClass = `${itemIconClass}--end`;

  const showSelectedBackground =
    isSelected &&
    (selectionDecorator === ITEM_SELECTION_DECORATOR_BACKGROUND ||
      selectionDecorator === ITEM_SELECTION_DECORATOR_BOTH);

  return {
    classProps: {
      helperText: itemHelperTextClass,
      icon: {
        root: itemIconClass,
        start: itemIconStartClass,
        end: itemIconEndClass,
      },
      label: itemLabelClass,
      root: classNames(itemClass, {
        [itemDisabledClass]: isDisabled,
        [itemSelectedClass]: showSelectedBackground,
      }),
    },
    props: restProps,
  };
}
