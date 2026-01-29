/* eslint-disable @typescript-eslint/no-explicit-any */

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

const EventHandler = {
  on(element: EventHandlerElement, event: string, handler?: any): void {
    addHandler(element, event, handler);
  },

  off(element: EventHandlerElement, event: string, handler?: any) {
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
