import BaseComponent from './BaseComponent';
import { EVENT_KEY_ESCAPE, KEY_ARROW_DOWN, KEY_ARROW_UP } from './constants';
import EventHandler from './dom/EventHandler';
import { registerAutoload } from './dom/Autoload';
import { getNextActiveElement, isVisible } from './dom/getNextActiveElement';
import SelectorEngine from './dom/SelectorEngine';
import { clickOutsideElement, enableToggleTrigger, getTypeaheadMatch, SpiritConfig, Typeahead } from './utils';
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
const ARIA_HASPOPUP_ATTRIBUTE = 'aria-haspopup';
const KEY_END = 'End';
const KEY_HOME = 'Home';
const KEY_SPACE = ' ';
const KEY_TAB = 'Tab';
const MENU_ROLE = 'menu';
const SELECTOR_MENU = '[role="menu"]';
const SELECTOR_MENU_ITEM = '[role="menuitem"]';
const SELECTOR_DISABLED = ':disabled, [disabled], [aria-disabled="true"], [hidden]';
const CLASSNAME_DROPDOWN = 'DropdownWrapper';
export const CLASSNAME_EXPANDED = 'is-expanded';
export const CLASSNAME_OPEN = 'is-open';

const getNextMenuItem = (items: HTMLElement[], activeItem: HTMLElement, key: string) => {
  switch (key) {
    case KEY_HOME:
      return items[0];
    case KEY_END:
      return items[items.length - 1];
    case KEY_ARROW_DOWN:
    case KEY_ARROW_UP:
      return getNextActiveElement(items, activeItem, key === KEY_ARROW_DOWN, true);
    default:
      return null;
  }
};

// Disabled items are skipped.
const getMenuItems = (menu: HTMLElement) =>
  SelectorEngine.findAll(SELECTOR_MENU_ITEM, menu).filter((item) => !item.matches(SELECTOR_DISABLED));

// In an open menu, items hidden by CSS or by an ancestor are skipped too, as they cannot take focus.
const getVisibleMenuItems = (menu: HTMLElement) => getMenuItems(menu).filter(isVisible);

const setActiveMenuItem = (items: HTMLElement[], activeItem: HTMLElement) => {
  items.forEach((item) => item.setAttribute('tabindex', item === activeItem ? '0' : '-1'));
};

type MenuFocus = 'first' | 'last';

class Dropdown extends BaseComponent {
  target: HTMLElement | null | undefined;
  reference: HTMLElement | null | undefined;
  menu: HTMLElement | null;
  menuFocus: MenuFocus;
  typeahead: Typeahead;
  state: DropdownStateProps;
  options: DropdownOptionsProps;

  constructor(element: SpiritElement, config?: SpiritConfig) {
    super(element, config);
    this.target = SelectorEngine.findOne(`${this.element.dataset.spiritTarget}`);
    this.reference = this.findReferenceElement();
    this.menu = this.target ? SelectorEngine.findOne(SELECTOR_MENU, this.target) : null;
    this.menuFocus = 'first';
    this.typeahead = new Typeahead();
    this.state = {
      open: false,
    };
    this.options = {
      autoClose: true,
      keyboard: false,
      menuItemsSelector: null,
    };

    if (this.getOptions().keyboard || this.menu) {
      this.addKeyboardListeners();
    }

    if (this.menu) {
      this.initMenu(this.menu);
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

    if (dataset?.spiritDropdownKeyboard !== undefined) {
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

    // Only derive aria-controls from data-spirit-target when the consumer has not provided one
    // (an empty value counts as unset). Components such as Combobox point aria-controls at a
    // specific descendant (the listbox) rather than the popover container, so an author-supplied
    // value must be preserved. data-spirit-target also accepts non-ID selectors (e.g. ".foo") for
    // other components, which cannot become a valid IDREF, so only derive it when the target is
    // already an ID selector.
    const ariaControls = this.element.getAttribute(ARIA_CONTROLS_ATTRIBUTE);

    if (!ariaControls) {
      const target = this.element.dataset.spiritTarget;

      if (target?.startsWith('#')) {
        this.element.setAttribute(ARIA_CONTROLS_ATTRIBUTE, target.slice(1));
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
    this.focusMenuItem(this.menuFocus);
    this.menuFocus = 'first';
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

    if (this.menu && !isEscapeEvent) {
      this.onMenuKeydown(event, this.menu);

      return;
    }

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

  // Menu button keyboard interaction: a roving tabindex over the menu items, Up and Down with wrapping,
  // Home/End and typeahead. Tab closes the menu and lets focus move on.
  // @see https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
  onMenuKeydown(event: KeyboardEvent, menu: HTMLElement) {
    const target = event.target as HTMLElement;

    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    if (target === this.element) {
      if (event.key === KEY_ARROW_DOWN || event.key === KEY_ARROW_UP) {
        event.preventDefault();
        this.menuFocus = event.key === KEY_ARROW_UP ? 'last' : 'first';

        if (this.state.open) {
          this.focusMenuItem(this.menuFocus);
        } else {
          this.show();
        }
      }

      return;
    }

    const items = getVisibleMenuItems(menu);

    if (!items.includes(target)) {
      return;
    }

    if (event.key === KEY_TAB) {
      // Close once the browser has moved focus, so hiding the popover does not interrupt it.
      setTimeout(() => this.hide());

      return;
    }

    // Space activates a button natively, but not a link.
    if (event.key === KEY_SPACE && target.matches('a[href]')) {
      event.preventDefault();
      target.click();

      return;
    }

    const query = this.typeahead.addKey(event.key);
    const nextItem = query ? getTypeaheadMatch(items, query, target) : getNextMenuItem(items, target, event.key);

    if (nextItem) {
      event.preventDefault();
      setActiveMenuItem(items, nextItem);
      nextItem.focus();
    }
  }

  focusMenuItem(focus: MenuFocus) {
    if (!this.menu) {
      return;
    }

    const items = getVisibleMenuItems(this.menu);
    const item = focus === 'last' ? items[items.length - 1] : items[0];

    if (item) {
      setActiveMenuItem(items, item);
      item.focus();
    }
  }

  // Enter and Space on a button fire a click, so this covers keyboard activation too.
  onMenuClick = (event: Event) => {
    const item = (event.target as HTMLElement).closest(SELECTOR_MENU_ITEM);

    if (!this.menu || !item || item.matches(SELECTOR_DISABLED)) {
      return;
    }

    this.hide();
    this.element.focus();
  };

  initMenu(menu: HTMLElement) {
    if (!this.element.hasAttribute(ARIA_HASPOPUP_ATTRIBUTE)) {
      this.element.setAttribute(ARIA_HASPOPUP_ATTRIBUTE, MENU_ROLE);
    }

    if (!this.element.getAttribute(ARIA_CONTROLS_ATTRIBUTE) && menu.id) {
      this.element.setAttribute(ARIA_CONTROLS_ATTRIBUTE, menu.id);
    }

    const items = getMenuItems(menu);

    if (items.length) {
      setActiveMenuItem(items, items[0]);
    }

    EventHandler.on(menu, 'click', this.onMenuClick);
  }

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

    if (this.menu) {
      EventHandler.off(this.menu, 'click', this.onMenuClick);
    }

    this.typeahead.dispose();

    super.dispose();
  }
}

enableToggleTrigger(Dropdown, 'toggle', 'trigger');

// Dropdown instances are created lazily on the first trigger click. Keyboard-enabled dropdowns and menu
// buttons must exist before any click so they can be opened from the keyboard, so eagerly instantiate
// those here (the constructor wires up the keydown listeners), also for markup passed to `loadComponents`.
// The selector is narrow, so this does not eagerly instantiate every dropdown on the page.
registerAutoload((root) => {
  SelectorEngine.findAll(
    [
      `[data-spirit-toggle="${NAME}"][data-spirit-dropdown-keyboard]:not([data-spirit-dropdown-keyboard="false"])`,
      `[data-spirit-toggle="${NAME}"][aria-haspopup="${MENU_ROLE}"]`,
    ].join(', '),
    root,
  ).forEach((toggle) => {
    Dropdown.getOrCreateInstance(toggle);
  });
});

export default Dropdown;
