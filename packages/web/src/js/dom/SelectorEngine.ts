import { SpiritElement } from '../types';

const SelectorEngine = {
  // Callers rely on the native DOM methods' WebIDL string coercion of `selector` (e.g. `undefined`
  // becomes the literal selector "undefined", which simply matches nothing) — cast rather than
  // default/coerce the value, to avoid changing that behavior (an empty string selector throws).
  findAll(selector?: string | null, element: SpiritElement = document.documentElement): HTMLElement[] {
    return Array.from(Element.prototype.querySelectorAll.call(element, selector as string)) as HTMLElement[];
  },

  findOne(selector?: string | null, element: SpiritElement = document.documentElement): HTMLElement | null {
    return Element.prototype.querySelector.call(element, selector as string) as HTMLElement | null;
  },
};

export default SelectorEngine;
