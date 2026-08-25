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
import PaginationLinkNext from '../PaginationLinkNext';

jest.mock('../../../hooks/useIcon');

describe('PaginationLinkNext', () => {
  classNamePrefixProviderTest(PaginationLinkNext, 'Pagination__link');

  stylePropsTest(PaginationLinkNext);

  restPropsTest(PaginationLinkNext, 'a');

  validHtmlAttributesTest(PaginationLinkNext);

  ariaAttributesTest(PaginationLinkNext);

  it('should render with default next accessibility label', () => {
    render(<PaginationLinkNext />);

    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('should render with a custom accessibility label', () => {
    render(<PaginationLinkNext accessibilityLabel="Go forward" />);

    expect(screen.getByText('Go forward')).toBeInTheDocument();
  });

  it('should set role="button" when href is not set', () => {
    render(<PaginationLinkNext />);

    expect(screen.getByRole('button', { name: 'Next' })).toHaveClass('Pagination__link');
  });

  it('should not set role="button" when href is set', () => {
    render(<PaginationLinkNext href="/next" />);

    expect(screen.getByRole('link', { name: 'Next' })).not.toHaveAttribute('role', 'button');
  });

  it('should apply disabled class and aria-disabled', () => {
    render(<PaginationLinkNext href="/next" isDisabled />);

    const link = screen.getByRole('link', { name: 'Next' });

    expect(link).toHaveClass('Pagination__link Pagination__link--disabled');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).not.toHaveAttribute('disabled');
  });

  it('should call router navigate for internal links', () => {
    const navigate = jest.fn();

    render(
      <RouterProvider navigate={navigate}>
        <PaginationLinkNext href="/next-page" />
      </RouterProvider>,
    );

    fireEvent.click(screen.getByRole('link', { name: 'Next' }));

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/next-page', undefined);
  });

  it('should not call onClick or navigate when disabled', () => {
    const navigate = jest.fn();
    const onClick = jest.fn();

    render(
      <RouterProvider navigate={navigate}>
        <PaginationLinkNext href="/next-page" isDisabled onClick={onClick} />
      </RouterProvider>,
    );

    const clickResult = fireEvent.click(screen.getByRole('link', { name: 'Next' }));

    expect(clickResult).toBe(false);
    expect(onClick).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });
});
