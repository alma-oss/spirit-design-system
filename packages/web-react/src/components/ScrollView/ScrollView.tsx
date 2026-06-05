'use client';

import classNames from 'classnames';
import React, { useRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritScrollViewProps } from '../../types';
import { SCROLL_VIEW_DEFAULT_DIRECTION, SCROLL_VIEW_DEFAULT_OVERFLOW_DECORATOR } from './constants';
import ScrollViewControls from './ScrollViewControls';
import { useScrollPosition } from './useScrollPosition';
import { useScrollViewStyleProps } from './useScrollViewStyleProps';

const ScrollView = (props: SpiritScrollViewProps) => {
  const {
    ariaLabelControls,
    controlsScrollStep = 300,
    children,
    direction = SCROLL_VIEW_DEFAULT_DIRECTION,
    hasControls = false,
    isScrollbarDisabled,
    overflowDecorators = SCROLL_VIEW_DEFAULT_OVERFLOW_DECORATOR,
    ...restProps
  } = props;

  const contentReference = useRef(null);
  const viewportReference = useRef<HTMLDivElement>(null);

  const { isScrolledAtEnd, isScrolledAtStart, onScroll } = useScrollPosition({
    contentReference,
    direction,
    viewportReference,
  });
  const { classProps } = useScrollViewStyleProps({
    direction,
    isScrollbarDisabled,
    isScrolledAtStart,
    isScrolledAtEnd,
    overflowDecorators,
  });
  const { styleProps, props: transferProps } = useStyleProps(restProps);

  return (
    <div {...transferProps} {...styleProps} className={classNames(classProps.root, styleProps.className)}>
      {/* To make scrollable element keyboard accessible, we need to add tabindex to it. */}
      {/* This is recommended solution, both by the eslint plugin and by WAI. */}
      {/* https://www.w3.org/WAI/standards-guidelines/act/rules/0ssw9k/ */}
      {/* https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-tabindex.md#case-shouldnt-i-add-a-tabindex-so-that-users-can-navigate-to-this-item */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div className={classProps.viewport} onScroll={onScroll} ref={viewportReference} tabIndex={0}>
        <div className={classProps.content} ref={contentReference}>
          {children}
        </div>
      </div>
      <div className={classProps.overflowDecorators} aria-hidden="true" />

      {hasControls && (
        <ScrollViewControls
          ariaLabelControls={ariaLabelControls}
          direction={direction}
          scrollStep={controlsScrollStep}
          viewportRef={viewportReference}
        />
      )}
    </div>
  );
};

ScrollView.spiritComponent = 'ScrollView';

export default ScrollView;
