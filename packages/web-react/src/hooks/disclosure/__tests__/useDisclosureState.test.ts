import { act, renderHook } from '@testing-library/react';
import { useDisclosureState } from '../useDisclosureState';

describe('useDisclosureState', () => {
  it('should default to collapsed when no props are provided', () => {
    const { result } = renderHook(() => useDisclosureState({}));

    expect(result.current.isExpanded).toBeFalsy();
  });

  it('should default to expanded when defaultExpanded is true', () => {
    const { result } = renderHook(() => useDisclosureState({ defaultExpanded: true }));

    expect(result.current.isExpanded).toBeTruthy();
  });

  it('should expand the disclosure', () => {
    const { result } = renderHook(() => useDisclosureState({}));

    act(() => result.current.expand());

    expect(result.current.isExpanded).toBeTruthy();
  });

  it('should collapse the disclosure', () => {
    const { result } = renderHook(() => useDisclosureState({ defaultExpanded: true }));

    act(() => result.current.collapse());

    expect(result.current.isExpanded).toBeFalsy();
  });

  it('should toggle from collapsed to expanded', () => {
    const { result } = renderHook(() => useDisclosureState({}));

    act(() => result.current.toggle());

    expect(result.current.isExpanded).toBeTruthy();
  });

  it('should toggle from expanded to collapsed', () => {
    const { result } = renderHook(() => useDisclosureState({ defaultExpanded: true }));

    act(() => result.current.toggle());

    expect(result.current.isExpanded).toBeFalsy();
  });

  it('should set expanded state directly via setExpanded', () => {
    const { result } = renderHook(() => useDisclosureState({}));

    act(() => result.current.setExpanded(true));

    expect(result.current.isExpanded).toBeTruthy();

    act(() => result.current.setExpanded(false));

    expect(result.current.isExpanded).toBeFalsy();
  });

  it.each([
    [undefined, false],
    [false, false],
    [true, true],
  ])('should initialize isExpanded to %s when defaultExpanded is %s', (defaultExpanded, expected) => {
    const { result } = renderHook(() => useDisclosureState({ defaultExpanded }));

    expect(result.current.isExpanded).toBe(expected);
  });
});
