'use client';

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useAriaIds, useStyleProps } from '../../hooks';
import { FormFieldVariants, type SpiritFileUploaderInputProps } from '../../types';
import { Label, ValidationText } from '../Field';
import { useValidationTextRole } from '../Field/useValidationTextRole';
import { HelperText } from '../HelperText';
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
    <PropsProvider value={{ isDisabled: isInputDisabled, formFieldVariant: FormFieldVariants.BOX }}>
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
          className={classProps.input.input}
          onChange={onChange}
          multiple={isMultiple}
          disabled={isInputDisabled}
          {...restProps}
        />
        <div ref={dropZoneRef} className={classProps.input.dropZone.root}>
          <Icon name={iconName} aria-hidden="true" />
          <Label htmlFor={id} UNSAFE_className={classProps.input.dropZone.label}>
            <span className={classProps.input.link}>{linkText}</span>
            &nbsp;
            <span className={classProps.input.dropLabel}>{labelText}</span>
          </Label>
          <HelperText id={`${id}__helperText`} registerAria={register} helperText={helperText} />
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
    </PropsProvider>
  );
};

FileUploaderInput.spiritComponent = 'FileUploaderInput';

export default FileUploaderInput;
