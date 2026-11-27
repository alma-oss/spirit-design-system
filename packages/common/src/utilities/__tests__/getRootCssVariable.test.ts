import { getRootCssVariable } from '../getRootCssVariable';

describe('getRootCssVariable', () => {
  const globalWithDom = globalThis as unknown as { document: Document | undefined; window: Window | undefined };
  const originalDocument = globalWithDom.document;
  const originalWindow = globalWithDom.window;

  const setBrowserEnvironment = (properties: Record<string, string>) => {
    globalWithDom.document = { documentElement: {} as HTMLElement } as Document;
    globalWithDom.window = {
      getComputedStyle: jest.fn().mockReturnValue({
        getPropertyValue: (name: string) => properties[name] ?? '',
      } as CSSStyleDeclaration),
    } as unknown as Window;
  };

  afterEach(() => {
    globalWithDom.document = originalDocument;
    globalWithDom.window = originalWindow;
  });

  it('should return the trimmed value of a custom property defined on :root', () => {
    setBrowserEnvironment({ '--spirit-breakpoint-desktop': ' 80rem ' });

    expect(getRootCssVariable('--spirit-breakpoint-desktop')).toBe('80rem');
  });

  it('should return undefined when the custom property is not defined', () => {
    setBrowserEnvironment({});

    expect(getRootCssVariable('--spirit-breakpoint-desktop')).toBeUndefined();
  });

  it('should return undefined outside the browser', () => {
    globalWithDom.window = undefined;
    globalWithDom.document = undefined;

    expect(getRootCssVariable('--spirit-breakpoint-desktop')).toBeUndefined();
  });
});
