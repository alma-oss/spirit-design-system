'use client';

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { Button } from '../Button';
import { HelperText, Label, ValidationText } from '../Field';
import { useValidationTextRole } from '../Field/useValidationTextRole';
import { Icon } from '../Icon';
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
    validationState,
  });

  const { styleProps, props: transferProps } = useStyleProps(restProps);

  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });
  const inputId = id;

  useEffect(() => {
    if (isDragAndDropSupportedProp !== undefined) {
      return;
    }
    setIsDragAndDropDetected('draggable' in document.createElement('span'));
  }, [isDragAndDropSupportedProp]);

  return (
    <div
      {...transferProps}
      {...styleProps}
      {...(rootId != null && rootId !== '' ? { id: rootId } : {})}
      className={classNames(classProps.root, styleProps.className)}
    >
      {hasInput && (
        <div
          onDragOver={!isDisabled && isDragAndDropSupported ? onDragOver : undefined}
          onDragEnter={!isDisabled && isDragAndDropSupported ? onDragEnter : undefined}
          onDragLeave={!isDisabled && isDragAndDropSupported ? onDragLeave : undefined}
          onDrop={!isDisabled && isDragAndDropSupported ? onDrop : undefined}
          className={classProps.input.root}
        >
          <Label htmlFor={inputId} UNSAFE_className={classProps.input.label}>
            {label}
          </Label>
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
            disabled={isDisabled}
          />
          <div ref={dropZoneRef} className={classProps.input.dropZone.root}>
            {!isCompact && <Icon name={iconName} boxSize={28} aria-hidden="true" />}
            <div className={classProps.input.dropZone.content}>
              <Label htmlFor={inputId} UNSAFE_className={classProps.input.dropZone.label}>
                {linkText}
                {labelText && (
                  <>
                    {' '}
                    <span className={classProps.input.dropLabel}>{labelText}</span>
                  </>
                )}
              </Label>
              <HelperText
                UNSAFE_className={classProps.input.helper}
                id={`${inputId}-helper`}
                registerAria={register}
                helperText={helperText}
              />
            </div>
            {/* @ts-expect-error - Div cannot have type="button". This will be solved with https://jira.almacareer.tech/browse/DS-2168 */}
            <Button aria-hidden="true" isDisabled={isDisabled} elementType="div" type={null}>
              {buttonText}
            </Button>
          </div>
          {validationState && (
            <ValidationText
              UNSAFE_className={classProps.input.validationText}
              elementType="div"
              {...(hasValidationIcon && { hasValidationStateIcon: validationState })}
              id={`${inputId}-validation`}
              validationText={validationText}
              registerAria={register}
              role={validationTextRole}
            />
          )}
        </div>
      )}
      {children}
    </div>
  );
};

UNSTABLE_FileUpload.spiritComponent = 'UNSTABLE_FileUpload';
UNSTABLE_FileUpload.displayName = 'UNSTABLE_FileUpload';

export default UNSTABLE_FileUpload;
