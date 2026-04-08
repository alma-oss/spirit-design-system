// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { clearFixture, getFixture } from '../../../tests/helpers/fixture';
import BaseComponent from '../BaseComponent';
import EventHandler from '../dom/EventHandler';

class DummyClass extends BaseComponent {
  constructor(element: Element | string | null) {
    super(element);

    EventHandler.on(this.element, 'click');
  }

  static get NAME() {
    return 'dummy';
  }
}

describe('Base Component', () => {
  let fixtureEl: Element;
  const name = 'dummy';
  let element: Element;
  let instance: unknown;
  const createInstance = () => {
    fixtureEl.innerHTML = '<div id="foo"></div>';
    element = fixtureEl.querySelector('#foo') as HTMLElement;
    instance = new DummyClass(element);
  };

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  afterEach(() => {
    clearFixture();
  });

  describe('Static Methods', () => {
    describe('INSTANCE_KEY', () => {
      it('should return plugin data key', () => {
        expect(DummyClass.INSTANCE_KEY).toBe(`spirit.${name}`);
      });
    });

    describe('NAME', () => {
      it('should return plugin NAME', () => {
        expect(DummyClass.NAME).toEqual(name);
      });
    });

    describe('DATA_KEY', () => {
      it('should return plugin data key', () => {
        expect(DummyClass.DATA_KEY).toBe(name);
      });
    });

    describe('EVENT_KEY', () => {
      it('should return plugin event key', () => {
        expect(DummyClass.EVENT_KEY).toBe(`.${name}`);
      });
    });
  });

  describe('Public Methods', () => {
    describe('constructor', () => {
      it('should accept element, either passed as a CSS selector or DOM element', () => {
        fixtureEl.innerHTML = ['<div id="foo"></div>', '<div id="bar"></div>'].join('');

        const el = fixtureEl.querySelector('#foo');
        const elInstance = new DummyClass(el);
        const selectorInstance = new DummyClass('#bar');

        expect(elInstance.element).toEqual(el);
        expect(selectorInstance.element).toEqual(fixtureEl.querySelector('#bar'));
      });

      it('should not initialize and add element record to InstanceMap (caching), if argument `element` is not an HTML element', () => {
        fixtureEl.innerHTML = '';

        const el = fixtureEl.querySelector('#foo');
        const elInstance = new DummyClass(el);
        const selectorInstance = new DummyClass('#bar');

        expect(elInstance.element).toBeNull();
        expect(selectorInstance.element).toBeNull();
      });
    });

    describe('dispose', () => {
      it('should dispose an component', () => {
        createInstance();

        expect(DummyClass.getInstance(element)).not.toBeNull();

        instance.dispose();

        expect(DummyClass.getInstance(element)).toBeNull();
        expect(instance.element).toBeNull();
      });
    });
  });

  describe('getInstance', () => {
    it('should return an instance', () => {
      createInstance();

      expect(DummyClass.getInstance(element)).toEqual(instance);
      expect(DummyClass.getInstance(element)).toBeInstanceOf(DummyClass);
    });

    it('should accept element, either passed as a CSS selector, jQuery element, or DOM element', () => {
      createInstance();

      expect(DummyClass.getInstance('#foo')).toEqual(instance);
      expect(DummyClass.getInstance(element)).toEqual(instance);
    });

    it('should return null when there is no instance', () => {
      fixtureEl.innerHTML = '<div></div>';

      const div = fixtureEl.querySelector('div');

      expect(DummyClass.getInstance(div)).toBeNull();
    });
  });

  describe('getOrCreateInstance', () => {
    it('should return an instance', () => {
      createInstance();

      expect(DummyClass.getOrCreateInstance(element)).toEqual(instance);
      expect(DummyClass.getInstance(element)).toEqual(DummyClass.getOrCreateInstance(element, {}));
      expect(DummyClass.getOrCreateInstance(element)).toBeInstanceOf(DummyClass);
    });

    it('should return new instance when there is no alert instance', () => {
      fixtureEl.innerHTML = '<div id="foo"></div>';
      element = fixtureEl.querySelector('#foo');

      expect(DummyClass.getInstance(element)).toBeNull();
      expect(DummyClass.getOrCreateInstance(element)).toBeInstanceOf(DummyClass);
    });
  });
});
