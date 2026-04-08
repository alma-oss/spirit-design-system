import { clearFixture, getFixture } from '../../../tests/helpers/fixture';
import EventHandler from '../dom/EventHandler';
import Modal from '../Modal';

// Mock the executeAfterTransition function
jest.mock('../utils/Transitions', () => ({
  executeAfterTransition: jest.fn((element, callback) => {
    // Simulate immediate execution for tests
    callback();
  }),
}));

describe('Modal', () => {
  let fixtureEl: Element;

  beforeAll(() => {
    fixtureEl = getFixture();
    // Dialog element do not work in Jest tests due to issue in jsdom
    // `TypeError: this.element.showModal is not a function`
    // @see: https://github.com/jsdom/jsdom/issues/3294
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  afterEach(() => {
    clearFixture();
    document.body.classList.remove('is-open');
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should take care of element either passed as a CSS selector or DOM element', () => {
      fixtureEl.innerHTML = '<dialog class="Modal"><div class="Modal__content"></div></dialog>';

      const modalEl = fixtureEl.querySelector('.Modal') as HTMLElement;
      const modalBySelector = new Modal('.Modal');
      const modalByElement = new Modal(modalEl);

      expect(modalBySelector.element).toEqual(modalEl);
      expect(modalByElement.element).toEqual(modalEl);
    });
  });

  describe('show', () => {
    it('should do nothing if a modal is shown', () => {
      fixtureEl.innerHTML = '<dialog class="Modal"><div class="Modal__content"></div></dialog>';

      const modalEl = fixtureEl.querySelector('.Modal') as HTMLElement;
      const modal = new Modal(modalEl);

      const spy = jest.spyOn(EventHandler, 'trigger');
      modal.isShown = true;

      modal.show();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should add is-open class after showing modal', () => {
      fixtureEl.innerHTML = '<dialog class="Modal"><div class="Modal__content"></div></dialog>';

      const modalEl = fixtureEl.querySelector('.Modal') as HTMLDialogElement;
      const modal = new Modal(modalEl);

      modal.show();

      expect(modalEl.classList.contains('is-open')).toBe(true);
      expect(modalEl.showModal).toHaveBeenCalled();
    });
  });

  describe('hide', () => {
    it('should do nothing is the modal is not shown', () => {
      fixtureEl.innerHTML = '<dialog class="Modal"><div class="Modal__content"></div></dialog>';

      const modalEl = fixtureEl.querySelector('.Modal') as HTMLElement;
      const modal = new Modal(modalEl);
      const event = new Event('keydown');
      modalEl.dispatchEvent(event);

      modal.hide(event);

      expect.anything();
    });

    it('should remove is-open class and wait for transition before closing', () => {
      fixtureEl.innerHTML = '<dialog class="Modal"><div class="Modal__content"></div></dialog>';

      const modalEl = fixtureEl.querySelector('.Modal') as HTMLDialogElement;
      const modal = new Modal(modalEl);

      modal.show();

      expect(modalEl.classList.contains('is-open')).toBe(true);

      const event = new Event('click');
      Object.defineProperty(event, 'target', { value: modalEl });

      modal.hide(event);

      // Should remove is-open class immediately
      expect(modalEl.classList.contains('is-open')).toBe(false);

      // Should close after transition (mocked to execute immediately)
      expect(modalEl.close).toHaveBeenCalled();
    });

    it('should handle target without close function', () => {
      fixtureEl.innerHTML = '<div class="Modal"><div class="Modal__content"></div></div>';

      const modalEl = fixtureEl.querySelector('.Modal') as HTMLElement;
      const modal = new Modal(modalEl);

      const event = new Event('click');
      Object.defineProperty(event, 'target', { value: modalEl });

      modal.hide(event);

      // Should not call executeAfterTransition for elements without close function
      // Since it's a div, it won't have a close method
      expect(modalEl).not.toHaveProperty('close');
    });
  });

  describe('getInstance', () => {
    it('should return modal instance', () => {
      fixtureEl.innerHTML = '<dialog class="Modal"><div class="Modal__content"></div></dialog>';

      const dialog = fixtureEl.querySelector('dialog') as HTMLElement;
      const modal = new Modal(dialog);

      expect(Modal.getInstance(dialog)).toEqual(modal);
      expect(Modal.getInstance(dialog)).toBeInstanceOf(Modal);
    });

    it('should return null when there is no modal instance', () => {
      fixtureEl.innerHTML = '<dialog class="Modal"><div class="Modal__content"></div></dialog>';

      const dialog = fixtureEl.querySelector('dialog') as HTMLElement;

      expect(Modal.getInstance(dialog)).toBeNull();
    });
  });

  describe('getOrCreateInstance', () => {
    it('should return modal instance', () => {
      fixtureEl.innerHTML = '<dialog></dialog>';

      const dialog = fixtureEl.querySelector('dialog') as HTMLElement;
      const modal = new Modal(dialog);

      expect(Modal.getOrCreateInstance(dialog)).toEqual(modal);
      expect(Modal.getInstance(dialog)).toEqual(Modal.getOrCreateInstance(dialog));
      expect(Modal.getOrCreateInstance(dialog)).toBeInstanceOf(Modal);
    });

    it('should return new instance when there is no modal instance', () => {
      fixtureEl.innerHTML = '<dialog></dialog>';

      const dialog = fixtureEl.querySelector('dialog') as HTMLElement;

      expect(Modal.getInstance(dialog)).toBeNull();
      expect(Modal.getOrCreateInstance(dialog)).toBeInstanceOf(Modal);
    });
  });

  describe('backdrop', () => {
    it('should not hide the modal when backdrop close is disabled', () => {
      fixtureEl.innerHTML = '<dialog class="Modal" data-spirit-close-on-backdrop-click="false"></dialog>';
      const dialog = fixtureEl.querySelector('dialog') as HTMLElement;
      const modal = new Modal(dialog);

      // Simulate keyboard click (detail === 0)
      const keyboardClickEvent = new MouseEvent('click', { bubbles: true, detail: 0 });
      const targetElement = modal.element;
      Object.defineProperty(keyboardClickEvent, 'target', { writable: false, value: targetElement });

      jest.spyOn(modal, 'hide');

      modal.onClick(keyboardClickEvent);

      expect(modal.hide).not.toHaveBeenCalled();
    });

    it('should hide the modal when backdrop close is not disabled', () => {
      fixtureEl.innerHTML = '<dialog class="Modal" data-spirit-close-on-backdrop-click="true"></dialog>';
      const dialog = fixtureEl.querySelector('dialog') as HTMLElement;
      const modal = new Modal(dialog);

      const mousedownEvent = new Event('mousedown', { bubbles: true });
      Object.defineProperty(mousedownEvent, 'target', { writable: false, value: dialog });
      modal.onMouseDown(mousedownEvent);

      const mouseClickEvent = new MouseEvent('click', { bubbles: true, detail: 1 });
      const targetElement = modal.element;
      Object.defineProperty(mouseClickEvent, 'target', { writable: false, value: targetElement });

      jest.spyOn(modal, 'hide');

      modal.onClick(mouseClickEvent);

      expect(modal.hide).toHaveBeenCalled();
    });
  });

  describe('keyboard accessibility', () => {
    it('should hide the modal when dismiss button is activated via keyboard (spacebar/enter)', () => {
      fixtureEl.innerHTML = `
        <dialog class="Modal">
          <button data-spirit-dismiss="modal">Close</button>
        </dialog>
      `;
      const dialog = fixtureEl.querySelector('dialog') as HTMLElement;
      const dismissButton = fixtureEl.querySelector('[data-spirit-dismiss]') as HTMLElement;
      const modal = new Modal(dialog);

      // Simulate keyboard click (detail === 0, no mousedown event)
      const keyboardClickEvent = new MouseEvent('click', { bubbles: true, detail: 0 });
      Object.defineProperty(keyboardClickEvent, 'target', { writable: false, value: dismissButton });

      jest.spyOn(modal, 'hide');

      modal.onClick(keyboardClickEvent);

      expect(modal.hide).toHaveBeenCalled();
    });

    it('should hide the modal when backdrop is clicked via keyboard', () => {
      fixtureEl.innerHTML = '<dialog class="Modal"></dialog>';
      const dialog = fixtureEl.querySelector('dialog') as HTMLElement;
      const modal = new Modal(dialog);

      // Simulate keyboard click on backdrop (detail === 0)
      const keyboardClickEvent = new MouseEvent('click', { bubbles: true, detail: 0 });
      Object.defineProperty(keyboardClickEvent, 'target', { writable: false, value: dialog });

      jest.spyOn(modal, 'hide');

      modal.onClick(keyboardClickEvent);

      expect(modal.hide).toHaveBeenCalled();
    });

    it('should not hide the modal when click starts inside but ends outside (mouse drag)', () => {
      fixtureEl.innerHTML = `
        <dialog class="Modal">
          <div class="Modal__content">Content</div>
        </dialog>
      `;
      const dialog = fixtureEl.querySelector('dialog') as HTMLElement;
      const content = fixtureEl.querySelector('.Modal__content') as HTMLElement;
      const modal = new Modal(dialog);

      // Simulate mousedown on content
      const mousedownEvent = new Event('mousedown', { bubbles: true });
      Object.defineProperty(mousedownEvent, 'target', { writable: false, value: content });
      modal.onMouseDown(mousedownEvent);

      // Simulate mouse click ending on dialog backdrop (different target)
      const clickEvent = new MouseEvent('click', { bubbles: true, detail: 1 });
      Object.defineProperty(clickEvent, 'target', { writable: false, value: dialog });

      jest.spyOn(modal, 'hide');

      modal.onClick(clickEvent);

      // Should NOT hide because mousedown started on content, not backdrop
      expect(modal.hide).not.toHaveBeenCalled();
    });
  });
});
