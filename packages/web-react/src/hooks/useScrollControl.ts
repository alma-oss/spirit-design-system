'use client';

import { type MutableRefObject, useEffect } from 'react';

const CLASSNAME_SCROLLING_DISABLED = 'is-scrolling-disabled';

const disableScroll = () => {
  const { body } = document;
  const scrollBarWidth = window.innerWidth - body.clientWidth;

  body.style.paddingRight = `${scrollBarWidth}px`;
  body.classList.add(CLASSNAME_SCROLLING_DISABLED);
};

const enableScroll = () => {
  const { body } = document;
  body.style.paddingRight = '';
  body.classList.remove(CLASSNAME_SCROLLING_DISABLED);
};

export const useScrollControl = (ref: MutableRefObject<HTMLDialogElement | null>, isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      disableScroll();
    } else if (ref.current && !ref.current.open) {
      enableScroll();
    }

    /**
     * Cleanup scrolling when unmounting
     *
     * @see https://jira.almacareer.tech/browse/DS-1126
     *
     * When the use of the Dialog in page is optimized by the condition like
     * `isOpen && <Dialog />`, the Dialog component will be unmounted sooner
     * than the Dialog is closed correctly and all side effects are fulfilled.
     * In this case, the class and style attributes added to the body element
     * will not be removed, and the page will be scrolled.
     */
    return () => {
      enableScroll();
    };
  }, [isOpen, ref]);
};
