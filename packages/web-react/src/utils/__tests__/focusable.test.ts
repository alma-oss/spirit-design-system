import { isElementHidden } from '../focusable';

describe('isElementHidden', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should return false for a visible element', () => {
    document.body.innerHTML = '<button type="button">Visible</button>';

    expect(isElementHidden(document.querySelector('button')!)).toBe(false);
  });

  it('should return true for an element with the hidden attribute', () => {
    document.body.innerHTML = '<button type="button" hidden>Hidden</button>';

    expect(isElementHidden(document.querySelector('button')!)).toBe(true);
  });

  it('should return true for an element inside a hidden ancestor', () => {
    document.body.innerHTML = '<div hidden><button type="button">Hidden</button></div>';

    expect(isElementHidden(document.querySelector('button')!)).toBe(true);
  });

  it('should return true when checkVisibility reports the element as not visible', () => {
    document.body.innerHTML = '<button type="button">Hidden by CSS</button>';
    const button = document.querySelector('button')!;
    const checkVisibility = jest.fn(() => false);
    Object.defineProperty(button, 'checkVisibility', { value: checkVisibility });

    expect(isElementHidden(button)).toBe(true);
    expect(checkVisibility).toHaveBeenCalledWith({ visibilityProperty: true });
  });
});
