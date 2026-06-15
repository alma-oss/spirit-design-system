import BaseComponent from './BaseComponent';
import { EVENT_KEY_ESCAPE, KEY_ARROW_DOWN, KEY_ARROW_UP } from './constants';
import EventHandler from './dom/EventHandler';
import { getNextActiveElement, isVisible } from './dom/getNextActiveElement';
import SelectorEngine from './dom/SelectorEngine';
import { clickOutsideElement, enableToggleTrigger, SpiritConfig } from './utils';
import { SpiritElement } from './types';

interface DropdownStateProps {
  open: boolean;
}

interface DropdownOptionsProps {
  autoClose: boolean;
  keyboard: boolean;
  menuItemsSelector: string | null;
}

const NAME = 'dropdown';
const DATA_KEY = `${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const ARIA_EXPANDED_ATTRIBUTE = 'aria-expanded';
const ARIA_CONTROLS_ATTRIBUTE = 'aria-controls';
const CLASSNAME_DROPDOWN = 'DropdownWrapper';
export const CLASSNAME_EXPANDED = 'is-expanded';
export const CLASSNAME_OPEN = 'is-open';

class Dropdown extends BaseComponent {
  target: HTMLElement | null | undefined;
  reference: HTMLElement | null | undefined;
  state: DropdownStateProps;
  options: DropdownOptionsProps;

  constructor(element: SpiritElement, config?: SpiritConfig) {
    super(element, config);
    this.target = SelectorEngine.findOne(`${this.element.dataset.spiritTarget}`);
    this.reference = this.findReferenceElement();
    this.state = {
      open: false,
    };
    this.options = {
      autoClose: true,
      keyboard: false,
      menuItemsSelector: null,
    };

    if (this.getOptions().keyboard) {
      this.addKeyboardListeners();
    }
  }

  static get NAME() {
    return NAME;
  }

  getOptions() {
    const options = { ...this.options };
    const dataset = this.element?.dataset;
    const optionsAutoClose = dataset?.spiritAutoclose;

    if (optionsAutoClose) {
      options.autoClose = optionsAutoClose !== 'false';
    }

    if (dataset?.spiritDropdownKeyboard) {
      options.keyboard = dataset.spiritDropdownKeyboard !== 'false';
    }

    if (dataset?.spiritDropdownItems) {
      options.menuItemsSelector = dataset.spiritDropdownItems;
    }

    return options;
  }

  findReferenceElement() {
    let anchor = this.element;
    const { reference } = this.element.dataset;

    if (reference) {
      if (
        reference === 'parent' &&
        this.element.parentElement &&
        this.element.parentElement.classList.contains(CLASSNAME_DROPDOWN)
      ) {
        anchor = this.element.parentElement;
      } else if (reference.match(/(#)/g)) {
        anchor = SelectorEngine.findOne(reference);
      }
    }

    return anchor;
  }

  updateTriggerElement(open: boolean = this.state.open) {
    this.element.classList.toggle(CLASSNAME_EXPANDED, open);
    this.element.setAttribute(ARIA_EXPANDED_ATTRIBUTE, open);

    // Only derive aria-controls from data-spirit-target when the consumer has not provided one.
    // Components such as Combobox point aria-controls at a specific descendant (the listbox) rather
    // than the popover container, so an author-supplied value must be preserved. When we do set it,
    // strip the leading "#" so the value is a valid IDREF rather than a CSS selector.
    if (!this.element.hasAttribute(ARIA_CONTROLS_ATTRIBUTE)) {
      const target = this.element.dataset.spiritTarget;

      if (target) {
        this.element.setAttribute(ARIA_CONTROLS_ATTRIBUTE, target.replace(/^#/, ''));
      }
    }
  }

  updateTargetElement(open: boolean = this.state.open) {
    this.target?.classList.toggle(CLASSNAME_OPEN, open);
  }

  autoCloseHandler = (event: Event) => {
    const shouldClose = this.target && clickOutsideElement(this.target, event);

    if (event.target && shouldClose) {
      this.hide();
    }
  };

  show() {
    this.state.open = true;
    this.target && EventHandler.trigger(this.target, EVENT_SHOW);
    this.updateTriggerElement();
    this.updateTargetElement();
    setTimeout(() => {
      this.target && EventHandler.trigger(this.target, EVENT_SHOWN);
      if (this.getOptions().autoClose) {
        EventHandler.on(document, 'click', this.autoCloseHandler);
      }
    }, 0);
  }

  hide() {
    this.state.open = false;
    this.target && EventHandler.trigger(this.target, EVENT_HIDE);
    this.updateTriggerElement();
    this.updateTargetElement();
    EventHandler.off(document, 'click', this.autoCloseHandler);
    setTimeout(() => {
      this.target && EventHandler.trigger(this.target, EVENT_HIDDEN);
    }, 0);
  }

  toggle() {
    if (this.state.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  // Keyboard envelope ported from Bootstrap's `dataApiKeydownHandler`: ArrowUp/ArrowDown open the
  // popover and move focus through the menu items, Escape closes it and returns focus to the trigger.
  // Arrow keys are intentionally ignored when the trigger is an input/textarea (e.g. Combobox), which
  // owns its own arrow navigation; Escape still applies there.
  // @see https://github.com/twbs/bootstrap/blob/main/js/src/dropdown.js
  onKeydown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    const isInput = /input|textarea/i.test(target.tagName);
    const isEscapeEvent = event.key === EVENT_KEY_ESCAPE;
    const isUpOrDownEvent = event.key === KEY_ARROW_UP || event.key === KEY_ARROW_DOWN;

    if (!isUpOrDownEvent && !isEscapeEvent) {
      return;
    }

    if (isInput && !isEscapeEvent) {
      return;
    }

    event.preventDefault();

    if (isUpOrDownEvent) {
      if (!this.state.open) {
        this.show();
      }
      this.selectMenuItem(event);

      return;
    }

    if (this.state.open) {
      this.hide();
      this.element.focus();
    }
  };

  selectMenuItem(event: KeyboardEvent) {
    const { menuItemsSelector } = this.getOptions();

    if (!menuItemsSelector || !this.target) {
      return;
    }

    const items = SelectorEngine.findAll(menuItemsSelector, this.target).filter(isVisible);

    if (!items.length) {
      return;
    }

    const activeElement = event.target as HTMLElement;

    getNextActiveElement(items, activeElement, event.key === KEY_ARROW_DOWN, !items.includes(activeElement)).focus();
  }

  addKeyboardListeners() {
    EventHandler.on(this.element, 'keydown', this.onKeydown);

    if (this.target) {
      EventHandler.on(this.target, 'keydown', this.onKeydown);
    }
  }

  dispose() {
    EventHandler.off(this.element, 'keydown', this.onKeydown);

    if (this.target) {
      EventHandler.off(this.target, 'keydown', this.onKeydown);
    }

    super.dispose();
  }
}

enableToggleTrigger(Dropdown, 'toggle', 'trigger');

// Dropdown instances are created lazily on the first trigger click. Keyboard-enabled dropdowns must
// exist before any click so they can be opened from the keyboard, so eagerly instantiate those here
// (the constructor wires up the keydown listeners). The selector is narrow, so this does not eagerly
// instantiate every dropdown on the page.
EventHandler.on(window, 'DOMContentLoaded', () => {
  SelectorEngine.findAll(
    `[data-spirit-toggle="${NAME}"][data-spirit-dropdown-keyboard]:not([data-spirit-dropdown-keyboard="false"])`,
  ).forEach((toggle) => {
    Dropdown.getOrCreateInstance(toggle);
  });
});

export default Dropdown;
