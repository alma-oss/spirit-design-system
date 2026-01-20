/* eslint-disable no-console --
 * we are testing Console function
 */
import info from '../info';

describe('info', () => {
  beforeEach(() => {
    jest.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    // @ts-expect-error - mocked
    console.info.mockRestore();
  });

  // testing truthy values
  // eslint-disable-next-line symbol-description
  it.each([1, -1, true, {}, [], Symbol(), 'hi'])('should not log a info if the condition is truthy', (truthyValue) => {
    info(truthyValue, 'message');

    expect(console.info).not.toHaveBeenCalled();
  });

  // https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch4.md#falsy-values
  // testing falsy values

  it.each([undefined, null, false, +0, -0, NaN, ''])('should log a info if the condition is falsy', (falsyValue) => {
    const message: string = `hey ${String(falsyValue)}`;
    info(falsyValue, message);

    expect(console.info).toHaveBeenCalledWith(`Info: ${message}`);
    // @ts-expect-error - mocking console.info
    console.info.mockClear();
  });
});
