/* eslint-disable no-console --
 * testing warning() side effects
 */
import { act, renderHook } from '@testing-library/react';
import { type ChangeEvent } from 'react';
import { type UseCharacterCounterStateProps, useCharacterCounterState } from '../useCharacterCounterState';

describe('useCharacterCounterState', () => {
  it('should not produce counterProps when neither hasCounter nor counterThreshold is set', () => {
    const { result } = renderHook(() => useCharacterCounterState({}));

    expect(result.current.counterProps).toBeUndefined();
  });

  it('should produce counterProps when counterThreshold is set', () => {
    const { result } = renderHook(() => useCharacterCounterState({ counterThreshold: 200 }));

    expect(result.current.counterProps).toBeDefined();
    expect(result.current.counterProps?.currentLength).toBe(0);
    expect(result.current.counterProps?.counterThreshold).toBe(200);
  });

  it('should produce counterProps when hasCounter is set', () => {
    const { result } = renderHook(() => useCharacterCounterState({ hasCounter: true }));

    expect(result.current.counterProps).toBeDefined();
    expect(result.current.counterProps?.currentLength).toBe(0);
    expect(result.current.counterProps?.hasCounter).toBe(true);
  });

  it('should produce counterProps when both hasCounter and counterThreshold are set', () => {
    const { result } = renderHook(() => useCharacterCounterState({ hasCounter: true, counterThreshold: 200 }));

    expect(result.current.counterProps).toBeDefined();
    expect(result.current.counterProps?.counterThreshold).toBe(200);
    expect(result.current.counterProps?.hasCounter).toBe(true);
  });

  describe('length tracking', () => {
    it('should reflect controlled value length', () => {
      const { result } = renderHook(() => useCharacterCounterState({ counterThreshold: 200, value: 'Hello' }));

      expect(result.current.counterProps?.currentLength).toBe(5);
    });

    it('should initialize from defaultValue', () => {
      const { result } = renderHook(() =>
        useCharacterCounterState({ counterThreshold: 200, defaultValue: 'Default text' }),
      );

      expect(result.current.counterProps?.currentLength).toBe(12);
    });

    it('should track length via handleChange for uncontrolled input', () => {
      const { result } = renderHook(() => useCharacterCounterState({ counterThreshold: 200 }));

      expect(result.current.counterProps?.currentLength).toBe(0);

      act(() => {
        result.current.handleChange({
          target: { value: 'Hello' },
        } as ChangeEvent<HTMLTextAreaElement>);
      });

      expect(result.current.counterProps?.currentLength).toBe(5);
    });

    it('should call user onChange handler', () => {
      const onChangeMock = jest.fn();
      const { result } = renderHook(() => useCharacterCounterState({ counterThreshold: 200, onChange: onChangeMock }));

      const event = { target: { value: 'Hello' } } as ChangeEvent<HTMLTextAreaElement>;

      act(() => {
        result.current.handleChange(event);
      });

      expect(onChangeMock).toHaveBeenCalledWith(event);
    });
  });

  describe('development warnings', () => {
    beforeEach(() => {
      jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      jest.mocked(console.warn).mockRestore();
    });

    it('should warn when both value and defaultValue are provided', () => {
      renderHook(() => useCharacterCounterState({ counterThreshold: 200, value: 'a', defaultValue: 'bc' }));

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('`value` and `defaultValue` cannot both be set'),
      );
    });

    it('should warn when switching from uncontrolled to controlled', () => {
      const { rerender } = renderHook(
        (hookProps: UseCharacterCounterStateProps) => useCharacterCounterState(hookProps),
        {
          initialProps: { counterThreshold: 200 } as UseCharacterCounterStateProps,
        },
      );

      rerender({ counterThreshold: 200, value: 'hi' } as UseCharacterCounterStateProps);

      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('Do not switch between controlled'));
    });

    it('should warn when switching from controlled to uncontrolled', () => {
      const { rerender } = renderHook(
        (hookProps: UseCharacterCounterStateProps) => useCharacterCounterState(hookProps),
        {
          initialProps: { counterThreshold: 200, value: 'hi' } as UseCharacterCounterStateProps,
        },
      );

      rerender({ counterThreshold: 200 } as UseCharacterCounterStateProps);

      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('Do not switch between controlled'));
    });
  });
});
