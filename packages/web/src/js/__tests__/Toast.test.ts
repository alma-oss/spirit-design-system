import { clearFixture, getFixture } from '../../../tests/helpers/fixture';
import {
  ATTRIBUTE_ARIA_EXPANDED,
  ATTRIBUTE_DATA_TARGET,
  CLASS_NAME_HIDDEN,
  CLASS_NAME_TRANSITIONING,
  CLASS_NAME_VISIBLE,
} from '../constants';
import EventHandler from '../dom/EventHandler';
import Toast, { PROPERTY_NAME_SLOWEST_TRANSITION } from '../Toast';

const testId = 'toast-test';

const toastHtmlHidden = `
  <div id="${testId}" class="ToastBar ToastBar--success ToastBar--dismissible is-hidden">
    <div class="ToastBar__box" data-spirit-populate-field="box">
        <button type="button" data-spirit-target="#${testId}" aria-expanded="false">Close</button>
    </div>
  </div>
`;

const toastHtmlVisible = `
  <div id="${testId}" class="ToastBar ToastBar--success ToastBar--dismissible is-visible">
    <div class="ToastBar__box" data-spirit-populate-field="box">
      <button type="button" data-spirit-target="#${testId}" aria-expanded="true">Close</button>
    </div>
  </div>
`;

describe('Toast', () => {
  let fixtureEl: Element;

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  afterEach(() => {
    clearFixture();
  });

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Toast.NAME).toEqual(expect.any(String));
    });
  });

  describe('DATA_KEY', () => {
    it('should return plugin data key', () => {
      expect(Toast.DATA_KEY).toBe('toast');
    });
  });

  describe('EVENT_KEY', () => {
    it('should return plugin event key', () => {
      expect(Toast.EVENT_KEY).toBe('.toast');
    });
  });

  describe('constructor', () => {
    it('should construct a toast', () => {
      fixtureEl.innerHTML = toastHtmlHidden;
      const element = fixtureEl.querySelector('.ToastBar') as HTMLElement;
      const toast = new Toast(element);

      expect(toast.element).toEqual(element);
    });
  });

  describe('show', () => {
    it('should show a toast', async () => {
      fixtureEl.innerHTML = toastHtmlHidden;

      const element = fixtureEl.querySelector('.ToastBar') as HTMLElement;
      const toast = new Toast(element);
      const trigger = fixtureEl.querySelector(`[${ATTRIBUTE_DATA_TARGET}="#${testId}"]`) as HTMLButtonElement;

      const showSpy = jest.spyOn(Toast.prototype, 'show');

      toast.show();

      expect(showSpy).toHaveBeenCalled();
      expect(trigger).toHaveAttribute(ATTRIBUTE_ARIA_EXPANDED, 'true');
      expect(element).toHaveClass(CLASS_NAME_HIDDEN);
      expect(element).not.toHaveClass(CLASS_NAME_TRANSITIONING);
      expect(element).not.toHaveClass(CLASS_NAME_VISIBLE);

      EventHandler.trigger(element, 'transitionend', { propertyName: PROPERTY_NAME_SLOWEST_TRANSITION });

      setTimeout(() => {
        expect(element).toHaveClass(CLASS_NAME_VISIBLE);
        expect(element).not.toHaveClass(CLASS_NAME_HIDDEN);
        expect(element).not.toHaveClass(CLASS_NAME_TRANSITIONING);
      }, 0);
    });
  });

  describe('hide', () => {
    it('should hide a toast', async () => {
      fixtureEl.innerHTML = toastHtmlVisible;

      const element = fixtureEl.querySelector('.ToastBar') as HTMLElement;
      const toast = new Toast(element);
      const trigger = fixtureEl.querySelector(`[${ATTRIBUTE_DATA_TARGET}="#${testId}"]`) as HTMLButtonElement;

      const hideSpy = jest.spyOn(Toast.prototype, 'hide');

      toast.hide();

      expect(hideSpy).toHaveBeenCalled();
      expect(trigger).toHaveAttribute(ATTRIBUTE_ARIA_EXPANDED, 'false');
      expect(element).toHaveClass(CLASS_NAME_HIDDEN);
      expect(element).toHaveClass(CLASS_NAME_TRANSITIONING);
      expect(element).not.toHaveClass(CLASS_NAME_VISIBLE);

      EventHandler.trigger(element, 'transitionend', { propertyName: PROPERTY_NAME_SLOWEST_TRANSITION });

      setTimeout(() => {
        expect(fixtureEl.querySelector('.ToastBar')).toBeNull();
      }, 0);
    });
  });
});
