import { clearFixture, getFixture } from '../../../tests/helpers/fixture';
import Tabs from '../Tabs';

describe('Tabs', () => {
  let fixtureEl: Element;

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  afterEach(() => {
    clearFixture();
  });

  describe('constructor', () => {
    it('should take care of element either passed as a CSS selector or DOM element', () => {
      fixtureEl.innerHTML = `
        <ul class="Tabs">
          <li><a href="#home" role="tab">Home</a></li>
        </ul>
        <ul>
          <li id="home"></li>
        </ul>
      `;

      const tabEl = fixtureEl.querySelector('[href="#home"]') as HTMLElement;

      // @ts-ignore badly typed BaseComponent constructor
      const tabBySelector = new Tabs('[href="#home"]');
      const tabByElement = new Tabs(tabEl);

      expect(tabBySelector.element).toEqual(tabEl);
      expect(tabByElement.element).toEqual(tabEl);
    });

    it('Do not Throw exception if not parent', () => {
      fixtureEl.innerHTML = [(fixtureEl.innerHTML = '<div class=""><div class="Tabs__link"></div></div>')].join('');
      const navEl = fixtureEl.querySelector('.Tabs__link') as HTMLElement;

      expect(() => {
        new Tabs(navEl); // eslint-disable-line no-new
      }).not.toThrow(TypeError);
    });
  });

  describe('show', () => {
    it('should activate element by tab id (using buttons, the preferred semantic way)', async () => {
      fixtureEl.innerHTML = `
          <ul class="Tabs" role="tablist">
            <li><button type="button" data-spirit-target="#home" role="tab">Home</button></li>
            <li><button type="button" id="trigger-profile" data-spirit-target="#profile" role="tab">Profile</button></li>
          </ul>
          <ul>
            <li id="home" role="tabpanel"></li>
            <li id="profile" role="tabpanel"></li>
          </ul>
        `;

      const profileTriggerEl = fixtureEl.querySelector('#trigger-profile') as HTMLElement;
      const tab = new Tabs(profileTriggerEl);

      profileTriggerEl.addEventListener('shown.tabs', () => {
        expect(fixtureEl.querySelector('#profile')).toHaveClass('is-selected');
        expect(profileTriggerEl.getAttribute('aria-selected')).toBe('true');
      });

      await tab.show();
    });

    it('should not fire shown when tab is already active', async () => {
      fixtureEl.innerHTML = `
          <ul class="Tabs" role="tablist">
            <li class="Tabs__item" role="presentation"><button type="button" data-spirit-target="#home" class="Tabs__link is-selected" role="tab" aria-selected="true">Home</button></li>
            <li class="Tabs__item" role="presentation"><button type="button" data-spirit-target="#profile" class="Tabs__link" role="tab">Profile</button></li>
          </ul>
          <div class="Tabs-content">
            <div class="TabsPane is-selected" id="home" role="tabpanel"></div>
            <div class="TabsPane" id="profile" role="tabpanel"></div>
          </div>
        `;

      const triggerActive = fixtureEl.querySelector('button.is-selected') as HTMLElement;
      const tab = new Tabs(triggerActive);

      triggerActive.addEventListener('shown.tabs', () => {
        Error('should not trigger shown event');
      });

      await tab.show();
      await setTimeout(() => {
        expect.anything();
      }, 30);
    });

    it('show and shown events should reference correct relatedTarget', async () => {
      fixtureEl.innerHTML = `
          <ul class="Tabs" role="tablist">
            <li class="Tabs__item" role="presentation"><button type="button" data-spirit-target="#home" class="Tabs__link is-selected" role="tab" aria-selected="true">Home</button></li>
            <li class="Tabs__item" role="presentation"><button type="button" id="trigger-profile" data-spirit-target="#profile" class="Tabs__link" role="tab">Profile</button></li>
          </ul>
          <div class="Tabs-content">
            <div class="TabsPane is-selected" id="home" role="tabpanel"></div>
            <div class="TabsPane" id="profile" role="tabpanel"></div>
          </div>
        `;

      const secondTabsTrigger = fixtureEl.querySelector('#trigger-profile') as SpiritHTMLElement;
      const secondTabs = new Tabs(secondTabsTrigger);

      secondTabsTrigger.addEventListener('show.tabs', (ev: MouseEvent) => {
        expect((ev.relatedTarget as HTMLElement).getAttribute('data-spirit-target')).toBe('#home');
      });

      secondTabsTrigger.addEventListener('shown.tabs', (ev: MouseEvent) => {
        expect((ev.relatedTarget as HTMLElement).getAttribute('data-spirit-target')).toBe('#home');
        expect(secondTabsTrigger.getAttribute('aria-selected')).toBe('true');
        expect((fixtureEl.querySelector('button:not(.is-selected)') as HTMLElement).getAttribute('aria-selected')).toBe(
          'false',
        );
      });

      await secondTabs.show();
    });

    it('should fire hide and hidden events', async () => {
      fixtureEl.innerHTML = `
          <ul class="Tabs" role="tablist">
            <li><button type="button" data-spirit-target="#home" role="tab">Home</button></li>
            <li><button type="button" data-spirit-target="#profile" role="tab">Profile</button></li>
          </ul>
        `;

      const triggerList = Array.from(fixtureEl.querySelectorAll('button')) as SpiritHTMLElement[];
      const firstTabs = new Tabs(triggerList[0]);
      const secondTabs = new Tabs(triggerList[1]);

      let hideCalled = false;
      triggerList[0].addEventListener('shown.tabs', () => {
        secondTabs.show();
      });

      triggerList[0].addEventListener('hide.tabs', (ev: MouseEvent) => {
        hideCalled = true;

        expect((ev.relatedTarget as HTMLElement)?.getAttribute('data-spirit-target')).toBe('#profile');
      });

      triggerList[0].addEventListener('hidden.tabs', (ev: MouseEvent) => {
        expect(hideCalled).toBeTruthy();
        expect((ev.relatedTarget as HTMLElement)?.getAttribute('data-spirit-target')).toBe('#profile');
      });

      await firstTabs.show();
    });

    it('should not fire hidden when hide is prevented', async () => {
      fixtureEl.innerHTML = `
          <ul class="Tabs" role="tablist">
            <li><button type="button" data-spirit-target="#home" role="tab">Home</button></li>
            <li><button type="button" data-spirit-target="#profile" role="tab">Profile</button></li>
          </ul>
        `;

      const triggerList = fixtureEl.querySelectorAll('button');
      const firstTabs = new Tabs(triggerList[0]);
      const secondTabs = new Tabs(triggerList[1]);
      const expectDone = () => {
        setTimeout(() => {
          expect.anything();
        }, 30);
      };

      triggerList[0].addEventListener('shown.tabs', () => {
        secondTabs.show();
      });

      triggerList[0].addEventListener('hide.tabs', (ev: Event) => {
        ev.preventDefault();
        expectDone();
      });

      triggerList[0].addEventListener('hidden.tabs', () => {
        Error('should not trigger hidden');
      });

      await firstTabs.show();
    });

    it('should handle removed tabs', async () => {
      fixtureEl.innerHTML = `
          <ul class="Tabs" role="tablist">
            <li class="Tabs__item" role="presentation">
              <a class="Tabs__link" href="#profile" role="tab" data-spirit-toggle="tabs">
                <button class="btn-close" aria-label="Close"></button>
              </a>
            </li>
            <li class="Tabs__item" role="presentation">
              <a id="second-nav" class="Tabs__link" href="#buzz" role="tab" data-spirit-toggle="tabs">
                <button class="btn-close" aria-label="Close"></button>
              </a>
            </li>
            <li class="Tabs__item" role="presentation">
              <a class="Tabs__link" href="#references" role="tab" data-spirit-toggle="tabs">
                <button id="btn-close" class="btn-close" aria-label="Close"></button>
              </a>
            </li>
          </ul>
          <div class="Tabs-content">
            <div role="tabpanel" class="TabsPane is-selected" id="profile">test 1</div>
            <div role="tabpanel" class="TabsPane" id="buzz">test 2</div>
            <div role="tabpanel" class="TabsPane" id="references">test 3</div>
          </div>
        `;

      const secondNavEl = fixtureEl.querySelector('#second-nav') as HTMLElement;
      const btnCloseEl = fixtureEl.querySelector('#btn-close') as HTMLElement;
      const secondNavTabs = new Tabs(secondNavEl);

      secondNavEl.addEventListener('shown.tabs', () => {
        expect(fixtureEl.querySelectorAll('.Tabs__link')).toHaveLength(2);
      });

      btnCloseEl.addEventListener('click', () => {
        const linkEl = btnCloseEl.parentNode as HTMLElement;
        const liEl = linkEl.parentNode as HTMLElement;
        const tabId = linkEl.getAttribute('href') as string;
        const tabIdEl = fixtureEl.querySelector(tabId) as HTMLElement;

        liEl.remove();
        tabIdEl.remove();
        secondNavTabs.show();
      });

      await btnCloseEl.click();
    });
  });

  describe('dispose', () => {
    it('should dispose a tab', () => {
      fixtureEl.innerHTML = '<div class="Tabs"><div class="Tabs__link"></div></div>';

      const el = fixtureEl.querySelector('.Tabs > div') as HTMLElement;
      const tab = new Tabs(fixtureEl.querySelector('.Tabs > div') as HTMLElement);

      expect(Tabs.getInstance(el)).not.toBeNull();

      tab.dispose();

      expect(Tabs.getInstance(el)).toBeNull();
    });
  });

  describe('activate', () => {
    it('should not be called if element argument is null', () => {
      fixtureEl.innerHTML = `
        <ul class="Tabs" role="tablist">
          <li class="Tabs__link"></li>
        </ul>
      `;

      const tabEl = fixtureEl.querySelector('.Tabs__link') as HTMLElement;
      const tab = new Tabs(tabEl);
      const spy = jest.fn().mockReturnValue('spy');

      // @ts-ignore Argument of type 'Mock<any, any>' is not assignable to parameter of type 'HTMLElement'.
      tab.activate(null, spy);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('setInitialAttributes', () => {
    it('should put aria attributes', () => {
      fixtureEl.innerHTML = `
        <ul class="Tabs">
          <li class="Tabs__link is-selected" id="foo" data-spirit-target="#panel" data-spirit-toggle="tabs"></li>
          <li class="Tabs__link" data-spirit-target="#panel-2" data-spirit-toggle="tabs"></li>
        </ul>
        <div id="panel"></div>
        <div id="panel-2"></div>
      `;

      const tabEl = fixtureEl.querySelector('.Tabs__link') as HTMLElement;
      const parent = fixtureEl.querySelector('.Tabs') as HTMLElement;
      const children = Array.from(fixtureEl.querySelectorAll('.Tabs__link')) as HTMLElement[];
      const tabPanel = fixtureEl.querySelector('#panel') as HTMLElement;
      const tabPanel2 = fixtureEl.querySelector('#panel-2') as HTMLElement;

      expect(parent.getAttribute('role')).toBeNull();
      expect(tabEl.getAttribute('role')).toBeNull();
      expect(tabPanel.getAttribute('role')).toBeNull();

      Tabs.setInitialAttributes(parent, children);

      expect(parent.getAttribute('role')).toBe('tablist');
      expect(tabEl.getAttribute('role')).toBe('tab');

      expect(tabPanel.getAttribute('role')).toBe('tabpanel');
      expect(tabPanel2.getAttribute('role')).toBe('tabpanel');
      expect(tabPanel.hasAttribute('tabindex')).toBeFalsy();
      expect(tabPanel.hasAttribute('tabindex2')).toBeFalsy();

      expect(tabPanel.getAttribute('aria-labelledby')).toBe('#foo');
      expect(tabPanel2.hasAttribute('aria-labelledby')).toBeFalsy();
    });
  });

  describe('getInstance', () => {
    it('should return null if there is no instance', () => {
      expect(Tabs.getInstance(fixtureEl as HTMLElement)).toBeNull();
    });

    it('should return this instance', () => {
      fixtureEl.innerHTML = '<div class="Tabs"><div class="Tabs__link"></div></div>';

      const divEl = fixtureEl.querySelector('.Tabs > div') as HTMLElement;
      const tab = new Tabs(divEl);

      expect(Tabs.getInstance(divEl)).toEqual(tab);
      expect(Tabs.getInstance(divEl)).toBeInstanceOf(Tabs);
    });
  });

  describe('getOrCreateInstance', () => {
    it('should return tab instance', () => {
      fixtureEl.innerHTML = '<div class="Tabs"><div class="Tabs__link"></div></div>';

      const div = fixtureEl.querySelector('div') as HTMLElement;
      const tab = new Tabs(div);

      expect(Tabs.getOrCreateInstance(div)).toEqual(tab);
      expect(Tabs.getInstance(div)).toEqual(Tabs.getOrCreateInstance(div));
      expect(Tabs.getOrCreateInstance(div)).toBeInstanceOf(Tabs);
    });

    it('should return new instance when there is no tab instance', () => {
      fixtureEl.innerHTML = '<div class="Tabs"><div class="Tabs__link"></div></div>';

      const div = fixtureEl.querySelector('div') as HTMLElement;

      expect(Tabs.getInstance(div)).toBeNull();
      expect(Tabs.getOrCreateInstance(div)).toBeInstanceOf(Tabs);
    });
  });

  describe('data-spirit-api', () => {
    it('should create dynamically a tab', async () => {
      fixtureEl.innerHTML = `
          <ul class="Tabs" role="tablist">
            <li class="Tabs__item" role="presentation">
              <button type="button" data-spirit-target="#home" class="Tabs__link is-selected" role="tab" aria-selected="true">Home</button>
            </li>
            <li class="Tabs__item" role="presentation">
              <button type="button" id="trigger-profile" data-spirit-toggle="tabs" data-spirit-target="#profile" class="Tabs__link" role="tab">Profile</button>
            </li>
          </ul>
          <div class="Tabs-content">
            <div class="TabsPane is-selected" id="home" role="tabpanel"></div>
            <div class="TabsPane" id="profile" role="tabpanel"></div>
          </div>
        `;

      const secondTabsTrigger = fixtureEl.querySelector('#trigger-profile') as HTMLElement;

      secondTabsTrigger.addEventListener('shown.tab', () => {
        expect(secondTabsTrigger).toHaveClass('is-selected');
        expect(fixtureEl.querySelector('#profile')).toHaveClass('is-selected');
      });

      await secondTabsTrigger.click();
    });

    it('should handle nested tabs', async () => {
      fixtureEl.innerHTML = `
          <nav class="Tabs" role="tablist">
            <button type="button" id="tab-1" data-spirit-target="#x-tab-1" class="Tabs__link" data-spirit-toggle="tabs" role="tab" aria-controls="x-tab-1">Tabs 1</button>
            <button type="button" data-spirit-target="#x-tab-2" class="Tabs__link is-selected" data-spirit-toggle="tabs" role="tab" aria-controls="x-tab2" aria-selected="true">Tabs 2</button>
            <button type="button" data-spirit-target="#x-tab-3" class="Tabs__link" data-spirit-toggle="tabs" role="tab" aria-controls="x-tab-3">Tabs 3</button>
          </nav>
          <div class="Tabs__content">
            <div class="Tabs__pane" id="x-tab-1" role="tabpanel">
              <nav class="Tabs" role="tablist">
                <button type="button" data-spirit-target="#nested-tab-1" class="Tabs__link is-selected" data-spirit-toggle="tabs" role="tab" aria-controls="x-tab-1" aria-selected="true">Nested Tabs 1</button>
                <button type="button" id="tab-nested-2" data-spirit-target="#nested-tab-2" class="Tabs__link" data-spirit-toggle="tabs" role="tab" aria-controls="x-profile">Nested Tabs2</button>
              </nav>
              <div class="Tabs-content">
                <div class="TabsPane is-selected" id="nested-tab-1" role="tabpanel">Nested Tabs1 Content</div>
                <div class="TabsPane" id="nested-tab-2" role="tabpanel">Nested Tabs2 Content</div>
              </div>
            </div>
            <div class="TabsPane is-selected" id="x-tab-2" role="tabpanel">Tabs2 Content</div>
            <div class="TabsPane" id="x-tab-3" role="tabpanel">Tabs3 Content</div>
          </div>
        `;

      const tab1El = fixtureEl.querySelector('#tab-1') as HTMLElement;
      const tabNested2El = fixtureEl.querySelector('#tab-nested-2') as HTMLElement;
      const xTabs1El = fixtureEl.querySelector('#x-tab1') as HTMLElement;

      tabNested2El.addEventListener('shown.tab', () => {
        expect(xTabs1El).toHaveClass('is-selected');
      });

      tab1El.addEventListener('shown.tab', () => {
        expect(xTabs1El).toHaveClass('is-selected');

        tabNested2El.click();
      });

      await tab1El.click();
    });

    it('should prevent default when the trigger is <a>', async () => {
      fixtureEl.innerHTML = `
          <ul class="Tabs" role="tablist">
            <li><a type="button" href="#test"  class="is-selected" role="tab" data-spirit-toggle="tabs">Home</a></li>
            <li><a type="button" href="#test2" role="tab" data-spirit-toggle="tabs">Home</a></li>
          </ul>
        `;

      const tabEl = fixtureEl.querySelector('[href="#test2"]') as HTMLElement;
      const spy = jest.spyOn(Event.prototype, 'preventDefault');

      tabEl.addEventListener('shown.tab', () => {
        expect(tabEl).toHaveClass('is-selected');
        expect(spy).toHaveBeenCalled();
      });

      await tabEl.click();
    });

    it('should not fire shown when tab has disabled attribute', async () => {
      fixtureEl.innerHTML = `
          <ul class="Tabs" role="tablist">
            <li class="Tabs__item" role="presentation"><button type="button" data-spirit-target="#home" class="Tabs__link is-selected" role="tab" aria-selected="true">Home</button></li>
            <li class="Tabs__item" role="presentation"><button type="button" data-spirit-target="#profile" class="Tabs__link" disabled role="tab">Profile</button></li>
          </ul>
          <div class="Tabs-content">
            <div class="TabsPane is-selected" id="home" role="tabpanel"></div>
            <div class="TabsPane" id="profile" role="tabpanel"></div>
          </div>
        `;

      const triggerDisabled = fixtureEl.querySelector('button[disabled]') as HTMLElement;
      triggerDisabled.addEventListener('shown.tab', () => {
        Error('should not trigger shown event');
      });

      await triggerDisabled.click();
      await setTimeout(() => {
        expect.anything();
      }, 30);
    });

    it('should not fire shown when tab has disabled class', async () => {
      fixtureEl.innerHTML = `
          <ul class="Tabss" role="tablist">
            <li class="Tabs__item" role="presentation"><a href="#home" class="Tabs__link is-selected" role="tab" aria-selected="true">Home</a></li>
            <li class="Tabs__item" role="presentation"><a href="#profile" class="Tabs__link disabled" role="tab">Profile</a></li>
          </ul>
          <div class="Tabs-content">
            <div class="TabsPane is-selected" id="home" role="tabpanel"></div>
            <div class="TabsPane" id="profile" role="tabpanel"></div>
          </div>
        `;

      const triggerDisabled = fixtureEl.querySelector('a.disabled') as HTMLElement;

      triggerDisabled.addEventListener('shown.tab', () => {
        Error('should not trigger shown event');
      });

      await triggerDisabled.click();
      await setTimeout(() => {
        expect.anything();
      }, 30);
    });
  });
});
