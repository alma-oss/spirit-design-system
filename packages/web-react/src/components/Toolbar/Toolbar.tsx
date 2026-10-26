'use client';

import React, { type ForwardedRef, forwardRef, useCallback, useMemo, useRef } from 'react';
import { Direction } from '../../constants';
import { ToolbarContextProvider, useStyleProps, useToolbarAria, useToolbarState } from '../../hooks';
import { type ForwardRefComponent, type SpiritToolbarProps } from '../../types';
import { mergeStyleProps } from '../../utils';

const _Toolbar = (props: SpiritToolbarProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { children, onFocus, onKeyDown, orientation = Direction.HORIZONTAL, ...restProps } = props;
  const toolbarRef = useRef<HTMLDivElement | null>(null);

  const state = useToolbarState();
  const { toolbarProps } = useToolbarAria({ onFocus, onKeyDown, orientation }, state, toolbarRef);
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps('div', { styleProps, otherProps });
  const contextValue = useMemo(() => ({ orientation, register: state.register }), [orientation, state.register]);

  const setRef = useCallback(
    (element: HTMLDivElement | null) => {
      toolbarRef.current = element;

      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        // eslint-disable-next-line no-param-reassign -- forwarding the element to the consumer's ref object
        ref.current = element;
      }
    },
    [ref],
  );

  return (
    <div {...otherProps} {...mergedStyleProps} {...toolbarProps} ref={setRef}>
      <ToolbarContextProvider value={contextValue}>{children}</ToolbarContextProvider>
    </div>
  );
};

const Toolbar = forwardRef<HTMLDivElement, SpiritToolbarProps>(_Toolbar) as ForwardRefComponent<
  HTMLDivElement,
  SpiritToolbarProps
>;

Toolbar.spiritComponent = 'Toolbar';
Toolbar.displayName = 'Toolbar';

export default Toolbar;
