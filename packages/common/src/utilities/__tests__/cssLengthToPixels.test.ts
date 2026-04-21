import { BASE_FONT_SIZE_PX, convertRemToPixels, cssLengthToPixels, getRootFontSizePx } from '../cssLengthToPixels';

describe('cssLengthToPixels', () => {
  const globalWithDom = globalThis as unknown as { document: Document | undefined; window: Window | undefined };
  const originalDocument = globalWithDom.document;
  const originalWindow = globalWithDom.window;

  const setBrowserEnvironment = (rootFontSize: string) => {
    globalWithDom.document = { documentElement: {} as HTMLElement } as Document;
    globalWithDom.window = {
      getComputedStyle: jest.fn().mockReturnValue({ fontSize: rootFontSize } as CSSStyleDeclaration),
    } as unknown as Window;
  };

  const setServerEnvironment = () => {
    globalWithDom.window = undefined;
    globalWithDom.document = undefined;
  };

  afterEach(() => {
    jest.restoreAllMocks();
    globalWithDom.document = originalDocument;
    globalWithDom.window = originalWindow;
  });

  it('should convert rem using current runtime root font size', () => {
    setBrowserEnvironment('20px');

    expect(cssLengthToPixels('1.5rem')).toBe(30);
  });

  it('convertRemToPixels should use current runtime root font size by default', () => {
    setBrowserEnvironment('18px');

    expect(convertRemToPixels(2)).toBe(36);
  });

  it('should return px values directly', () => {
    expect(cssLengthToPixels('13px')).toBe(13);
    expect(cssLengthToPixels('0px')).toBe(0);
    expect(cssLengthToPixels('-5px')).toBe(-5);
  });

  it('should parse negative rem lengths', () => {
    setBrowserEnvironment('16px');

    expect(cssLengthToPixels('-0.25rem')).toBe(-4);
  });

  it('should use fallback root size when runtime root size is invalid', () => {
    setBrowserEnvironment('invalid');

    expect(getRootFontSizePx()).toBe(BASE_FONT_SIZE_PX);
    expect(convertRemToPixels(1)).toBe(BASE_FONT_SIZE_PX);
  });

  it('should use fallback base for rem when window is undefined (SSR)', () => {
    setServerEnvironment();

    expect(getRootFontSizePx()).toBe(BASE_FONT_SIZE_PX);
    expect(convertRemToPixels(2)).toBe(32);
    expect(cssLengthToPixels('1rem')).toBe(BASE_FONT_SIZE_PX);
  });

  it('should return undefined for unsupported CSS length values', () => {
    expect(cssLengthToPixels('')).toBeUndefined();
    expect(cssLengthToPixels('none')).toBeUndefined();
    expect(cssLengthToPixels('calc(1rem + 1px)')).toBeUndefined();
    expect(cssLengthToPixels('calc(100% - 1rem)')).toBeUndefined();
    expect(cssLengthToPixels('1.2.3px')).toBeUndefined();
    expect(cssLengthToPixels('1.2.3rem')).toBeUndefined();
  });
});
