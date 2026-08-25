import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { RouterProvider } from '../../../context/RouterContext';
import PaginationLink from '../PaginationLink';

jest.mock('../../../hooks/useIcon');

describe('PaginationLink', () => {
  classNamePrefixProviderTest(PaginationLink, 'Pagination__link');

  stylePropsTest(PaginationLink);

  restPropsTest(PaginationLink, 'a');

  validHtmlAttributesTest(PaginationLink);

  ariaAttributesTest(PaginationLink);

  elementTypePropsTest(PaginationLink);

  it('should render page number', () => {
    render(<PaginationLink pageNumber={100} />);

    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('should render with default accessibility label', () => {
    render(<PaginationLink pageNumber={100} />);

    expect(screen.getByText('Go to page 100')).toBeInTheDocument();
  });

  it('should render with custom accessibility label', () => {
    render(<PaginationLink accessibilityLabel="Test label" pageNumber={100} />);

    expect(screen.getByText('Test label')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('should render children instead of a page number', () => {
    render(<PaginationLink>Custom content</PaginationLink>);

    expect(screen.getByText('Custom content')).toBeInTheDocument();
    expect(screen.queryByText('Go to page undefined')).not.toBeInTheDocument();
  });

  it('should add aria-current="page" when isCurrent is true', () => {
    render(<PaginationLink pageNumber={1} isCurrent />);

    expect(screen.getByText('Go to page 1').closest('a')).toHaveAttribute('aria-current', 'page');
  });

  it('should not add aria-current when isCurrent is false', () => {
    render(<PaginationLink pageNumber={1} isCurrent={false} />);

    expect(screen.getByText('Go to page 1').closest('a')).not.toHaveAttribute('aria-current');
  });

  it('should not add aria-current when isCurrent is not provided', () => {
    render(<PaginationLink pageNumber={1} />);

    expect(screen.getByText('Go to page 1').closest('a')).not.toHaveAttribute('aria-current');
  });

  it('should set role="button" on an anchor without href', () => {
    render(<PaginationLink pageNumber={1} />);

    expect(screen.getByRole('button', { name: 'Go to page 1' })).toHaveClass('Pagination__link');
  });

  it('should not set role="button" when href is set', () => {
    render(<PaginationLink href="/page-1" pageNumber={1} />);

    expect(screen.getByRole('link', { name: 'Go to page 1' })).not.toHaveAttribute('role', 'button');
  });

  it('should call router navigate exactly once for internal links', () => {
    const navigate = jest.fn();

    render(
      <RouterProvider navigate={navigate}>
        <PaginationLink href="/page-2" pageNumber={2} />
      </RouterProvider>,
    );

    fireEvent.click(screen.getByRole('link', { name: 'Go to page 2' }));

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/page-2', undefined);
  });

  it('should apply disabled class and aria-disabled on an anchor', () => {
    render(<PaginationLink href="/page-2" isDisabled pageNumber={2} />);

    const link = screen.getByRole('link', { name: 'Go to page 2' });

    expect(link).toHaveClass('Pagination__link Pagination__link--disabled');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).not.toHaveAttribute('disabled');
    expect(link).toHaveAttribute('href', '/page-2');
  });

  it('should apply disabled class and native disabled on a button', () => {
    render(<PaginationLink elementType="button" isDisabled pageNumber={2} />);

    const button = screen.getByRole('button', { name: 'Go to page 2' });

    expect(button).toHaveClass('Pagination__link Pagination__link--disabled');
    expect(button).toBeDisabled();
    expect(button).not.toHaveAttribute('aria-disabled');
  });

  it('should apply disabled styles when isCurrent and isDisabled are both set', () => {
    render(<PaginationLink href="/page-1" isCurrent isDisabled pageNumber={1} />);

    const link = screen.getByRole('link', { name: 'Go to page 1' });

    expect(link).toHaveClass('Pagination__link Pagination__link--current Pagination__link--disabled');
    expect(link).toHaveAttribute('aria-current', 'page');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('should not call onClick or navigate when a disabled link is clicked', () => {
    const navigate = jest.fn();
    const onClick = jest.fn();

    render(
      <RouterProvider navigate={navigate}>
        <PaginationLink href="/page-2" isDisabled pageNumber={2} onClick={onClick} />
      </RouterProvider>,
    );

    const link = screen.getByRole('link', { name: 'Go to page 2' });
    const clickResult = fireEvent.click(link);

    expect(clickResult).toBe(false);
    expect(onClick).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should not call onClick when a disabled button is clicked', () => {
    const onClick = jest.fn();

    render(<PaginationLink elementType="button" isDisabled pageNumber={2} onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Go to page 2' }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should not call onClick when a disabled button is activated with the keyboard', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<PaginationLink elementType="button" isDisabled pageNumber={2} onClick={onClick} />);

    const button = screen.getByRole('button', { name: 'Go to page 2' });

    button.focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');

    expect(onClick).not.toHaveBeenCalled();
  });
});
