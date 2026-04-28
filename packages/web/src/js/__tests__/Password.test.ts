import { clearFixture, getFixture } from '../../../tests/helpers/fixture';
import Password from '../Password';

describe('Password', () => {
  let fixtureEl: Element;

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  afterEach(() => {
    clearFixture();
  });

  describe('constructor', () => {
    it('should take care of element passed as a CSS selector', () => {
      fixtureEl.innerHTML = `
        <input type="password" />
        <div>
          <button aria-checked="false" aria-label="Show password" data-spirit-toggle="password"></button>
        </div>
      `;

      const passwordEl = fixtureEl.querySelector('[data-spirit-toggle="password"]') as HTMLElement;
      const passwordBySelector = new Password(passwordEl);

      expect(passwordBySelector.element).toEqual(passwordEl);
    });
  });

  describe('toggle', () => {
    it('should toggle a password', async () => {
      fixtureEl.innerHTML = `
        <input type="password" />
        <div>
          <button type="button" aria-checked="false" aria-label="Show password" data-spirit-toggle="password"></button>
        </div>
      `;

      const showSpy = jest.spyOn(Password.prototype, 'show');
      const hideSpy = jest.spyOn(Password.prototype, 'hide');

      const passwordEl = fixtureEl.querySelector('[data-spirit-toggle="password"]') as HTMLElement;
      const password = new Password(passwordEl);

      await password.toggle(passwordEl);

      expect(showSpy).toHaveBeenCalled();

      await password.toggle(passwordEl);

      expect(hideSpy).toHaveBeenCalled();
    });
  });

  describe('show', () => {
    it('should show a password', async () => {
      fixtureEl.innerHTML = `
        <input type="password" />
        <div>
          <button type="button" aria-checked="false" aria-label="Show password" data-spirit-toggle="password"></button>
        </div>
      `;

      const passwordEl = fixtureEl.querySelector('[data-spirit-toggle="password"]') as HTMLElement;
      const password = new Password(passwordEl);

      await password.show(passwordEl);

      expect(passwordEl.getAttribute('aria-checked')).toBe('true');
      expect(passwordEl.getAttribute('aria-label')).toBe('Hide password');
      expect((fixtureEl.querySelector('input') as HTMLInputElement).getAttribute('type')).toBe('text');
    });
  });

  describe('hide', () => {
    it('should hide a password', async () => {
      fixtureEl.innerHTML = `
        <input type="password" />
        <div>
          <button type="button" aria-checked="true" aria-label="Hide password" data-spirit-toggle="password"></button>
        </div>
      `;

      const passwordEl = fixtureEl.querySelector('[data-spirit-toggle="password"]') as HTMLElement;
      const password = new Password(passwordEl);

      await password.hide(passwordEl);

      expect(passwordEl.getAttribute('aria-checked')).toBe('false');
      expect(passwordEl.getAttribute('aria-label')).toBe('Show password');
      expect((fixtureEl.querySelector('input') as HTMLInputElement).getAttribute('type')).toBe('password');
    });
  });
});
