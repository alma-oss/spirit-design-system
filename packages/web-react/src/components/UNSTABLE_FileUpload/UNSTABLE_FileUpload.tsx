'use client';

import classNames from 'classnames';
import React from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritUnstableFileUploadProps } from './types';
import { useFileUploadStyleProps } from './useFileUploadStyleProps';

const UNSTABLE_FileUpload = (props: SpiritUnstableFileUploadProps) => {
  const { children, id, isFluid, ...restProps } = props;
  const { classProps } = useFileUploadStyleProps({ isFluid });
  const { styleProps, props: transferProps } = useStyleProps(restProps);

  return (
    <div id={id} {...transferProps} {...styleProps} className={classNames(classProps.root, styleProps.className)}>
      {children}
    </div>
  );
};

UNSTABLE_FileUpload.spiritComponent = 'UNSTABLE_FileUpload';
UNSTABLE_FileUpload.displayName = 'UNSTABLE_FileUpload';

export default UNSTABLE_FileUpload;
