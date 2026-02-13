'use client';

import React, { type ElementType, type ForwardedRef, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type ModalDialogProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useModalDialogStyleProps } from './useModalDialogStyleProps';
import { useModalStyleProps } from './useModalStyleProps';

const ModalDialog = <E extends ElementType = 'article'>(
  props: ModalDialogProps<E>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const {
    elementType: ElementTag = 'article',
    children,
    isDockedOnMobile,
    isExpandedOnMobile,
    isScrollable,
    ...restProps
  } = props;

  const { classProps } = useModalStyleProps({ isDockedOnMobile, isExpandedOnMobile, isScrollable });
  const { modalDialogStyleProps, props: modifiedProps } = useModalDialogStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, {
    classProps: classProps.dialog,
    modalDialogStyleProps,
    styleProps,
    otherProps,
  });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </ElementTag>
  );
};

ModalDialog.spiritComponent = 'ModalDialog';

export default forwardRef<HTMLDivElement, ModalDialogProps<ElementType>>(ModalDialog);
