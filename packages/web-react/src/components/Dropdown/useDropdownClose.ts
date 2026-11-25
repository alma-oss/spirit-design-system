'use client';

import { type MutableRefObject, useCallback, useRef, useState } from 'react';
import { type DropdownMenuFocus } from './DropdownContext';

export interface UseDropdownCloseProps {
  isOpen: boolean;
  onToggle: () => void;
  triggerRef: MutableRefObject<HTMLElement | null | undefined>;
}

export interface UseDropdownCloseReturn {
  /** Close the popover and return focus to the trigger, for `useOverlay` */
  closeOverlay: () => void;
  menuFocusRef: MutableRefObject<DropdownMenuFocus>;
  menuId: string | null;
  /** Close the popover; focus returns to the trigger unless `returnFocus` is `false` */
  onClose: (returnFocus?: boolean) => void;
  registerMenu: (menuId: string) => () => void;
}

/**
 * Closing a Dropdown and the `Menu` registered inside its popover.
 *
 * @param props Hook configuration
 * @param props.isOpen Whether the popover is open
 * @param props.onToggle Toggle the popover
 * @param props.triggerRef Ref of the trigger; receives focus after the popover closes
 * @returns {UseDropdownCloseReturn} Context values for `DropdownProvider` and `closeOverlay` for `useOverlay`
 */
export const useDropdownClose = ({ isOpen, onToggle, triggerRef }: UseDropdownCloseProps): UseDropdownCloseReturn => {
  const [menuId, setMenuId] = useState<string | null>(null);
  const menuFocusRef = useRef<DropdownMenuFocus>('first');

  const onClose = useCallback(
    (returnFocus = true) => {
      if (!isOpen) {
        return;
      }

      onToggle();

      if (returnFocus) {
        queueMicrotask(() => {
          triggerRef.current?.focus();
        });
      }
    },
    [isOpen, onToggle, triggerRef],
  );

  const closeOverlay = useCallback(() => onClose(), [onClose]);

  const registerMenu = useCallback((registeredMenuId: string) => {
    setMenuId(registeredMenuId);

    return () => setMenuId((currentMenuId) => (currentMenuId === registeredMenuId ? null : currentMenuId));
  }, []);

  return { closeOverlay, menuFocusRef, menuId, onClose, registerMenu };
};
