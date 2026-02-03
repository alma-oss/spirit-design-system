'use client';

import React, {
  Children,
  type ForwardedRef,
  type MutableRefObject,
  type ReactElement,
  cloneElement,
  forwardRef,
  useRef,
} from 'react';
import { useCancelEvent, useClickOutside } from '../../hooks';
import { type DialogProps } from '../../types';
import { useDialog } from './useDialog';

// @TODO: Type 'MutableRefObject<ForwardedRef<HTMLDialogElement | null>>' is not assignable to type 'MutableRefObject<HTMLDialogElement | null>'.
// Solved using `as MutableRefObject<HTMLDialogElement | null>` but I do not like it

const Dialog = (
  props: DialogProps & { isOpen: boolean; onClose: (event: Event) => void },
  ref: ForwardedRef<HTMLDialogElement | null>,
): JSX.Element => {
  const { children, isOpen, onClose, closeOnBackdropClick = true, closeOnEscapeKeyDown, ...restProps } = props;
  const dialogElementRef: MutableRefObject<ForwardedRef<HTMLDialogElement | null>> = useRef(ref);
  const contentElementRef: MutableRefObject<HTMLElement | null> = useRef(null);

  // handles toggling based on state
  const { closeDialog, onTransitionEnd } = useDialog(
    dialogElementRef as MutableRefObject<HTMLDialogElement | null>,
    isOpen,
  );
  const handleClickOutside = (event: Event) => {
    // check if it should be closed on backdrop click and if the click was on backdrop (dialog element, not on dialog content)
    if (closeOnBackdropClick && event.target === dialogElementRef.current) {
      closeDialog();
      onClose(event);
    }
  };

  // handles closing by clicking outside the dialog
  useClickOutside({
    ref: contentElementRef,
    callback: isOpen ? handleClickOutside : undefined,
  });

  // handles closing using Escape key
  useCancelEvent(
    dialogElementRef as MutableRefObject<HTMLDialogElement | null>,
    onClose,
    closeOnEscapeKeyDown as boolean,
    isOpen,
  );

  /**
   * Make sure that there is only one child wrapped in dialog element.
   * Otherwise we cannot distinguish between dialog content and dialog backdrop, which is dialog element itself.
   * useClickOutside hook uses refs to dialog and content elements to find out whether it was clicked on backdrop
   * and dialog should be closed.
   *
   * @see https://reactjs.org/docs/react-api.html#reactchildren
   * @throws Error
   */
  const child = Children.only(children);

  return (
    <dialog
      ref={dialogElementRef as MutableRefObject<HTMLDialogElement | null>}
      onTransitionEnd={onTransitionEnd}
      {...restProps}
    >
      {cloneElement(child as ReactElement, {
        ref: (clonedElementRef: HTMLElement) => {
          contentElementRef.current = clonedElementRef;
        },
      })}
    </dialog>
  );
};

Dialog.spiritComponent = 'Dialog';

export default forwardRef(Dialog);
