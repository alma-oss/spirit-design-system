import { renderHook } from '@testing-library/react';
import { useDisclosureAria } from '../useDisclosureAria';
import { type DisclosureState } from '../useDisclosureState';

const buildState = (overrides: { isExpanded?: boolean } = {}): DisclosureState => ({
  isExpanded: false,
  setExpanded: jest.fn(),
  expand: jest.fn(),
  collapse: jest.fn(),
  toggle: jest.fn(),
  ...overrides,
});

describe('useDisclosureAria', () => {
  describe('triggerProps', () => {
    it('should reflect the expanded state via aria-expanded', () => {
      const state = buildState({ isExpanded: true });
      const { result } = renderHook(() => useDisclosureAria({}, state));

      expect(result.current.triggerProps['aria-expanded']).toBeTruthy();
    });

    it('should set aria-controls to the panel id', () => {
      const state = buildState();
      const { result } = renderHook(() => useDisclosureAria({}, state));

      expect(result.current.triggerProps['aria-controls']).toBe(result.current.panelProps.id);
    });

    it('should have a trigger id that matches panel aria-labelledby', () => {
      const state = buildState();
      const { result } = renderHook(() => useDisclosureAria({}, state));

      expect(result.current.panelProps['aria-labelledby']).toBe(result.current.triggerProps.id);
    });

    it('should use provided id as panel id', () => {
      const state = buildState();
      const { result } = renderHook(() => useDisclosureAria({ id: 'my-panel' }, state));

      expect(result.current.panelProps.id).toBe('my-panel');
      expect(result.current.triggerProps['aria-controls']).toBe('my-panel');
    });

    it('should auto-generate panel id when id is not provided', () => {
      const state = buildState();
      const { result } = renderHook(() => useDisclosureAria({}, state));

      expect(result.current.panelProps.id).toBeTruthy();
      expect(result.current.triggerProps['aria-controls']).toBe(result.current.panelProps.id);
    });

    describe('onClick', () => {
      it('should toggle when not disabled', () => {
        const state = buildState();
        const { result } = renderHook(() => useDisclosureAria({}, state));

        result.current.triggerProps.onClick({} as never);

        expect(state.toggle).toHaveBeenCalledTimes(1);
      });

      it('should not toggle when disabled', () => {
        const state = buildState();
        const { result } = renderHook(() => useDisclosureAria({ isDisabled: true }, state));

        result.current.triggerProps.onClick({} as never);

        expect(state.toggle).not.toHaveBeenCalled();
      });
    });
  });

  describe('panelProps', () => {
    it('should set aria-hidden to true when collapsed', () => {
      const state = buildState({ isExpanded: false });
      const { result } = renderHook(() => useDisclosureAria({}, state));

      expect(result.current.panelProps['aria-hidden']).toBeTruthy();
    });

    it('should set aria-hidden to false when expanded', () => {
      const state = buildState({ isExpanded: true });
      const { result } = renderHook(() => useDisclosureAria({}, state));

      expect(result.current.panelProps['aria-hidden']).toBeFalsy();
    });

    it('should set hidden to undefined in browser environment', () => {
      const state = buildState();
      const { result } = renderHook(() => useDisclosureAria({}, state));

      expect(result.current.panelProps.hidden).toBeUndefined();
    });
  });
});
