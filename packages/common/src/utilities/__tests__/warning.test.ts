/* eslint-disable no-console --
 * we are testing Console function
 */
import warning from '../warning';

describe('warning', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // @ts-expect-error - mocked
    console.warn.mockRestore();
  });

  // testing truthy values
  // eslint-disable-next-line symbol-description
  it.each([1, -1, true, {}, [], Symbol(), 'hi'])(
    'should not log a warning if the condition is truthy',
    (truthyValue) => {
      warning(truthyValue, 'message');

      expect(console.warn).not.toHaveBeenCalled();
    },
  );

  // https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch4.md#falsy-values
  // testing falsy values
  it.each([undefined, null, false, +0, -0, NaN, ''])('should log a warning if the condition is falsy', (falsyValue) => {
    const message: string = `hey ${String(falsyValue)}`;
    warning(falsyValue, message);

    expect(console.warn).toHaveBeenCalledWith(`Warning: ${message}`);

    // @ts-expect-error - mocking console.warn
    console.warn.mockClear();
  });

  describe('when the environment does not allow logging', () => {
    const originalNodeEnv = process.env.NODE_ENV;

    afterEach(() => {
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('should not log in production', () => {
      process.env.NODE_ENV = 'production';

      warning(false, 'message');

      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should not throw when console is not available', () => {
      const originalConsole = globalThis.console;

      // @ts-expect-error - simulating an environment without console
      globalThis.console = undefined;

      try {
        expect(() => warning(false, 'message')).not.toThrow();
      } finally {
        globalThis.console = originalConsole;
      }
    });
  });
});
