import { clearFixture, getFixture } from '../../../../tests/helpers/fixture';
import BaseComponent from '../../BaseComponent';
import { loadComponents } from '../../dom/Autoload';
import { enableDismissTrigger, enableToggleAutoloader, enableToggleTrigger } from '../ComponentFunctions';

// Delegated listeners registered by enableToggleTrigger/enableDismissTrigger are never removed
// (they're module-scoped, same as production), so each test below uses a component with a NAME
// unique to itself — otherwise an earlier test's still-bound listener could match a later test's
// elements.
let nextComponentId = 0;

/* eslint-disable class-methods-use-this */
const createComponent = () => {
  const name = `test-${(nextComponentId += 1)}`;

  return class DummyComponent extends BaseComponent {
    static get NAME() {
      return name;
    }

    toggle() {
      return true;
    }

    dismiss() {
      return true;
    }
  };
};
/* eslint-enable class-methods-use-this */

describe('ComponentFunctions', () => {
  let fixtureEl: Element;

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  afterEach(() => {
    clearFixture();
  });

  describe('enableToggleTrigger', () => {
    it('should get or create the component instance and call the given method on click', () => {
      const Component = createComponent();

      enableToggleTrigger(Component, 'toggle');

      fixtureEl.innerHTML = [
        `<div id="foo-${Component.NAME}" class="${Component.NAME}"></div>`,
        `<button type="button" data-spirit-toggle="${Component.NAME}" data-spirit-target="#foo-${Component.NAME}"></button>`,
      ].join('');

      const getOrCreateInstanceSpy = jest.spyOn(Component, 'getOrCreateInstance');
      const toggleSpy = jest.spyOn(Component.prototype, 'toggle');
      const componentWrapper = fixtureEl.querySelector(`#foo-${Component.NAME}`);
      const btnToggle = fixtureEl.querySelector(`[data-spirit-toggle="${Component.NAME}"]`) as HTMLElement;

      btnToggle.click();

      expect(getOrCreateInstanceSpy).toHaveBeenCalledWith(componentWrapper);
      expect(toggleSpy).toHaveBeenCalled();
    });

    it('should respond to a trigger inserted into the DOM after enableToggleTrigger was called, with no loadComponents call', () => {
      const Component = createComponent();

      enableToggleTrigger(Component, 'toggle');

      // Insert the trigger only now, well after the listener above was already bound.
      fixtureEl.innerHTML = [
        `<div id="foo-${Component.NAME}" class="${Component.NAME}"></div>`,
        `<button type="button" data-spirit-toggle="${Component.NAME}" data-spirit-target="#foo-${Component.NAME}"></button>`,
      ].join('');

      const toggleSpy = jest.spyOn(Component.prototype, 'toggle');
      const btnToggle = fixtureEl.querySelector(`[data-spirit-toggle="${Component.NAME}"]`) as HTMLElement;

      btnToggle.click();

      expect(toggleSpy).toHaveBeenCalled();
    });

    it('should not call the method, nor create an instance, when data-spirit-target does not resolve to an element', () => {
      const Component = createComponent();

      enableToggleTrigger(Component, 'toggle');

      fixtureEl.innerHTML = `<button type="button" data-spirit-toggle="${Component.NAME}" data-spirit-target="#missing"></button>`;

      const getOrCreateInstanceSpy = jest.spyOn(Component, 'getOrCreateInstance');
      const toggleSpy = jest.spyOn(Component.prototype, 'toggle');
      const trigger = fixtureEl.querySelector(`[data-spirit-toggle="${Component.NAME}"]`) as HTMLElement;

      trigger.click();

      expect(getOrCreateInstanceSpy).not.toHaveBeenCalled();
      expect(toggleSpy).not.toHaveBeenCalled();
    });

    it('should not call the method for an element with the "disabled" class', () => {
      const Component = createComponent();

      enableToggleTrigger(Component, 'toggle');

      fixtureEl.innerHTML = `<a class="disabled" data-spirit-toggle="${Component.NAME}" data-spirit-target="#missing"></a>`;

      const toggleSpy = jest.spyOn(Component.prototype, 'toggle');
      const trigger = fixtureEl.querySelector(`[data-spirit-toggle="${Component.NAME}"]`) as HTMLElement;

      trigger.click();

      expect(toggleSpy).not.toHaveBeenCalled();
    });

    it('should call preventDefault for an <a> trigger, but not for a <button> trigger', () => {
      const Component = createComponent();

      enableToggleTrigger(Component, 'toggle');

      fixtureEl.innerHTML = [
        `<a href="#" data-spirit-toggle="${Component.NAME}" data-spirit-target="#missing" class="link-trigger"></a>`,
        `<button type="button" data-spirit-toggle="${Component.NAME}" data-spirit-target="#missing" class="button-trigger"></button>`,
      ].join('');

      const linkTrigger = fixtureEl.querySelector('.link-trigger') as HTMLElement;
      const buttonTrigger = fixtureEl.querySelector('.button-trigger') as HTMLElement;

      const linkClickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      const linkPreventDefaultSpy = jest.spyOn(linkClickEvent, 'preventDefault');
      linkTrigger.dispatchEvent(linkClickEvent);

      const buttonClickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      const buttonPreventDefaultSpy = jest.spyOn(buttonClickEvent, 'preventDefault');
      buttonTrigger.dispatchEvent(buttonClickEvent);

      expect(linkPreventDefaultSpy).toHaveBeenCalled();
      expect(buttonPreventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should only respond to its own component name, not another component registered on the same attribute', () => {
      const ComponentA = createComponent();
      const ComponentB = createComponent();

      enableToggleTrigger(ComponentA, 'toggle');
      enableToggleTrigger(ComponentB, 'toggle');

      fixtureEl.innerHTML = [
        `<div id="foo-${ComponentA.NAME}"></div>`,
        `<button type="button" data-spirit-toggle="${ComponentA.NAME}" data-spirit-target="#foo-${ComponentA.NAME}"></button>`,
      ].join('');

      const toggleASpy = jest.spyOn(ComponentA.prototype, 'toggle');
      const toggleBSpy = jest.spyOn(ComponentB.prototype, 'toggle');
      const trigger = fixtureEl.querySelector(`[data-spirit-toggle="${ComponentA.NAME}"]`) as HTMLElement;

      trigger.click();

      expect(toggleASpy).toHaveBeenCalled();
      expect(toggleBSpy).not.toHaveBeenCalled();
    });
  });

  describe('enableDismissTrigger', () => {
    it('should respond to a dismiss trigger inserted into the DOM after enableDismissTrigger was called', () => {
      const Component = createComponent();

      enableDismissTrigger(Component, 'dismiss');

      fixtureEl.innerHTML = [
        `<div id="foo-${Component.NAME}" class="${Component.NAME}"></div>`,
        `<button type="button" data-spirit-dismiss="${Component.NAME}" data-spirit-target="#foo-${Component.NAME}"></button>`,
      ].join('');

      const dismissSpy = jest.spyOn(Component.prototype, 'dismiss');
      const btnDismiss = fixtureEl.querySelector(`[data-spirit-dismiss="${Component.NAME}"]`) as HTMLElement;

      btnDismiss.click();

      expect(dismissSpy).toHaveBeenCalled();
    });
  });

  describe('enableToggleAutoloader', () => {
    it('should not create an instance for an element whose data-spirit-target does not resolve, with aim "target"', () => {
      const Component = createComponent();

      enableToggleAutoloader(Component, undefined, 'target');

      fixtureEl.innerHTML = `<div data-spirit-toggle="${Component.NAME}" data-spirit-target="#missing"></div>`;

      const getOrCreateInstanceSpy = jest.spyOn(Component, 'getOrCreateInstance');

      loadComponents(fixtureEl);

      expect(getOrCreateInstanceSpy).not.toHaveBeenCalled();
    });
  });

  describe('loadComponents', () => {
    it('does not need to be called for toggle/dismiss triggers to work on dynamically-inserted markup', () => {
      const Component = createComponent();

      enableToggleTrigger(Component, 'toggle');

      const root = document.createElement('div');
      root.innerHTML = [
        `<div id="foo-${Component.NAME}"></div>`,
        `<button type="button" data-spirit-toggle="${Component.NAME}" data-spirit-target="#foo-${Component.NAME}"></button>`,
      ].join('');
      fixtureEl.append(root);

      const toggleSpy = jest.spyOn(Component.prototype, 'toggle');

      (root.querySelector(`[data-spirit-toggle="${Component.NAME}"]`) as HTMLElement).click();

      expect(toggleSpy).toHaveBeenCalled();
      expect(loadComponents).toBeDefined();
    });
  });
});
