import { type ClickEvent } from '../../types';
import { getRouterClickHandler } from '../router';

describe('#getRouterClickHandler', () => {
  it('should return original onClick when router is missing', () => {
    const onClick = jest.fn();
    const handler = getRouterClickHandler({ router: null, href: '/test', onClick });

    expect(handler).toBe(onClick);
  });

  it('should call router.navigate for internal href', () => {
    const navigate = jest.fn();
    const onClick = jest.fn();
    const handler = getRouterClickHandler({ router: { navigate }, href: '/test', onClick });

    handler?.({
      defaultPrevented: false,
      preventDefault: jest.fn(),
      target: document.createElement('a'),
    } as unknown as ClickEvent);

    expect(onClick).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/test');
  });

  it('should not navigate when default is prevented', () => {
    const navigate = jest.fn();
    const onClick = jest.fn((event) => {
      event.preventDefault();
    });
    const handler = getRouterClickHandler({ router: { navigate }, href: '/test', onClick });
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
    const externalHandler = getRouterClickHandler({ router: { navigate }, href: 'https://example.com', onClick });
    const blankHandler = getRouterClickHandler({ router: { navigate }, href: '/test', target: '_blank', onClick });
    const disabledHandler = getRouterClickHandler({ router: { navigate }, href: '/test', isDisabled: true, onClick });

    expect(externalHandler).toBe(onClick);
    expect(blankHandler).toBe(onClick);
    expect(disabledHandler).toBe(onClick);
  });
});
