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
  const { children, elementType, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
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
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, truncateStyleProps });

  return (
    <Component {...otherProps} {...mergedStyleProps}>
      {truncatedText}
    </Component>
  );
};

Truncate.spiritComponent = 'Truncate';
Truncate.displayName = 'Truncate';

export default Truncate;
