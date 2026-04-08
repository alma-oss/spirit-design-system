import { clearFixture, getFixture } from '../../../tests/helpers/fixture';
import Collapse from '../Collapse';
import { CLASS_NAME_OPEN, CLASS_NAME_TRANSITIONING } from '../constants';
import EventHandler from '../dom/EventHandler';

describe('Collapse', () => {
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
        <button data-spirit-toggle="collapse" data-spirit-target="CollapseExample0"></button>
        <div id="collapse-example-0" class="Collapse">
          <div class="Collapse__content">
            test content
          </div>
        </div>
      `;

      const element = fixtureEl.querySelector('[data-spirit-toggle="collapse"]') as HTMLElement;
      const elementBySelector = new Collapse(element);

      expect(elementBySelector.element).toEqual(element);
    });
  });

  describe('toggle', () => {
    it('should toggle a collapse', async () => {
      fixtureEl.innerHTML = `
        <button data-spirit-toggle="collapse" data-spirit-target="CollapseExample0" aria-expanded="false"></button>
        <div id="collapse-example-0" class="Collapse">
          <div class="Collapse__content">
            test content
          </div>
        </div>
      `;

      const toggleSpy = jest.spyOn(Collapse.prototype, 'toggle');
      const element = fixtureEl.querySelector('[data-spirit-toggle="collapse"]') as HTMLElement;
      const collapse = new Collapse(element);

      await collapse.toggle();

      expect(toggleSpy).toHaveBeenCalled();

      await collapse.toggle();

      expect(toggleSpy).toHaveBeenCalled();
    });
  });

  describe('show', () => {
    it('should show a collapse', async () => {
      fixtureEl.innerHTML = `
        <button data-spirit-toggle="collapse" data-spirit-target="collapse-example-0" aria-expanded="false"></button>
        <div id="collapse-example-0" class="Collapse">
          <div class="Collapse__content">
            test content
          </div>
        </div>
      `;

      const element = fixtureEl.querySelector('[data-spirit-toggle="collapse"]') as HTMLElement;
      const target = fixtureEl.querySelector('#collapse-example-0') as HTMLElement;
      const collapse = new Collapse(element);

      await collapse.show();

      expect(element.getAttribute('aria-expanded')).toBe('true');
      expect(target).toHaveClass(CLASS_NAME_TRANSITIONING);

      EventHandler.trigger(target, 'transitionend');

      expect(target).toHaveClass(CLASS_NAME_OPEN);
    });

    it('should hide more button after showing collapse', async () => {
      fixtureEl.innerHTML = `
        <a data-spirit-toggle="collapse" data-spirit-target="collapse-example-0" aria-expanded="false" data-spirit-is-disposable>… more</a>
        <div id="collapse-example-0" class="Collapse">
          <div class="Collapse__content">
            more content
          </div>
        </div>
      `;

      const element = fixtureEl.querySelector('[data-spirit-toggle="collapse"]') as HTMLElement;
      const collapse = new Collapse(element);

      await collapse.show();

      expect(element.getAttribute('aria-expanded')).toBe('true');
      expect(element).not.toBeInTheDocument();
    });
  });

  describe('hide', () => {
    it('should hide a collapse', async () => {
      fixtureEl.innerHTML = `
        <button data-spirit-toggle="collapse" data-spirit-target="collapse-example-0" aria-expanded="true"></button>
        <div id="collapse-example-0" class="Collapse">
          <div class="Collapse__content">
            test content
          </div>
        </div>
      `;

      const element = fixtureEl.querySelector('[data-spirit-toggle="collapse"]') as HTMLElement;
      const collapse = new Collapse(element);

      await collapse.hide();

      expect(element.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('accordion', () => {
    it('should toggle a collapse with parent', async () => {
      fixtureEl.innerHTML = `
        <section
          id="accordion-example-1"
          class="Accordion"
        >
          <article
            id="accordion-example-1-article-0"
            class="Accordion__item"
          >
            <h3
              id="accordion-example-1-article-0-header"
              class="Accordion__itemHeader"
            >
              <button
                type="button"
                class="Accordion__itemToggle"
                data-spirit-toggle="collapse"
                data-spirit-target="accordion-example-1-article-0-collapse"
              >
                header
              </button>
              <span class="Accordion__itemSide">
                <span class="Accordion__itemSlot">
                  slot
                </span>
                <span class="Accordion__itemIcon">
                  <svg width="24" height="24" aria-hidden="true">
                    <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
                  </svg>
                </span>
              </span>
            </h3>
            <div
              id="accordion-example-1-article-0-collapse"
              class="Collapse"
              data-spirit-parent="#accordion-example-1"
              aria-labelledby="accordion-example-1-article-0-header"
            >
              <div class="Collapse__content">
                <div class="Accordion__content">content</div>
              </div>
            </div>
          </article>
          <article
            id="accordion-example-1-article-1"
            class="Accordion__item"
          >
            <h3
              id="accordion-example-1-article-1-header"
              class="Accordion__itemHeader"
            >
              <button
                type="button"
                class="Accordion__itemToggle"
                data-spirit-toggle="collapse"
                data-spirit-target="accordion-example-1-article-1-collapse"
                aria-expanded="true"
              >
                header
              </button>
              <span class="Accordion__itemSide">
                <span class="Accordion__itemSlot">
                  slot
                </span>
                <span class="Accordion__itemIcon">
                  <svg width="24" height="24" aria-hidden="true">
                    <use xlink:href="/icons/svg/sprite.svg#chevron-down" />
                  </svg>
                </span>
              </span>
            </h3>
            <div
              id="accordion-example-1-article-1-collapse"
              class="Collapse is-open"
              data-spirit-parent="#accordionExample1"
              aria-labelledby="accordion-example-1-article-1-header"
            >
              <div class="Collapse__content">
                <div class="Accordion__content">content</div>
              </div>
            </div>
          </article>
        </section>
      `;

      const element0 = fixtureEl.querySelector(
        '[data-spirit-target="accordion-example-1-article-0-collapse"]',
      ) as HTMLElement;
      const target0 = fixtureEl.querySelector('#accordion-example-1-article-0-collapse') as HTMLElement;
      const target1 = fixtureEl.querySelector('#accordion-example-1-article-1-collapse') as HTMLElement;
      const collapse0 = new Collapse(element0);

      expect(target0).toHaveClass('Collapse');
      expect(target1).toHaveClass(CLASS_NAME_OPEN);

      await collapse0.show();

      expect(target0).toHaveClass(CLASS_NAME_TRANSITIONING);

      EventHandler.trigger(target0, 'transitionend');
      EventHandler.trigger(target1, 'transitionend');

      expect(target0).toHaveClass(CLASS_NAME_OPEN);
      expect(target1).toHaveClass('Collapse');
    });
  });
});
