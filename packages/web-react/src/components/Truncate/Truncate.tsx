'use client';

import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritTruncateProps, TruncateModes } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useTruncatedText } from './useTruncatedText';
import { useTruncateStyleProps } from './useTruncateStyleProps';

const defaultProps = {
  elementType: 'span',
};

const Truncate = <E extends ElementType = 'span'>(props: SpiritTruncateProps<E>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, elementType: ElementTag = 'span', ...restProps } = propsWithDefaults;
  const {
    classProps,
    props: modifiedProps,
    styleProps: truncateStyle,
    effectiveMode,
    effectiveLimit,
  } = useTruncateStyleProps(restProps);
  const truncatedText = useTruncatedText(
    children,
    effectiveMode,
    effectiveMode !== TruncateModes.LINES ? effectiveLimit : undefined,
  );
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const truncateStyleProps = {
    style: {
      ...styleProps.style,
      ...truncateStyle,
    },
  };
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps, styleProps, truncateStyleProps });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps}>
      {truncatedText}
    </ElementTag>
  );
};

Truncate.spiritComponent = 'Truncate';

export default Truncate;
