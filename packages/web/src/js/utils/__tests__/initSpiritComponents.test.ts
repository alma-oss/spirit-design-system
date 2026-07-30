import { clearFixture, createEvent, getFixture } from '../../../../tests/helpers/fixture';
import BaseComponent from '../../BaseComponent';
import { enableToggleTrigger, initSpiritComponents } from '../ComponentFunctions';

/* eslint-disable class-methods-use-this */
class DummyClass extends BaseComponent {
  static get NAME() {
    return 'test-init';
  }

  testMethod() {
    return true;
  }
}
/* eslint-enable class-methods-use-this */

describe('initSpiritComponents', () => {
  let fixtureEl: Element;

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  afterEach(() => {
    clearFixture();
  });

  it('should bind a registered component within the given root, without waiting for DOMContentLoaded', async () => {
    fixtureEl.innerHTML = [
      '<div id="bar" class="test">',
      '  <button type="button" data-spirit-toggle="test-init" data-spirit-target="#bar"></button>',
      '</div>',
    ].join('');

    const getOrCreateInstanceSpy = jest.spyOn(DummyClass, 'getOrCreateInstance');
    const componentWrapper = fixtureEl.querySelector('#bar');
    const btnToggle = fixtureEl.querySelector('[data-spirit-toggle="test-init"]') as HTMLElement;
    const event = createEvent('click');

    enableToggleTrigger(DummyClass, 'testMethod');
    initSpiritComponents(fixtureEl as HTMLElement);
    await btnToggle.dispatchEvent(event);

    expect(getOrCreateInstanceSpy).toHaveBeenCalledWith(componentWrapper);
  });
});
