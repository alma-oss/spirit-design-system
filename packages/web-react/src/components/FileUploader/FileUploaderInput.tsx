'use client';

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useAriaIds, useStyleProps } from '../../hooks';
import { type SpiritFileUploaderInputProps } from '../../types';
import { HelperText } from '../HelperText';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import { DEFAULT_FILE_QUEUE_LIMIT, DEFAULT_FILE_SIZE_LIMIT } from './constants';
import { useFileUploaderInput } from './useFileUploaderInput';
import { useFileUploaderStyleProps } from './useFileUploaderStyleProps';

const FileUploaderInput = (props: SpiritFileUploaderInputProps) => {
  const [isDragAndDropSupported, setIsDragAndDropSupported] = useState(false);
  const {
    accept,
    'aria-describedby': ariaDescribedBy = '',
    dropZoneRef,
    hasValidationIcon,
    helperText,
    iconName = 'upload',
    id,
    inputRef,
    isDisabled,
    isLabelHidden,
    isMultiple,
    isRequired,
    label,
    labelText,
    linkText,
    maxFileSize = DEFAULT_FILE_SIZE_LIMIT,
    maxUploadedFiles = DEFAULT_FILE_QUEUE_LIMIT,
    onError,
    queueLimitBehavior = 'none',
    validationState,
    validationText,
    ...restProps
  } = props;
  const {
    isDisabledByQueueLimitBehavior,
    isDragging,
    isDropZoneHidden,
    onChange,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
  } = useFileUploaderInput({
    accept,
    isMultiple,
    maxFileSize,
    maxUploadedFiles,
    onError,
    queueLimitBehavior,
  });
  const { classProps } = useFileUploaderStyleProps({
    hasValidationIcon,
    isDisabled,
    isDisabledByQueueLimitBehavior,
    isDragAndDropSupported,
    isDragging,
    isDropZoneHidden,
    isLabelHidden,
    isRequired,
    queueLimitBehavior,
    validationState,
  });
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const [ids, register] = useAriaIds(ariaDescribedBy);
  const ariaDescribedByProp = useAriaDescribedBy(ids);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  useEffect(() => {
    setIsDragAndDropSupported('draggable' in document.createElement('span'));
  }, []);

  const isInputDisabled = isDisabled || isDisabledByQueueLimitBehavior;

  return (
    <PropsProvider
      value={{
        isDisabled: isInputDisabled,
        isLabelHidden,
        isRequired,
        validationState,
      }}
    >
      <div
        {...transferProps}
        {...styleProps}
        onDragOver={!isDisabled && isDragAndDropSupported ? onDragOver : undefined}
        onDragEnter={!isDisabled && isDragAndDropSupported ? onDragEnter : undefined}
        onDragLeave={!isDisabled && isDragAndDropSupported ? onDragLeave : undefined}
        onDrop={!isDisabled && isDragAndDropSupported ? onDrop : undefined}
        className={classNames(classProps.input.root, styleProps.className)}
      >
        <Label htmlFor={id}>{label}</Label>
        <input
          {...ariaDescribedByProp}
          type="file"
          accept={accept}
          id={id}
          ref={inputRef}
          className={classProps.input.input}
          onChange={onChange}
          multiple={isMultiple}
          disabled={isInputDisabled}
          {...restProps}
        />
        <div ref={dropZoneRef} className={classProps.input.dropZone.root}>
          <Icon name={iconName} aria-hidden="true" />
          <label htmlFor={id} className={classProps.input.dropZone.label}>
            <span className={classProps.input.link}>{linkText}</span>
            &nbsp;
            <span className={classProps.input.dropLabel}>{labelText}</span>
          </label>
          <HelperText id={`${id}__helperText`} registerAria={register} helperText={helperText} />
        </div>
        {validationState && (
          <ValidationText
            elementType="span"
            id={`${id}__validationText`}
            {...(hasValidationIcon && { hasValidationStateIcon: validationState })}
            validationText={validationText}
            registerAria={register}
            role={validationTextRole}
          />
        )}
      </div>
    </PropsProvider>
  );
};

FileUploaderInput.spiritComponent = 'FileUploaderInput';

export default FileUploaderInput;
