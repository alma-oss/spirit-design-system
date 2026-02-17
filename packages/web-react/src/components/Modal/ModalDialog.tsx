'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type ModalDialogProps, type PolymorphicComponent, type PolymorphicRef } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useModalDialogStyleProps } from './useModalDialogStyleProps';
import { useModalStyleProps } from './useModalStyleProps';

const _ModalDialog = <E extends ElementType = 'article'>(props: ModalDialogProps<E>, ref: PolymorphicRef<E>) => {
  const { elementType = 'article', children, isDockedOnMobile, isExpandedOnMobile, isScrollable, ...restProps } = props;

  const Component = elementType as ElementType;

  const { classProps } = useModalStyleProps({ isDockedOnMobile, isExpandedOnMobile, isScrollable });
  const { modalDialogStyleProps, props: modifiedProps } = useModalDialogStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps: classProps.dialog,
    modalDialogStyleProps,
    styleProps,
    otherProps,
  });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </Component>
  );
};

const ModalDialog = forwardRef<HTMLElement, ModalDialogProps<'article'>>(
  _ModalDialog,
) as unknown as PolymorphicComponent<'article', ModalDialogProps<ElementType>>;

ModalDialog.spiritComponent = 'ModalDialog';
ModalDialog.displayName = 'ModalDialog';

export default ModalDialog;
