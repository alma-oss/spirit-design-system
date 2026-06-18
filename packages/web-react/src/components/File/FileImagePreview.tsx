'use client';

import classNames from 'classnames';
import React from 'react';
import { ObjectFit } from '../../constants';
import { useStyleProps } from '../../hooks';
import { DEFAULT_FILE_IMAGE_DIMENSION } from './constants';
import { type SpiritFileImagePreviewProps } from './types';
import { useFileStyleProps } from './useFileStyleProps';

const defaultProps: Partial<SpiritFileImagePreviewProps> = {
  meta: undefined,
  imageObjectFit: ObjectFit.COVER,
};

const FileImagePreview = (props: SpiritFileImagePreviewProps) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { label, imagePreview, meta, imageObjectFit, ...restProps } = propsWithDefaults;
  const { classProps } = useFileStyleProps({ meta, imageObjectFit });
  const imageCropStyles = classProps.imageCropStyles ?? {};
  const imageObjectFitStyles = classProps.imageObjectFitStyles ?? {};
  const { styleProps, props: transferProps } = useStyleProps(restProps);

  return (
    <span {...transferProps} {...styleProps} className={classNames(classProps.preview, styleProps.className)}>
      <img
        src={imagePreview}
        width={DEFAULT_FILE_IMAGE_DIMENSION}
        height={DEFAULT_FILE_IMAGE_DIMENSION}
        alt={label}
        style={{ ...imageCropStyles, ...imageObjectFitStyles }}
      />
    </span>
  );
};

FileImagePreview.spiritComponent = 'FileImagePreview';
FileImagePreview.displayName = 'FileImagePreview';

export default FileImagePreview;
