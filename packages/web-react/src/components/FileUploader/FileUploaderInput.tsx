'use client';

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { type SpiritFileUploaderInputProps } from '../../types';
import { HelperText, Label, ValidationText } from '../Field';
import { useValidationTextRole } from '../Field/useValidationTextRole';
import { Icon } from '../Icon';
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
    name,
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
  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  useEffect(() => {
    setIsDragAndDropSupported('draggable' in document.createElement('span'));
  }, []);

  return (
    <div
      {...transferProps}
      {...styleProps}
      onDragOver={!isDisabled && isDragAndDropSupported ? onDragOver : undefined}
      onDragEnter={!isDisabled && isDragAndDropSupported ? onDragEnter : undefined}
      onDragLeave={!isDisabled && isDragAndDropSupported ? onDragLeave : undefined}
      onDrop={!isDisabled && isDragAndDropSupported ? onDrop : undefined}
      className={classNames(classProps.input.root, styleProps.className)}
    >
      <Label htmlFor={id} UNSAFE_className={classProps.input.label}>
        {label}
      </Label>
      <input
        {...ariaDescribedByProp}
        type="file"
        accept={accept}
        id={id}
        ref={inputRef}
        name={name}
        className={classProps.input.input}
        onChange={onChange}
        multiple={isMultiple}
        disabled={isDisabled || isDisabledByQueueLimitBehavior}
        {...restProps}
      />
      <div ref={dropZoneRef} className={classProps.input.dropZone.root}>
        <Icon name={iconName} aria-hidden="true" />
        <Label htmlFor={id} UNSAFE_className={classProps.input.dropZone.label}>
          <span className={classProps.input.link}>{linkText}</span>
          &nbsp;
          <span className={classProps.input.dropLabel}>{labelText}</span>
        </Label>
        <HelperText
          UNSAFE_className={classProps.input.helper}
          id={`${id}__helperText`}
          registerAria={register}
          helperText={helperText}
        />
      </div>
      {validationState && (
        <ValidationText
          UNSAFE_className={classProps.input.validationText}
          elementType="span"
          {...(hasValidationIcon && { hasValidationStateIcon: validationState })}
          id={`${id}__validationText`}
          validationText={validationText}
          registerAria={register}
          role={validationTextRole}
        />
      )}
    </div>
  );
};

FileUploaderInput.spiritComponent = 'FileUploaderInput';

export default FileUploaderInput;
