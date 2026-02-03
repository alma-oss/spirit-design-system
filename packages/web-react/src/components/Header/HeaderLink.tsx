'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type PolymorphicRef, type SpiritHeaderLinkProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useHeaderStyleProps } from './useHeaderStyleProps';

const _HeaderLink = <E extends ElementType = 'a'>(
  props: SpiritHeaderLinkProps<E>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const { elementType: ElementTag = 'a', children, isCurrent, ...restProps } = props;
  const { classProps } = useHeaderStyleProps({ isCurrentLink: isCurrent });
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, {
    classProps: classProps.headerLink,
    styleProps,
    otherProps,
  });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </ElementTag>
  );
};

const HeaderLink = forwardRef<HTMLAnchorElement, SpiritHeaderLinkProps<ElementType>>(_HeaderLink);

HeaderLink.spiritComponent = 'HeaderLink';

export default HeaderLink;
