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
import PaginationButtonLink from '../PaginationButtonLink';

jest.mock('../../../hooks/useIcon');

describe('PaginationButtonLink', () => {
  classNamePrefixProviderTest(PaginationButtonLink, 'Button');

  stylePropsTest(PaginationButtonLink);

  restPropsTest(PaginationButtonLink, 'a');

  validHtmlAttributesTest(PaginationButtonLink);

  ariaAttributesTest(PaginationButtonLink);

  it('should call router navigate exactly once for internal links', () => {
    const navigate = jest.fn();

    render(
      <RouterProvider navigate={navigate}>
        <PaginationButtonLink direction="next" href="/next-page" />
      </RouterProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/next-page', undefined);
  });
});
