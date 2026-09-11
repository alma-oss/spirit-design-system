import BaseComponent from '../BaseComponent';
import { registerAutoload } from '../dom/Autoload';
import EventHandler from '../dom/EventHandler';
import SelectorEngine from '../dom/SelectorEngine';
import { getElement, getTriggerOrTarget, isDisabled, Aim } from './Elements';

const ATTRIBUTE_DATA_TOGGLE = `data-spirit-toggle`;
const ATTRIBUTE_DATA_DISMISS = `data-spirit-dismiss`;

// Toggle/dismiss triggers are delegated on `document` (bound once, at import time, forever) —
// elements matching the selector respond immediately, whether they existed at import time or
// were inserted into the DOM afterwards (e.g. via `dangerouslySetInnerHTML`). Nothing needs to be
// told about new content, so there is no rebinding step for these two, unlike the eager autoloader
// below.
const onClickHandler = (component: typeof BaseComponent, method: string, aim: Aim) =>
  function handleClick(this: unknown, event: Event) {
    if (['A', 'AREA'].includes((this as HTMLElement).tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this as HTMLElement)) {
      return;
    }

    const target = getTriggerOrTarget(getElement(this), aim);

    if (!target) {
      return;
    }

    const instance = component.getOrCreateInstance(target);

    // No index signature with a parameter of type 'string' was found on type 'Document | HTMLElement | Window | BaseComponent'
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instance[method](target, event);
  };

const enableToggleTrigger = (component: typeof BaseComponent, method = 'toggle', aim: Aim = 'target') => {
  EventHandler.on(
    document,
    'click',
    `[${ATTRIBUTE_DATA_TOGGLE}="${component.NAME}"]`,
    onClickHandler(component, method, aim),
  );
};

const enableDismissTrigger = (component: typeof BaseComponent, method = 'dismiss', aim: Aim = 'target') => {
  EventHandler.on(
    document,
    'click',
    `[${ATTRIBUTE_DATA_DISMISS}="${component.NAME}"]`,
    onClickHandler(component, method, aim),
  );
};

// Eager autoloaders instantiate every matching element up front (no click involved) — see
// dom/Autoload for why that needs an explicit rescan hook, unlike click delegation above.
const enableToggleAutoloader = (component: typeof BaseComponent, _method?: string, aim: Aim = 'trigger') => {
  registerAutoload((root) => {
    SelectorEngine.findAll(`[${ATTRIBUTE_DATA_TOGGLE}="${component.NAME}"]`, root).forEach((element) => {
      const instance = aim === 'target' ? getTriggerOrTarget(getElement(element), aim) : element;

      if (!instance) {
        return;
      }

      component.getOrCreateInstance(instance);
    });
  });
};

const clickOutsideElement = (target: Element, event: Event) => !event.composedPath().includes(target);

export { enableToggleTrigger, enableDismissTrigger, enableToggleAutoloader, clickOutsideElement };
