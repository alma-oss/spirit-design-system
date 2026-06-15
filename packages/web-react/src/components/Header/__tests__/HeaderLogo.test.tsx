import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import HeaderLogo from '../HeaderLogo';

describe('HeaderLogo', () => {
  classNamePrefixProviderTest(HeaderLogo, 'HeaderLogo');

  stylePropsTest(HeaderLogo);

  restPropsTest(HeaderLogo, 'a');

  validHtmlAttributesTest(HeaderLogo);

  ariaAttributesTest(HeaderLogo);

  elementTypePropsTest(HeaderLogo);

  it('should have default classname', () => {
    render(<HeaderLogo href="#">Content</HeaderLogo>);

    expect(screen.getByRole('link')).toHaveClass('HeaderLogo');
  });

  it('should render children', () => {
    render(<HeaderLogo href="#">Content</HeaderLogo>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
