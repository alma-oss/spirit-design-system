'use client';

import React, { type ElementType, useContext } from 'react';
import { SizesExtended } from '../../constants';
import {
  ContextPropsProvider,
  InlineElementsContext,
  ListItemsContext,
  UniversalProvider,
  useContextProps,
} from '../../context';
import { useStyleProps } from '../../hooks';
import { type SpiritItemProps } from '../../types';
import { filterDOMProps, mergeProps, mergeStyleProps } from '../../utils';
import { useItemStyleProps } from './useItemStyleProps';

const defaultProps: Partial<SpiritItemProps> = {
  elementType: 'div',
  size: SizesExtended.MEDIUM,
};

const Item = <E extends ElementType = 'div'>(props: SpiritItemProps<E>): JSX.Element => {
  const listItemsProps = useContext(ListItemsContext) ?? {};
  const mergedProps = useContextProps<Partial<SpiritItemProps<E>>>(props, 'item');
  const propsWithDefaults = mergeProps(defaultProps, listItemsProps, mergedProps);
  const { children, elementType, endSlot, isDisabled, isSelected, size, startSlot, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps } = useItemStyleProps({
    isSelected,
    isDisabled,
    size,
    ...restProps,
  });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.root, styleProps, otherProps });

  return (
    <ContextPropsProvider
      value={{
        isDisabled,
        label: { isStretched: true, size },
      }}
    >
      <UniversalProvider values={[[InlineElementsContext, { elementType: 'span' }]]}>
        <Component
          {...filterDOMProps(otherProps)}
          {...mergedStyleProps}
          disabled={!!isDisabled && Component === 'button'}
        >
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
      </UniversalProvider>
    </ContextPropsProvider>
  );
};

Item.spiritComponent = 'Item';
Item.displayName = 'Item';

export default Item;
