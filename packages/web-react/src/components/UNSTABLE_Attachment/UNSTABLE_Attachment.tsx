'use client';

import classNames from 'classnames';
import React, { type ElementType } from 'react';
import { useClassNamePrefix, useI18n, useStyleProps } from '../../hooks';
import { Icon } from '../Icon';
import { DEFAULT_ATTACHMENT_ICON_NAME } from './constants';
import { type SpiritUnstableAttachmentProps } from './types';
import UNSTABLE_AttachmentActionButton from './UNSTABLE_AttachmentActionButton';
import UNSTABLE_AttachmentDismissButton from './UNSTABLE_AttachmentDismissButton';
import { useAttachmentStyleProps } from './useAttachmentStyleProps';

const defaultProps = {
  elementType: 'li' as const,
  iconName: DEFAULT_ATTACHMENT_ICON_NAME,
};

const UNSTABLE_Attachment = <E extends ElementType = 'li'>(props: SpiritUnstableAttachmentProps<E>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { t } = useI18n();
  const { editText, elementType, iconName, id, label, onDismiss, onChange, removeText, previewSlot, ...restProps } =
    propsWithDefaults;
  const resolvedEditText = editText ?? t('attachment.edit');
  const resolvedRemoveText = removeText ?? t('attachment.remove');
  const { classProps } = useAttachmentStyleProps();
  const { styleProps, props: transferProps } = useStyleProps(restProps);

  const Component = elementType as ElementType;

  return (
    <Component {...transferProps} {...styleProps} id={id} className={classNames(classProps.root, styleProps.className)}>
      {previewSlot ?? <Icon name={iconName} aria-hidden="true" />}
      <span className={classProps.name}>
        <span className={useClassNamePrefix('text-truncate')}>{label}</span>
      </span>
      {onChange && (
        <span className={classProps.slot}>
          <UNSTABLE_AttachmentActionButton onClick={onChange}>{resolvedEditText}</UNSTABLE_AttachmentActionButton>
        </span>
      )}
      <UNSTABLE_AttachmentDismissButton onClick={onDismiss}>{resolvedRemoveText}</UNSTABLE_AttachmentDismissButton>
    </Component>
  );
};

UNSTABLE_Attachment.spiritComponent = 'UNSTABLE_Attachment';
UNSTABLE_Attachment.displayName = 'UNSTABLE_Attachment';

export default UNSTABLE_Attachment;
