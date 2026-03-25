import { act, render, renderHook } from '@testing-library/react';
import React, { type FC, useEffect } from 'react';
import '@testing-library/jest-dom';
import { useAriaDescribedBy, useAriaDetails, useAriaIdRefs } from '../useAriaIdRefs';

describe('useAriaIdRefs', () => {
  it('should return empty props when no ids are registered', () => {
    const { result } = renderHook(() => useAriaIdRefs('aria-describedby'));

    expect(result.current[0]).toEqual({});
  });

  it('should initialize with provided ids', () => {
    const { result } = renderHook(() => useAriaIdRefs('aria-describedby', 'id1 id2'));

    expect(result.current[0]).toEqual({ 'aria-describedby': 'id1 id2' });
  });

  it('should deduplicate initialIds', () => {
    const { result } = renderHook(() => useAriaIdRefs('aria-describedby', 'id1 id2 id1 id3 id2'));

    expect(result.current[0]).toEqual({ 'aria-describedby': 'id1 id2 id3' });
  });

  it('should return props with the correct aria attribute after adding an id', () => {
    const { result } = renderHook(() => useAriaIdRefs('aria-describedby'));

    act(() => {
      result.current[1]({ add: 'new-id' });
    });

    expect(result.current[0]).toEqual({ 'aria-describedby': 'new-id' });
  });

  it('should return a space-separated value for multiple ids', () => {
    const { result } = renderHook(() => useAriaIdRefs('aria-describedby'));

    act(() => {
      result.current[1]({ add: 'id1' });
    });

    act(() => {
      result.current[1]({ add: 'id2' });
    });

    expect(result.current[0]).toEqual({ 'aria-describedby': 'id1 id2' });
  });

  it('should remove an id', () => {
    const { result } = renderHook(() => useAriaIdRefs('aria-describedby', 'id1 id2'));

    act(() => {
      result.current[1]({ remove: 'id1' });
    });

    expect(result.current[0]).toEqual({ 'aria-describedby': 'id2' });
  });

  it('should return empty props after removing all ids', () => {
    const { result } = renderHook(() => useAriaIdRefs('aria-describedby', 'id1'));

    act(() => {
      result.current[1]({ remove: 'id1' });
    });

    expect(result.current[0]).toEqual({});
  });

  it('should register ids in a component', () => {
    const TestComponent: FC = () => {
      const [ariaProps, register] = useAriaIdRefs('aria-describedby');

      useEffect(() => {
        register({ add: 'test-id' });
      }, [register]);

      return <div data-testid="ids-container" {...ariaProps} />;
    };

    const { getByTestId } = render(<TestComponent />);
    const idsElement = getByTestId('ids-container');

    expect(idsElement).toHaveAttribute('aria-describedby', 'test-id');
  });

  it('should not add duplicate ids', () => {
    const { result } = renderHook(() => useAriaIdRefs('aria-describedby', 'id1'));

    act(() => {
      result.current[1]({ add: 'id1' });
    });

    expect(result.current[0]).toEqual({ 'aria-describedby': 'id1' });
  });

  it('should not create duplicates when initial ids and registered ids overlap', () => {
    const { result } = renderHook(() => useAriaIdRefs('aria-describedby', 'id1 id2'));

    act(() => {
      result.current[1]({ add: 'id2' });
    });

    act(() => {
      result.current[1]({ add: 'id3' });
    });

    expect(result.current[0]).toEqual({ 'aria-describedby': 'id1 id2 id3' });
  });

  it('should not trigger unnecessary renders when removing a non-existent id', () => {
    const { result } = renderHook(() => useAriaIdRefs('aria-describedby', 'id1'));
    const initialProps = result.current[0];

    act(() => {
      result.current[1]({ remove: 'non-existent' });
    });

    // Props should remain identical (same reference) when nothing changed
    expect(result.current[0]).toBe(initialProps);
  });

  it('should not trigger unnecessary renders when adding a duplicate id', () => {
    const { result } = renderHook(() => useAriaIdRefs('aria-describedby', 'id1'));

    act(() => {
      result.current[1]({ add: 'id1' });
    });

    // aria attribute should remain the same
    expect(result.current[0]).toEqual({ 'aria-describedby': 'id1' });
  });
});

describe('useAriaDescribedBy', () => {
  it('should return aria-describedby props', () => {
    const { result } = renderHook(() => useAriaDescribedBy('id1'));

    expect(result.current[0]).toEqual({ 'aria-describedby': 'id1' });
  });

  it('should return empty props when no ids are provided', () => {
    const { result } = renderHook(() => useAriaDescribedBy());

    expect(result.current[0]).toEqual({});
  });
});

describe('useAriaDetails', () => {
  it('should return aria-details props', () => {
    const { result } = renderHook(() => useAriaDetails());

    act(() => {
      result.current[1]({ add: 'details-id' });
    });

    expect(result.current[0]).toEqual({ 'aria-details': 'details-id' });
  });

  it('should return empty props when no ids are provided', () => {
    const { result } = renderHook(() => useAriaDetails());

    expect(result.current[0]).toEqual({});
  });
});
