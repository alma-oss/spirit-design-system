import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import UncontrolledPagination from '../UncontrolledPagination';

jest.mock('../../../hooks/useIcon');

describe('UncontrolledPagination', () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  it('renders pagination items with test page selected', () => {
    render(
      <UncontrolledPagination accessibilityLabel="test page" totalPages={10} defaultPage={5} onChange={onPageChange} />,
    );

    expect(screen.getByRole('button', { name: 'Previous' })).toHaveClass('Pagination__link');
    expect(screen.getByRole('button', { name: 'Next' })).toHaveClass('Pagination__link');

    const selectedPageItem = screen.getByText('test page 5').parentElement;

    expect(selectedPageItem).toHaveClass('Pagination__link Pagination__link--current');
  });

  it('renders disabled items for the first and last page', () => {
    render(
      <UncontrolledPagination accessibilityLabel="test page" totalPages={10} defaultPage={1} onChange={onPageChange} />,
    );

    expect(screen.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toHaveClass('Pagination__link');

    const firstPageItem = screen.getByText('test page 1').parentElement;

    expect(firstPageItem).toHaveClass('Pagination__link Pagination__link--current');
  });

  it('calls the onPageChange function when an item is clicked', () => {
    render(
      <UncontrolledPagination accessibilityLabel="test page" totalPages={10} defaultPage={5} onChange={onPageChange} />,
    );

    const nextPageItem = screen.getByText('test page 6');

    fireEvent.click(nextPageItem);

    expect(onPageChange).toHaveBeenCalledWith(6);
  });
});
