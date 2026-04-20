'use client';

import React, { type ElementType, type MutableRefObject, useRef } from 'react';
import { Transition, type TransitionStatus } from 'react-transition-group';
import { useStyleProps } from '../../hooks';
import { type SpiritCollapseProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useCollapseAriaProps } from './useCollapseAriaProps';
import { useCollapseStyleProps } from './useCollapseStyleProps';
import { useResizeHeight } from './useResizeHeight';

const TRANSITION_DURATION = 250;

const transitioningStyles = {
  entering: 'is-transitioning',
  entered: '',
  exiting: 'is-transitioning',
  exited: '',
};

const defaultProps: Partial<SpiritCollapseProps> = {
  elementType: 'div',
  isOpen: false,
  collapsibleToBreakpoint: undefined,
  transitionDuration: TRANSITION_DURATION,
};

const Collapse = (props: SpiritCollapseProps) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, transitionDuration = TRANSITION_DURATION, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;

  const rootElementRef: MutableRefObject<HTMLElement | null> = useRef(null);
  const collapseElementRef: MutableRefObject<HTMLElement | null> = useRef(null);
  const collapseHeight = useResizeHeight(collapseElementRef);

  const { classProps, styleProps: collapseStyleProps } = useCollapseStyleProps(
    restProps.isOpen,
    Component,
    collapseHeight,
  );
  const { ariaProps, props: otherProps } = useCollapseAriaProps(restProps);
  const { styleProps, props: transferProps } = useStyleProps(otherProps);

  const mergedCollapseStyleProps = {
    className: styleProps.className,
    style: { ...collapseStyleProps, ...styleProps.style },
  };

  // For inline elements, when open, render content outside the collapse element
  const isInlineElement = Component === 'span';
  if (isInlineElement && restProps.isOpen) {
    return children;
  }

  return (
    <Transition in={restProps.isOpen} nodeRef={rootElementRef} timeout={transitionDuration}>
      {(transitionState: TransitionStatus) => (
        <Component
          {...transferProps}
          {...ariaProps.root}
          {...mergeStyleProps(Component, {
            classProps: classProps.root,
            styleProps,
            collapseStyleProps: mergedCollapseStyleProps,
            transitioningStyles: transitioningStyles[transitionState as keyof typeof transitioningStyles],
          })}
          ref={rootElementRef}
        >
          <Component ref={collapseElementRef} className={classProps.content}>
            {children}
          </Component>
        </Component>
      )}
    </Transition>
  );
};

Collapse.spiritComponent = 'Collapse';
Collapse.displayName = 'Collapse';

export default Collapse;
