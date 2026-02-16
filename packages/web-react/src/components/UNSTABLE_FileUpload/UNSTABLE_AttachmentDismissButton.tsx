'use client';

import classNames from 'classnames';
import React from 'react';
import { useStyleProps } from '../../hooks';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import { type SpiritUnstableAttachmentDismissButtonProps } from './types';
import { useFileUploadStyleProps } from './useFileUploadStyleProps';

const UNSTABLE_AttachmentDismissButton = (props: SpiritUnstableAttachmentDismissButtonProps) => {
  const { children, ...restProps } = props;
  const { classProps } = useFileUploadStyleProps();
  const { styleProps, props: transferProps } = useStyleProps(restProps);

  return (
    <button
      type="button"
      {...transferProps}
      {...styleProps}
      className={classNames(classProps.attachment.button, styleProps.className)}
    >
      <VisuallyHidden>{children}</VisuallyHidden>
      <Icon name="close" aria-hidden="true" />
    </button>
  );
};

UNSTABLE_AttachmentDismissButton.spiritComponent = 'UNSTABLE_AttachmentDismissButton';
UNSTABLE_AttachmentDismissButton.displayName = 'UNSTABLE_AttachmentDismissButton';

export default UNSTABLE_AttachmentDismissButton;
