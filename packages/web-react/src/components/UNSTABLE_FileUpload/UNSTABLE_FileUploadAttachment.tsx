'use client';

import classNames from 'classnames';
import React from 'react';
import { useClassNamePrefix, useI18n, useStyleProps } from '../../hooks';
import { Icon } from '../Icon';
import { DEFAULT_ATTACHMENT_ICON_NAME } from './constants';
import { type SpiritUnstableFileUploadAttachmentProps } from './types';
import UNSTABLE_AttachmentActionButton from './UNSTABLE_AttachmentActionButton';
import UNSTABLE_AttachmentDismissButton from './UNSTABLE_AttachmentDismissButton';
import { useFileUploadStyleProps } from './useFileUploadStyleProps';

const UNSTABLE_FileUploadAttachment = (props: SpiritUnstableFileUploadAttachmentProps) => {
  const { t } = useI18n();
  const {
    editText,
    iconName = DEFAULT_ATTACHMENT_ICON_NAME,
    id,
    label,
    onDismiss,
    onChange,
    removeText,
    thumbnail,
    ...restProps
  } = props;
  const resolvedEditText = editText ?? t('fileUploader.edit');
  const resolvedRemoveText = removeText ?? t('fileUploader.remove');
  const { classProps } = useFileUploadStyleProps();
  const { styleProps, props: transferProps } = useStyleProps(restProps);

  return (
    <li
      id={id}
      data-file-name={label}
      {...transferProps}
      {...styleProps}
      className={classNames(classProps.attachment.root, styleProps.className)}
    >
      {thumbnail ?? <Icon name={iconName} aria-hidden="true" />}
      <span className={classProps.attachment.name}>
        <span className={useClassNamePrefix('text-truncate')}>{label}</span>
      </span>
      {onChange && (
        <span className={classProps.attachment.slot}>
          <UNSTABLE_AttachmentActionButton onClick={onChange}>{resolvedEditText}</UNSTABLE_AttachmentActionButton>
        </span>
      )}
      <UNSTABLE_AttachmentDismissButton onClick={onDismiss}>{resolvedRemoveText}</UNSTABLE_AttachmentDismissButton>
    </li>
  );
};

UNSTABLE_FileUploadAttachment.spiritComponent = 'UNSTABLE_FileUploadAttachment';
UNSTABLE_FileUploadAttachment.displayName = 'UNSTABLE_FileUploadAttachment';

export default UNSTABLE_FileUploadAttachment;
