'use client';

import classNames from 'classnames';
import React, { type ElementType } from 'react';
import { PropsProvider } from '../../context';
import { useStyleProps } from '../../hooks';
import {
  FormFieldTypes,
  ITEM_SELECTION_DECORATOR_BOTH,
  ITEM_SELECTION_DECORATOR_ICON,
  type SpiritItemProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { HelperText } from '../HelperText';
import { Icon } from '../Icon';
import { Label } from '../Label';
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
    <PropsProvider value={{ formFieldType: FormFieldTypes.ITEM, isDisabled }}>
      <Component {...otherProps} {...mergedStyleProps} disabled={!!isDisabled && Component === 'button'}>
        {iconName && (
          <span className={classNames(classProps.icon.root, classProps.icon.start)}>
            <Icon name={iconName} />
          </span>
        )}
        <Label elementType="span">{label}</Label>
        <HelperText elementType="span" helperText={helperText} />
        {showSelectedIcon && (
          <span className={classNames(classProps.icon.root, classProps.icon.end)}>
            <Icon name="check-plain" />
          </span>
        )}
      </Component>
    </PropsProvider>
  );
};

Item.spiritComponent = 'Item';
Item.displayName = 'Item';

export default Item;
