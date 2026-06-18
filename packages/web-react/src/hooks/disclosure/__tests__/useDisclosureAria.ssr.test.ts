import { renderHook } from '@testing-library/react';
import { useDisclosureAria } from '../useDisclosureAria';
import { type DisclosureState } from '../useDisclosureState';

jest.mock('../../../utils/ssr', () => ({ isSSR: true }));

const buildState = (overrides: { isExpanded?: boolean } = {}): DisclosureState => ({
  isExpanded: false,
  setExpanded: jest.fn(),
  expand: jest.fn(),
  collapse: jest.fn(),
  toggle: jest.fn(),
  ...overrides,
});

describe('useDisclosureAria SSR', () => {
  it('should set hidden to true when collapsed', () => {
    const state = buildState({ isExpanded: false });
    const { result } = renderHook(() => useDisclosureAria({}, state));

    expect(result.current.panelProps.hidden).toBeTruthy();
  });

  it('should set hidden to false when expanded', () => {
    const state = buildState({ isExpanded: true });
    const { result } = renderHook(() => useDisclosureAria({}, state));

    expect(result.current.panelProps.hidden).toBeFalsy();
  });
});
