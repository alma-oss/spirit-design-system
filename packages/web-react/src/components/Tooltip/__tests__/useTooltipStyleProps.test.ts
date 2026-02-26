import { renderHook } from '@testing-library/react';
import { type TooltipStyleProps } from '../../..';
import { useTooltipStyleProps } from '../useTooltipStyleProps';

describe('useTooltipStyleProps', () => {
  it('should return defaults', () => {
    const { result } = renderHook(() => useTooltipStyleProps({} as TooltipStyleProps));

    expect(result.current.classProps.rootClassName).toBe('Tooltip');
    expect(result.current.classProps.arrowClassName).toBe('TooltipPopover__arrow');
    expect(result.current.classProps.closeButtonClassName).toBe('TooltipPopover__close');
  });

  it('should return dismissible class', () => {
    const { result } = renderHook(() => useTooltipStyleProps({ isDismissible: true } as TooltipStyleProps));

    expect(result.current.classProps.popoverClassName).toBe('TooltipPopover TooltipPopover--dismissible');
  });

  it('should return placement classes when placement is provided', () => {
    const { result } = renderHook(() => useTooltipStyleProps({ placement: 'top-start' } as TooltipStyleProps));

    expect(result.current.classProps.popoverClassName).toContain('placement-top-start');
    expect(result.current.classProps.popoverClassName).toContain('placement-controlled');
  });
});
