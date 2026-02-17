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
import { type DialogProps, type ForwardRefComponent } from '../../types';
import { useDialog } from './useDialog';

const _Dialog = (props: DialogProps, ref: ForwardedRef<HTMLDialogElement | null>): JSX.Element => {
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
  const child = Children.only(children) as ReactElement;

  return (
    <dialog
      ref={dialogElementRef as MutableRefObject<HTMLDialogElement | null>}
      onTransitionEnd={onTransitionEnd}
      {...restProps}
    >
      {cloneElement(child, {
        ref: (clonedElementRef: HTMLElement) => {
          contentElementRef.current = clonedElementRef;
        },
      })}
    </dialog>
  );
};

const Dialog = forwardRef<HTMLDialogElement | null, DialogProps>(_Dialog) as ForwardRefComponent<
  HTMLDialogElement | null,
  DialogProps
>;

Dialog.spiritComponent = 'Dialog';
Dialog.displayName = 'Dialog';

export default Dialog;
