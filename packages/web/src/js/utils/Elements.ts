import { SpiritElement } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const isElement = (object: any): boolean => {
  if (!object || typeof object !== 'object') {
    return false;
  }

  return typeof object.nodeType !== 'undefined';
};

const getElement = (object?: any): SpiritElement => {
  // it's a node element
  if (isElement(object)) {
    return object;
  }

  if (typeof object === 'string' && object.length > 0) {
    return document.querySelector(object);
  }

  return null;
};

type Aim = 'trigger' | 'target';

const getTriggerOrTarget = (element?: SpiritElement, aim: Aim = 'target'): SpiritElement => {
  const trigger = element;
  const target = trigger?.dataset?.spiritTarget ? getElement(element.dataset.spiritTarget) : null;

  return aim === 'target' ? target : trigger;
};

const getSelector = (element: HTMLElement | null) => element?.getAttribute('data-spirit-target');

const getElementFromSelector = (element: HTMLElement | null): HTMLElement | null => {
  const selector = getSelector(element);

  return selector ? document.querySelector(selector) : null;
};

// A native `disabled` attribute on a real form control (e.g. `<button disabled>`) already stops
// the browser from firing a click event in the first place, so this mostly matters for the
// `class="disabled"` and `aria-disabled="true"` conventions used on non-form-control triggers
// (e.g. `<a>`), which do still receive clicks.
const isDisabled = (element?: SpiritElement): boolean => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }

  if (element.classList.contains('disabled')) {
    return true;
  }

  if (typeof (element as HTMLButtonElement).disabled !== 'undefined') {
    return (element as HTMLButtonElement).disabled;
  }

  if (element.hasAttribute('disabled')) {
    return element.getAttribute('disabled') !== 'false';
  }

  return element.getAttribute('aria-disabled') === 'true';
};

export { isElement, getElement, getElementFromSelector, getSelector, getTriggerOrTarget, isDisabled };
export type { Aim };
