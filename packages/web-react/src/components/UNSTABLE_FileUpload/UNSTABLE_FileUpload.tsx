'use client';

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { PropsProvider } from '../../context';
import { useAriaDescribedBy, useAriaIds, useStyleProps } from '../../hooks';
import { HelperText } from '../HelperText';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { ValidationText, useValidationTextRole } from '../ValidationText';
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

  const [ids, register] = useAriaIds(ariaDescribedBy);
  const ariaDescribedByProp = useAriaDescribedBy(ids);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });
  const inputId = `${id}-input`;

  useEffect(() => {
    setIsDragAndDropSupported('draggable' in document.createElement('span'));
  }, []);

  return (
    <PropsProvider
      value={{
        isDisabled,
        isLabelHidden,
        isRequired,
        validationState,
      }}
    >
      <div id={id} {...transferProps} {...styleProps} className={classNames(classProps.root, styleProps.className)}>
        {hasInput && (
          <div
            onDragOver={!isDisabled && isDragAndDropSupported ? onDragOver : undefined}
            onDragEnter={!isDisabled && isDragAndDropSupported ? onDragEnter : undefined}
            onDragLeave={!isDisabled && isDragAndDropSupported ? onDragLeave : undefined}
            onDrop={!isDisabled && isDragAndDropSupported ? onDrop : undefined}
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
              disabled={isDisabled}
            />
            <div ref={dropZoneRef} className={classProps.input.dropZone.root}>
              <Icon name={iconName} aria-hidden="true" />
              <label htmlFor={inputId} className={classProps.input.dropZone.label}>
                <span className={classProps.input.link}>{linkText}</span>
                &nbsp;
                <span className={classProps.input.dropLabel}>{labelText}</span>
              </label>
              <HelperText id={`${inputId}-helper-text`} registerAria={register} helperText={helperText} />
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
