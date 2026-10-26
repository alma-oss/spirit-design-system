'use client';

import React, { type ForwardedRef, forwardRef, useCallback, useMemo, useRef } from 'react';
import { Direction } from '../../constants';
import { ContextPropsProvider } from '../../context';
import { ToolbarContextProvider, useStyleProps, useToolbarAria, useToolbarState } from '../../hooks';
import { type ForwardRefComponent, type SpiritToolbarProps } from '../../types';
import { mergeStyleProps } from '../../utils';

// The list and its items are presentational, so they are not announced on top of the toolbar.
const PRESENTATION_PROPS = { role: 'presentation' };

const _Toolbar = (props: SpiritToolbarProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { children, onFocus, onKeyDown, orientation = Direction.HORIZONTAL, ...restProps } = props;
  const toolbarRef = useRef<HTMLDivElement | null>(null);

  const state = useToolbarState();
  const { toolbarProps } = useToolbarAria({ onFocus, onKeyDown, orientation }, state, toolbarRef);
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps('div', { styleProps, otherProps });
  const contextValue = useMemo(() => ({ register: state.register }), [state.register]);

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
      <ContextPropsProvider
        value={{
          // The Toolbar owns the layout and the ARIA of the Navigation inside it.
          toolbar: { direction: orientation, elementType: 'div', listProps: PRESENTATION_PROPS },
          toolbarItem: PRESENTATION_PROPS,
        }}
      >
        <ToolbarContextProvider value={contextValue}>{children}</ToolbarContextProvider>
      </ContextPropsProvider>
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
