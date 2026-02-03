'use client';

import React, { type ElementType, type ReactElement, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type PolymorphicRef, type SpiritHeaderLogoProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useUnstableHeaderStyleProps } from './useUnstableHeaderStyleProps';

const defaultProps: Partial<SpiritHeaderLogoProps> = {
  elementType: 'a',
};

const _HeaderLogo = <E extends ElementType = 'a'>(
  props: SpiritHeaderLogoProps<E>,
  ref: PolymorphicRef<E>,
): ReactElement => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType: ElementTag = defaultProps.elementType as ElementType,
    children,
    ...restProps
  } = propsWithDefaults;
  const { classProps, props: modifiedProps } = useUnstableHeaderStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.logo, styleProps, otherProps });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps} href={restProps.href} ref={ref}>
      {children}
    </ElementTag>
  );
};

const UNSTABLE_HeaderLogo = forwardRef<HTMLAnchorElement, SpiritHeaderLogoProps<ElementType>>(_HeaderLogo);

UNSTABLE_HeaderLogo.spiritComponent = 'UNSTABLE_HeaderLogo';

export default UNSTABLE_HeaderLogo;
