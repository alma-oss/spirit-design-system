/* eslint-disable no-console --
 * testing warning() side effects
 */
import { renderHook } from '@testing-library/react';
import { useControlledModeGuard } from '../useControlledModeGuard';

describe('useControlledModeGuard', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.mocked(console.warn).mockRestore();
  });

  it('warns when both value and defaultValue are provided', () => {
    renderHook(() =>
      useControlledModeGuard({
        componentName: 'TestHook',
        value: 'controlled',
        defaultValue: 'uncontrolled',
      }),
    );

    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('`value` and `defaultValue` cannot both be set'));
  });

  it('warns only once for both value and defaultValue across rerenders', () => {
    const { rerender } = renderHook(
      ({ value, defaultValue }) =>
        useControlledModeGuard({
          componentName: 'TestHook',
          value,
          defaultValue,
        }),
      {
        initialProps: { value: 'a', defaultValue: 'b' },
      },
    );

    rerender({ value: 'c', defaultValue: 'd' });

    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it('warns when switching from uncontrolled to controlled mode', () => {
    const { rerender } = renderHook(
      ({ value }) =>
        useControlledModeGuard({
          componentName: 'TestHook',
          value,
        }),
      {
        initialProps: { value: undefined as string | undefined },
      },
    );

    rerender({ value: 'controlled' });

    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('Do not switch between controlled'));
  });

  it('warns when switching from controlled to uncontrolled mode', () => {
    const { rerender } = renderHook(
      ({ value }) =>
        useControlledModeGuard({
          componentName: 'TestHook',
          value,
        }),
      {
        initialProps: { value: 'controlled' as string | undefined },
      },
    );

    rerender({ value: undefined });

    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('Do not switch between controlled'));
  });

  it('uses custom warning messages when provided', () => {
    const bothDefinedMessage = 'custom both-defined warning';
    const modeSwitchMessage = 'custom mode-switch warning';

    const { rerender } = renderHook(
      ({ value, defaultValue }) =>
        useControlledModeGuard({
          componentName: 'TestHook',
          value,
          defaultValue,
          bothDefinedMessage,
          modeSwitchMessage,
        }),
      {
        initialProps: { value: 'a' as string | undefined, defaultValue: 'b' as string | undefined },
      },
    );

    rerender({ value: undefined, defaultValue: 'b' });

    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining(bothDefinedMessage));
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining(modeSwitchMessage));
  });
});
