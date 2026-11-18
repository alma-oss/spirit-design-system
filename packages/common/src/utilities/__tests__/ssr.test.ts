import { isSSR } from '../ssr';

describe('isSSR', () => {
  const globalWithDom = globalThis as unknown as { document: Document | undefined; window: Window | undefined };
  const originalDocument = globalWithDom.document;
  const originalWindow = globalWithDom.window;

  afterEach(() => {
    globalWithDom.document = originalDocument;
    globalWithDom.window = originalWindow;
  });

  it.each([
    // [hasWindow, hasDocument, expected]
    [true, true, false],
    [false, true, true],
    [true, false, true],
    [false, false, true],
  ])('should handle window: %s and document: %s', (hasWindow, hasDocument, expected) => {
    globalWithDom.window = hasWindow ? ({} as Window) : undefined;
    globalWithDom.document = hasDocument ? ({} as Document) : undefined;

    expect(isSSR()).toBe(expected);
  });
});
