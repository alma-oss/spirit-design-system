import BaseComponent from './BaseComponent';
import SelectorEngine from './dom/SelectorEngine';
import { enableToggleTrigger, SpiritConfig } from './utils';
import { SpiritElement } from './types';

const NAME = 'password';
const PASSWORD_ARIA_CHECKED = 'aria-checked';
const PASSWORD_ARIA_LABEL = 'aria-label';
const PASSWORD_FIELD_ELEMENT = 'input';

class Password extends BaseComponent {
  isShown: boolean;

  static get NAME() {
    return NAME;
  }

  constructor(element: SpiritElement, config?: SpiritConfig) {
    super(element, config);

    this.isShown = false;
  }

  show(target: HTMLElement) {
    target.setAttribute(PASSWORD_ARIA_CHECKED, 'true');
    target.setAttribute(PASSWORD_ARIA_LABEL, 'Hide password');
    SelectorEngine.findOne(PASSWORD_FIELD_ELEMENT, target.parentElement?.parentElement)?.setAttribute('type', 'text');

    this.isShown = true;
  }

  hide(target: HTMLElement) {
    target.setAttribute(PASSWORD_ARIA_CHECKED, 'false');
    target.setAttribute(PASSWORD_ARIA_LABEL, 'Show password');
    SelectorEngine.findOne(PASSWORD_FIELD_ELEMENT, target.parentElement?.parentElement)?.setAttribute(
      'type',
      'password',
    );

    this.isShown = false;
  }

  toggle(relatedTarget: HTMLElement) {
    this.isShown ? this.hide(relatedTarget) : this.show(relatedTarget);
  }
}

enableToggleTrigger(Password, 'toggle', 'trigger');

export default Password;
