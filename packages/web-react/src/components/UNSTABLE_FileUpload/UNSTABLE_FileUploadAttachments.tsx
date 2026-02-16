'use client';

import classNames from 'classnames';
import React from 'react';
import { useI18n, useStyleProps } from '../../hooks';
import { type SpiritUnstableFileUploadAttachmentsProps } from './types';
import { useFileUploadStyleProps } from './useFileUploadStyleProps';

const UNSTABLE_FileUploadAttachments = (props: SpiritUnstableFileUploadAttachmentsProps) => {
  const { t } = useI18n();
  const { label, id, children, ...restProps } = props;
  const attachmentsLabel = label ?? t('fileUploader.attachments');
  const { classProps } = useFileUploadStyleProps();
  const { styleProps, props: transferProps } = useStyleProps(restProps);

  return (
    <>
      <h3 id={id} hidden>
        {attachmentsLabel}
      </h3>
      <ul
        aria-labelledby={id}
        {...transferProps}
        {...styleProps}
        className={classNames(classProps.list, styleProps.className)}
      >
        {children}
      </ul>
    </>
  );
};

UNSTABLE_FileUploadAttachments.spiritComponent = 'UNSTABLE_FileUploadAttachments';
UNSTABLE_FileUploadAttachments.displayName = 'UNSTABLE_FileUploadAttachments';

export default UNSTABLE_FileUploadAttachments;
