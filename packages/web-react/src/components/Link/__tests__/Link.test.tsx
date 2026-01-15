import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React, { type ReactElement } from 'react';
import {
  actionLinkColorPropsTest,
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { RouterProvider } from '../../../context/RouterContext';
import Link from '../Link';
import linkPropsDataProvider from './linkPropsDataProvider';

describe('Link', () => {
  classNamePrefixProviderTest(Link, 'link-primary');

  stylePropsTest(Link);

  actionLinkColorPropsTest(Link, 'link-');

  restPropsTest(Link, 'a');

  validHtmlAttributesTest(Link);

  ariaAttributesTest(Link);

  elementTypePropsTest(Link);

  it.each(linkPropsDataProvider)('should have class', (color, underlined, isDisabled, expectedClassName) => {
    render(<Link href="/" color={color} underlined={underlined} isDisabled={isDisabled} />);

    expect(screen.getByRole('link')).toHaveClass(expectedClassName);
  });

  it('should have correct href', () => {
    render(<Link href="/test" />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
  });

  it('should render children', () => {
    render(<Link href="/">Test</Link>);

    expect(screen.getByRole('link')).toHaveTextContent('Test');
  });

  describe('RouterProvider integration', () => {
    const renderWithRouter = (ui: ReactElement, navigate: jest.Mock) =>
      render(<RouterProvider navigate={navigate}>{ui}</RouterProvider>);

    it('without RouterProvider forwards onClick alone for internal href', () => {
      const onClick = jest.fn();
      render(<Link href="/about" onClick={onClick} />);

      fireEvent.click(screen.getByRole('link'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('with RouterProvider calls navigate and preventDefault on unmodified internal link click', () => {
      const navigate = jest.fn();
      const preventDefaultSpy = jest.spyOn(MouseEvent.prototype, 'preventDefault');

      renderWithRouter(<Link href="/about" />, navigate);

      fireEvent.click(screen.getByRole('link'));

      expect(navigate).toHaveBeenCalledWith('/about', undefined);
      expect(preventDefaultSpy).toHaveBeenCalled();

      preventDefaultSpy.mockRestore();
    });

    it('with RouterProvider passes routerOptions to navigate', () => {
      const navigate = jest.fn();
      const routerOptions = { replace: true };

      renderWithRouter(<Link href="/about" routerOptions={routerOptions} />, navigate);

      fireEvent.click(screen.getByRole('link'));

      expect(navigate).toHaveBeenCalledWith('/about', routerOptions);
    });

    it('with RouterProvider does not intercept https links', () => {
      const navigate = jest.fn();
      const preventDefaultSpy = jest.spyOn(MouseEvent.prototype, 'preventDefault');

      renderWithRouter(<Link href="https://example.com/path" />, navigate);

      fireEvent.click(screen.getByRole('link'));

      expect(navigate).not.toHaveBeenCalled();
      expect(preventDefaultSpy).not.toHaveBeenCalled();

      preventDefaultSpy.mockRestore();
    });

    it('with RouterProvider does not intercept mailto URLs', () => {
      const navigate = jest.fn();

      renderWithRouter(<Link href="mailto:user@example.org" />, navigate);

      fireEvent.click(screen.getByRole('link'));

      expect(navigate).not.toHaveBeenCalled();
    });

    it('with RouterProvider does not intercept protocol-relative URLs', () => {
      const navigate = jest.fn();

      renderWithRouter(<Link href="//example.com/path" />, navigate);

      fireEvent.click(screen.getByRole('link'));

      expect(navigate).not.toHaveBeenCalled();
    });

    it('with RouterProvider does not intercept hash-only URLs', () => {
      const navigate = jest.fn();

      renderWithRouter(<Link href="#section" />, navigate);

      fireEvent.click(screen.getByRole('link'));

      expect(navigate).not.toHaveBeenCalled();
    });

    it('with RouterProvider does not intercept download links', () => {
      const navigate = jest.fn();

      renderWithRouter(
        <Link href="/report.pdf" download>
          Download report
        </Link>,
        navigate,
      );

      fireEvent.click(screen.getByRole('link'));

      expect(navigate).not.toHaveBeenCalled();
    });

    it('with RouterProvider does not intercept empty-string download attribute', () => {
      const navigate = jest.fn();

      renderWithRouter(
        <Link href="/report.pdf" download="">
          Download report
        </Link>,
        navigate,
      );

      fireEvent.click(screen.getByRole('link'));

      expect(navigate).not.toHaveBeenCalled();
    });

    it('with RouterProvider does not call navigate on modifier click', () => {
      const navigate = jest.fn();

      renderWithRouter(<Link href="/about" />, navigate);

      fireEvent.click(screen.getByRole('link'), { ctrlKey: true });

      expect(navigate).not.toHaveBeenCalled();
    });
  });
});
