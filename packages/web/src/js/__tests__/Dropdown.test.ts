import { clearFixture, getFixture } from '../../../tests/helpers/fixture';
import Dropdown, { CLASSNAME_EXPANDED, CLASSNAME_OPEN } from '../Dropdown';

const childrenHtml = `
  <a href="#" class="d-flex mb-400">
    <svg width="24" height="24" aria-hidden="true" class="mr-400">
      <use href="/icons/svg/sprite.svg#info" />
    </svg>
    <span>Information</span>
  </a>
`;

describe('Dropdown', () => {
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
        <button
          data-spirit-toggle="dropdown"
          data-spirit-target="#dropdown-demo-1"
        >
          toggle
        </button>
        <div class="Dropdown" id="dropdown-demo-1">${childrenHtml}</div>
      `;

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;
      const elementBySelector = new Dropdown(element);

      expect(elementBySelector.element).toEqual(element);
    });
  });

  describe('toggle', () => {
    it('should toggle a dropdown', async () => {
      fixtureEl.innerHTML = `
        <button
          data-spirit-toggle="dropdown"
          data-spirit-target="#dropdown-demo-1"
        >
          toggle
        </button>
        <div class="Dropdown" id="dropdown-demo-1">${childrenHtml}</div>
      `;

      const toggleSpy = jest.spyOn(Dropdown.prototype, 'toggle');
      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;
      const dropdown = new Dropdown(element);

      await dropdown.toggle();

      expect(toggleSpy).toHaveBeenCalled();

      await dropdown.toggle();

      expect(toggleSpy).toHaveBeenCalled();
    });
  });

  describe('show', () => {
    it('should show a dropdown', async () => {
      fixtureEl.innerHTML = `
        <button
          data-spirit-toggle="dropdown"
          data-spirit-target="#dropdown-demo-1"
        >
          toggle
        </button>
        <div class="Dropdown" id="dropdown-demo-1">${childrenHtml}</div>
      `;

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;
      const target = fixtureEl.querySelector('#dropdown-demo-1') as HTMLElement;
      const dropdown = new Dropdown(element);

      await dropdown.show();

      expect(element.getAttribute('aria-expanded')).toBe('true');
      expect(element).toHaveClass(CLASSNAME_EXPANDED);
      expect(target).toHaveClass(CLASSNAME_OPEN);
    });
  });

  describe('hide', () => {
    it('should hide a dropdown', async () => {
      fixtureEl.innerHTML = `
        <button
          data-spirit-toggle="dropdown"
          data-spirit-target="#dropdown-demo-1"
        >
          toggle
        </button>
        <div class="Dropdown" id="dropdown-demo-1">${childrenHtml}</div>
      `;

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;
      const dropdown = new Dropdown(element);

      await dropdown.hide();

      expect(element.getAttribute('aria-expanded')).toBe('false');
    });
  });
});
