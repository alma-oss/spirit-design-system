import BaseComponent from './BaseComponent';
import { warning } from './common/utilities';
import { CLASS_NAME_OPEN, EVENT_KEY_ESCAPE } from './constants';
import EventHandler from './dom/EventHandler';
import SelectorEngine from './dom/SelectorEngine';
import { enableToggleTrigger, executeAfterTransition, ScrollControl, SpiritConfig } from './utils';
import { type SpiritElement } from './types';

// TODO: Remove `handleKeyDown` listener when Chrome fixes the bug,
// right now Chrome is bugged and sends un-cancelable events, so closing modal based on
// `cancel` event is not possible in Chrome.
// Firefox and Safari are working fine.
// @see: https://issues.chromium.org/issues/351867704

const NAME = 'modal';

const MODAL_TOGGLE_SELECTOR = '[data-spirit-toggle="modal"]';

type Config = {
  closeOnEscapeKeyDown: boolean;
};

class Modal extends BaseComponent {
  isShown: boolean;
  isTouchDevice: boolean;
  scrollControl: ScrollControl;
  mouseDownTarget: EventTarget | null = null;

  static get NAME() {
    return NAME;
  }

  constructor(element: SpiritElement, config?: SpiritConfig) {
    super(element, config);

    this.isShown = false;
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    this.scrollControl = new ScrollControl(element as HTMLElement);
  }

  // Using `unknown` - Object is possibly 'null'.
  // Using `Element | Window` - Property 'hasAttribute' does not exist on type 'EventTarget'.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick(event: Event & { target: any }) {
    // Segregate clicks that may start inside dialog but end outside.
    // Skip this check for keyboard-triggered clicks (event.detail === 0) to support
    // spacebar/enter activation of dismiss buttons.
    const isKeyboardClick = (event as UIEvent)?.detail === 0;
    if (!isKeyboardClick && event.target !== this.mouseDownTarget) {
      return;
    }

    if (event.target === this.element || event.target.dataset.spiritDismiss) {
      event.preventDefault();
      event.stopPropagation();
      if (
        !event.target.dataset.spiritCloseOnBackdropClick ||
        event.target.dataset.spiritCloseOnBackdropClick === 'true'
      ) {
        this.hide(event);
      }
    }
  }

  onMouseDown(event: Event & { target: unknown }) {
    this.mouseDownTarget = event.target;
  }

  onDialogClose(event: KeyboardEvent) {
    // Do nothing if the event was already processed.
    if (event.defaultPrevented) {
      return;
    }

    this.hide(event);

    // Cancel the default action to avoid it being handled twice.
    event.preventDefault();
  }

  handleCancel(event: Event) {
    const { closeOnEscapeKeyDown } = this.config as Config;

    if (closeOnEscapeKeyDown === false) {
      event.preventDefault();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const { closeOnEscapeKeyDown } = this.config as Config;

    if (event.key === EVENT_KEY_ESCAPE && closeOnEscapeKeyDown === false && this.isShown) {
      event.preventDefault();
    }
  }

  addEventListeners() {
    EventHandler.on(this.element, 'close', (event: KeyboardEvent) => this.onDialogClose(event));
    if (this.isTouchDevice) {
      EventHandler.on(window, 'touchstart', (event: Event & { target: Window }) => this.onClick(event));
    } else {
      EventHandler.on(window, 'mousedown', (event: Event & { target: Window }) => this.onMouseDown(event));
      EventHandler.on(window, 'click', (event: Event & { target: Window }) => this.onClick(event));
    }
    EventHandler.on(this.element, 'cancel', (event: Event) => this.handleCancel(event));
    EventHandler.on(document, 'keydown', (event: KeyboardEvent) => this.handleKeyDown(event));
  }

  removeEventListeners() {
    EventHandler.off(this.element, 'close', (event: KeyboardEvent) => this.onDialogClose(event));
    if (this.isTouchDevice) {
      EventHandler.off(window, 'touchstart', (event: Event & { target: Window }) => this.onClick(event));
    } else {
      EventHandler.off(window, 'mousedown', (event: Event & { target: Window }) => this.onMouseDown(event));
      EventHandler.off(window, 'click', (event: Event & { target: Window }) => this.onClick(event));
    }
    EventHandler.off(this.element, 'cancel', (event: Event) => this.handleCancel(event));
    EventHandler.off(document, 'keydown', (event: KeyboardEvent) => this.handleKeyDown(event));
  }

  show() {
    if (this.isShown) {
      return;
    }

    const toggleEl = SelectorEngine.findOne(MODAL_TOGGLE_SELECTOR, this.element);
    toggleEl?.setAttribute('aria-expanded', 'true');

    // Close the dialog first if it's already open to prevent InvalidStateError
    if (this.element?.open) {
      this.element.close();
    }

    this.element?.showModal();
    // Add visual state class after showing modal
    this.element?.classList.add(CLASS_NAME_OPEN);

    this.addEventListeners();
    this.isShown = true;

    this.scrollControl.disableScroll();
  }

  // Using `unknown` - Object is possibly 'null'.
  // Using `Element | Window` - Property 'hasAttribute' does not exist on type 'EventTarget'.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hide(event: Event & { target: any }) {
    let target;
    // hiding by resizing (or any other call without a real event target)
    if (!event?.target?.dataset) {
      target = this.element;
    } else {
      // `closest` (not just `event.target.dataset.spiritTarget` directly) so a click landing on a
      // nested child of the toggle (e.g. an icon inside the button) still resolves to the toggle.
      const toggleEl = (event.target as Element)?.closest?.('[data-spirit-target]');

      // hiding by clicking
      if (toggleEl) {
        target = SelectorEngine.findOne(toggleEl.getAttribute('data-spirit-target'));
        // hiding by keyboard
      } else {
        target = event.target;
      }
    }

    const toggleEl = SelectorEngine.findOne(MODAL_TOGGLE_SELECTOR, this.element);

    if (typeof target.close === 'function') {
      // Remove visual state class first to trigger transition
      target.classList.remove(CLASS_NAME_OPEN);

      // Wait for transition to complete before closing
      executeAfterTransition(target, () => {
        target.close();
        toggleEl?.setAttribute('aria-expanded', 'false');
        this.removeEventListeners();
        this.isShown = false;
        this.scrollControl.enableScroll();
      });
    } else {
      // If no close function, clean up immediately
      toggleEl?.setAttribute('aria-expanded', 'false');
      this.removeEventListeners();
      this.isShown = false;
      this.scrollControl.enableScroll();
    }
  }

  toggle(
    relatedTarget: HTMLElement | null,
    event: Event & { target: HTMLOrSVGElement; currentTarget: HTMLOrSVGElement },
  ) {
    if (!relatedTarget) {
      warning(
        false,
        '👻 Boo…! Target modal pane does not exist. Maybe you forgot to prefix the "data-spirit-target" selector with "#"? ',
      );

      return;
    }

    this.isShown ? this.hide(event) : this.show();
  }
}

enableToggleTrigger(Modal);

export default Modal;
