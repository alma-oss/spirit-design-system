'use client';

import React, { type ElementType } from 'react';
import { TextStyleProps } from '../../constants';
import { useStyleProps } from '../../hooks';
import { mergeStyleProps } from '../../utils';
import { type SpiritCaptionTextProps } from './types';
import { useCaptionTextStyleProps } from './useCaptionTextStyleProps';

const defaultProps: Partial<SpiritCaptionTextProps> = {
  elementType: 'span',
};

const CaptionText = <E extends ElementType = 'span', C = void>(props: SpiritCaptionTextProps<E, C>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps } = useCaptionTextStyleProps(restProps);
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

CaptionText.spiritComponent = 'CaptionText';
CaptionText.displayName = 'CaptionText';

export default CaptionText;
