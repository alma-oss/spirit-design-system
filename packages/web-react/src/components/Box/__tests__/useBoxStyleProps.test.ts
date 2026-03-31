import { renderHook } from '@testing-library/react';
import { type SpiritBoxProps } from '../../../types';
import { useBoxStyleProps } from '../useBoxStyleProps';

describe('useBoxStyleProps', () => {
  it('should return defaults', () => {
    const props: SpiritBoxProps = {};
    const { result } = renderHook(() => useBoxStyleProps(props));

    expect(result.current.classProps).toBe('');
  });

  // handle `|| {}` fallback branch
  it('should return defaults with props `{}` fallback', () => {
    const props = undefined;
    const { result } = renderHook(() => useBoxStyleProps(props as unknown as SpiritBoxProps));

    expect(result.current.classProps).toBe('');
  });

  it('should return background classProps', () => {
    const props: SpiritBoxProps = {
      backgroundColor: 'secondary',
    };
    const { result } = renderHook(() => useBoxStyleProps(props));

    expect(result.current.classProps).toBe('bg-secondary');
  });

  it('should return border color classProps', () => {
    const props: SpiritBoxProps = {
      borderColor: 'basic',
      borderWidth: '100',
      borderStyle: 'solid',
    };
    const { result } = renderHook(() => useBoxStyleProps(props));

    expect(result.current.classProps).toBe('border-basic border-solid border-100');
  });

  it('should return border style classProps', () => {
    const props: SpiritBoxProps = {
      borderStyle: 'dashed',
      borderWidth: '100',
    };
    const { result } = renderHook(() => useBoxStyleProps(props));

    expect(result.current.classProps).toBe('border-basic border-dashed border-100');
  });

  it('should return text color classProps', () => {
    const props: SpiritBoxProps = {
      textColor: 'primary',
    };
    const { result } = renderHook(() => useBoxStyleProps(props));

    expect(result.current.classProps).toBe('text-primary');
  });

  it('should return color scheme classProps', () => {
    const props: SpiritBoxProps = {
      colorScheme: 'neutral-basic',
    };
    const { result } = renderHook(() => useBoxStyleProps(props));

    expect(result.current.classProps).toBe('color-scheme-on-neutral-basic bg-color-scheme text-color-scheme');
  });

  it('should use scheme border color when border is set and borderColor is omitted', () => {
    const props: SpiritBoxProps = {
      colorScheme: 'emotion-success-basic',
      borderWidth: '100',
      borderStyle: 'solid',
    };
    const { result } = renderHook(() => useBoxStyleProps(props));

    expect(result.current.classProps).toBe(
      'color-scheme-on-emotion-success-basic bg-color-scheme border-color-scheme border-solid border-100 text-color-scheme',
    );
  });

  it('should prefer explicit backgroundColor over scheme background', () => {
    const props: SpiritBoxProps = {
      colorScheme: 'neutral-basic',
      backgroundColor: 'primary',
    };
    const { result } = renderHook(() => useBoxStyleProps(props));

    expect(result.current.classProps).toBe('color-scheme-on-neutral-basic bg-primary text-color-scheme');
  });

  it('should prefer explicit textColor over scheme text', () => {
    const props: SpiritBoxProps = {
      colorScheme: 'neutral-basic',
      textColor: 'secondary',
    };
    const { result } = renderHook(() => useBoxStyleProps(props));

    expect(result.current.classProps).toBe('color-scheme-on-neutral-basic bg-color-scheme text-secondary');
  });

  it('should prefer explicit borderColor over scheme border', () => {
    const props: SpiritBoxProps = {
      colorScheme: 'neutral-basic',
      borderWidth: '100',
      borderStyle: 'solid',
      borderColor: 'basic',
    };
    const { result } = renderHook(() => useBoxStyleProps(props));

    expect(result.current.classProps).toBe(
      'color-scheme-on-neutral-basic bg-color-scheme border-basic border-solid border-100 text-color-scheme',
    );
  });

  it('should omit scheme background when backgroundGradient is set', () => {
    const props: SpiritBoxProps = {
      colorScheme: 'neutral-basic',
      backgroundGradient: 'primary',
    };
    const { result } = renderHook(() => useBoxStyleProps(props));

    expect(result.current.classProps).toBe('color-scheme-on-neutral-basic text-color-scheme');
    expect(result.current.props.backgroundGradient).toBe('primary');
  });
});
