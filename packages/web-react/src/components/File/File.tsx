'use client';

import classNames from 'classnames';
import React, { type ElementType } from 'react';
import { PropsProvider } from '../../context';
import { useI18n, useStyleProps } from '../../hooks';
import { ControlButton } from '../ControlButton';
import { Flex } from '../Flex';
import { HelperText } from '../HelperText';
import { Icon } from '../Icon';
import { Truncate } from '../Truncate';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import { VisuallyHidden } from '../VisuallyHidden';
import { DEFAULT_FILE_ACTION_BUTTON_ICON_NAME, DEFAULT_FILE_ICON_NAME } from './constants';
import { type SpiritFileProps } from './types';
import { useFileStyleProps } from './useFileStyleProps';

const defaultProps = {
  elementType: 'li' as const,
  iconName: DEFAULT_FILE_ICON_NAME,
};

const File = <E extends ElementType = 'li'>(props: SpiritFileProps<E>): JSX.Element => {
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
    size: 'medium' as const,
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
    <PropsProvider
      value={{
        isDisabled,
        validationState,
      }}
    >
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
              <Truncate limit={1} UNSAFE_className="text-word-break-long-words">
                {label}
              </Truncate>
            </span>
            <HelperText helperText={helperText} />
            {validationState && (
              <ValidationText
                {...(hasValidationIcon && { validationStateIcon: validationState })}
                validationText={validationText}
                role={validationTextRole}
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
    </PropsProvider>
  );
};

File.spiritComponent = 'File';
File.displayName = 'File';

export default File;
