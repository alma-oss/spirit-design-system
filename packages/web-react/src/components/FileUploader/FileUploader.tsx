'use client';

import classNames from 'classnames';
import React from 'react';
import { useDeprecationMessage, useStyleProps } from '../../hooks';
import { type SpiritFileUploaderProps } from '../../types';
import {
  DEFAULT_ERROR_MESSAGE_MAX_FILE_SIZE,
  DEFAULT_ERROR_MESSAGE_QUEUE_DUPLICITY,
  DEFAULT_ERROR_MESSAGE_QUEUE_LIMIT,
  DEFAULT_ERROR_MESSAGE_UNSUPPORTED_FILE,
} from './constants';
import { FileUploaderProvider } from './FileUploaderContext';
import { useFileUploaderStyleProps } from './useFileUploaderStyleProps';

const FileUploader = (props: SpiritFileUploaderProps) => {
  const {
    addToQueue,
    children,
    clearQueue,
    errorMessages,
    fileQueue,
    findInQueue,
    id,
    isFluid,
    onDismiss,
    updateQueue,
    ...restProps
  } = props;

  const { classProps } = useFileUploaderStyleProps({ isFluid });
  const { styleProps, props: transferProps } = useStyleProps(restProps);

  useDeprecationMessage({
    method: 'custom',
    trigger: true,
    componentName: 'FileUploader',
    customText: 'See the UNSTABLE_FileUpload and UNSTABLE_File component documentation.',
  });

  const contextValue = {
    addToQueue,
    clearQueue,
    fileQueue,
    onDismiss,
    findInQueue,
    updateQueue,
    errorMessages: {
      errorFileDuplicity: DEFAULT_ERROR_MESSAGE_QUEUE_DUPLICITY,
      errorFileNotSupported: DEFAULT_ERROR_MESSAGE_UNSUPPORTED_FILE,
      errorMaxFileSize: DEFAULT_ERROR_MESSAGE_MAX_FILE_SIZE,
      errorMaxUploadedFiles: DEFAULT_ERROR_MESSAGE_QUEUE_LIMIT,
      ...errorMessages,
    },
  };

  return (
    <FileUploaderProvider value={contextValue}>
      <div id={id} {...transferProps} {...styleProps} className={classNames(classProps.root, styleProps.className)}>
        {children}
      </div>
    </FileUploaderProvider>
  );
};

FileUploader.spiritComponent = 'FileUploader';

export default FileUploader;
