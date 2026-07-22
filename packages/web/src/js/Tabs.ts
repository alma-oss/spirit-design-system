import BaseComponent from './BaseComponent';
import EventHandler from './dom/EventHandler';
import SelectorEngine from './dom/SelectorEngine';
import { SpiritConfig, enableToggleTrigger, getElementFromSelector } from './utils';
import { SpiritElement } from './types';

const NAME = 'tabs';
const DATA_KEY = 'tabs';
const EVENT_KEY = `.${DATA_KEY}`;

const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;

const CLASS_NAME_ACTIVE = 'is-selected';

const SELECTOR_TAB_PANEL = '[role="tablist"]';
const SELECTOR_OUTER = '[role="presentation"]';
const SELECTOR_INNER = '[role="tab"]';
const SELECTOR_DATA_TOGGLE = `[data-spirit-toggle="${NAME}"]`;
const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;

class Tabs extends BaseComponent {
  parent: HTMLElement;

  constructor(element: SpiritElement, config?: SpiritConfig) {
    super(element, config);
    this.parent = (this.element as Element).closest(SELECTOR_TAB_PANEL) as HTMLElement;

    if (!this.parent) {
      return;
    }

    Tabs.setInitialAttributes(this.parent, this.getChildren());
  }

  static get NAME() {
    return NAME;
  }

  show() {
    const innerElem = this.element as HTMLElement;
    if (Tabs.isElementActive(innerElem)) {
      return;
    }

    const active = this.getActiveElem();

    const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE, { relatedTarget: innerElem }) : null;

    const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW, { relatedTarget: active }) as Event;

    if (showEvent.defaultPrevented || (hideEvent && hideEvent.defaultPrevented)) {
      return;
    }

    this.deactivate(active, innerElem);
    this.activate(innerElem, active);
  }

  activate(element: HTMLElement | null, relatedElem?: HTMLElement | null) {
    if (!element) {
      return;
    }

    element.classList.add(CLASS_NAME_ACTIVE);
    this.activate(getElementFromSelector(element));

    element.removeAttribute('tabindex');

    if (element.getAttribute('role') === 'tab') {
      element.setAttribute('aria-selected', 'true');
    }

    EventHandler.trigger(element, EVENT_SHOWN, {
      relatedTarget: relatedElem,
    });
  }

  deactivate(element: HTMLElement | null, relatedElem?: HTMLElement | null) {
    if (!element) {
      return;
    }

    element.classList.remove(CLASS_NAME_ACTIVE);
    this.deactivate(getElementFromSelector(element));

    if (element.getAttribute('role') === 'tab') {
      element.setAttribute('aria-selected', 'false');
    }

    element.setAttribute('tabindex', '-1');
    EventHandler.trigger(element, EVENT_HIDDEN, { relatedTarget: relatedElem });
  }

  getChildren() {
    return SelectorEngine.findAll(SELECTOR_INNER_ELEM, this.parent);
  }

  getActiveElem() {
    return this.getChildren().find((child) => Tabs.isElementActive(child)) || null;
  }

  static setInitialAttributes(parent: HTMLElement, children: HTMLElement[]) {
    Tabs.setAttributeIfNotExists(parent, 'role', 'tablist');

    for (const child of children) {
      Tabs.setInitialAttributesOnChild(child);
    }
  }

  static setInitialAttributesOnChild(child: HTMLElement | null) {
    const innerChild = Tabs.getInnerElement(child);
    const isActive = Tabs.isElementActive(innerChild);
    const outerElem = Tabs.getOuterElement(innerChild);
    innerChild?.setAttribute('aria-selected', isActive.toString());

    if (outerElem !== innerChild) {
      Tabs.setAttributeIfNotExists(outerElem, 'role', 'presentation');
    }

    if (innerChild && !isActive) {
      innerChild.setAttribute('tabindex', '-1');
    }

    Tabs.setAttributeIfNotExists(innerChild, 'role', 'tab');
    Tabs.setInitialAttributesOnTargetPanel(innerChild);
  }

  static setInitialAttributesOnTargetPanel(child: HTMLElement | null) {
    const target = getElementFromSelector(child);

    if (!target) {
      return;
    }

    Tabs.setAttributeIfNotExists(target, 'role', 'tabpanel');

    if (child?.id) {
      Tabs.setAttributeIfNotExists(target, 'aria-labelledby', `#${child.id}`);
    }
  }

  static setAttributeIfNotExists(element: HTMLElement | null, attribute: string, value: string) {
    if (element && !element.hasAttribute(attribute)) {
      element.setAttribute(attribute, value);
    }
  }

  static isElementActive(element: HTMLElement | null): boolean {
    return element !== null && element.classList.contains(CLASS_NAME_ACTIVE);
  }

  static getInnerElement(element: HTMLElement | null) {
    return element?.matches(SELECTOR_INNER_ELEM) ? element : SelectorEngine.findOne(SELECTOR_INNER_ELEM, element);
  }

  static getOuterElement(element: HTMLElement | null): HTMLElement | null {
    return element?.closest(SELECTOR_OUTER) || element;
  }
}

enableToggleTrigger(Tabs, 'show', 'trigger');

export default Tabs;
