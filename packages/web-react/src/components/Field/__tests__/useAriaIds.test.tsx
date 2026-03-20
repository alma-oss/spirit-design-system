import { act, render, renderHook } from '@testing-library/react';
import React, { type FC, useEffect } from 'react';
import '@testing-library/jest-dom';
import { useAriaIds } from '../useAriaIds';

describe('useAriaIds', () => {
  it('should initialize with an empty array of ids', () => {
    const TestComponent: FC = () => {
      const [ids, register] = useAriaIds();

      useEffect(() => {
        register({ add: 'test-id' });
      }, [register]);

      return <div data-testid="ids-container">{ids.join(' ')}</div>;
    };

    const { getByTestId } = render(<TestComponent />);
    const idsElement = getByTestId('ids-container');

    expect(idsElement).toHaveTextContent('test-id');
  });

  it('should initialize with provided ids', () => {
    const { result } = renderHook(() => useAriaIds('id1 id2'));

    expect(result.current[0]).toEqual(['id1', 'id2']);
  });

  it('should add an id', () => {
    const { result } = renderHook(() => useAriaIds());

    act(() => {
      result.current[1]({ add: 'new-id' });
    });

    expect(result.current[0]).toEqual(['new-id']);
  });

  it('should remove an id', () => {
    const { result } = renderHook(() => useAriaIds('id1 id2'));

    act(() => {
      result.current[1]({ remove: 'id1' });
    });

    expect(result.current[0]).toEqual(['id2']);
  });

  it('should return an empty array after removing all ids', () => {
    const { result } = renderHook(() => useAriaIds('id1'));

    act(() => {
      result.current[1]({ remove: 'id1' });
    });

    expect(result.current[0]).toEqual([]);
  });

  describe('with format: "string"', () => {
    it('should return undefined when no ids are registered', () => {
      const { result } = renderHook(() => useAriaIds(undefined, { format: 'string' }));

      expect(result.current[0]).toBeUndefined();
    });

    it('should return a joined string after registering ids', () => {
      const { result } = renderHook(() => useAriaIds(undefined, { format: 'string' }));

      act(() => {
        result.current[1]({ add: 'id1' });
      });

      expect(result.current[0]).toBe('id1');
    });

    it('should return a space-separated string for multiple ids', () => {
      const { result } = renderHook(() => useAriaIds(undefined, { format: 'string' }));

      act(() => {
        result.current[1]({ add: 'id1' });
      });

      act(() => {
        result.current[1]({ add: 'id2' });
      });

      expect(result.current[0]).toBe('id1 id2');
    });

    it('should return undefined after removing all ids', () => {
      const { result } = renderHook(() => useAriaIds('id1', { format: 'string' }));

      expect(result.current[0]).toBe('id1');

      act(() => {
        result.current[1]({ remove: 'id1' });
      });

      expect(result.current[0]).toBeUndefined();
    });

    it('should initialize with provided ids as a joined string', () => {
      const { result } = renderHook(() => useAriaIds('id1 id2', { format: 'string' }));

      expect(result.current[0]).toBe('id1 id2');
    });
  });
});
