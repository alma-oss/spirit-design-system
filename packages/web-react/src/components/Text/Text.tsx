'use client';

import React, { type ElementType } from 'react';
import { Emphasis, SizesExtended, TextStyleProps } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type SpiritTextProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useTextStyleProps } from './useTextStyleProps';

const defaultProps: Partial<SpiritTextProps<ElementType, void, void, void>> = {
  elementType: 'p',
  emphasis: Emphasis.REGULAR,
  size: SizesExtended.MEDIUM,
};

const Text = <E extends ElementType = 'p', S = void, Emph = void, C = void>(
  props: SpiritTextProps<E, S, Emph, C>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps } = useTextStyleProps(restProps);
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

Text.spiritComponent = 'Text';
Text.displayName = 'Text';

export default Text;
