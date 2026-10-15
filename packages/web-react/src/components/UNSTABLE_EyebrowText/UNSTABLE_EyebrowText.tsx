'use client';

import React, { type ElementType } from 'react';
import { HeadingStyleProps, TextStyleProps } from '../../constants';
import { useStyleProps } from '../../hooks';
import { mergeStyleProps } from '../../utils';
import { type SpiritEyebrowTextProps } from './types';
import { useEyebrowTextStyleProps } from './useEyebrowTextStyleProps';

const defaultProps: Partial<SpiritEyebrowTextProps<ElementType>> = {
  elementType: 'p',
};

const UNSTABLE_EyebrowText = <E extends ElementType = 'p', C = void>(
  props: SpiritEyebrowTextProps<E, C>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps } = useEyebrowTextStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps, {
    isTextBalanced: HeadingStyleProps.isTextBalanced,
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

UNSTABLE_EyebrowText.spiritComponent = 'UNSTABLE_EyebrowText';
UNSTABLE_EyebrowText.displayName = 'UNSTABLE_EyebrowText';

export default UNSTABLE_EyebrowText;
