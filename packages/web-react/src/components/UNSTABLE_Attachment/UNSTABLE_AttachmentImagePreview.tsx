'use client';

import classNames from 'classnames';
import React from 'react';
import { ObjectFit } from '../../constants';
import { useStyleProps } from '../../hooks';
import { DEFAULT_ATTACHMENT_IMAGE_DIMENSION } from './constants';
import { type SpiritUnstableAttachmentImagePreviewProps } from './types';
import { useAttachmentStyleProps } from './useAttachmentStyleProps';

const defaultProps: Partial<SpiritUnstableAttachmentImagePreviewProps> = {
  meta: undefined,
  imageObjectFit: ObjectFit.COVER,
};

const UNSTABLE_AttachmentImagePreview = (props: SpiritUnstableAttachmentImagePreviewProps) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { label, imagePreview, meta, imageObjectFit, ...restProps } = propsWithDefaults;
  const { classProps } = useAttachmentStyleProps({ meta, imageObjectFit });
  const imageCropStyles = classProps.imageCropStyles ?? {};
  const attachmentStyles = classProps.attachmentStyles ?? {};
  const { styleProps, props: transferProps } = useStyleProps(restProps);

  return (
    <span {...transferProps} {...styleProps} className={classNames(classProps.image, styleProps.className)}>
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
