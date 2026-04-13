import { renderHook } from '@testing-library/react';
import { ValidationStates } from '../../../constants';
import { type SpiritToggleProps } from '../../../types';
import { useToggleStyleProps } from '../useToggleStyleProps';

describe('useToggleStyleProps', () => {
  it('should return defaults', () => {
    const props = { id: 'toggle', label: 'text' };
    const { result } = renderHook(() => useToggleStyleProps(props));

    expect(result.current.classProps).toEqual({
      root: 'Toggle Toggle--inputPositionEnd',
      text: 'Toggle__text',
      input: 'Toggle__input',
    });
  });

  it('should return disabled', () => {
    const props = { id: 'toggle', label: 'text', isDisabled: true } as SpiritToggleProps;
    const { result } = renderHook(() => useToggleStyleProps(props));

    expect(result.current.classProps.root).toBe('Toggle Toggle--inputPositionEnd Toggle--disabled');
  });

  it.each([Object.values(ValidationStates)])('should return field with %s', (state) => {
    const props = { validationState: state } as SpiritToggleProps;
    const { result } = renderHook(() => useToggleStyleProps(props));

    expect(result.current.classProps.root).toBe(`Toggle Toggle--inputPositionEnd Toggle--${state}`);
  });

  it('should return fluid', () => {
    const props = { id: 'toggle', label: 'text', isFluid: true } as SpiritToggleProps;
    const { result } = renderHook(() => useToggleStyleProps(props));

    expect(result.current.classProps.root).toBe('Toggle Toggle--inputPositionEnd Toggle--fluid');
  });

  it('should return input with indicators', () => {
    const props = { id: 'toggle', label: 'text', hasIndicators: true } as SpiritToggleProps;
    const { result } = renderHook(() => useToggleStyleProps(props));

    expect(result.current.classProps.input).toBe('Toggle__input Toggle__input--indicators');
  });

  it('should return field with inputPosition start', () => {
    const props = { inputPosition: 'start' } as SpiritToggleProps;
    const { result } = renderHook(() => useToggleStyleProps(props));

    expect(result.current.classProps.root).toBe('Toggle Toggle--inputPositionStart');
  });

  it('should return field with inputPosition end', () => {
    const props = { inputPosition: 'end' } as SpiritToggleProps;
    const { result } = renderHook(() => useToggleStyleProps(props));

    expect(result.current.classProps.root).toBe('Toggle Toggle--inputPositionEnd');
  });

  it('should return field with responsive inputPosition', () => {
    const props = { inputPosition: { mobile: 'end', tablet: 'start', desktop: 'end' } } as SpiritToggleProps;
    const { result } = renderHook(() => useToggleStyleProps(props));

    expect(result.current.classProps.root).toBe(
      'Toggle Toggle--inputPositionEnd Toggle--tablet--inputPositionStart Toggle--desktop--inputPositionEnd',
    );
  });
});
