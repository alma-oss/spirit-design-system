'use client';

import React, { type ElementType } from 'react';
import { PropsProvider, useContextProps } from '../../context';
import { useStyleProps } from '../../hooks';
import { type FormFieldContextValue, type SpiritItemProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useItemStyleProps } from './useItemStyleProps';

const defaultProps: Partial<SpiritItemProps> = {
  elementType: 'div',
};

const Item = <E extends ElementType = 'div'>(props: SpiritItemProps<E>): JSX.Element => {
  const mergedProps = useContextProps<Partial<Omit<FormFieldContextValue, 'elementType'> & SpiritItemProps<E>>>(
    props,
    'stackItem',
  );
  const propsWithDefaults = { ...defaultProps, ...mergedProps };
  // isRequired/validationState are discarded here so they never leak onto the DOM as raw attributes
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    children,
    elementType,
    endSlot,
    isDisabled,
    isRequired,
    isSelected,
    startSlot,
    validationState,
    ...restProps
  } = propsWithDefaults;
  /* eslint-enable @typescript-eslint/no-unused-vars */
  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps } = useItemStyleProps({
    isSelected,
    isDisabled,
    ...restProps,
  });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.root, styleProps, otherProps });

  return (
    <PropsProvider
      value={{
        isDisabled,
        inlineElements: { elementType: 'span' },
        label: { isItem: true },
      }}
    >
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
