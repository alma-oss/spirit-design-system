'use client';

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { HelperText, Label, ValidationText } from '../Field';
import { useValidationTextRole } from '../Field/useValidationTextRole';
import { Icon } from '../Icon';
import { type UnstableFileUploadProps } from './types';
import { useFileUploadState } from './useFileUploadState';
import { useFileUploadStyleProps } from './useFileUploadStyleProps';

const UNSTABLE_FileUpload = (props: UnstableFileUploadProps) => {
  const [isDragAndDropSupported, setIsDragAndDropSupported] = useState(false);
  const {
    'aria-describedby': ariaDescribedBy = '',
    accept,
    children,
    dropZoneRef,
    hasValidationIcon,
    helperText,
    iconName = 'upload',
    id,
    inputRef,
    isDisabled,
    isFluid,
    isLabelHidden,
    isMultiple,
    isRequired,
    label,
    labelText,
    linkText,
    name,
    onFilesSelected,
    validationState,
    validationText,
    ...restProps
  } = props;

  const hasInput = name !== undefined;

  const { isDragging, onChange, onDragEnter, onDragLeave, onDragOver, onDrop } = useFileUploadState({
    onFilesSelected: hasInput ? onFilesSelected : undefined,
  });

  const { classProps } = useFileUploadStyleProps({
    hasValidationIcon,
    isDisabled,
    isDragAndDropSupported,
    isDragging,
    isFluid,
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
  const inputId = `${id}-input`;

  useEffect(() => {
    setIsDragAndDropSupported('draggable' in document.createElement('span'));
  }, []);

  return (
    <div id={id} {...transferProps} {...styleProps} className={classNames(classProps.root, styleProps.className)}>
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
            <Icon name={iconName} aria-hidden="true" />
            <Label htmlFor={inputId} UNSAFE_className={classProps.input.dropZone.label}>
              <span className={classProps.input.link}>{linkText}</span>
              &nbsp;
              <span className={classProps.input.dropLabel}>{labelText}</span>
            </Label>
            <HelperText
              UNSAFE_className={classProps.input.helper}
              id={`${inputId}__helperText`}
              registerAria={register}
              helperText={helperText}
            />
          </div>
          {validationState && (
            <ValidationText
              UNSAFE_className={classProps.input.validationText}
              elementType="span"
              {...(hasValidationIcon && { hasValidationStateIcon: validationState })}
              id={`${inputId}__validationText`}
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
