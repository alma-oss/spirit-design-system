import { clearFixture, getFixture } from '../../../tests/helpers/fixture';
import { loadComponents } from '../dom/Autoload';
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

  describe('auto-close ordering', () => {
    it('should close a previously-open dropdown when a second dropdown is toggled, without the second self-closing', async () => {
      fixtureEl.innerHTML = `
        <button id="trigger-a" data-spirit-toggle="dropdown" data-spirit-target="#dropdown-a">toggle A</button>
        <div class="Dropdown" id="dropdown-a">${childrenHtml}</div>
        <button id="trigger-b" data-spirit-toggle="dropdown" data-spirit-target="#dropdown-b">toggle B</button>
        <div class="Dropdown" id="dropdown-b">${childrenHtml}</div>
      `;

      const triggerA = fixtureEl.querySelector('#trigger-a') as HTMLElement;
      const triggerB = fixtureEl.querySelector('#trigger-b') as HTMLElement;
      const dropdownAEl = fixtureEl.querySelector('#dropdown-a') as HTMLElement;
      const dropdownBEl = fixtureEl.querySelector('#dropdown-b') as HTMLElement;

      // Opening A registers its autoCloseHandler inside a setTimeout(0) (so the click that opened
      // it doesn't immediately close it again) — wait for `shown.dropdown` so it's in place before
      // clicking B's trigger.
      await new Promise<void>((resolve) => {
        dropdownAEl.addEventListener('shown.dropdown', () => resolve(), { once: true });
        triggerA.click();
      });

      expect(dropdownAEl).toHaveClass(CLASSNAME_OPEN);

      await new Promise<void>((resolve) => {
        dropdownBEl.addEventListener('shown.dropdown', () => resolve(), { once: true });
        triggerB.click();
      });

      expect(dropdownBEl).toHaveClass(CLASSNAME_OPEN);
      expect(dropdownAEl).not.toHaveClass(CLASSNAME_OPEN);
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

    it('should not derive aria-controls when data-spirit-target is not an ID selector', async () => {
      fixtureEl.innerHTML = `
        <button data-spirit-toggle="dropdown" data-spirit-target=".dropdown-demo-1">toggle</button>
        <div class="Dropdown dropdown-demo-1">${childrenHtml}</div>
      `;

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;
      const dropdown = new Dropdown(element);

      await dropdown.show();

      expect(element.hasAttribute('aria-controls')).toBe(false);
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

    const dispatchKey = (element: HTMLElement, key: string) => {
      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });

      element.dispatchEvent(event);

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

    it('should treat data-spirit-dropdown-keyboard as enabled when present without a value', () => {
      fixtureEl.innerHTML = buildTrigger('data-spirit-dropdown-keyboard');

      const element = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;
      const showSpy = jest.spyOn(Dropdown.prototype, 'show');

      // eslint-disable-next-line no-new
      new Dropdown(element);
      dispatchKey(element, 'ArrowDown');

      expect(showSpy).toHaveBeenCalled();
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

  describe('menu', () => {
    const buildMenu = () => {
      fixtureEl.innerHTML = `
        <button type="button" data-spirit-toggle="dropdown" data-spirit-target="#dropdown-menu">Actions</button>
        <div class="DropdownPopover" role="presentation" id="dropdown-menu">
          <div role="menu" aria-label="Options" aria-orientation="vertical" id="dropdown-menu-list">
            <button type="button" class="Item" role="menuitem">Edit</button>
            <button type="button" class="Item" role="menuitem">Duplicate</button>
            <button type="button" class="Item" role="menuitem" disabled>Archive</button>
            <button type="button" class="Item" role="menuitem">Delete</button>
            <button type="button" class="Item" role="menuitem" data-hidden-by-css>Hidden</button>
            <a href="#" class="Item" role="menuitem">Preview</a>
          </div>
        </div>
        <button type="button">After</button>
      `;

      // jsdom does not lay out, so make every item except the CSS-hidden one pass `isVisible()`.
      jest.spyOn(window, 'getComputedStyle').mockReturnValue({
        getPropertyValue: () => 'visible',
      } as unknown as CSSStyleDeclaration);
      fixtureEl.querySelectorAll('[role="menuitem"]:not([data-hidden-by-css])').forEach((item) => {
        (item as unknown as { getClientRects: () => unknown[] }).getClientRects = () => [{}];
      });

      const trigger = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;
      const dropdown = new Dropdown(trigger);
      const getItem = (name: string) =>
        Array.from(fixtureEl.querySelectorAll<HTMLElement>('[role="menuitem"]')).find(
          (item) => item.textContent === name,
        ) as HTMLElement;

      return { dropdown, getItem, trigger };
    };

    const dispatchKey = (element: HTMLElement, key: string) => {
      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });

      element.dispatchEvent(event);

      return event;
    };

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should set up a menu button inserted later with loadComponents', () => {
      fixtureEl.innerHTML = `
        <button type="button" data-spirit-toggle="dropdown" data-spirit-target="#late-menu" aria-haspopup="menu">
          Actions
        </button>
        <div class="DropdownPopover" role="presentation" id="late-menu">
          <div role="menu" aria-label="Options"><button type="button" role="menuitem">Edit</button></div>
        </div>
      `;
      const trigger = fixtureEl.querySelector('[data-spirit-toggle="dropdown"]') as HTMLElement;

      loadComponents(fixtureEl);

      expect(Dropdown.getInstance(trigger)).toBeInstanceOf(Dropdown);
    });

    it('should point the trigger at the menu', () => {
      const { trigger } = buildMenu();

      expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
      expect(trigger.getAttribute('aria-controls')).toBe('dropdown-menu-list');
    });

    it('should make the first item the only tab stop', () => {
      const { getItem } = buildMenu();

      expect(getItem('Edit').getAttribute('tabindex')).toBe('0');
      expect(getItem('Duplicate').getAttribute('tabindex')).toBe('-1');
    });

    it('should focus the first item when opened', () => {
      const { dropdown, getItem } = buildMenu();

      dropdown.show();

      expect(document.activeElement).toBe(getItem('Edit'));
    });

    it('should open on the first item with ArrowDown and on the last item with ArrowUp', () => {
      const { dropdown, getItem, trigger } = buildMenu();

      dispatchKey(trigger, 'ArrowDown');

      expect(dropdown.state.open).toBe(true);
      expect(document.activeElement).toBe(getItem('Edit'));

      dropdown.hide();
      dispatchKey(trigger, 'ArrowUp');

      expect(document.activeElement).toBe(getItem('Preview'));
    });

    it('should move focus with arrows, skip disabled and hidden items and wrap', () => {
      const { dropdown, getItem } = buildMenu();

      dropdown.show();
      dispatchKey(getItem('Edit'), 'ArrowUp');

      expect(document.activeElement).toBe(getItem('Preview'));
      expect(getItem('Preview').getAttribute('tabindex')).toBe('0');

      dispatchKey(getItem('Preview'), 'ArrowDown');
      dispatchKey(getItem('Edit'), 'ArrowDown');
      dispatchKey(getItem('Duplicate'), 'ArrowDown');

      expect(document.activeElement).toBe(getItem('Delete'));

      dispatchKey(getItem('Delete'), 'ArrowDown');

      expect(document.activeElement).toBe(getItem('Preview'));
    });

    it('should move focus to the first and last item with Home and End', () => {
      const { dropdown, getItem } = buildMenu();

      dropdown.show();
      dispatchKey(getItem('Edit'), 'End');

      expect(document.activeElement).toBe(getItem('Preview'));

      dispatchKey(getItem('Preview'), 'Home');

      expect(document.activeElement).toBe(getItem('Edit'));
    });

    it('should move focus to the next item starting with the typed character', () => {
      const { dropdown, getItem } = buildMenu();

      dropdown.show();
      dispatchKey(getItem('Edit'), 'd');

      expect(document.activeElement).toBe(getItem('Duplicate'));
    });

    it('should close on item activation and return focus to the trigger', () => {
      const { dropdown, getItem, trigger } = buildMenu();

      dropdown.show();
      getItem('Edit').click();

      expect(dropdown.state.open).toBe(false);
      expect(document.activeElement).toBe(trigger);
    });

    it('should activate a link item with Space', () => {
      const { dropdown, getItem, trigger } = buildMenu();
      const onClick = jest.fn((event: Event) => event.preventDefault());

      getItem('Preview').addEventListener('click', onClick);
      dropdown.show();
      getItem('Preview').focus();
      const event = dispatchKey(getItem('Preview'), ' ');

      expect(event.defaultPrevented).toBe(true);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(dropdown.state.open).toBe(false);
      expect(document.activeElement).toBe(trigger);
    });

    it('should close with Escape and return focus to the trigger', () => {
      const { dropdown, getItem, trigger } = buildMenu();

      dropdown.show();
      dispatchKey(getItem('Edit'), 'Escape');

      expect(dropdown.state.open).toBe(false);
      expect(document.activeElement).toBe(trigger);
    });

    it('should close on Tab without moving focus back to the trigger', () => {
      jest.useFakeTimers();
      const { dropdown, getItem, trigger } = buildMenu();

      dropdown.show();
      const event = dispatchKey(getItem('Edit'), 'Tab');
      jest.runAllTimers();

      expect(event.defaultPrevented).toBe(false);
      expect(dropdown.state.open).toBe(false);
      expect(document.activeElement).not.toBe(trigger);

      jest.useRealTimers();
    });
  });
});
