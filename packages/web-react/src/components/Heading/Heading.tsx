'use client';

import React, { type ElementType } from 'react';
import { Emphasis, HeadingStyleProps, SizesExtended, TextStyleProps } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type SpiritHeadingProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useHeadingStyleProps } from './useHeadingStyleProps';

const defaultProps: Partial<SpiritHeadingProps<ElementType, void, void>> = {
  emphasis: Emphasis.BOLD,
  size: SizesExtended.MEDIUM,
};

const Heading = <E extends ElementType = 'h1', S = void, Emph = void>(
  props: SpiritHeadingProps<E, S, Emph>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps } = useHeadingStyleProps({ ...restProps });
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

Heading.spiritComponent = 'Heading';
Heading.displayName = 'Heading';

export default Heading;
