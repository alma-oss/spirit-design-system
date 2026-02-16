'use client';

import classNames from 'classnames';
import React from 'react';
import { useStyleProps } from '../../hooks';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import { DEFAULT_ATTACHMENT_ACTION_BUTTON_ICON_NAME } from './constants';
import { type SpiritUnstableAttachmentActionButtonProps } from './types';
import { useAttachmentStyleProps } from './useAttachmentStyleProps';

const UNSTABLE_AttachmentActionButton = (props: SpiritUnstableAttachmentActionButtonProps) => {
  const { name = DEFAULT_ATTACHMENT_ACTION_BUTTON_ICON_NAME, children, ...restProps } = props;
  const { classProps } = useAttachmentStyleProps();
  const { styleProps, props: transferProps } = useStyleProps(restProps);

  return (
    <button
      type="button"
      {...transferProps}
      {...styleProps}
      className={classNames(classProps.button, styleProps.className)}
    >
      <VisuallyHidden>{children}</VisuallyHidden>
      <Icon name={name} aria-hidden="true" />
    </button>
  );
};

UNSTABLE_AttachmentActionButton.spiritComponent = 'UNSTABLE_AttachmentActionButton';
UNSTABLE_AttachmentActionButton.displayName = 'UNSTABLE_AttachmentActionButton';

export default UNSTABLE_AttachmentActionButton;
