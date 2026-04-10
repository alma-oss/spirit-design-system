'use client';

import classNames from 'classnames';
import React, { type DragEvent, type DragEventHandler, useEffect, useState } from 'react';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { Button } from '../Button';
import { HelperText } from '../HelperText';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import { type UnstableFileUploadProps } from './types';
import { useFileUploadState } from './useFileUploadState';
import { useFileUploadStyleProps } from './useFileUploadStyleProps';

const UNSTABLE_FileUpload = (props: UnstableFileUploadProps) => {
  const [isDragAndDropDetected, setIsDragAndDropDetected] = useState(false);
  const {
    'aria-describedby': ariaDescribedBy = '',
    accept,
    buttonText = 'Browse',
    children,
    dropZoneRef,
    hasValidationIcon,
    helperText,
    iconName = 'upload',
    id,
    inputRef,
    isCompact,
    isDisabled,
    isDragAndDropSupported: isDragAndDropSupportedProp,
    isLabelHidden,
    isMultiple,
    isRequired,
    isUploadDisabled,
    label,
    labelText,
    linkText,
    name,
    onFilesSelected,
    rootId,
    validationState,
    validationText,
    ...restProps
  } = props;

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
    <PropsProvider
      value={{
        isDisabled,
        isLabelHidden,
        isRequired,
        validationState,
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
                  <span className={classProps.input.link}>{linkText}</span>
                  &nbsp;
                  <span className={classProps.input.dropLabel}>{labelText}</span>
                </label>
                <HelperText
                  id={`${inputId}-helper-text`}
                  registerAria={register}
                  helperText={helperText}
                  isDisabled={isUploadInteractionDisabled}
                />
              </div>
              <Button aria-hidden="true" isDisabled={isUploadInteractionDisabled} elementType="div">
                {buttonText}
              </Button>
            </div>
            {validationState && (
              <ValidationText
                elementType="span"
                id={`${inputId}-validation-text`}
                {...(hasValidationIcon && { hasValidationStateIcon: validationState })}
                validationText={validationText}
                registerAria={register}
                role={validationTextRole}
              />
            )}
          </div>
        )}
        {children}
      </div>
    </PropsProvider>
  );
};

UNSTABLE_FileUpload.spiritComponent = 'UNSTABLE_FileUpload';
UNSTABLE_FileUpload.displayName = 'UNSTABLE_FileUpload';

export default UNSTABLE_FileUpload;
