'use client';

import React, { forwardRef, type ElementType } from 'react';
import { AlignmentXExtended, AlignmentYExtended, DirectionExtended } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type FlexProps, type PolymorphicRef, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useFlexStyleProps } from './useFlexStyleProps';

const defaultProps = {
  alignmentX: AlignmentXExtended.STRETCH,
  alignmentY: AlignmentYExtended.STRETCH,
  direction: DirectionExtended.HORIZONTAL,
  elementType: 'div' as const,
  isWrapping: false,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_Flex'] }] */
const _Flex = <T extends ElementType = 'div'>(
  props: FlexProps<T>,
  ref: PolymorphicRef<T>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType = defaultProps.elementType,
    /**
     * @deprecated "row" and "column" values will be removed in the next major version. Please use "horizontal" and "vertical" instead.
     * @see https://jira.almacareer.tech/browse/DS-1629
     */
    direction,
    children,
    ...restProps
  } = propsWithDefaults;

  const Component = elementType as React.ElementType;

  const { classProps, props: modifiedProps, styleProps: flexStyle } = useFlexStyleProps({ direction, ...restProps });
  const { styleProps, props: otherProps } = useStyleProps({ ...modifiedProps });
  const mergedStyleProps = mergeStyleProps(Component, { classProps, flexStyle, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </Component>
  );
};

const Flex = forwardRef(_Flex) as unknown as (<T extends ElementType = 'div'>(
  props: FlexProps<T> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

Flex.spiritComponent = 'Flex';
Flex.displayName = 'Flex';

export default Flex;
