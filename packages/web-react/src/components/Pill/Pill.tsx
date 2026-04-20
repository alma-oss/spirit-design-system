'use client';

import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritPillProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { PillColorsExtended } from './constants';
import { usePillStyleProps } from './usePillStyleProps';

const defaultProps: Partial<SpiritPillProps> = {
  color: PillColorsExtended.SELECTED,
  elementType: 'span',
};

const Pill = <E extends ElementType = 'span', C = void>(props: SpiritPillProps<E, C>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps } = usePillStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps}>
      {children}
    </Component>
  );
};

Pill.spiritComponent = 'Pill';
Pill.displayName = 'Pill';

export default Pill;
