'use client';

import React, { type ElementType } from 'react';
import { PropsProvider, useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { FormFieldModes, type SpiritItemProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useItemStyleProps } from './useItemStyleProps';

const defaultProps: Partial<SpiritItemProps> = {
  elementType: 'div',
};

const Item = <E extends ElementType = 'div'>(props: SpiritItemProps<E>): JSX.Element => {
  const { elementType: propsElementType } = props;
  const contextProps = useContextProps(props);
  const {
    children,
    elementType: contextElementType,
    endSlot,
    isDisabled,
    isSelected,
    startSlot,
    ...restProps
  } = contextProps;
  const elementType = propsElementType ?? contextElementType ?? defaultProps.elementType;
  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps } = useItemStyleProps({
    isSelected,
    isDisabled,
    ...restProps,
  });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.root, styleProps, otherProps });

  return (
    <PropsProvider value={{ elementType: 'span', formFieldMode: FormFieldModes.ITEM, isDisabled }}>
      <Component {...otherProps} {...mergedStyleProps} disabled={!!isDisabled && Component === 'button'}>
        {startSlot && (
          <span className={classProps.slot} role="presentation">
            {startSlot}
          </span>
        )}
        <span className={classProps.content} role="presentation">
          {children}
        </span>
        {endSlot && (
          <span className={classProps.slot} role="presentation">
            {endSlot}
          </span>
        )}
      </Component>
    </PropsProvider>
  );
};

Item.spiritComponent = 'Item';
Item.displayName = 'Item';

export default Item;
