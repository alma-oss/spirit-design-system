'use client';

import classNames from 'classnames';
import React, { type MutableRefObject, useRef } from 'react';
import { Transition, type TransitionStatus } from 'react-transition-group';
import { useI18n, useStyleProps } from '../../hooks';
import { type SpiritToastBarProps } from '../../types';
import { ControlButton } from '../ControlButton';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import { DEFAULT_TOAST_COLOR, ICON_BOX_SIZE, TRANSITIONING_STYLES, TRANSITION_DURATION } from './constants';
import { useToastBarStyleProps } from './useToastBarStyleProps';
import { useToastIcon } from './useToastIcon';

const ToastBar = (props: SpiritToastBarProps) => {
  const { t } = useI18n();
  const {
    id,
    children,
    closeLabel,
    color = DEFAULT_TOAST_COLOR,
    hasIcon,
    iconName,
    isDismissible,
    isOpen = true,
    onClose = () => {},
    ...restProps
  } = props;
  const resolvedCloseLabel = closeLabel ?? t('common.close');
  const rootElementRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const toastIconName = useToastIcon({ color, iconName });
  const { classProps, props: modifiedProps } = useToastBarStyleProps({
    ...restProps,
    color,
    isDismissible,
  });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);

  return (
    <Transition in={isOpen} nodeRef={rootElementRef} timeout={TRANSITION_DURATION} unmountOnExit>
      {(transitionState: TransitionStatus) => (
        <div
          {...styleProps}
          {...otherProps}
          id={id}
          className={classNames(classProps.root, TRANSITIONING_STYLES[transitionState], styleProps.className)}
          ref={rootElementRef}
        >
          <div className={classProps.box}>
            <div className={classProps.container}>
              {(hasIcon || iconName) && <Icon name={toastIconName} boxSize={ICON_BOX_SIZE} />}
              <div className={classProps.content}>{children}</div>
            </div>
            {isDismissible && onClose && (
              <ControlButton isSymmetrical size="large" onClick={onClose} aria-expanded={isOpen} aria-controls={id}>
                <Icon name="close" />
                <VisuallyHidden>{resolvedCloseLabel}</VisuallyHidden>
              </ControlButton>
            )}
          </div>
        </div>
      )}
    </Transition>
  );
};

ToastBar.spiritComponent = 'ToastBar';

export default ToastBar;
