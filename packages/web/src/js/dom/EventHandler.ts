/* eslint-disable @typescript-eslint/no-explicit-any */
import { warning } from '../common/utilities';

type EventHandlerElement = HTMLElement | Window | Document;

const addHandler = (element: EventHandlerElement, eventType: string, handler: any): void => {
  if (!element) {
    return;
  }

  /**
   * Treat event listener as active by default
   * Safari sets the event listeners as passive by default, other browsers the opposite
   * This lead to the touch events were treated differently on Safari then on other devices
   * and the touch on Modal's backdrop did not close it
   *
   * @see https://chromestatus.com/feature/5093566007214080
   * @see https://github.com/alma-oss/spirit-design-system/pull/892
   */
  element.addEventListener(eventType, handler, { passive: false });
};

const removeHandler = (element: EventHandlerElement, eventType: string, handler: any): void =>
  element.removeEventListener(eventType, handler);

// Delegated listeners are bound once on `element` (typically `document`) and re-resolve their
// match on every event via `Element.closest`, so elements added to the DOM after this call still
// respond — the same event-delegation approach Bootstrap's data-api uses, ported here because
// `SelectorEngine`/`querySelectorAll` can't be called against `document` itself (only against
// `document.documentElement`), while `closest` has no such restriction.
const delegationHandler = (selector: string, handler: any) =>
  function handleDelegatedEvent(this: EventHandlerElement, event: Event) {
    const target = event.target as Element | null;

    if (!target || typeof target.closest !== 'function') {
      return;
    }

    const match = target.closest(selector);

    if (!match) {
      return;
    }

    try {
      Object.defineProperty(event, 'delegateTarget', {
        configurable: true,
        get() {
          return match;
        },
      });
    } catch {
      // ignore — non-configurable event objects should still invoke the handler
    }

    handler.call(match, event);
  };

function on(element: EventHandlerElement, event: string, handler?: any): void;
function on(element: EventHandlerElement, event: string, selector: string, handler: any): void;
function on(element: EventHandlerElement, event: string, handlerOrSelector?: any, delegatedHandler?: any): void {
  if (typeof handlerOrSelector === 'string') {
    addHandler(element, event, delegationHandler(handlerOrSelector, delegatedHandler));

    return;
  }

  addHandler(element, event, handlerOrSelector);
}

const EventHandler = {
  on,

  off(element: EventHandlerElement, event: string, handler?: any) {
    if (typeof handler === 'string') {
      warning(false, 'EventHandler.off() does not support removing delegated listeners by selector.');

      return;
    }

    removeHandler(element, event, handler);
  },

  trigger(element: EventHandlerElement, event: string, args?: any) {
    if (typeof event !== 'string' || !element) {
      return null;
    }

    const bubbles = true;
    const nativeDispatch = true;
    const defaultPrevented = false;

    const evt = new Event(event, { bubbles, cancelable: true });

    // merge custom information in our event
    if (typeof args !== 'undefined') {
      for (const key of Object.keys(args)) {
        Object.defineProperty(evt, key, {
          get() {
            return args[key];
          },
        });
      }
    }

    if (defaultPrevented) {
      evt.preventDefault();
    }

    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }

    return evt;
  },
};

export default EventHandler;
