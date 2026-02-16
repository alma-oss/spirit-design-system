'use client';

import React from 'react';
import { ObjectFit } from '../../constants';
import { DEFAULT_ATTACHMENT_IMAGE_DIMENSION } from './constants';
import { type UnstableAttachmentImagePreviewProps as AttachmentImagePreviewProps } from './types';
import { useFileUploadStyleProps } from './useFileUploadStyleProps';

const defaultProps: Partial<AttachmentImagePreviewProps> = {
  meta: undefined,
  imageObjectFit: ObjectFit.COVER,
};

const UNSTABLE_AttachmentImagePreview = (props: AttachmentImagePreviewProps) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { label, imagePreview, meta, imageObjectFit } = propsWithDefaults;
  const { classProps } = useFileUploadStyleProps({ meta, imageObjectFit });
  const { imageCropStyles, attachmentStyles } = classProps;

  return (
    <span className={classProps.attachment.image}>
      <img
        src={imagePreview}
        width={DEFAULT_ATTACHMENT_IMAGE_DIMENSION}
        height={DEFAULT_ATTACHMENT_IMAGE_DIMENSION}
        alt={label}
        style={{ ...imageCropStyles, ...attachmentStyles }}
      />
    </span>
  );
};

UNSTABLE_AttachmentImagePreview.spiritComponent = 'UNSTABLE_AttachmentImagePreview';
UNSTABLE_AttachmentImagePreview.displayName = 'UNSTABLE_AttachmentImagePreview';

export default UNSTABLE_AttachmentImagePreview;
