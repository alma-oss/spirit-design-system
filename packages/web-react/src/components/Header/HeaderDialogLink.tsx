'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type PolymorphicRef, type SpiritDialogHeaderLinkProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useHeaderStyleProps } from './useHeaderStyleProps';

const _HeaderDialogLink = <E extends ElementType = 'a'>(
  props: SpiritDialogHeaderLinkProps<E>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const { elementType: ElementTag = 'a', children, isCurrent, ...restProps } = props;
  const { classProps } = useHeaderStyleProps({ isCurrentLink: isCurrent });
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, {
    classProps: classProps.headerDialogLink,
    styleProps,
    otherProps,
  });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </ElementTag>
  );
};

const HeaderDialogLink = forwardRef<HTMLAnchorElement, SpiritDialogHeaderLinkProps<ElementType>>(_HeaderDialogLink);

HeaderDialogLink.spiritComponent = 'HeaderDialogLink';

export default HeaderDialogLink;
