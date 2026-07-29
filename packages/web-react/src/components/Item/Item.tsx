'use client';

import React, { type ElementType, useContext } from 'react';
import {
  InlineElementsContext,
  ListItemsContext,
  ContextPropsProvider,
  UniversalProvider,
  useContextProps,
} from '../../context';
import { useStyleProps } from '../../hooks';
import { type SpiritItemProps } from '../../types';
import { filterDOMProps, mergeStyleProps } from '../../utils';
import { useItemStyleProps } from './useItemStyleProps';

const defaultProps: Partial<SpiritItemProps> = {
  elementType: 'div',
};

const Item = <E extends ElementType = 'div'>(props: SpiritItemProps<E>): JSX.Element => {
  const mergedProps = useContextProps<Partial<SpiritItemProps<E>>>(props, 'item');
  const propsWithDefaults = mergeProps(defaultProps, listItemsProps, mergedProps);
  const { children, elementType, endSlot, isDisabled, isSelected, startSlot, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps } = useItemStyleProps({
    isSelected,
    isDisabled,
    ...restProps,
  });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.root, styleProps, otherProps });

  return (
    <ContextPropsProvider
      value={{
        isDisabled,
        label: { isStretched: true },
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
