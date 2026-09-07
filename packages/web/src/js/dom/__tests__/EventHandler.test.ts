// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { clearFixture, getFixture } from '../../../../tests/helpers/fixture';
import EventHandler from '../EventHandler';

describe('EventHandler', () => {
  let fixtureEl: Element;

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  afterEach(() => {
    clearFixture();
  });

  describe('on', () => {
    it('should add event listener', () => {
      fixtureEl.innerHTML = '<div></div>';

      const div = fixtureEl.querySelector('div');
      const handler = jest.fn();

      EventHandler.on(div, 'click', handler);
      div.click();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should add a listener on document that receives bubbling clicks', () => {
      const handler = jest.fn();

      EventHandler.on(document, 'click', handler);

      fixtureEl.innerHTML = '<div class="test"></div>';
      fixtureEl.querySelector('div').click();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    // Delegated listeners are never removed (`EventHandler.off` doesn't support them — see the
    // `off` tests below), so they leak across tests within this file, same as they do across a
    // real page's lifetime. Each test below uses a selector unique to itself so an earlier test's
    // still-bound listener can never match a later test's elements.
    describe('delegation', () => {
      it('should invoke the handler for a matching descendant, with `this` set to the matched element', () => {
        fixtureEl.innerHTML = '<div><button class="trigger-basic"></button></div>';

        const button = fixtureEl.querySelector('.trigger-basic');
        const handler = jest.fn(function handler(this: unknown) {
          expect(this).toBe(button);
        });

        EventHandler.on(document, 'click', '.trigger-basic', handler);
        button.click();

        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('should invoke the handler when the click originates on a nested child', () => {
        fixtureEl.innerHTML = '<button class="trigger-nested"><span class="icon"></span></button>';

        const button = fixtureEl.querySelector('.trigger-nested');
        const icon = fixtureEl.querySelector('.icon');
        const handler = jest.fn(function handler(this: unknown) {
          expect(this).toBe(button);
        });

        EventHandler.on(document, 'click', '.trigger-nested', handler);
        icon.click();

        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('should not invoke the handler for a non-matching element in the same subtree', () => {
        fixtureEl.innerHTML =
          '<div><button class="trigger-isolated"></button><button class="other-isolated"></button></div>';

        const other = fixtureEl.querySelector('.other-isolated');
        const handler = jest.fn();

        EventHandler.on(document, 'click', '.trigger-isolated', handler);
        other.click();

        expect(handler).not.toHaveBeenCalled();
      });

      it('should invoke the handler for an element inserted after the listener was bound', () => {
        const handler = jest.fn();

        EventHandler.on(document, 'click', '.trigger-late', handler);

        fixtureEl.innerHTML = '<button class="trigger-late"></button>';
        fixtureEl.querySelector('.trigger-late').click();

        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('should set event.delegateTarget to the matched element', () => {
        fixtureEl.innerHTML = '<button class="trigger-delegate-target"><span class="icon"></span></button>';

        const button = fixtureEl.querySelector('.trigger-delegate-target');
        const icon = fixtureEl.querySelector('.icon');
        const handler = jest.fn((event: Event & { delegateTarget?: unknown }) => {
          expect(event.delegateTarget).toBe(button);
        });

        EventHandler.on(document, 'click', '.trigger-delegate-target', handler);
        icon.click();

        expect(handler).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('off', () => {
    it('should remove a listener', async () => {
      fixtureEl.innerHTML = '<div></div>';
      const div = fixtureEl.querySelector('div');

      let called = 0;
      const handler = () => {
        called += 1;
      };

      EventHandler.on(div, 'foobar', handler);
      EventHandler.trigger(div, 'foobar');

      EventHandler.off(div, 'foobar', handler);
      EventHandler.trigger(div, 'foobar');

      await setTimeout(() => {
        expect(called).toBe(1);
      }, 20);
    });

    it('should remove all the events', async () => {
      fixtureEl.innerHTML = '<div></div>';
      const div = fixtureEl.querySelector('div');

      let called = 0;

      EventHandler.on(div, 'foobar', () => {
        called += 1;
      });
      EventHandler.on(div, 'foobar', () => {
        called += 1;
      });
      EventHandler.trigger(div, 'foobar');

      EventHandler.off(div, 'foobar');
      EventHandler.trigger(div, 'foobar');

      await setTimeout(() => {
        expect(called).toBe(2);
      }, 20);
    });

    it('should warn and no-op when given a selector instead of a handler', () => {
      fixtureEl.innerHTML = '<div></div>';
      const div = fixtureEl.querySelector('div');

      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      expect(() => EventHandler.off(div, 'click', '.some-selector')).not.toThrow();
      expect(warnSpy).toHaveBeenCalled();

      warnSpy.mockRestore();
    });
  });
});
