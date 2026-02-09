'use client';

import React, { type ElementType, type ForwardedRef, forwardRef } from 'react';
import { SizesExtended } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type SpiritTagProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { TagColorsExtended } from './constants';
import { useTagStyleProps } from './useTagStyleProps';

const defaultProps: Partial<SpiritTagProps> = {
  color: TagColorsExtended.NEUTRAL,
  elementType: 'span',
  isSubtle: false,
  size: SizesExtended.MEDIUM,
};

const _Tag = <E extends ElementType = 'span', C = void, S = void>(
  props: SpiritTagProps<E, C, S>,
  ref: ForwardedRef<HTMLSpanElement>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType: ElementTag = defaultProps.elementType as ElementType,
    children,
    ...restProps
  } = propsWithDefaults;
  const { classProps, props: modifiedProps } = useTagStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps, styleProps, otherProps });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </ElementTag>
  );
};

const Tag = forwardRef<HTMLSpanElement, SpiritTagProps<ElementType>>(_Tag);

Tag.spiritComponent = 'Tag';

export default Tag;
