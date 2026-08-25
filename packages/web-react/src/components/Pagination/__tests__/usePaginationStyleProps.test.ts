import { renderHook } from '@testing-library/react';
import { usePaginationStyleProps } from '../usePaginationStyleProps';

describe('usePaginationStyleProps', () => {
  it('should return defaults', () => {
    const props = {};
    const { result } = renderHook(() => usePaginationStyleProps(props));

    expect(result.current.classProps).toEqual({
      root: 'Pagination',
      item: 'Pagination__item',
      link: 'Pagination__link',
    });
  });

  it('should return defaults with current', () => {
    const props = { isCurrent: true };
    const { result } = renderHook(() => usePaginationStyleProps(props));

    expect(result.current.classProps).toEqual({
      root: 'Pagination',
      item: 'Pagination__item',
      link: 'Pagination__link Pagination__link--current',
    });
  });

  it('should return disabled class', () => {
    const props = { isDisabled: true };
    const { result } = renderHook(() => usePaginationStyleProps(props));

    expect(result.current.classProps).toEqual({
      root: 'Pagination',
      item: 'Pagination__item',
      link: 'Pagination__link Pagination__link--disabled',
    });
  });

  it('should return current and disabled classes together', () => {
    const props = { isCurrent: true, isDisabled: true };
    const { result } = renderHook(() => usePaginationStyleProps(props));

    expect(result.current.classProps).toEqual({
      root: 'Pagination',
      item: 'Pagination__item',
      link: 'Pagination__link Pagination__link--current Pagination__link--disabled',
    });
  });
});
