import { getNextActiveElement, isVisible } from '../getNextActiveElement';

describe('getNextActiveElement', () => {
  const createList = (count: number): HTMLElement[] => Array.from({ length: count }, () => document.createElement('a'));

  it('should return the first item when the active element is not in the list and moving forward', () => {
    const list = createList(3);

    expect(getNextActiveElement(list, document.createElement('a'), true, true)).toBe(list[0]);
  });

  it('should return the last item when the active element is not in the list, moving backward and cycling is allowed', () => {
    const list = createList(3);

    expect(getNextActiveElement(list, document.createElement('a'), false, true)).toBe(list[2]);
  });

  it('should return the first item when the active element is not in the list and cycling is not allowed', () => {
    const list = createList(3);

    expect(getNextActiveElement(list, document.createElement('a'), false, false)).toBe(list[0]);
  });

  it('should return the next item when moving forward', () => {
    const list = createList(3);

    expect(getNextActiveElement(list, list[0], true, false)).toBe(list[1]);
  });

  it('should return the previous item when moving backward', () => {
    const list = createList(3);

    expect(getNextActiveElement(list, list[2], false, false)).toBe(list[1]);
  });

  it('should clamp to the last item when moving forward past the end without cycling', () => {
    const list = createList(3);

    expect(getNextActiveElement(list, list[2], true, false)).toBe(list[2]);
  });

  it('should clamp to the first item when moving backward past the start without cycling', () => {
    const list = createList(3);

    expect(getNextActiveElement(list, list[0], false, false)).toBe(list[0]);
  });

  it('should wrap to the first item when moving forward past the end and cycling is allowed', () => {
    const list = createList(3);

    expect(getNextActiveElement(list, list[2], true, true)).toBe(list[0]);
  });

  it('should wrap to the last item when moving backward past the start and cycling is allowed', () => {
    const list = createList(3);

    expect(getNextActiveElement(list, list[0], false, true)).toBe(list[2]);
  });
});

describe('isVisible', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return false for a null element', () => {
    expect(isVisible(null)).toBe(false);
  });

  it('should return false when the element has no client rects', () => {
    const element = document.createElement('div');

    // jsdom does not lay out, so getClientRects() is empty by default
    expect(isVisible(element)).toBe(false);
  });

  it('should return true when the element has client rects and visibility is visible', () => {
    const element = document.createElement('div');

    (element as unknown as { getClientRects: () => unknown[] }).getClientRects = () => [{}];
    jest
      .spyOn(window, 'getComputedStyle')
      .mockReturnValue({ getPropertyValue: () => 'visible' } as unknown as CSSStyleDeclaration);

    expect(isVisible(element)).toBe(true);
  });

  it('should return false when visibility is hidden', () => {
    const element = document.createElement('div');

    (element as unknown as { getClientRects: () => unknown[] }).getClientRects = () => [{}];
    jest
      .spyOn(window, 'getComputedStyle')
      .mockReturnValue({ getPropertyValue: () => 'hidden' } as unknown as CSSStyleDeclaration);

    expect(isVisible(element)).toBe(false);
  });
});
