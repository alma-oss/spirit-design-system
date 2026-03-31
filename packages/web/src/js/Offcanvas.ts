import { breakpoints } from '@alma-oss/spirit-design-tokens';
import BaseComponent from './BaseComponent';
import { warning } from './common/utilities';
import { CLASS_NAME_OPEN, EVENT_KEY_ESCAPE } from './constants';
import EventHandler from './dom/EventHandler';
import {
  enableDismissTrigger,
  enableToggleTrigger,
  executeAfterTransition,
  ScrollControl,
  SpiritConfig,
} from './utils';
import { SpiritElement } from './types';

const NAME = 'offcanvas';
const DATA_KEY = 'offcanvas';
const EVENT_KEY = `.${DATA_KEY}`;

const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;

const OFFCANVAS_BREAKPOINT = parseInt(breakpoints.desktop, 10);

const VARIABLE_BREAKPOINT_DESKTOP = '--spirit-breakpoint-desktop';

const CLASS_NAME_NON_MODAL = 'is-non-modal';

const ARIA_ATTRIBUTE_MODAL = 'aria-modal';

type Config = {
  closableOnBackdropClick: boolean;
  closableOnEscapeKey: boolean;
  modal: boolean;
};

const Default = {
  breakpointDesktop: OFFCANVAS_BREAKPOINT,
  closableOnBackdropClick: true,
  closableOnEscapeKey: true,
  modal: true,
};

const DefaultType = {
  breakpointDesktop: 'number',
  closableOnBackdropClick: 'boolean',
  closableOnEscapeKey: 'boolean',
  modal: 'boolean',
};

class Offcanvas extends BaseComponent {
  breakpoint: number;
  isShown: boolean;
  scrollControl: ScrollControl;

  static get Default() {
    return Default;
  }

  static get DefaultType() {
    return DefaultType;
  }

  static get NAME() {
    return NAME;
  }

  constructor(element: SpiritElement, config?: SpiritConfig) {
    const target = element;
    super(target, config);

    this.isShown = false;
    this.scrollControl = new ScrollControl(element);
    this.breakpoint = this.getBreakpoint();
  }

  getBreakpoint() {
    return (
      parseInt(getComputedStyle(document.documentElement).getPropertyValue(VARIABLE_BREAKPOINT_DESKTOP), 10) ||
      // @ts-ignore Object is of type 'unknown'.
      this.config?.breakpointDesktop
    );
  }

  // Using `unknown` - Object is possibly 'null'.
  // Using `Element | Window` - Property 'hasAttribute' does not exist on type 'EventTarget'.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick(event: Event & { target: any }) {
    if (event.target === this.element || event.target.dataset.spiritDismiss) {
      event.preventDefault();
      event.stopPropagation();

      // Check if backdrop click is enabled for closing
      if (event.target === this.element && !(this.config as Config)?.closableOnBackdropClick) {
        return;
      }

      this.hide();
    }
  }

  onWindowResize(event: Event & { target: Window }) {
    if (event.target.innerWidth >= this.breakpoint) {
      this.hide();
    }
  }

  onDialogClose(event: KeyboardEvent) {
    // Do nothing if the event was already processed.
    if (event.defaultPrevented) {
      return;
    }

    this.hide();

    // Cancel the default action to avoid it being handled twice.
    event.preventDefault();
  }

  onEscape = (event: KeyboardEvent) => {
    if (event.key === EVENT_KEY_ESCAPE) {
      event.preventDefault();

      // Check if escape key is enabled for closing
      if (!(this.config as Config)?.closableOnEscapeKey) {
        return;
      }

      this.hide();
    }
  };

  addEventListeners() {
    EventHandler.on(this.element, 'close', (event: KeyboardEvent) => this.onDialogClose(event));
    EventHandler.on(window, 'resize', (event: Event & { target: Window }) => this.onWindowResize(event));
    EventHandler.on(window, 'click', (event: Event & { target: Window }) => this.onClick(event));
    EventHandler.on(document, 'keydown', (event: KeyboardEvent) => this.onEscape(event));
  }

  removeEventListeners() {
    EventHandler.off(this.element, 'close', (event: KeyboardEvent) => this.onDialogClose(event));
    EventHandler.off(window, 'resize', (event: Event & { target: Window }) => this.onWindowResize(event));
    EventHandler.off(window, 'click', (event: Event & { target: Window }) => this.onClick(event));
    EventHandler.off(document, 'keydown', (event: KeyboardEvent) => this.onEscape(event));
  }

  show(relatedTarget: HTMLElement) {
    if (this.isShown) {
      return;
    }

    const showEvent = EventHandler.trigger(this.element, EVENT_SHOW, { relatedTarget });

    if (showEvent?.defaultPrevented) {
      return;
    }

    // Close the dialog first if it's already open to prevent InvalidStateError
    if (this.element.open) {
      this.element.close();
    }

    this.element.classList.add(CLASS_NAME_OPEN);
    const isModal = (this.config as Config)?.modal === true;

    if (isModal) {
      this.element.showModal();
      this.element.setAttribute(ARIA_ATTRIBUTE_MODAL, 'true');
      this.scrollControl.disableScroll();
    } else {
      this.element.show();
      this.element.setAttribute(ARIA_ATTRIBUTE_MODAL, 'false');
      this.element.classList.add(CLASS_NAME_NON_MODAL);
    }
    relatedTarget.setAttribute('aria-expanded', 'true');
    this.element.setAttribute('role', 'dialog');

    this.addEventListeners();
    this.isShown = true;

    EventHandler.trigger(this.element, EVENT_SHOWN, { relatedTarget });
  }

  hide() {
    if (!this.isShown) {
      return;
    }

    const hideEvent = EventHandler.trigger(this.element, EVENT_HIDE);

    if (hideEvent?.defaultPrevented) {
      return;
    }

    // Remove visual state class first to trigger transition
    this.element.classList.remove(CLASS_NAME_OPEN);

    // Wait for transition to complete before closing
    executeAfterTransition(this.element, () => {
      const isModal = (this.config as Config)?.modal === true;

      this.element.close();
      this.element.classList.remove(CLASS_NAME_NON_MODAL);
      this.element.removeAttribute(ARIA_ATTRIBUTE_MODAL);
      this.element.removeAttribute('role');

      this.removeEventListeners();
      this.isShown = false;

      EventHandler.trigger(this.element, EVENT_HIDDEN);

      if (isModal) {
        this.scrollControl.enableScroll();
      }
    });
  }

  toggle(targetElement: HTMLElement | null) {
    if (!targetElement) {
      warning(
        false,
        '👻 Boo…! Target dialog does not exist. Maybe you forgot to prefix the "data-spirit-target" selector with "#"? ',
      );

      return;
    }

    this.isShown ? this.hide() : this.show(targetElement);
  }
}

enableToggleTrigger(Offcanvas);
enableDismissTrigger(Offcanvas, 'hide');

export default Offcanvas;
