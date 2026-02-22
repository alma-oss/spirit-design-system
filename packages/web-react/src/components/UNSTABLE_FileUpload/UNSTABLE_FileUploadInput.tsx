'use client';

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useAriaDescribedBy, useStyleProps } from '../../hooks';
import { HelperText, Label, ValidationText, useAriaIds } from '../Field';
import { useValidationTextRole } from '../Field/useValidationTextRole';
import { Icon } from '../Icon';
import { type SpiritUnstableFileUploadInputProps } from './types';
import { useFileUploadState } from './useFileUploadState';
import { useFileUploadStyleProps } from './useFileUploadStyleProps';

const UNSTABLE_FileUploadInput = (props: SpiritUnstableFileUploadInputProps) => {
  const [isDragAndDropSupported, setIsDragAndDropSupported] = useState(false);
  const {
    'aria-describedby': ariaDescribedBy = '',
    accept,
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
    name,
    onFilesSelected,
    validationState,
    validationText,
    ...restProps
  } = props;
  const { isDragging, onChange, onDragEnter, onDragLeave, onDragOver, onDrop } = useFileUploadState({
    onFilesSelected,
  });
  const { classProps } = useFileUploadStyleProps({
    hasValidationIcon,
    isDisabled,
    isDragAndDropSupported,
    isDragging,
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
        disabled={isDisabled}
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

UNSTABLE_FileUploadInput.spiritComponent = 'UNSTABLE_FileUploadInput';
UNSTABLE_FileUploadInput.displayName = 'UNSTABLE_FileUploadInput';

export default UNSTABLE_FileUploadInput;
