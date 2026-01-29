'use client';

import React, { forwardRef, type ElementType } from 'react';
import { PaddingStyleProps, TextStyleProps } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type PolymorphicRef, type SectionProps, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { Container } from '../Container';
import { useSectionSizeProps } from './useSectionSizeProps';
import { useSectionStyleProps } from './useSectionStyleProps';

const defaultProps = {
  containerProps: undefined,
  elementType: 'section' as const,
  hasContainer: true,
  size: undefined,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_Section'] }] */
const _Section = <T extends ElementType = 'section', S = void>(
  props: SectionProps<T, S>,
  ref: PolymorphicRef<T>,
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

  const Component = elementType as React.ElementType;

  const { classProps } = useSectionStyleProps({ backgroundColor });
  const { modifiedProps } = useSectionSizeProps(propsWithDefaults);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps, {
    paddingTop: PaddingStyleProps.paddingTop,
    paddingBottom: PaddingStyleProps.paddingBottom,
    paddingY: PaddingStyleProps.paddingY,
    textAlignment: TextStyleProps.textAlignment,
  });
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {hasContainer ? <Container {...(containerProps || {})}>{children}</Container> : children}
    </Component>
  );
};

const Section = forwardRef(_Section) as unknown as (<T extends ElementType = 'section', S = void>(
  props: SectionProps<T, S> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

Section.spiritComponent = 'Section';
Section.displayName = 'Section';

export default Section;
