'use client';

import React, { type ElementType, forwardRef } from 'react';
import { BackgroundColors, PaddingStyleProps, TextStyleProps } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type FooterProps, type PolymorphicComponent, type PolymorphicRef, type SpiritFooterProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { PADDING_BOTTOM, PADDING_TOP } from './constants';
import { useFooterStyleProps } from './useFooterStyleProps';

const defaultProps = {
  backgroundColor: BackgroundColors.SECONDARY,
  elementType: 'footer',
  paddingBottom: PADDING_BOTTOM,
  paddingTop: PADDING_TOP,
};

const _Footer = <E extends ElementType = 'footer'>(
  props: SpiritFooterProps<E>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType, children, backgroundColor, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

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

const Footer = forwardRef<HTMLElement, SpiritFooterProps<'footer'>>(_Footer) as unknown as PolymorphicComponent<
  'footer',
  FooterProps
>;

Footer.spiritComponent = 'Footer';
Footer.displayName = 'Footer';

export default Footer;
