'use client';

import React, { type ElementType, forwardRef } from 'react';
import { PaddingStyleProps, TextStyleProps } from '../../constants';
import { useStyleProps } from '../../hooks';
import {
  type PolymorphicComponent,
  type PolymorphicRef,
  type SectionProps,
  type SpiritSectionProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { Container } from '../Container';
import { useSectionSizeProps } from './useSectionSizeProps';
import { useSectionStyleProps } from './useSectionStyleProps';

const defaultProps = {
  elementType: 'section',
  hasContainer: true,
  size: undefined,
};

const _Section = <E extends ElementType = 'section', S = void>(
  props: SpiritSectionProps<E, S>,
  ref: PolymorphicRef<E>,
) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType = defaultProps.elementType,
    backgroundColor,
    children,
    containerProps,
    hasContainer,
    ...restProps
  } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { classProps } = useSectionStyleProps({ backgroundColor });
  const { modifiedProps } = useSectionSizeProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps, {
    paddingTop: PaddingStyleProps.paddingTop,
    paddingBottom: PaddingStyleProps.paddingBottom,
    paddingY: PaddingStyleProps.paddingY,
    textAlignment: TextStyleProps.textAlignment,
  });
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {hasContainer ? <Container {...containerProps}>{children}</Container> : children}
    </Component>
  );
};

const Section = forwardRef(_Section) as unknown as PolymorphicComponent<'section', SectionProps<void>>;

Section.spiritComponent = 'Section';
Section.displayName = 'Section';

export default Section;
