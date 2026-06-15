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

  describe('aria-controls', () => {
    it('should derive a valid IDREF from data-spirit-target when none is set', async () => {
      fixtureEl.innerHTML = `
        <button data-spirit-toggle="dropdown" data-spirit-target="#dropdown-demo-1">toggle</button>
        <div class="Dropdown" id="dropdown-demo-1">${childrenHtml}</div>
      `;

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;
      const dropdown = new Dropdown(element);

      await dropdown.show();

      // The leading "#" is stripped so the value is a valid IDREF, not a CSS selector.
      expect(element.getAttribute('aria-controls')).toBe('dropdown-demo-1');
    });

    it('should preserve an author-supplied aria-controls', async () => {
      fixtureEl.innerHTML = `
        <button
          data-spirit-toggle="dropdown"
          data-spirit-target="#dropdown-demo-1"
          aria-controls="custom-listbox"
        >
          toggle
        </button>
        <div class="Dropdown" id="dropdown-demo-1">${childrenHtml}</div>
      `;

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;
      const dropdown = new Dropdown(element);

      await dropdown.show();
      await dropdown.hide();

      expect(element.getAttribute('aria-controls')).toBe('custom-listbox');
    });
  });

  describe('keyboard', () => {
    const itemsHtml = `
      <a href="#" id="item-1">One</a>
      <a href="#" id="item-2">Two</a>
      <a href="#" id="item-3">Three</a>
    `;

    const buildTrigger = (triggerAttrs = '', triggerTag = 'button') => `
      <${triggerTag} data-spirit-toggle="dropdown" data-spirit-target="#dropdown-kbd" ${triggerAttrs}>toggle</${triggerTag}>
      <div class="Dropdown" id="dropdown-kbd">${itemsHtml}</div>
    `;

    const dispatchKey = (el: HTMLElement, key: string) => {
      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });

      el.dispatchEvent(event);

      return event;
    };

    // Make the menu items pass the jsdom-unfriendly isVisible() check (jsdom does not lay out).
    const makeItemsVisible = () => {
      jest.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: () => 'visible',
      } as unknown as CSSStyleDeclaration);

      fixtureEl.querySelectorAll('#dropdown-kbd a').forEach((item) => {
        (item as unknown as { getClientRects: () => unknown[] }).getClientRects = () => [{}];
      });
    };

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should not handle keyboard when the keyboard option is disabled (default)', () => {
      fixtureEl.innerHTML = buildTrigger();

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;
      const showSpy = jest.spyOn(Dropdown.prototype, 'show');

      // eslint-disable-next-line no-new
      new Dropdown(element);
      dispatchKey(element, 'ArrowDown');

      expect(showSpy).not.toHaveBeenCalled();
    });

    it('should open and focus the first item on ArrowDown', () => {
      fixtureEl.innerHTML = buildTrigger('data-spirit-dropdown-keyboard="true" data-spirit-dropdown-items="a"');

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;

      // eslint-disable-next-line no-new
      new Dropdown(element);
      makeItemsVisible();

      dispatchKey(element, 'ArrowDown');

      expect(element.getAttribute('aria-expanded')).toBe('true');
      expect(document.activeElement).toBe(fixtureEl.querySelector('#item-1'));
    });

    it('should open and focus the last item on ArrowUp', () => {
      fixtureEl.innerHTML = buildTrigger('data-spirit-dropdown-keyboard="true" data-spirit-dropdown-items="a"');

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;

      // eslint-disable-next-line no-new
      new Dropdown(element);
      makeItemsVisible();

      dispatchKey(element, 'ArrowUp');

      expect(element.getAttribute('aria-expanded')).toBe('true');
      expect(document.activeElement).toBe(fixtureEl.querySelector('#item-3'));
    });

    it('should move focus to the next item on a subsequent ArrowDown', () => {
      fixtureEl.innerHTML = buildTrigger('data-spirit-dropdown-keyboard="true" data-spirit-dropdown-items="a"');

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;
      const firstItem = fixtureEl.querySelector('#item-1') as HTMLElement;

      // eslint-disable-next-line no-new
      new Dropdown(element);
      makeItemsVisible();

      dispatchKey(element, 'ArrowDown');
      dispatchKey(firstItem, 'ArrowDown');

      expect(document.activeElement).toBe(fixtureEl.querySelector('#item-2'));
    });

    it('should close and return focus to the trigger on Escape', () => {
      fixtureEl.innerHTML = buildTrigger('data-spirit-dropdown-keyboard="true"');

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;
      const dropdown = new Dropdown(element);

      dropdown.show();
      dispatchKey(element, 'Escape');

      expect(element.getAttribute('aria-expanded')).toBe('false');
      expect(document.activeElement).toBe(element);
    });

    it('should ignore Escape when the dropdown is closed', () => {
      fixtureEl.innerHTML = buildTrigger('data-spirit-dropdown-keyboard="true"');

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;
      const dropdown = new Dropdown(element);
      const hideSpy = jest.spyOn(dropdown, 'hide');

      dispatchKey(element, 'Escape');

      expect(hideSpy).not.toHaveBeenCalled();
    });

    it('should ignore Arrow keys when the trigger is an input but still close on Escape', () => {
      fixtureEl.innerHTML = buildTrigger('data-spirit-dropdown-keyboard="true"', 'input').replace(
        '>toggle</input>',
        ' />',
      );

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;
      const showSpy = jest.spyOn(Dropdown.prototype, 'show');
      const dropdown = new Dropdown(element);

      dispatchKey(element, 'ArrowDown');

      expect(showSpy).not.toHaveBeenCalled();

      dropdown.show();
      dispatchKey(element, 'Escape');

      expect(element.getAttribute('aria-expanded')).toBe('false');
    });

    it('should only open (no focus move) when menuItemsSelector is unset', () => {
      fixtureEl.innerHTML = buildTrigger('data-spirit-dropdown-keyboard="true"');

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;

      // eslint-disable-next-line no-new
      new Dropdown(element);

      dispatchKey(element, 'ArrowDown');

      expect(element.getAttribute('aria-expanded')).toBe('true');
      expect(document.activeElement).not.toBe(fixtureEl.querySelector('#item-1'));
    });

    it('should remove keyboard listeners on dispose', () => {
      fixtureEl.innerHTML = buildTrigger('data-spirit-dropdown-keyboard="true"');

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;
      const showSpy = jest.spyOn(Dropdown.prototype, 'show');
      const dropdown = new Dropdown(element);

      dropdown.dispose();
      dispatchKey(element, 'ArrowDown');

      expect(showSpy).not.toHaveBeenCalled();
    });
  });
});
