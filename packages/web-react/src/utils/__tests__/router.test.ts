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
    const handler = handleLinkClick({ router: { navigate }, href: '/test', routerOptions, onClick });

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

  it('should skip router for external links, target blank, or disabled', () => {
    const navigate = jest.fn();
    const onClick = jest.fn();
    const externalHandler = handleLinkClick({ router: { navigate }, href: 'https://example.com', onClick });
    const blankHandler = handleLinkClick({ router: { navigate }, href: '/test', target: '_blank', onClick });
    const disabledHandler = handleLinkClick({ router: { navigate }, href: '/test', isDisabled: true, onClick });

    expect(externalHandler).toBe(onClick);
    expect(blankHandler).toBe(onClick);
    expect(disabledHandler).toBe(onClick);
  });
});
