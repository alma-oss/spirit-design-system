import BaseComponent from '../BaseComponent';
import EventHandler from '../dom/EventHandler';
import SelectorEngine from '../dom/SelectorEngine';
import { getElement, getTriggerOrTarget, Aim } from './Elements';

type DataTriggerAttribute = 'data-spirit-toggle' | 'data-spirit-dismiss';

const ATTRIBUTE_DATA_TOGGLE = `data-spirit-toggle`;
const ATTRIBUTE_DATA_DISMISS = `data-spirit-dismiss`;

const onClickHandler = (
  element: HTMLElement,
  component: typeof BaseComponent,
  method: string,
  event: Event,
  aim: Aim = 'target',
) => {
  EventHandler.on(element, 'click', function handleClick(this: unknown) {
    const target = getTriggerOrTarget(getElement(this), aim);
    const instance = component.getOrCreateInstance(target);

    // No index signature with a parameter of type 'string' was found on type 'Document | HTMLElement | Window | BaseComponent'
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instance[method](target, event);
  });
};

const onLoadHandler = (
  element: HTMLElement,
  component: typeof BaseComponent,
  method: string,
  event: Event,
  aim: Aim = 'trigger',
) => {
  let instance = element;

  if (aim === 'target') {
    instance = getTriggerOrTarget(getElement(element), aim);
  }

  component.getOrCreateInstance(instance);
};

type DataTriggerEventHandler = (
  element: HTMLElement,
  component: typeof BaseComponent,
  method: string,
  event: Event,
  aim: Aim,
) => void;

interface DataTriggerRegistration {
  dataTriggerAttribute: DataTriggerAttribute;
  component: typeof BaseComponent;
  eventHandler: DataTriggerEventHandler;
  method: string;
  aim: Aim;
}

// Populated by every enableDataTrigger() call (i.e. each component module's own
// `enable*Trigger(...)` call at import time). Consumed by initSpiritComponents()
// to (re-)bind components scoped to a root that was inserted after the page's
// original DOMContentLoaded already fired (e.g. HTML injected via innerHTML).
const dataTriggerRegistrations: DataTriggerRegistration[] = [];

const bindDataTrigger = (registration: DataTriggerRegistration, root: Element) => {
  const { dataTriggerAttribute, component, eventHandler, method, aim } = registration;
  const name = component.NAME;

  SelectorEngine.findAll(`[${dataTriggerAttribute}="${name}"]`, root).forEach((toggleEl) => {
    eventHandler(toggleEl, component, method, undefined as unknown as Event, aim);
  });
};

const enableDataTrigger = (
  dataTriggerAttribute: DataTriggerAttribute,
  component: typeof BaseComponent,
  eventHandler: DataTriggerEventHandler,
  method = 'toggle',
  aim: Aim = 'target',
) => {
  const registration = { dataTriggerAttribute, component, eventHandler, method, aim };

  dataTriggerRegistrations.push(registration);

  EventHandler.on(window, 'DOMContentLoaded', () => {
    bindDataTrigger(registration, document.documentElement);
  });
};

const enableToggleTrigger = (component: typeof BaseComponent, method = 'toggle', aim: Aim = 'target') => {
  enableDataTrigger(ATTRIBUTE_DATA_TOGGLE, component, onClickHandler, method, aim);
};

const enableDismissTrigger = (component: typeof BaseComponent, method = 'dismiss', aim: Aim = 'target') => {
  enableDataTrigger(ATTRIBUTE_DATA_DISMISS, component, onClickHandler, method, aim);
};

const enableToggleAutoloader = (component: typeof BaseComponent, method = 'toggle', aim: Aim = 'trigger') => {
  enableDataTrigger(ATTRIBUTE_DATA_TOGGLE, component, onLoadHandler, method, aim);
};

const clickOutsideElement = (target: Element, event: Event) => !event.composedPath().includes(target);

/**
 * (Re-)binds every registered interactive component (Dropdown, Modal, Offcanvas, Collapse, ...)
 * within `root`. Use this after inserting Spirit markup into the DOM outside of the normal page
 * load flow (e.g. `dangerouslySetInnerHTML`), since the DOMContentLoaded-based auto-binding each
 * component registers at import time only ever fires once, for the document's original load.
 *
 * @param root - Element to scope (re-)binding to. Defaults to the whole document.
 */
const initSpiritComponents = (root: Element = document.documentElement) => {
  dataTriggerRegistrations.forEach((registration) => bindDataTrigger(registration, root));
};

export { enableToggleTrigger, enableDismissTrigger, enableToggleAutoloader, clickOutsideElement, initSpiritComponents };
