'use client';

import React, { type ElementType } from 'react';
import { Emphasis, SizesExtended, TextStyleProps } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type SpiritTextProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useTextStyleProps } from './useTextStyleProps';

const defaultProps: Partial<SpiritTextProps> = {
  elementType: 'p',
  emphasis: Emphasis.REGULAR,
  size: SizesExtended.MEDIUM,
};

const Text = <E extends ElementType = 'p', S = void, Emph = void, C = void>(
  props: SpiritTextProps<E, S, Emph, C>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType: ElementTag = 'p', children, ...restProps } = propsWithDefaults;
  const { classProps, props: modifiedProps } = useTextStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps, {
    isTextBalanced: TextStyleProps.isTextBalanced,
    textAlignment: TextStyleProps.textAlignment,
    textHyphens: TextStyleProps.textHyphens,
    textWordBreak: TextStyleProps.textWordBreak,
  });
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps, styleProps, otherProps });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps}>
      {children}
    </ElementTag>
  );
};

Text.spiritComponent = 'Text';

export default Text;
