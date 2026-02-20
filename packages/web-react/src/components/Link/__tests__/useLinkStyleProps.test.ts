import { renderHook } from '@testing-library/react';
import { type SpiritLinkProps } from '../../../types';
import { useLinkStyleProps } from '../useLinkStyleProps';
import linkPropsDataProvider from './linkPropsDataProvider';

describe('useLinkStyleProps', () => {
  it.each(linkPropsDataProvider)('should return classname', (color, underlined, isDisabled, expectedClassName) => {
    const props = { color, underlined, isDisabled } as SpiritLinkProps;
    const { result } = renderHook(() => useLinkStyleProps(props));

    expect(result.current.classProps).toBe(expectedClassName);
  });

  it('should return link-underlined class', () => {
    const props = { color: 'primary', underlined: 'always' } as SpiritLinkProps;
    const { result } = renderHook(() => useLinkStyleProps(props));

    expect(result.current.classProps).toContain('link-underlined');
  });

  it('should return link-not-underlined class', () => {
    const props = { color: 'primary', underlined: 'never' } as SpiritLinkProps;
    const { result } = renderHook(() => useLinkStyleProps(props));

    expect(result.current.classProps).toContain('link-not-underlined');
  });

  it('should return link-allowed-visited class', () => {
    const props = { color: 'primary', hasVisitedStyleAllowed: true } as SpiritLinkProps;
    const { result } = renderHook(() => useLinkStyleProps(props));

    expect(result.current.classProps).toContain('link-allow-visited-style');
  });

  it('should return link-inherit class', () => {
    const props = { color: 'inherit' } as SpiritLinkProps;
    const { result } = renderHook(() => useLinkStyleProps(props));

    expect(result.current.classProps).toContain('link-inherit');
  });

  it('should combine inherit with underlined', () => {
    const props = { color: 'inherit', underlined: 'always' } as SpiritLinkProps;
    const { result } = renderHook(() => useLinkStyleProps(props));

    expect(result.current.classProps).toBe('link-inherit link-underlined');
  });

  it('should combine inherit with disabled', () => {
    const props = { color: 'inherit', isDisabled: true } as SpiritLinkProps;
    const { result } = renderHook(() => useLinkStyleProps(props));

    expect(result.current.classProps).toBe('link-inherit link-disabled');
  });
});
