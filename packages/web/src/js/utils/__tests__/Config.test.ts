import { clearFixture, getFixture } from '../../../../tests/helpers/fixture';
import Config from '../Config';

class DummyConfigClass extends Config {
  static get NAME() {
    return 'dummy';
  }
}

describe('Config', () => {
  let fixtureEl: Element;
  const name = 'dummy';

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  afterEach(() => {
    clearFixture();
  });

  describe('NAME', () => {
    it('should return plugin NAME', () => {
      expect(DummyConfigClass.NAME).toEqual(name);
    });
  });

  describe('DefaultType', () => {
    it('should return plugin default type', () => {
      expect(DummyConfigClass.DefaultType).toEqual({});
    });
  });

  describe('Default', () => {
    it('should return plugin defaults', () => {
      expect(DummyConfigClass.Default).toEqual({});
    });
  });

  describe('mergeConfigObj', () => {
    it("should parse element's data attributes and merge it with default config. Element's data attributes must excel Defaults", () => {
      fixtureEl.innerHTML =
        '<div id="test" data-spirit-test-bool="false" data-spirit-test-int="8" data-spirit-test-string1="bar"></div>';

      jest.spyOn(DummyConfigClass, 'Default', 'get').mockReturnValue({
        testBool: true,
        testString: 'foo',
        testString1: 'foo',
        testInt: 7,
      });

      const instance = new DummyConfigClass();
      const configResult = instance.mergeConfigObj({}, fixtureEl.querySelector('#test'));

      expect(configResult?.testBool).toBe(false);
      expect(configResult?.testString).toBe('foo');
      expect(configResult?.testString1).toBe('bar');
      expect(configResult?.testInt).toBe(8);
    });

    it("should parse element's data attributes and merge it with default config, plug these given during method call. The programmatically given should excel all", () => {
      fixtureEl.innerHTML =
        '<div id="test" data-spirit-test-bool="false" data-spirit-test-int="8" data-spirit-test-string-1="bar"></div>';

      jest.spyOn(DummyConfigClass, 'Default', 'get').mockReturnValue({
        testBool: true,
        testString: 'foo',
        testString1: 'foo',
        testInt: 7,
      });

      const instance = new DummyConfigClass();
      const configResult = instance.mergeConfigObj(
        {
          testString1: 'test',
          testInt: 3,
        },
        fixtureEl.querySelector('#test'),
      );

      expect(configResult?.testBool).toBe(false);
      expect(configResult?.testString).toBe('foo');
      expect(configResult?.testString1).toBe('test');
      expect(configResult?.testInt).toBe(3);
    });

    it("should parse element's data attribute `config` and any rest attributes. The programmatically given should excel all. Data attribute `config` should excel only Defaults", () => {
      fixtureEl.innerHTML =
        '<div id="test" data-spirit-config=\'{"testBool":false,"testInt":50,"testInt2":100}\' data-spirit-test-int="8" data-spirit-test-string-1="bar"></div>';

      jest.spyOn(DummyConfigClass, 'Default', 'get').mockReturnValue({
        testBool: true,
        testString: 'foo',
        testString1: 'foo',
        testInt: 7,
        testInt2: 600,
      });

      const instance = new DummyConfigClass();
      const configResult = instance.mergeConfigObj(
        {
          testString1: 'test',
        },
        fixtureEl.querySelector('#test'),
      );

      expect(configResult?.testBool).toBe(false);
      expect(configResult?.testString).toBe('foo');
      expect(configResult?.testString1).toBe('test');
      expect(configResult?.testInt).toBe(8);
      expect(configResult?.testInt2).toBe(100);
    });

    it("should omit element's data attribute `config` if is not an object", () => {
      fixtureEl.innerHTML = '<div id="test" data-spirit-config="foo" data-spirit-test-int="8"></div>';

      jest.spyOn(DummyConfigClass, 'Default', 'get').mockReturnValue({
        testInt: 7,
        testInt2: 79,
      });

      const instance = new DummyConfigClass();
      const configResult = instance.mergeConfigObj({}, fixtureEl.querySelector('#test'));

      expect(configResult?.testInt).toBe(8);
      expect(configResult?.testInt2).toBe(79);
    });
  });

  describe('typeCheckConfig', () => {
    it('should check type of the config object', () => {
      jest.spyOn(DummyConfigClass, 'DefaultType', 'get').mockReturnValue({
        toggle: 'boolean',
        parent: '(string|element)',
      });
      const config = {
        toggle: true,
        parent: 777,
      };

      const obj = new DummyConfigClass();

      expect(() => {
        obj.typeCheckConfig(config);
      }).toThrow(
        // @ts-ignore Property 'NAME' does not exist on type 'Function'.
        `${obj.constructor.NAME.toUpperCase()}: Option "parent" provided type "number" but expected type "(string|element)".`,
      );
    });

    it('should return null stringified when null is passed', () => {
      jest.spyOn(DummyConfigClass, 'DefaultType', 'get').mockReturnValue({
        toggle: 'boolean',
        parent: '(null|element)',
      });

      const obj = new DummyConfigClass();
      const config = {
        toggle: true,
        parent: null,
      };

      expect(() => {
        obj.typeCheckConfig(config);
      }).not.toThrow();
    });

    it('should return undefined stringified when undefined is passed', () => {
      jest.spyOn(DummyConfigClass, 'DefaultType', 'get').mockReturnValue({
        toggle: 'boolean',
        parent: '(undefined|element)',
      });

      const obj = new DummyConfigClass();
      const config = {
        toggle: true,

        parent: undefined,
      };

      expect(() => {
        obj.typeCheckConfig(config);
      }).not.toThrow();
    });
  });
});
