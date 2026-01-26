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

const Heading = <T extends ElementType, S = void, E = void>(props: SpiritHeadingProps<T, S, E>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType: ElementTag, children, ...restProps } = propsWithDefaults;
  const { classProps, props: modifiedProps } = useHeadingStyleProps({ ...restProps });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps, {
    isTextBalanced: HeadingStyleProps.isTextBalanced,
    textAlignment: TextStyleProps.textAlignment,
    textHyphens: TextStyleProps.textHyphens,
    textWordBreak: TextStyleProps.textWordBreak,
  });
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps, styleProps, otherProps });

  return (
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    <ElementTag {...(otherProps as any)} {...mergedStyleProps}>
      {children}
    </ElementTag>
  );
};

Heading.spiritComponent = 'Heading';

export default Heading;
