import { clearFixture, getFixture } from '../../../tests/helpers/fixture';
import AutoResize from '../AutoResize';

describe('AutoResize', () => {
  let fixtureEl: Element;

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  afterEach(() => {
    clearFixture();
  });

  beforeEach(() => {
    fixtureEl.innerHTML = `
      <div data-spirit-toggle="autoResize">
        <label for="textarea" class="Label">Label</label>
        <div class="InputContainer InputContainer--medium">
          <textarea id="textarea">Test content</textarea>
        </div>
      </div>
    `;
  });

  describe('constructor', () => {
    it('should adjust the height of the textarea on construction', () => {
      const wrapperEl = fixtureEl.querySelector('div') as HTMLElement;
      const textareaEl = wrapperEl.querySelector('textarea') as HTMLTextAreaElement;

      // Manually set the scrollHeight to simulate the actual behavior
      Object.defineProperty(textareaEl, 'scrollHeight', { value: 50, configurable: true });

      const borderTopWidth = parseFloat(getComputedStyle(textareaEl).getPropertyValue('border-top-width')) || 0;
      const borderBottomWidth = parseFloat(getComputedStyle(textareaEl).getPropertyValue('border-bottom-width')) || 0;
      const totalBorderWidth = borderTopWidth + borderBottomWidth;

      const initialHeight = textareaEl.scrollHeight + totalBorderWidth;
      const instance = new AutoResize(wrapperEl);

      expect(instance.input.style.height).toBe(`${initialHeight}px`);
    });
  });

  describe('adjustHeight', () => {
    it('should adjust the height of the textarea on input event', () => {
      const wrapperEl = fixtureEl.querySelector('div') as HTMLElement;
      const textareaEl = wrapperEl.querySelector('textarea') as HTMLTextAreaElement;

      // Manually set the scrollHeight to simulate the actual behavior
      Object.defineProperty(textareaEl, 'scrollHeight', { value: 50, configurable: true });

      const initialHeight = textareaEl.style.height;

      const instance = new AutoResize(wrapperEl);

      instance.input.value = 'Test content\nNew line\nNew line\nNew line';
      instance.input.dispatchEvent(new Event('input'));

      expect(instance.input.style.height).not.toBe(initialHeight);
    });
  });
});
