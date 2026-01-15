import { type ClickEvent } from '../../types';
import { handleLinkClick } from '../router';

describe('#handleLinkClick', () => {
  it('should return original onClick when router is missing', () => {
    const onClick = jest.fn();
    const handler = handleLinkClick({ router: null, href: '/test', onClick });

    expect(handler).toBe(onClick);
  });

  it('should call router.navigate for internal href', () => {
    const navigate = jest.fn();
    const onClick = jest.fn();
    const handler = handleLinkClick({ router: { navigate }, href: '/test', onClick });

    handler?.({
      defaultPrevented: false,
      preventDefault: jest.fn(),
      target: document.createElement('a'),
    } as unknown as ClickEvent);

    expect(onClick).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/test', undefined);
  });

  it('should pass routerOptions to navigate', () => {
    const navigate = jest.fn();
    const onClick = jest.fn();
    const routerOptions = { replace: true, scroll: false };
    const handler = handleLinkClick({ router: { navigate }, routerOptions, href: '/test', onClick });

    handler?.({
      defaultPrevented: false,
      preventDefault: jest.fn(),
      target: document.createElement('a'),
    } as unknown as ClickEvent);

    expect(navigate).toHaveBeenCalledWith('/test', routerOptions);
  });

  it('should not navigate when default is prevented', () => {
    const navigate = jest.fn();
    const onClick = jest.fn((event) => {
      event.preventDefault();
    });
    const handler = handleLinkClick({ router: { navigate }, href: '/test', onClick });
    const event = {
      defaultPrevented: false,
      preventDefault: () => {
        event.defaultPrevented = true;
      },
      target: document.createElement('a'),
    } as unknown as ClickEvent;

    handler?.(event);

    expect(onClick).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should not navigate when event is already defaultPrevented before onClick', () => {
    const navigate = jest.fn();
    const handler = handleLinkClick({ router: { navigate }, href: '/test' });
    const event = {
      defaultPrevented: true,
      preventDefault: jest.fn(),
      target: document.createElement('a'),
    } as unknown as ClickEvent;

    handler?.(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should skip router for external links, non-self target, download, or disabled', () => {
    const navigate = jest.fn();
    const onClick = jest.fn();
    const externalHandler = handleLinkClick({ router: { navigate }, href: 'https://example.com', onClick });
    const targetHandler = handleLinkClick({ router: { navigate }, href: '/test', target: '_parent', onClick });
    const downloadHandler = handleLinkClick({ router: { navigate }, href: '/test', download: true, onClick });
    const disabledHandler = handleLinkClick({ router: { navigate }, href: '/test', onClick, isDisabled: true });

    expect(externalHandler).toBe(onClick);
    expect(targetHandler).toBe(onClick);
    expect(downloadHandler).toBe(onClick);
    expect(disabledHandler).toBe(onClick);
  });

  it('should skip router for protocol-relative and dedicated URL schemes', () => {
    const navigate = jest.fn();
    const onClick = jest.fn();
    const mailtoHandler = handleLinkClick({ router: { navigate }, href: 'mailto:a@b.co', onClick });
    const protocolRelativeHandler = handleLinkClick({ router: { navigate }, href: '//example.com/path', onClick });

    expect(mailtoHandler).toBe(onClick);
    expect(protocolRelativeHandler).toBe(onClick);
  });

  it('should skip router for hash-only links', () => {
    const navigate = jest.fn();
    const onClick = jest.fn();
    const hashHandler = handleLinkClick({ router: { navigate }, href: '#', onClick });
    const hashSectionHandler = handleLinkClick({ router: { navigate }, href: '#section', onClick });

    expect(hashHandler).toBe(onClick);
    expect(hashSectionHandler).toBe(onClick);
  });

  it('should not skip router for paths containing hash fragment', () => {
    const navigate = jest.fn();
    const onClick = jest.fn();
    const handler = handleLinkClick({ router: { navigate }, href: '/test#section', onClick });

    handler?.({
      defaultPrevented: false,
      preventDefault: jest.fn(),
      target: document.createElement('a'),
    } as unknown as ClickEvent);

    expect(onClick).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/test#section', undefined);
  });

  it('should skip router for empty-string download attribute', () => {
    const navigate = jest.fn();
    const onClick = jest.fn();
    const handler = handleLinkClick({ router: { navigate }, href: '/test', download: '', onClick });

    expect(handler).toBe(onClick);
  });

  it('should not navigate on modified or non-primary clicks', () => {
    const navigate = jest.fn();
    const onClick = jest.fn();
    const handler = handleLinkClick({ router: { navigate }, href: '/test', onClick });

    handler?.({
      defaultPrevented: false,
      preventDefault: jest.fn(),
      target: document.createElement('a'),
      metaKey: true,
    } as unknown as ClickEvent);

    expect(navigate).not.toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);

    navigate.mockClear();
    onClick.mockClear();

    handler?.({
      defaultPrevented: false,
      preventDefault: jest.fn(),
      target: document.createElement('a'),
      button: 1,
    } as unknown as ClickEvent);

    expect(navigate).not.toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
