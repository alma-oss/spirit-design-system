import { clearFixture, getFixture } from '../../../../tests/helpers/fixture';
import Manipulator from '../Manipulator';

describe('Manipulator', () => {
  let fixtureEl: Element;

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  afterEach(() => {
    clearFixture();
  });

  describe('setDataAttribute', () => {
    it('should set data attribute prefixed with spirit', () => {
      fixtureEl.innerHTML = '<div></div>';

      const div = fixtureEl.querySelector('div') as HTMLDivElement;

      Manipulator.setDataAttribute(div, 'key', 'value');

      expect(div.getAttribute('data-spirit-key')).toBe('value');
    });

    it('should set data attribute in kebab case', () => {
      fixtureEl.innerHTML = '<div></div>';

      const div = fixtureEl.querySelector('div') as HTMLDivElement;

      Manipulator.setDataAttribute(div, 'testKey', 'value');

      expect(div.getAttribute('data-spirit-test-key')).toBe('value');
    });
  });

  describe('removeDataAttribute', () => {
    it('should only remove spirit-prefixed data attribute', () => {
      fixtureEl.innerHTML = '<div data-spirit-key="value" data-key-spirit="postfixed" data-key="value"></div>';

      const div = fixtureEl.querySelector('div') as HTMLDivElement;

      Manipulator.removeDataAttribute(div, 'key');

      expect(div.getAttribute('data-spirit-key')).toBeNull();
      expect(div.getAttribute('data-key-spirit')).toBe('postfixed');
      expect(div.getAttribute('data-key')).toBe('value');
    });

    it('should remove data attribute in kebab case', () => {
      fixtureEl.innerHTML = '<div data-spirit-test-key="value"></div>';

      const div = fixtureEl.querySelector('div') as HTMLDivElement;

      Manipulator.removeDataAttribute(div, 'testKey');

      expect(div.getAttribute('data-spirit-test-key')).toBeNull();
    });
  });

  describe('getDataAttributes', () => {
    it('should return an empty object for null', () => {
      expect(Manipulator.getDataAttributes(null)).toEqual({});
    });

    it('should get only spirit-prefixed data attributes without spirit namespace', () => {
      fixtureEl.innerHTML =
        '<div data-spirit-toggle="tabs" data-spirit-target="#element" data-another="value" data-target-spirit="#element" data-in-spirit-out="in-between"></div>';

      const div = fixtureEl.querySelector('div');

      expect(Manipulator.getDataAttributes(div)).toEqual({
        toggle: 'tabs',
        target: '#element',
      });
    });

    it('should omit `spirit-config` data attribute', () => {
      fixtureEl.innerHTML =
        '<div data-spirit-toggle="tabs" data-spirit-target="#element" data-spirit-config=\'{"testBool":false}\'></div>';

      const div = fixtureEl.querySelector('div');

      expect(Manipulator.getDataAttributes(div)).toEqual({
        toggle: 'tabs',
        target: '#element',
      });
    });
  });

  describe('getDataAttribute', () => {
    it('should only get spirit-prefixed data attribute', () => {
      fixtureEl.innerHTML = '<div data-spirit-key="value" data-test-spirit="postFixed" data-toggle="tab"></div>';

      const div = fixtureEl.querySelector('div');

      expect(Manipulator.getDataAttribute(div, 'key')).toBe('value');
      expect(Manipulator.getDataAttribute(div, 'test')).toBeNull();
      expect(Manipulator.getDataAttribute(div, 'toggle')).toBeNull();
    });

    it('should get data attribute in kebab case', () => {
      fixtureEl.innerHTML = '<div data-spirit-test-key="value" ></div>';

      const div = fixtureEl.querySelector('div');

      expect(Manipulator.getDataAttribute(div, 'testKey')).toBe('value');
    });

    it('should normalize data', () => {
      fixtureEl.innerHTML = '<div data-spirit-test="false" ></div>';

      const div = fixtureEl.querySelector('div') as HTMLDivElement;

      expect(Manipulator.getDataAttribute(div, 'test')).toBeFalsy();

      div.setAttribute('data-spirit-test', 'true');

      expect(Manipulator.getDataAttribute(div, 'test')).toBeTruthy();

      div.setAttribute('data-spirit-test', '1');

      expect(Manipulator.getDataAttribute(div, 'test')).toBe(1);
    });

    it('should normalize json data', () => {
      fixtureEl.innerHTML = '<div data-spirit-test=\'{"delay":{"show":100,"hide":10}}\'></div>';

      const div = fixtureEl.querySelector('div') as HTMLDivElement;

      expect(Manipulator.getDataAttribute(div, 'test')).toEqual({ delay: { show: 100, hide: 10 } });

      const objectData = {
        'Super Hero': ['Iron Man', 'Super Man'],
        testNum: 90,
        url: 'http://localhost:8080/test?foo=bar',
      };
      const dataStr = JSON.stringify(objectData);
      div.setAttribute('data-spirit-test', encodeURIComponent(dataStr));

      expect(Manipulator.getDataAttribute(div, 'test')).toEqual(objectData);

      div.setAttribute('data-spirit-test', dataStr);

      expect(Manipulator.getDataAttribute(div, 'test')).toEqual(objectData);
    });
  });
});
