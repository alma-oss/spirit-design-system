'use client';

import classNames from 'classnames';
import React, { type ElementType } from 'react';
import { PropsProvider } from '../../context';
import { useStyleProps } from '../../hooks';
import {
  FormFieldVariants,
  ITEM_SELECTION_DECORATOR_BOTH,
  ITEM_SELECTION_DECORATOR_ICON,
  type SpiritItemProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { HelperText } from '../HelperText';
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
    <PropsProvider value={{ isDisabled, formFieldVariant: FormFieldVariants.ITEM }}>
      <ElementTag {...otherProps} {...mergedStyleProps} disabled={!!isDisabled && ElementTag === 'button'}>
        {iconName && (
          <span className={classNames(classProps.icon.root, classProps.icon.start)}>
            <Icon name={iconName} />
          </span>
        )}
        <span className={classProps.label}>{label}</span>
        <HelperText elementType="span" helperText={helperText} />
        {showSelectedIcon && (
          <span className={classNames(classProps.icon.root, classProps.icon.end)}>
            <Icon name="check-plain" />
          </span>
        )}
      </ElementTag>
    </PropsProvider>
  );
};

Item.spiritComponent = 'Item';

export default Item;
