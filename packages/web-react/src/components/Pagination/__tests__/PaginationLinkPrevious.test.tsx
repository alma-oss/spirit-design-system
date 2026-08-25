import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { RouterProvider } from '../../../context/RouterContext';
import PaginationLinkPrevious from '../PaginationLinkPrevious';

jest.mock('../../../hooks/useIcon');

describe('PaginationLinkPrevious', () => {
  classNamePrefixProviderTest(PaginationLinkPrevious, 'Pagination__link');

  stylePropsTest(PaginationLinkPrevious);

  restPropsTest(PaginationLinkPrevious, 'a');

  validHtmlAttributesTest(PaginationLinkPrevious);

  ariaAttributesTest(PaginationLinkPrevious);

  it('should render with default previous accessibility label', () => {
    render(<PaginationLinkPrevious />);

    expect(screen.getByText('Previous')).toBeInTheDocument();
  });

  it('should render with a custom accessibility label', () => {
    render(<PaginationLinkPrevious accessibilityLabel="Go back" />);

    expect(screen.getByText('Go back')).toBeInTheDocument();
  });

  it('should set role="button" when href is not set', () => {
    render(<PaginationLinkPrevious />);

    expect(screen.getByRole('button', { name: 'Previous' })).toHaveClass('Pagination__link');
  });

  it('should not set role="button" when href is set', () => {
    render(<PaginationLinkPrevious href="/previous" />);

    expect(screen.getByRole('link', { name: 'Previous' })).not.toHaveAttribute('role', 'button');
  });

  it('should apply disabled class and aria-disabled', () => {
    render(<PaginationLinkPrevious href="/previous" isDisabled />);

    const link = screen.getByRole('link', { name: 'Previous' });

    expect(link).toHaveClass('Pagination__link Pagination__link--disabled');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).not.toHaveAttribute('disabled');
  });

  it('should not call onClick or navigate when disabled', () => {
    const navigate = jest.fn();
    const onClick = jest.fn();

    render(
      <RouterProvider navigate={navigate}>
        <PaginationLinkPrevious href="/previous" isDisabled onClick={onClick} />
      </RouterProvider>,
    );

    const clickResult = fireEvent.click(screen.getByRole('link', { name: 'Previous' }));

    expect(clickResult).toBe(false);
    expect(onClick).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });
});
