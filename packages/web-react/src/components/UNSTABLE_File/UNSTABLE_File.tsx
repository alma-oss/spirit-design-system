'use client';

import classNames from 'classnames';
import React, { type ElementType } from 'react';
import { useClassNamePrefix, useI18n, useStyleProps } from '../../hooks';
import { ControlButton } from '../ControlButton';
import { ValidationText } from '../Field';
import { useValidationTextRole } from '../Field/useValidationTextRole';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import { DEFAULT_FILE_ACTION_BUTTON_ICON_NAME, DEFAULT_FILE_ICON_NAME } from './constants';
import { type SpiritUnstableFileProps } from './types';
import { useFileStyleProps } from './useFileStyleProps';

const defaultProps = {
  elementType: 'li' as const,
  iconName: DEFAULT_FILE_ICON_NAME,
};

const UNSTABLE_File = <E extends ElementType = 'li'>(props: SpiritUnstableFileProps<E>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { t } = useI18n();
  const {
    editText,
    elementType,
    hasValidationIcon,
    helperText,
    iconName,
    id,
    isDisabled,
    label,
    onDismiss,
    onChange,
    previewSlot,
    removeText,
    validationState,
    validationText,
    ...restProps
  } = propsWithDefaults;

  const resolvedEditText = editText ?? t('attachment.edit');
  const resolvedRemoveText = removeText ?? t('attachment.remove');
  const { classProps } = useFileStyleProps({ isDisabled, validationState });
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  const fileRowControlButtonProps = {
    size: 'large' as const,
    isSymmetrical: true as const,
    isDisabled,
  };

  const editActionButton = onChange ? (
    <ControlButton {...fileRowControlButtonProps} onClick={onChange}>
      <VisuallyHidden>{resolvedEditText}</VisuallyHidden>
      <Icon name={DEFAULT_FILE_ACTION_BUTTON_ICON_NAME} boxSize={16} aria-hidden="true" />
    </ControlButton>
  ) : null;

  const dismissActionButton = onDismiss ? (
    <ControlButton {...fileRowControlButtonProps} onClick={onDismiss}>
      <VisuallyHidden>{resolvedRemoveText}</VisuallyHidden>
      <Icon name="close" boxSize={16} aria-hidden="true" />
    </ControlButton>
  ) : null;

  const Component = elementType as ElementType;

  return (
    <Component
      {...transferProps}
      {...styleProps}
      {...(id != null && id !== '' ? { id } : {})}
      className={classNames(classProps.root, styleProps.className)}
    >
      {previewSlot ?? (
        <div className={classProps.preview}>
          <Icon name={iconName} boxSize={20} aria-hidden="true" />
        </div>
      )}
      <div className={classProps.content}>
        <div className={classProps.text}>
          <span className={classProps.name}>
            <span className={useClassNamePrefix('text-truncate')}>{label}</span>
          </span>
          {helperText && <div className={classProps.helperText}>{helperText}</div>}
          {validationState && (
            <ValidationText
              UNSAFE_className={classProps.validationText}
              elementType="div"
              {...(hasValidationIcon && { hasValidationStateIcon: validationState })}
              role={validationTextRole}
              validationText={validationText}
            />
          )}
        </div>
      </div>
      {editActionButton && dismissActionButton ? (
        <Flex alignmentX={{ mobile: 'stretch', tablet: 'left' }} alignmentY="stretch" spacingX="space-500">
          {editActionButton}
          {dismissActionButton}
        </Flex>
      ) : (
        <>
          {editActionButton}
          {dismissActionButton}
        </>
      )}
    </Component>
  );
};

UNSTABLE_File.spiritComponent = 'UNSTABLE_File';
UNSTABLE_File.displayName = 'UNSTABLE_File';

export default UNSTABLE_File;
