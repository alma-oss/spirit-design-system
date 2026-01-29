'use client';

import React, { forwardRef, type ElementType } from 'react';
import { BackgroundColors, PaddingStyleProps, TextStyleProps } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type FooterProps, type PolymorphicRef, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { PADDING_BOTTOM, PADDING_TOP } from './constants';
import { useFooterStyleProps } from './useFooterStyleProps';

const defaultProps = {
  backgroundColor: BackgroundColors.SECONDARY,
  elementType: 'footer' as const,
  paddingBottom: PADDING_BOTTOM,
  paddingTop: PADDING_TOP,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_Footer'] }] */
const _Footer = <T extends ElementType = 'footer'>(
  props: FooterProps<T>,
  ref: PolymorphicRef<T>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType = defaultProps.elementType,
    children,
    backgroundColor,
    ...restProps
  } = propsWithDefaults;

  const Component = elementType as React.ElementType;

  const { classProps } = useFooterStyleProps({ backgroundColor });
  const { styleProps, props: otherProps } = useStyleProps(restProps, {
    paddingBottom: PaddingStyleProps.paddingBottom,
    paddingTop: PaddingStyleProps.paddingTop,
    textAlignment: TextStyleProps.textAlignment,
  });
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </Component>
  );
};

const Footer = forwardRef(_Footer) as unknown as (<T extends ElementType = 'footer'>(
  props: FooterProps<T> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

Footer.spiritComponent = 'Footer';
Footer.displayName = 'Footer';

export default Footer;
