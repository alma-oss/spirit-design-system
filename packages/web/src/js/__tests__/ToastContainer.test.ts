import { clearFixture, getFixture } from '../../../tests/helpers/fixture';
import { showToastContainer } from '../ToastContainer';

describe('ToastContainer', () => {
  let fixtureEl: Element;

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  afterEach(() => {
    clearFixture();
  });

  it('should call showPopover when supported and popover is closed', () => {
    const showPopover = jest.fn();

    fixtureEl.innerHTML = `
      <div class="Toast Toast--bottom Toast--center" popover="manual" role="log"></div>
    `;

    const element = fixtureEl.querySelector('.Toast') as HTMLElement;

    element.showPopover = showPopover;
    element.matches = jest.fn().mockReturnValue(false);

    showToastContainer(element);

    expect(showPopover).toHaveBeenCalledTimes(1);
  });

  it('should not call showPopover when popover is already open', () => {
    const showPopover = jest.fn();

    fixtureEl.innerHTML = `
      <div class="Toast Toast--bottom Toast--center" popover="manual" role="log"></div>
    `;

    const element = fixtureEl.querySelector('.Toast') as HTMLElement;

    element.showPopover = showPopover;
    element.matches = jest.fn().mockReturnValue(true);

    showToastContainer(element);

    expect(showPopover).not.toHaveBeenCalled();
  });

  it('should call showPopover once when matches throws', () => {
    const showPopover = jest.fn();

    fixtureEl.innerHTML = `
      <div class="Toast Toast--bottom Toast--center" popover="manual" role="log"></div>
    `;

    const element = fixtureEl.querySelector('.Toast') as HTMLElement;

    element.showPopover = showPopover;
    element.matches = jest.fn().mockImplementation(() => {
      throw new Error('`:popover-open` unsupported');
    });

    showToastContainer(element);

    expect(showPopover).toHaveBeenCalledTimes(1);
  });

  it('should not call showPopover again when showPopover throws', () => {
    const showPopover = jest.fn().mockImplementation(() => {
      throw new Error('showPopover failed');
    });

    fixtureEl.innerHTML = `
      <div class="Toast Toast--bottom Toast--center" popover="manual" role="log"></div>
    `;

    const element = fixtureEl.querySelector('.Toast') as HTMLElement;

    element.showPopover = showPopover;
    element.matches = jest.fn().mockReturnValue(false);

    expect(() => showToastContainer(element)).toThrow('showPopover failed');
    expect(showPopover).toHaveBeenCalledTimes(1);
  });
});
