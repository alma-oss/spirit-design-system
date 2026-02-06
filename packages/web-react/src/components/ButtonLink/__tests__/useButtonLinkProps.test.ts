import { renderHook } from '@testing-library/react';
import { type SpiritButtonLinkProps } from '../../..';
import { useButtonLinkProps } from '../useButtonLinkProps';

describe('useButtonAriaProps', () => {
  it('should return aria props for anchor tag', () => {
    const props = {
      elementType: 'a',
      href: '/',
      isDisabled: false,
      target: '_blank',
      rel: 'noopener',
    } as SpiritButtonLinkProps;
    const { result } = renderHook(() => useButtonLinkProps(props));

    expect(result.current.buttonLinkProps).toEqual({
      'aria-label': undefined,
      disabled: undefined,
      href: '/',
      onClick: expect.any(Function),
      rel: 'noopener',
      role: 'button',
      target: '_blank',
    });
  });

  it('should return aria props for disabled anchor tag', () => {
    const props = {
      elementType: 'a',
      href: '/',
      isDisabled: true,
      target: '_blank',
      rel: 'noopener',
    } as SpiritButtonLinkProps;
    const { result } = renderHook(() => useButtonLinkProps(props));

    expect(result.current.buttonLinkProps).toEqual({
      'aria-label': undefined,
      disabled: true,
      href: undefined,
      onClick: expect.any(Function),
      rel: 'noopener',
      role: 'button',
      target: '_blank',
    });
  });

  it('should return aria props for button tag', () => {
    const props = {
      elementType: 'button',
      isDisabled: false,
    } as unknown as SpiritButtonLinkProps;
    const { result } = renderHook(() => useButtonLinkProps(props));

    expect(result.current.buttonLinkProps).toEqual({
      'aria-label': undefined,
      disabled: undefined,
      onClick: expect.any(Function),
      rel: undefined,
      role: 'button',
      target: undefined,
    });
  });

  it('should return aria props for disabled button tag', () => {
    const props = {
      elementType: 'button',
      isDisabled: true,
    } as unknown as SpiritButtonLinkProps;
    const { result } = renderHook(() => useButtonLinkProps(props));

    expect(result.current.buttonLinkProps).toEqual({
      'aria-label': undefined,
      disabled: true,
      onClick: expect.any(Function),
      rel: undefined,
      role: 'button',
      target: undefined,
    });
  });
});
