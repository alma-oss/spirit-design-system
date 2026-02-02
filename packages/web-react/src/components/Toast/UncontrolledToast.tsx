'use client';

import React from 'react';
import { useI18n } from '../../hooks';
import { type UncontrolledToastProps } from '../../types';
import Toast from './Toast';
import ToastBar from './ToastBar';
import ToastBarLink from './ToastBarLink';
import ToastBarMessage from './ToastBarMessage';
import { useToast } from './useToast';

const UncontrolledToast = (props: UncontrolledToastProps) => {
  const { t } = useI18n();
  const { alignmentX, alignmentY, isCollapsible, closeLabel, ...restProps } = props;
  const resolvedCloseLabel = closeLabel ?? t('common.close');
  const { hide, queue } = useToast();

  return (
    <Toast alignmentX={alignmentX} alignmentY={alignmentY} isCollapsible={isCollapsible}>
      {queue.map((item) => {
        const { color, iconName, id, isOpen, content, hasIcon, isDismissible, linkProps } = item;

        return (
          <ToastBar
            {...restProps}
            key={id}
            id={id}
            closeLabel={resolvedCloseLabel}
            color={color}
            hasIcon={hasIcon}
            iconName={iconName}
            isDismissible={isDismissible}
            onClose={() => hide(id)}
            isOpen={isOpen && !!content}
          >
            <ToastBarMessage>{content.message}</ToastBarMessage>
            {content.link && <ToastBarLink {...linkProps}>{content.link}</ToastBarLink>}
          </ToastBar>
        );
      })}
    </Toast>
  );
};

UncontrolledToast.spiritComponent = 'UncontrolledToast';

export default UncontrolledToast;
