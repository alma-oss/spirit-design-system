import { renderHook } from '@testing-library/react';
import { type TileProps } from '../types';
import { useTileStyleProps } from '../useTileStyleProps';

describe('useTileStyleProps', () => {
  it('should return the block class', () => {
    const props: TileProps = {};
    const { result } = renderHook(() => useTileStyleProps(props));

    expect(result.current.classProps).toBe('UNSTABLE_Tile');
  });

  // handle `|| {}` fallback branch
  it('should return the block class with props `{}` fallback', () => {
    const props = undefined;
    const { result } = renderHook(() => useTileStyleProps(props as unknown as TileProps));

    expect(result.current.classProps).toBe('UNSTABLE_Tile');
  });

  it('should return the shadow modifier class', () => {
    const props: TileProps = { hasShadow: true };
    const { result } = renderHook(() => useTileStyleProps(props));

    expect(result.current.classProps).toBe('UNSTABLE_Tile UNSTABLE_Tile--shadow');
  });

  it('should not pass hasShadow to the rest props', () => {
    const props: TileProps = { hasShadow: true };
    const { result } = renderHook(() => useTileStyleProps(props));

    expect(result.current.props).not.toHaveProperty('hasShadow');
  });

  it('should pass padding to the rest props', () => {
    const props: TileProps = { padding: 'space-600' };
    const { result } = renderHook(() => useTileStyleProps(props));

    expect(result.current.props).toHaveProperty('padding', 'space-600');
  });
});
