import { clearFixture, getFixture } from '../../../tests/helpers/fixture';
import EventHandler from '../dom/EventHandler';
import Offcanvas from '../Offcanvas';

// Mock the executeAfterTransition function
jest.mock('../utils/Transitions', () => ({
  executeAfterTransition: jest.fn((element, callback) => {
    // Simulate immediate execution for tests
    callback();
  }),
}));

describe('Offcanvas', () => {
  let fixtureEl: HTMLElement;

  beforeAll(() => {
    fixtureEl = getFixture();
    // Dialog element do not work in Jest tests due to issue in jsdom
    // `TypeError: this.element.showModal is not a function`
    // @see: https://github.com/jsdom/jsdom/issues/3294
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  afterEach(() => {
    clearFixture();
    jest.clearAllMocks();
  });

  describe('toggle', () => {
    it('should call show method if show class is not present', () => {
      fixtureEl.innerHTML = [
        '<button id="btn" data-spirit-toggle="offcanvas"></button>',
        '<dialog class="offcanvas"></dialog>',
      ].join('');

      const offCanvasEl = fixtureEl.querySelector('.offcanvas') as HTMLElement;
      const triggerEl = fixtureEl.querySelector('button') as HTMLElement;
      const offCanvas = new Offcanvas(offCanvasEl);

      const spy = jest.spyOn(offCanvas, 'show');

      offCanvas.toggle(triggerEl);

      expect(spy).toHaveBeenCalled();
    });

    it('should call hide method if show class is present', async () => {
      fixtureEl.innerHTML = [
        '<button id="btn" data-spirit-toggle="offcanvas"></button>',
        '<dialog class="offcanvas"></dialog>',
      ].join('');

      const offCanvasEl = fixtureEl.querySelector('.offcanvas') as HTMLElement;
      const triggerEl = fixtureEl.querySelector('button') as HTMLElement;
      const offCanvas = new Offcanvas(offCanvasEl);

      offCanvasEl.addEventListener('shown.offcanvas', () => {
        expect(offCanvasEl).toHaveClass('is-open');
        const spy = jest.spyOn(offCanvas, 'hide');

        offCanvas.toggle(triggerEl);

        expect(spy).toHaveBeenCalled();
      });

      await offCanvas.show(triggerEl);
    });
  });

  describe('show', () => {
    it('should do nothing if already shown', async () => {
      fixtureEl.innerHTML = [
        '<button id="btn" data-spirit-toggle="offcanvas""></button>',
        '<dialog class="offcanvas"></dialog>',
      ].join('');

      const offCanvasEl = fixtureEl.querySelector('.offcanvas') as HTMLElement;
      const triggerEl = fixtureEl.querySelector('button') as HTMLElement;
      const offCanvas = new Offcanvas(offCanvasEl);
      await offCanvas.show(triggerEl);

      expect(offCanvasEl).toHaveClass('is-open');

      const spyShow = jest.spyOn(offCanvas, 'show');
      const spyTrigger = jest.spyOn(EventHandler, 'trigger');
      await offCanvas.show(triggerEl);

      expect(spyTrigger).not.toHaveBeenCalled();
      expect(spyShow).toHaveBeenCalled();
    });

    it('should show a hidden element', async () => {
      fixtureEl.innerHTML = [
        '<button id="btn" data-spirit-toggle="offcanvas"></button>',
        '<dialog class="offcanvas"></dialog>',
      ].join('');

      const offCanvasEl = fixtureEl.querySelector('.offcanvas') as HTMLElement;
      const triggerEl = fixtureEl.querySelector('button') as HTMLElement;
      const offCanvas = new Offcanvas(offCanvasEl);
      const spy = jest.spyOn(offCanvas, 'show');

      offCanvasEl.addEventListener('shown.offcanvas', () => {
        expect(offCanvasEl).toHaveClass('is-open');
        expect(spy).toHaveBeenCalled();
      });

      await offCanvas.show(triggerEl);
    });

    it('should use show() instead of showModal() when modal option is false', async () => {
      fixtureEl.innerHTML = [
        '<button id="btn" data-spirit-toggle="offcanvas"></button>',
        '<dialog class="offcanvas"></dialog>',
      ].join('');

      const offCanvasEl = fixtureEl.querySelector('.offcanvas') as HTMLDialogElement;
      const triggerEl = fixtureEl.querySelector('button') as HTMLElement;
      const offCanvas = new Offcanvas(offCanvasEl, { modal: false });

      await offCanvas.show(triggerEl);

      expect(offCanvasEl.show).toHaveBeenCalled();
      expect(offCanvasEl.showModal).not.toHaveBeenCalled();
      expect(offCanvasEl).toHaveAttribute('aria-modal', 'false');
      expect(offCanvasEl).toHaveClass('is-non-modal');
    });

    it('should use showModal() when modal option is true (default)', async () => {
      fixtureEl.innerHTML = [
        '<button id="btn" data-spirit-toggle="offcanvas"></button>',
        '<dialog class="offcanvas"></dialog>',
      ].join('');

      const offCanvasEl = fixtureEl.querySelector('.offcanvas') as HTMLDialogElement;
      const triggerEl = fixtureEl.querySelector('button') as HTMLElement;
      const offCanvas = new Offcanvas(offCanvasEl);

      await offCanvas.show(triggerEl);

      expect(offCanvasEl.showModal).toHaveBeenCalled();
      expect(offCanvasEl).toHaveAttribute('aria-modal', 'true');
    });

    it('should not fire shown when show is prevented', async () => {
      fixtureEl.innerHTML = [
        '<button id="btn" data-spirit-toggle="offcanvas"></button>',
        '<dialog class="offcanvas"></dialog>',
      ].join('');

      const offCanvasEl = fixtureEl.querySelector('.offcanvas') as HTMLElement;
      const triggerEl = fixtureEl.querySelector('button') as HTMLElement;
      const offCanvas = new Offcanvas(offCanvasEl);
      const spy = jest.spyOn(offCanvas, 'show');

      const expectEnd = () => {
        setTimeout(() => {
          expect(spy).not.toHaveBeenCalled();
        }, 10);
      };

      offCanvasEl.addEventListener('show.offcanvas', (event) => {
        event.preventDefault();
        expectEnd();
      });

      offCanvasEl.addEventListener('shown.offcanvas', () => new Error('should not fire shown event'));

      await offCanvas.show(triggerEl);
    });
  });

  describe('hide', () => {
    it('should remove is-open class and wait for transition before closing', async () => {
      fixtureEl.innerHTML = [
        '<button id="btn" data-spirit-toggle="offcanvas"></button>',
        '<dialog class="offcanvas"></dialog>',
      ].join('');

      const offCanvasEl = fixtureEl.querySelector('.offcanvas') as HTMLDialogElement;
      const triggerEl = fixtureEl.querySelector('button') as HTMLElement;
      const offCanvas = new Offcanvas(offCanvasEl);

      // First show the offcanvas
      offCanvas.show(triggerEl);

      expect(offCanvasEl).toHaveClass('is-open');

      offCanvasEl.addEventListener('hide.offcanvas', () => {
        expect(offCanvasEl).toHaveClass('is-open');
      });

      offCanvasEl.addEventListener('hidden.offcanvas', () => {
        expect(offCanvasEl).not.toHaveClass('is-open');
      });

      // Hide the offcanvas
      offCanvas.hide();

      // Should remove is-open class immediately
      expect(offCanvasEl).not.toHaveClass('is-open');

      // Should close after transition (mocked to execute immediately)
      expect(offCanvasEl.close).toHaveBeenCalled();
    });

    it('should do nothing if already hidden', () => {
      fixtureEl.innerHTML = '<dialog class="offcanvas"></dialog>';

      const spyTrigger = jest.spyOn(EventHandler, 'trigger');

      const offCanvasEl = fixtureEl.querySelector('dialog') as HTMLElement;
      const offCanvas = new Offcanvas(offCanvasEl);
      const spyHide = jest.spyOn(offCanvas, 'hide');

      offCanvas.hide();
      expect(spyHide).toHaveBeenCalled();
      expect(spyTrigger).not.toHaveBeenCalled();
    });

    it('should hide a shown element', async () => {
      fixtureEl.innerHTML = [
        '<button id="btn" data-spirit-toggle="offcanvas"></button>',
        '<dialog class="offcanvas"></dialog>',
      ].join('');

      const offCanvasEl = fixtureEl.querySelector('dialog') as HTMLDialogElement;
      const triggerEl = fixtureEl.querySelector('button') as HTMLElement;
      const offCanvas = new Offcanvas(offCanvasEl);
      const spy = jest.spyOn(offCanvas, 'hide');
      await offCanvas.show(triggerEl);

      offCanvasEl.addEventListener('hidden.offcanvas', () => {
        expect(offCanvasEl).not.toHaveClass('is-open');
        expect(spy).toHaveBeenCalled();
      });

      await offCanvas.hide();
    });

    it('should remove is-non-modal class after hide', async () => {
      fixtureEl.innerHTML = [
        '<button id="btn" data-spirit-toggle="offcanvas"></button>',
        '<dialog class="offcanvas"></dialog>',
      ].join('');

      const offCanvasEl = fixtureEl.querySelector('dialog') as HTMLDialogElement;
      const triggerEl = fixtureEl.querySelector('button') as HTMLElement;
      const offcanvas = new Offcanvas(offCanvasEl, { modal: false });

      await offcanvas.show(triggerEl);
      expect(offCanvasEl).toHaveClass('is-non-modal');

      await offcanvas.hide();

      expect(offCanvasEl).not.toHaveClass('is-non-modal');
    });

    it('should not fire hidden when hide is prevented', async () => {
      fixtureEl.innerHTML = [
        '<button id="btn" data-spirit-toggle="offcanvas"></button>',
        '<dialog class="offcanvas"></dialog>',
      ].join('');

      const offCanvasEl = fixtureEl.querySelector('dialog') as HTMLElement;
      const triggerEl = fixtureEl.querySelector('button') as HTMLElement;
      const offCanvas = new Offcanvas(offCanvasEl);
      const spy = jest.spyOn(offCanvas, 'hide');

      await offCanvas.show(triggerEl);

      const expectEnd = () => {
        setTimeout(() => {
          expect(spy).not.toHaveBeenCalled();
        }, 10);
      };

      offCanvasEl.addEventListener('hide.offcanvas', (event) => {
        event.preventDefault();
        expectEnd();
      });

      offCanvasEl.addEventListener('hidden.offcanvas', () => new Error('should not fire hidden event'));

      await offCanvas.hide();
    });
  });

  describe('data-spirit-api', () => {
    it('should not prevent event for input', async () => {
      fixtureEl.innerHTML = [
        '<input type="checkbox" data-spirit-toggle="offcanvas" data-spirit-target="#offcanvas-div-1">',
        '<dialog id="offcanvas-div-1" class="offcanvas"></dialog>',
      ].join('');

      const target = fixtureEl.querySelector('input') as HTMLInputElement;
      const offCanvasEl = fixtureEl.querySelector('#offcanvas-div-1') as HTMLElement;

      offCanvasEl.addEventListener('shown.offcanvas', () => {
        expect(offCanvasEl).toHaveClass('is-open');
        expect(target.checked).toBeTruthy();
      });

      await target.click();
    });

    it('should not call toggle on disabled elements', () => {
      fixtureEl.innerHTML = [
        '<a href="#" data-spirit-toggle="offcanvas" data-spirit-target="#offcanvas-div-1" class="disabled"></a>',
        '<div id="offcanvas-div-1" class="offcanvas"></div>',
      ].join('');

      const target = fixtureEl.querySelector('a') as HTMLElement;

      const spy = jest.spyOn(Offcanvas.prototype, 'toggle');

      target.click();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should call hide first, if another offcanvas is open', async () => {
      fixtureEl.innerHTML = [
        '<button id="btn-2" data-spirit-toggle="offcanvas" data-spirit-target="#offcanvas-2"></button>',
        '<dialog id="offcanvas-1" class="offcanvas"></dialog>',
        '<dialog id="offcanvas-2" class="offcanvas"></dialog>',
      ].join('');

      const trigger2 = fixtureEl.querySelector('#btn-2') as HTMLElement;
      const offcanvasEl1 = document.querySelector('#offcanvas-1') as HTMLElement;
      const offcanvasEl2 = document.querySelector('#offcanvas-2') as HTMLElement;
      const offcanvas1 = new Offcanvas(offcanvasEl1);

      offcanvasEl1.addEventListener('shown.offcanvas', () => {
        trigger2.click();
      });
      offcanvasEl1.addEventListener('hidden.offcanvas', () => {
        expect(Offcanvas.getInstance(offcanvasEl2)).not.toBeNull();
      });

      await offcanvas1.show(trigger2);
    });

    it('should focus on trigger element after closing offcanvas', async () => {
      fixtureEl.innerHTML = [
        '<button id="btn" data-spirit-toggle="offcanvas" data-spirit-target="#offcanvas"></button>',
        '<div id="offcanvas" class="offcanvas"></div>',
      ].join('');

      const trigger = fixtureEl.querySelector('#btn') as HTMLElement;
      const offcanvasEl = fixtureEl.querySelector('#offcanvas') as HTMLElement;
      const offcanvas = new Offcanvas(offcanvasEl);
      const spy = jest.spyOn(trigger, 'focus');

      offcanvasEl.addEventListener('shown.offcanvas', () => {
        offcanvas.hide();
      });
      offcanvasEl.addEventListener('hidden.offcanvas', () => {
        setTimeout(() => {
          expect(spy).toHaveBeenCalled();
        }, 5);
      });

      await trigger.click();
    });

    it('should not focus on trigger element after closing offcanvas, if it is not visible', async () => {
      fixtureEl.innerHTML = [
        '<button id="btn" data-spirit-toggle="offcanvas" data-spirit-target="#offcanvas"></button>',
        '<div id="offcanvas" class="offcanvas"></div>',
      ].join('');

      const trigger = fixtureEl.querySelector('#btn') as HTMLElement;
      const offcanvasEl = fixtureEl.querySelector('#offcanvas') as HTMLElement;
      const offcanvas = new Offcanvas(offcanvasEl);
      const spy = jest.spyOn(trigger, 'focus');

      offcanvasEl.addEventListener('shown.bs.offcanvas', () => {
        trigger.style.display = 'none';
        offcanvas.hide();
      });
      offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
        setTimeout(() => {
          expect(spy).not.toHaveBeenCalled();
        }, 5);
      });

      await trigger.click();
    });
  });

  describe('getInstance', () => {
    it('should return offcanvas instance', () => {
      fixtureEl.innerHTML = '<div></div>';

      const div = fixtureEl.querySelector('div') as HTMLElement;
      const offCanvas = new Offcanvas(div);

      expect(Offcanvas.getInstance(div)).toEqual(offCanvas);
      expect(Offcanvas.getInstance(div)).toBeInstanceOf(Offcanvas);
    });

    it('should return null when there is no offcanvas instance', () => {
      fixtureEl.innerHTML = '<div></div>';

      const div = fixtureEl.querySelector('div') as HTMLElement;

      expect(Offcanvas.getInstance(div)).toBeNull();
    });
  });

  describe('getOrCreateInstance', () => {
    it('should return offcanvas instance', () => {
      fixtureEl.innerHTML = '<div></div>';

      const div = fixtureEl.querySelector('div') as HTMLElement;
      const offcanvas = new Offcanvas(div);

      expect(Offcanvas.getOrCreateInstance(div)).toEqual(offcanvas);
      expect(Offcanvas.getInstance(div)).toEqual(Offcanvas.getOrCreateInstance(div));
      expect(Offcanvas.getOrCreateInstance(div)).toBeInstanceOf(Offcanvas);
    });

    it('should return new instance when there is no Offcanvas instance', () => {
      fixtureEl.innerHTML = '<div></div>';

      const div = fixtureEl.querySelector('div') as HTMLElement;

      expect(Offcanvas.getInstance(div)).toBeNull();
      expect(Offcanvas.getOrCreateInstance(div)).toBeInstanceOf(Offcanvas);
    });
  });
});
