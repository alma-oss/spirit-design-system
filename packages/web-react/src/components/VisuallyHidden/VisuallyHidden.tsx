'use client';

import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritVisuallyHiddenProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useVisuallyHiddenProps } from './useVisuallyHiddenProps';

const VisuallyHidden = <E extends ElementType = 'span'>(props: SpiritVisuallyHiddenProps<E>): JSX.Element => {
  const { children, elementType: ElementTag = 'span', ...rest } = props;
  const { classProps, props: modifiedProps } = useVisuallyHiddenProps(rest);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps, styleProps, otherProps });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps}>
      {children}
    </ElementTag>
  );
};

VisuallyHidden.spiritComponent = 'VisuallyHidden';

export default VisuallyHidden;
