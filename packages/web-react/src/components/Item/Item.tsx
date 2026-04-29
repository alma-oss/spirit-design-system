'use client';

import classNames from 'classnames';
import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { ITEM_SELECTION_DECORATOR_BOTH, ITEM_SELECTION_DECORATOR_ICON, type SpiritItemProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { HelperText } from '../Field';
import { Icon } from '../Icon';
import { useItemStyleProps } from './useItemStyleProps';

const defaultProps: Partial<SpiritItemProps> = {
  elementType: 'button',
  selectionDecorator: ITEM_SELECTION_DECORATOR_ICON,
};

const Item = <E extends ElementType = 'button'>(props: SpiritItemProps<E>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, helperText, iconName, isDisabled, isSelected, label, selectionDecorator, ...restProps } =
    propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps } = useItemStyleProps({
    isSelected,
    isDisabled,
    selectionDecorator,
    ...restProps,
  });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.root, styleProps, otherProps });

  const showSelectedIcon =
    isSelected &&
    (selectionDecorator === ITEM_SELECTION_DECORATOR_ICON || selectionDecorator === ITEM_SELECTION_DECORATOR_BOTH);

  return (
    <Component {...otherProps} {...mergedStyleProps} disabled={!!isDisabled && Component === 'button'}>
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
    </Component>
  );
};

Item.spiritComponent = 'Item';
Item.displayName = 'Item';

export default Item;
