'use client';

import classNames from 'classnames';
import React, { type MutableRefObject, useRef } from 'react';
import { Transition, type TransitionStatus } from 'react-transition-group';
import { useDeprecationMessage, useStyleProps } from '../../hooks';
import { type SpiritToastBarProps } from '../../types';
import { CloseButton } from '../CloseButton';
import { Icon } from '../Icon';
import { DEFAULT_TOAST_COLOR, ICON_BOX_SIZE, TRANSITIONING_STYLES, TRANSITION_DURATION } from './constants';
import { useToastBarStyleProps } from './useToastBarStyleProps';
import { useToastIcon } from './useToastIcon';

const ToastBar = (props: SpiritToastBarProps) => {
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
    strings,
    ...restProps
  } = props;
  const rootElementRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const toastIconName = useToastIcon({ color, iconName });
  const { classProps, props: modifiedProps } = useToastBarStyleProps({
    ...restProps,
    color,
    isDismissible,
  });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);

  useDeprecationMessage({
    method: 'custom',
    trigger: closeLabel != null,
    componentName: 'ToastBar',
    customText:
      'The "closeLabel" property is deprecated and will be removed in the next major version. Use "strings.ariaLabelClose" instead.',
  });

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
              <CloseButton
                size="medium"
                onClick={onClose}
                aria-expanded={isOpen}
                aria-controls={id}
                strings={{ ariaLabel: strings?.ariaLabelClose ?? closeLabel }}
              />
            )}
          </div>
        </div>
      )}
    </Transition>
  );
};

ToastBar.spiritComponent = 'ToastBar';

export default ToastBar;
