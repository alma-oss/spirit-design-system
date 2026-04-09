'use client';

import React, { useEffect } from 'react';
import { type SpiritUncontrolledFileUploaderProps } from '../../types';
import FileUploader from './FileUploader';
import FileUploaderInput from './FileUploaderInput';
import FileUploaderList from './FileUploaderList';
import { useFileQueue } from './useFileQueue';

const UncontrolledFileUploader = (props: SpiritUncontrolledFileUploaderProps) => {
  const {
    attachmentComponent,
    maxFileSize,
    maxUploadedFiles,
    helperText,
    iconName,
    inputId,
    inputLabel,
    inputName,
    inputProps,
    isLabelHidden,
    isDisabled,
    queueLimitBehavior,
    isMultiple,
    isRequired,
    labelText,
    linkText,
    listId,
    listProps,
    onInputError,
    onChange,
    errorMessages,
    validationState,
    validationText,
    ...restProps
  } = props;

  const { fileQueue, addToQueue, clearQueue, onDismiss, findInQueue, updateQueue } = useFileQueue();

  useEffect(() => {
    if (onChange) {
      onChange(fileQueue);
    }
    // We only want a dependency for fileQueue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileQueue]);

  return (
    <FileUploader
      fileQueue={fileQueue}
      onDismiss={onDismiss}
      addToQueue={addToQueue}
      clearQueue={clearQueue}
      findInQueue={findInQueue}
      updateQueue={updateQueue}
      errorMessages={errorMessages}
      {...restProps}
    >
      <FileUploaderInput
        maxFileSize={maxFileSize}
        maxUploadedFiles={maxUploadedFiles}
        helperText={helperText}
        iconName={iconName}
        id={inputId}
        isLabelHidden={isLabelHidden}
        isDisabled={isDisabled}
        queueLimitBehavior={queueLimitBehavior}
        isMultiple={isMultiple}
        isRequired={isRequired}
        label={inputLabel}
        labelText={labelText}
        linkText={linkText}
        name={inputName}
        onError={onInputError}
        validationState={validationState}
        validationText={validationText}
        {...inputProps}
      />
      <FileUploaderList id={listId} inputName={inputName} attachmentComponent={attachmentComponent} {...listProps} />
    </FileUploader>
  );
};

UncontrolledFileUploader.spiritComponent = 'UncontrolledFileUploader';

export default UncontrolledFileUploader;
