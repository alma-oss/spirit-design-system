import { renderHook } from '@testing-library/react';
import { useDrawerStyleProps } from '../useDrawerStyleProps';

describe('useDrawerStyleProps', () => {
  it('should return defaults', () => {
    const { result } = renderHook(() => useDrawerStyleProps({}));

    expect(result.current.classProps.root).toBe('Drawer Drawer--right');
    expect(result.current.classProps.panel).toBe('DrawerPanel');
    expect(result.current.classProps.header).toBe('DrawerPanel__header');
    expect(result.current.classProps.content).toBe('DrawerPanel__content');
  });

  it('should return custom alignment', () => {
    const { result } = renderHook(() => useDrawerStyleProps({ drawerAlignmentX: 'left' }));

    expect(result.current.classProps.root).toBe('Drawer Drawer--left');
    expect(result.current.classProps.panel).toBe('DrawerPanel');
  });

  it('should return the content spacing modifier when hasSpacing is set', () => {
    const { result } = renderHook(() => useDrawerStyleProps({ hasSpacing: true }));

    expect(result.current.classProps.content).toBe('DrawerPanel__content DrawerPanel__content--hasSpacing');
  });
});
