'use client';

import classNames from 'classnames';
import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { ITEM_SELECTION_DECORATOR_BOTH, ITEM_SELECTION_DECORATOR_ICON, type SpiritItemProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { HelperText } from '../Field';
import { Icon } from '../Icon';
import { useItemStyleProps } from './useItemStyleProps';

const Item = <E extends ElementType = 'button'>(props: SpiritItemProps<E>): JSX.Element => {
  const {
    label,
    elementType: ElementTag = 'button',
    iconName,
    helperText,
    isSelected,
    isDisabled,
    selectionDecorator = ITEM_SELECTION_DECORATOR_ICON,
    ...restProps
  } = props;
  const { classProps, props: modifiedProps } = useItemStyleProps({
    isSelected,
    isDisabled,
    selectionDecorator,
    ...restProps,
  });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.root, styleProps, otherProps });

  const showSelectedIcon =
    isSelected &&
    (selectionDecorator === ITEM_SELECTION_DECORATOR_ICON || selectionDecorator === ITEM_SELECTION_DECORATOR_BOTH);

  return (
    <ElementTag {...otherProps} {...mergedStyleProps} disabled={!!isDisabled && ElementTag === 'button'}>
      {iconName && (
        <span className={classNames(classProps.icon.root, classProps.icon.start)}>
          <Icon name={iconName} />
        </span>
      )}
      <span className={classProps.label}>{label}</span>
      <HelperText UNSAFE_className={classProps.helperText} elementType="span" helperText={helperText} />
      {showSelectedIcon && (
        <span className={classNames(classProps.icon.root, classProps.icon.end)}>
          <Icon name="check-plain" />
        </span>
      )}
    </ElementTag>
  );
};

Item.spiritComponent = 'Item';

export default Item;
