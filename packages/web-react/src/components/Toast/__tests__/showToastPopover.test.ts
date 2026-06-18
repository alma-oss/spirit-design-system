import { isPopoverOpen, showToastPopover } from '../showToastPopover';

describe('isPopoverOpen', () => {
  it('should return true when element matches :popover-open', () => {
    const element = document.createElement('div');

    element.matches = jest.fn().mockReturnValue(true);

    expect(isPopoverOpen(element)).toBe(true);
  });

  it('should return false when element does not match :popover-open', () => {
    const element = document.createElement('div');

    element.matches = jest.fn().mockReturnValue(false);

    expect(isPopoverOpen(element)).toBe(false);
  });

  it('should return false when matches throws', () => {
    const element = document.createElement('div');

    element.matches = jest.fn().mockImplementation(() => {
      throw new Error('`:popover-open` unsupported');
    });

    expect(isPopoverOpen(element)).toBe(false);
  });
});

describe('showToastPopover', () => {
  it('should call showPopover when supported and popover is closed', () => {
    const showPopover = jest.fn();
    const element = document.createElement('div');

    element.showPopover = showPopover;
    element.matches = jest.fn().mockReturnValue(false);

    showToastPopover(element);

    expect(showPopover).toHaveBeenCalledTimes(1);
  });

  it('should not call showPopover when popover is already open', () => {
    const showPopover = jest.fn();
    const element = document.createElement('div');

    element.showPopover = showPopover;
    element.matches = jest.fn().mockReturnValue(true);

    showToastPopover(element);

    expect(showPopover).not.toHaveBeenCalled();
  });

  it('should not call showPopover when element is null', () => {
    expect(() => showToastPopover(null)).not.toThrow();
  });

  it('should not call showPopover when showPopover is unsupported', () => {
    const element = document.createElement('div');

    showToastPopover(element);

    expect(element.showPopover).toBeUndefined();
  });
});
