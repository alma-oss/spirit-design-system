'use client';

import classNames from 'classnames';
import React, { type DragEvent, type DragEventHandler, useEffect, useState } from 'react';
import { ContextPropsProvider } from '../../context';
import { useAriaDescribedBy, useDeprecationMessage, useI18n, useStyleProps } from '../../hooks';
import { resolveComponentString } from '../../translations';
import { Button } from '../Button';
import { HelperText } from '../HelperText';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import { type FileUploadProps } from './types';
import { useFileUploadState } from './useFileUploadState';
import { useFileUploadStyleProps } from './useFileUploadStyleProps';

const FileUpload = (props: FileUploadProps) => {
  const [isDragAndDropDetected, setIsDragAndDropDetected] = useState(false);
  const { t } = useI18n();
  const {
    'aria-describedby': ariaDescribedBy = '',
    accept,
    buttonText,
    children,
    dropZoneRef,
    hasValidationIcon,
    helperText,
    iconName = 'upload',
    id,
    inputDragAndDropText,
    inputRef,
    inputUploadText,
    isCompact,
    isDisabled,
    isDragAndDropSupported: isDragAndDropSupportedProp,
    isLabelHidden,
    isMultiple,
    isRequired,
    isUploadDisabled,
    label,
    name,
    onFilesSelected,
    rootId,
    strings,
    validationState,
    validationText,
    ...restProps
  } = props;
  const resolvedButtonText = resolveComponentString(
    strings?.label?.button ?? buttonText ?? { key: 'fileUploader.browse' },
    t,
  );
  const resolvedInputUploadText = resolveComponentString(
    strings?.label?.upload ?? inputUploadText ?? { key: 'fileUploader.inputUpload' },
    t,
  );
  const resolvedInputDragAndDropText = resolveComponentString(
    strings?.label?.dragAndDrop ?? inputDragAndDropText ?? { key: 'fileUploader.inputDragAndDrop' },
    t,
  );

  const hasInput = name !== undefined;
  const isUploadInteractionDisabled = isDisabled || isUploadDisabled;

  const isDragAndDropSupported = isDragAndDropSupportedProp ?? isDragAndDropDetected;

  const { isDragging, onChange, onDragEnter, onDragLeave, onDragOver, onDrop } = useFileUploadState({
    onFilesSelected: hasInput ? onFilesSelected : undefined,
  });

  const { classProps } = useFileUploadStyleProps({
    hasValidationIcon,
    isCompact,
    isDisabled,
    isDragAndDropSupported,
    isDragging,
    isLabelHidden,
    isRequired,
    isUploadDisabled,
    validationState,
  });

  const { styleProps, props: transferProps } = useStyleProps(restProps);

  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  useDeprecationMessage({
    method: 'custom',
    trigger: buttonText != null || inputUploadText != null || inputDragAndDropText != null,
    componentName: 'FileUpload',
    customText:
      'The "buttonText", "inputUploadText", and "inputDragAndDropText" properties are deprecated and will be removed in the next major version. Use the corresponding keys in "strings" instead.',
  });
  const inputId = `${id}-input`;
  const rootDomId = rootId != null && rootId !== '' ? rootId : id;
  const onDisabledDropGuard = (event: DragEvent<HTMLDivElement>) => {
    const { dataTransfer } = event;

    if (dataTransfer) {
      dataTransfer.dropEffect = 'none';
    }

    event.preventDefault();
    event.stopPropagation();
  };
  let onDragOverHandler: DragEventHandler<HTMLDivElement> | undefined;
  let onDropHandler: DragEventHandler<HTMLDivElement> | undefined;

  if (isUploadInteractionDisabled) {
    onDragOverHandler = onDisabledDropGuard;
    onDropHandler = onDisabledDropGuard;
  } else if (isDragAndDropSupported) {
    onDragOverHandler = onDragOver;
    onDropHandler = onDrop;
  }

  useEffect(() => {
    if (isDragAndDropSupportedProp !== undefined) {
      return;
    }
    setIsDragAndDropDetected('draggable' in document.createElement('span'));
  }, [isDragAndDropSupportedProp]);

  return (
    <ContextPropsProvider
      value={{
        isDisabled,
        isRequired,
        validationState,
        label: { isLabelHidden },
      }}
    >
      <div
        {...transferProps}
        {...styleProps}
        id={rootDomId}
        className={classNames(classProps.root, styleProps.className)}
      >
        {hasInput && (
          <div
            onDragOver={onDragOverHandler}
            onDragEnter={!isUploadInteractionDisabled && isDragAndDropSupported ? onDragEnter : undefined}
            onDragLeave={!isUploadInteractionDisabled && isDragAndDropSupported ? onDragLeave : undefined}
            onDrop={onDropHandler}
            className={classProps.input.root}
          >
            <Label htmlFor={inputId}>{label}</Label>
            <input
              {...ariaDescribedByProp}
              type="file"
              accept={accept}
              id={inputId}
              ref={inputRef}
              name={name}
              className={classProps.input.input}
              onChange={onChange}
              multiple={isMultiple}
              disabled={isUploadInteractionDisabled}
            />
            <div ref={dropZoneRef} className={classProps.input.dropZone.root}>
              {!isCompact && <Icon name={iconName} boxSize={28} aria-hidden="true" />}
              <div className={classProps.input.dropZone.content}>
                <label htmlFor={inputId} className={classProps.input.dropZone.label}>
                  {resolvedInputUploadText}
                  {isDragAndDropSupported && (
                    <>
                      {'\u00A0'}
                      <span className={classProps.input.dropLabel}>{resolvedInputDragAndDropText}</span>
                    </>
                  )}
                </label>
                <HelperText
                  id={`${inputId}-helper-text`}
                  registerAria={register}
                  helperText={helperText}
                  isDisabled={isUploadInteractionDisabled}
                />
              </div>
              <Button aria-hidden="true" isDisabled={isUploadInteractionDisabled} elementType="div" size="small">
                {resolvedButtonText}
              </Button>
            </div>
            {validationState && (
              <ValidationText
                elementType="span"
                id={`${inputId}-validation-text`}
                {...(hasValidationIcon && { validationStateIcon: validationState })}
                validationText={validationText}
                registerAria={register}
                role={validationTextRole}
              />
            )}
          </div>
        )}
        {children}
      </div>
    </ContextPropsProvider>
  );
};

FileUpload.spiritComponent = 'FileUpload';
FileUpload.displayName = 'FileUpload';

export default FileUpload;
