import { renderHook } from '@testing-library/react';
import React, { type ReactNode } from 'react';
import { Placements } from '../../../constants';
import { type PlacementDictionaryType } from '../../../types';
import { DropdownProvider, useDropdownContext } from '../DropdownContext';

const minimalProviderValue = {
  dropdownRef: { current: null as HTMLElement | null },
  id: 'test-dropdown',
  isOpen: false,
  onToggle: () => {},
  triggerRef: { current: undefined as HTMLElement | undefined },
};

describe('useDropdownContext', () => {
  it('returns default placement when used outside DropdownProvider', () => {
    const { result } = renderHook(() => useDropdownContext());

    expect(result.current.placement).toBe(Placements.BOTTOM_START);
  });

  it('falls back to default placement when provider omits placement (undefined)', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <DropdownProvider value={{ ...minimalProviderValue, placement: undefined }}>{children}</DropdownProvider>
    );

    const { result } = renderHook(() => useDropdownContext(), { wrapper });

    expect(result.current.placement).toBe(Placements.BOTTOM_START);
  });

  it('returns placement from context when provider sets it', () => {
    const placement: PlacementDictionaryType = Placements.TOP_END;
    const wrapper = ({ children }: { children: ReactNode }) => (
      <DropdownProvider value={{ ...minimalProviderValue, placement }}>{children}</DropdownProvider>
    );

    const { result } = renderHook(() => useDropdownContext(), { wrapper });

    expect(result.current.placement).toBe(Placements.TOP_END);
  });
});
