'use client';

import React, { type ElementType } from 'react';
import { Sizes, TextStyleProps } from '../../constants';
import { useStyleProps } from '../../hooks';
import { mergeStyleProps } from '../../utils';
import { type SpiritActionTextProps } from './types';
import { useActionTextStyleProps } from './useActionTextStyleProps';

const defaultProps: Partial<SpiritActionTextProps> = {
  elementType: 'span',
  size: Sizes.MEDIUM,
};

const ActionText = <E extends ElementType = 'span', C = void>(props: SpiritActionTextProps<E, C>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps } = useActionTextStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps, {
    isTextBalanced: TextStyleProps.isTextBalanced,
    textAlignment: TextStyleProps.textAlignment,
    textHyphens: TextStyleProps.textHyphens,
    textWordBreak: TextStyleProps.textWordBreak,
  });
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps}>
      {children}
    </Component>
  );
};

ActionText.spiritComponent = 'ActionText';
ActionText.displayName = 'ActionText';

export default ActionText;
