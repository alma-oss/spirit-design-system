'use client';

import React, { type ForwardedRef, forwardRef, useEffect, useId, useMemo, useRef } from 'react';
import { ContextPropsProvider } from '../../context';
import { MenuContextProvider, useIsomorphicLayoutEffect, useMenuAria, useMenuState, useStyleProps } from '../../hooks';
import { type ForwardRefComponent, type SpiritMenuProps } from '../../types';
import { mergeRefs, mergeStyleProps } from '../../utils';
import { useDropdownContext } from '../Dropdown/DropdownContext';

// Menu items are buttons by default, so Enter and Space activate them natively.
const MENU_ITEM_PROPS = { elementType: 'button', role: 'menuitem' };

const _Menu = (props: SpiritMenuProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { children, id: idProp, onClick, onFocus, onKeyDown, ...restProps } = props;
  const menuRef = useRef<HTMLDivElement | null>(null);
  const tabOutTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const { isOpen, menuFocusRef, onClose, registerMenu } = useDropdownContext();

  const state = useMenuState();
  const { menuProps } = useMenuAria(
    {
      onAction: () => onClose?.(),
      onClick,
      onFocus,
      onKeyDown,
      // Close once the browser has moved focus, so hiding the popover does not interrupt it.
      onTabOut: () => {
        tabOutTimeoutRef.current = setTimeout(() => onClose?.(false));
      },
    },
    state,
    menuRef,
  );
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps('div', { styleProps, otherProps });
  const contextValue = useMemo(() => ({ register: state.register }), [state.register]);
  const setRef = useMemo(() => mergeRefs(menuRef, ref), [ref]);

  useIsomorphicLayoutEffect(() => registerMenu?.(id), [id, registerMenu]);

  useEffect(() => () => clearTimeout(tabOutTimeoutRef.current), []);

  // Inside a Dropdown, opening the menu moves focus to its first item, or to the last one after ArrowUp.
  useEffect(() => {
    if (!isOpen || !menuFocusRef) {
      return;
    }

    const item = state.getNextItem(null, menuFocusRef.current);
    const control = item && state.getItemControl(item);

    if (item && control) {
      state.setActiveItem(item);
      control.focus();
    }

    menuFocusRef.current = 'first';
  }, [isOpen, menuFocusRef, state]);

  return (
    <div {...otherProps} {...mergedStyleProps} {...menuProps} id={id} ref={setRef}>
      <ContextPropsProvider value={{ item: MENU_ITEM_PROPS }}>
        <MenuContextProvider value={contextValue}>{children}</MenuContextProvider>
      </ContextPropsProvider>
    </div>
  );
};

const Menu = forwardRef<HTMLDivElement, SpiritMenuProps>(_Menu) as ForwardRefComponent<HTMLDivElement, SpiritMenuProps>;

Menu.spiritComponent = 'Menu';
Menu.displayName = 'Menu';

export default Menu;
