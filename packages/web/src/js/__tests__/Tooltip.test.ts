import { clearFixture, getFixture, createEvent, noop } from '../../../tests/helpers/fixture';
import EventHandler from '../dom/EventHandler';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  let fixtureEl: Element;

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  afterEach(() => {
    clearFixture();

    for (const tooltipEl of document.querySelectorAll('.tooltip')) {
      tooltipEl.remove();
    }
  });

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Tooltip.NAME).toEqual(expect.any(String));
    });
  });

  describe('DATA_KEY', () => {
    it('should return plugin data key', () => {
      expect(Tooltip.DATA_KEY).toBe('tooltip');
    });
  });

  describe('EVENT_KEY', () => {
    it('should return plugin event key', () => {
      expect(Tooltip.EVENT_KEY).toBe('.tooltip');
    });
  });

  describe('constructor', () => {
    it('should take care of element either passed as a CSS selector or DOM element', () => {
      fixtureEl.innerHTML = '<a href="#" id="tooltip-el" rel="tooltip" title="Nice and short title">';

      const tooltipEl = fixtureEl.querySelector('#tooltip-el');
      const tooltipBySelector = new Tooltip('#tooltip-el');
      const tooltipByElement = new Tooltip(tooltipEl);

      expect(tooltipBySelector.element).toEqual(tooltipEl);
      expect(tooltipByElement.element).toEqual(tooltipEl);
    });

    describe('toggle', () => {
      it('should show a tooltip', async () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip">';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        tooltipEl.addEventListener('shown.tooltip', () => {
          expect(document.querySelector('.tooltip')).not.toBeNull();
        });

        await tooltip.toggle();
      });

      it('should hide a tooltip', async () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip">';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        tooltipEl.addEventListener('shown.tooltip', () => {
          tooltip.toggle();
        });

        tooltipEl.addEventListener('hidden.tooltip', () => {
          expect(document.querySelector('.tooltip')).toBeNull();
        });

        await tooltip.toggle();
      });
    });

    describe('show', () => {
      it('should show a tooltip', async () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip">';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        tooltipEl.addEventListener('shown.tooltip', () => {
          const tooltipShown = document.querySelector('.tooltip') as HTMLElement;

          expect(tooltipShown).not.toBeNull();
          expect(tooltipEl.getAttribute('aria-describedby')).toEqual(tooltipShown.getAttribute('id'));
          expect(tooltipShown.getAttribute('id')).toContain('tooltip');
        });

        await tooltip.show();
      });

      it('should show a tooltip when hovering a child element', async () => {
        fixtureEl.innerHTML = [
          '<a href="#" rel="tooltip" title="Another tooltip">',
          '  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100">',
          '    <rect width="100%" fill="#563d7c"/>',
          '    <circle cx="50" cy="50" r="30" fill="#fff"/>',
          '  </svg>',
          '</a>',
        ].join('');

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        const spy = jest.spyOn(tooltip, 'show');

        await (tooltipEl.querySelector('rect') as Element).dispatchEvent(createEvent('mouseover', { bubbles: true }));

        setTimeout(() => {
          expect(spy).toHaveBeenCalled();
        }, 0);
      });

      it('should show a tooltip on mobile', async () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip">';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);
        document.documentElement.ontouchstart = noop;

        const spy = jest.spyOn(EventHandler, 'on');

        tooltipEl.addEventListener('shown.tooltip', () => {
          expect(document.querySelector('.tooltip')).not.toBeNull();
          expect(spy).toHaveBeenCalledWith(expect.any(Object), 'mouseover', noop);

          document.documentElement.ontouchstart = undefined;
        });

        await tooltip.show();
      });

      it('should not error when trying to show a tooltip that has been removed from the dom', async () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip">';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        const firstCallback = () => {
          tooltipEl.removeEventListener('shown.tooltip', firstCallback);
          let tooltipShown = document.querySelector('.tooltip') as HTMLElement;

          tooltipShown.remove();

          tooltipEl.addEventListener('shown.tooltip', () => {
            tooltipShown = document.querySelector('.tooltip') as HTMLElement;

            expect(tooltipShown).not.toBeNull();
          });

          tooltip.show();
        };

        tooltipEl.addEventListener('shown.tooltip', firstCallback);

        await tooltip.show();
      });

      it('should throw an error the element is not visible', () => {
        fixtureEl.innerHTML = '<a href="#" style="display: none" rel="tooltip" title="Another tooltip">';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        expect(() => tooltip.show()).toThrow('Please use show on elements without `display: none`');
      });

      it('should not show a tooltip if show.tooltip is prevented', async () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip">';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        const expectedDone = () => {
          setTimeout(() => {
            expect(document.querySelector('.tooltip')).toBeNull();
          }, 10);
        };

        tooltipEl.addEventListener('show.tooltip', (ev) => {
          ev.preventDefault();
          expectedDone();
        });

        tooltipEl.addEventListener('shown.tooltip', () => {
          throw Error('Tooltip should not be shown');
        });

        await tooltip.show();
      });

      it('should not hide tooltip if leave event occurs and enter event occurs within the hide delay', async () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip">';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        setTimeout(() => {
          expect(tooltip.getTipElement()).toHaveClass('show');

          tooltipEl.dispatchEvent(createEvent('mouseout'));

          setTimeout(() => {
            expect(tooltip.getTipElement()).toHaveClass('show');

            tooltipEl.dispatchEvent(createEvent('mouseover'));
          }, 100);

          setTimeout(() => {
            expect(tooltip.getTipElement()).toHaveClass('show');
            expect(document.querySelectorAll('.tooltip')).toHaveLength(1);
          }, 200);
        }, 10);

        await tooltipEl.dispatchEvent(createEvent('mouseover'));
      });

      it('should not hide tooltip if leave event occurs and interaction remains inside trigger', async () => {
        fixtureEl.innerHTML = [
          '<a href="#" rel="tooltip" title="Another tooltip">',
          '<b>Trigger</b>',
          'the tooltip',
          '</a>',
        ].join('');

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);
        const triggerChild = tooltipEl.querySelector('b') as HTMLElement;

        const spy = jest.spyOn(tooltip, 'hide');

        tooltipEl.addEventListener('mouseover', () => {
          const moveMouseToChildEvent = createEvent('mouseout');
          Object.defineProperty(moveMouseToChildEvent, 'relatedTarget', {
            value: triggerChild,
          });

          tooltipEl.dispatchEvent(moveMouseToChildEvent);
        });

        tooltipEl.addEventListener('mouseout', () => {
          expect(spy).not.toHaveBeenCalled();
        });

        await tooltipEl.dispatchEvent(createEvent('mouseover'));
      });
    });

    describe('hide', () => {
      it('should hide a tooltip', async () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip">';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        tooltipEl.addEventListener('shown.tooltip', () => tooltip.hide());
        tooltipEl.addEventListener('hidden.tooltip', () => {
          expect(document.querySelector('.tooltip')).toBeNull();
          expect(tooltipEl.getAttribute('aria-describedby')).toBeNull();
        });

        await tooltip.show();
      });

      it('should hide a tooltip on mobile', async () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip">';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);
        const spy = jest.spyOn(EventHandler, 'off');

        tooltipEl.addEventListener('shown.tooltip', () => {
          document.documentElement.ontouchstart = noop;
          tooltip.hide();
        });

        tooltipEl.addEventListener('hidden.tooltip', () => {
          expect(document.querySelector('.tooltip')).toBeNull();
          expect(spy).toHaveBeenCalledWith(expect.any(Object), 'mouseover', noop);

          document.documentElement.ontouchstart = undefined;
        });

        await tooltip.show();
      });

      it('should hide a tooltip without animation', async () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip">';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        tooltipEl.addEventListener('shown.tooltip', () => tooltip.hide());
        tooltipEl.addEventListener('hidden.tooltip', () => {
          expect(document.querySelector('.tooltip')).toBeNull();
          expect(tooltipEl.getAttribute('aria-describedby')).toBeNull();
        });

        await tooltip.show();
      });

      it('should not hide a tooltip if hide event is prevented', async () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip">';

        const assertDone = () => {
          setTimeout(() => {
            expect(document.querySelector('.tooltip')).not.toBeNull();
          }, 20);
        };

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        tooltipEl.addEventListener('shown.tooltip', () => tooltip.hide());
        tooltipEl.addEventListener('hide.tooltip', (event) => {
          event.preventDefault();
          assertDone();
        });
        tooltipEl.addEventListener('hidden.tooltip', () => {
          throw new Error('should not trigger hidden event');
        });

        await tooltip.show();
      });
    });

    describe('getTipElement', () => {
      it('should return the created tip element', () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip">';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        expect(tooltip.getTipElement()).toBeDefined();
      });
    });

    describe('aria-label', () => {
      it('should add the aria-label attribute for referencing original title', async () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip"></a>';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        tooltipEl.addEventListener('shown.tooltip', () => {
          const tooltipShown = document.querySelector('.tooltip');

          expect(tooltipShown).not.toBeNull();
          expect(tooltipEl.getAttribute('aria-label')).toBe('Another tooltip');
        });

        await tooltip.show();
      });

      it('should add the aria-label attribute when element text content is a whitespace string', async () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="A tooltip"><span>    </span></a>';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        tooltipEl.addEventListener('shown.tooltip', () => {
          const tooltipShown = document.querySelector('.tooltip');

          expect(tooltipShown).not.toBeNull();
          expect(tooltipEl.getAttribute('aria-label')).toBe('A tooltip');
        });

        await tooltip.show();
      });

      it('should not add the aria-label attribute if the attribute already exists', async () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" aria-label="Different label" title="Another tooltip"></a>';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        tooltipEl.addEventListener('shown.tooltip', () => {
          const tooltipShown = document.querySelector('.tooltip');

          expect(tooltipShown).not.toBeNull();
          expect(tooltipEl.getAttribute('aria-label')).toBe('Different label');
        });

        await tooltip.show();
      });

      it('should not add the aria-label attribute if the element has text content', async () => {
        fixtureEl.innerHTML = '<a href="#" rel="tooltip" title="Another tooltip">text content</a>';

        const tooltipEl = fixtureEl.querySelector('a') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        tooltipEl.addEventListener('shown.tooltip', () => {
          const tooltipShown = document.querySelector('.tooltip');

          expect(tooltipShown).not.toBeNull();
          expect(tooltipEl.getAttribute('aria-label')).toBeNull();
        });

        await tooltip.show();
      });
    });

    describe('getOrCreateInstance', () => {
      it('should return tooltip instance', () => {
        fixtureEl.innerHTML = '<div></div>';

        const div = fixtureEl.querySelector('div') as HTMLElement;
        const tooltip = new Tooltip(div);

        expect(Tooltip.getOrCreateInstance(div)).toEqual(tooltip);
        expect(Tooltip.getInstance(div)).toEqual(Tooltip.getOrCreateInstance(div));
        expect(Tooltip.getOrCreateInstance(div)).toBeInstanceOf(Tooltip);
      });

      it('should return new instance when there is no tooltip instance', () => {
        fixtureEl.innerHTML = '<div></div>';

        const div = fixtureEl.querySelector('div') as HTMLElement;

        expect(Tooltip.getInstance(div)).toBeNull();
        expect(Tooltip.getOrCreateInstance(div)).toBeInstanceOf(Tooltip);
      });
    });

    describe('getTooltipFloatingProps', () => {
      it('should return object with data from data attributes', () => {
        fixtureEl.innerHTML = `
          <div class="Tooltip">
            <div
              id="test-tooltip"
              class="TooltipPopover is-hidden placement-top-start placement-controlled"
              data-spirit-enable-flipping="true"
              data-spirit-enable-shifting="true"
              data-spirit-enable-sizing="true"
              data-spirit-placement="top-start"
              data-spirit-enable-flipping-cross-axis="true"
              data-spirit-flip-fallback-placements="top, right, left, bottom"
            >
              This is tooltip.
              <span class="TooltipPopover__arrow" data-spirit-element="arrow"></span>
            </div>
          </div>
        `;

        const tooltipEl = fixtureEl.querySelector('.TooltipPopover') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        const tooltipProps = tooltip.getTooltipFloatingProps();

        expect(tooltipProps).toEqual({
          placement: 'top-start',
          flip: true,
          shift: true,
          size: true,
          flipCrossAxis: true,
          flipFallbackPlacements: ['top', 'right', 'left', 'bottom'],
          flipFallbackAxisSideDirection: 'none',
        });
      });
    });

    describe('updateConfig', () => {
      it('should update config', () => {
        fixtureEl.innerHTML = `
          <div class="Tooltip" data-spirit-element="tooltip">
            <div
              id="test-tooltip"
              class="TooltipPopover is-hidden placement-top-start placement-controlled"
              data-spirit-enable-flipping="true"
              data-spirit-enable-shifting="true"
              data-spirit-enable-sizing="true"
              data-spirit-placement="top-start"
              data-spirit-enable-flipping-cross-axis="true"
              data-spirit-flip-fallback-placements="top, right, left, bottom"
            >
              This is tooltip.
              <span class="TooltipPopover__arrow" data-spirit-element="arrow"></span>
            </div>
          </div>
        `;

        const tooltipEl = fixtureEl.querySelector('.TooltipPopover') as HTMLElement;
        const tooltip = new Tooltip(tooltipEl);

        tooltip.updateConfig({
          enableFlipping: false,
          enableFlippingCrossAxis: false,
          enableShifting: false,
          enableSizing: false,
          flipFallbackAxisSideDirection: 'start',
          flipFallbackPlacements: 'top, right, bottom',
          placement: 'bottom',
        });

        const tooltipProps = tooltip.getTooltipFloatingProps();

        expect(tooltipProps).toEqual({
          flip: false,
          flipCrossAxis: false,
          flipFallbackAxisSideDirection: 'start',
          flipFallbackPlacements: ['top', 'right', 'bottom'],
          placement: 'bottom',
          shift: false,
          size: false,
        });
      });
    });
  });
});
