import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import Header from '../Header';

describe('Header', () => {
  classNamePrefixProviderTest(Header, 'Header');

  stylePropsTest(Header);

  restPropsTest(Header, 'header');

  validHtmlAttributesTest(Header);

  ariaAttributesTest(Header);

  it('should have default classname', () => {
    render(<Header>Content</Header>);

    const header = screen.getByRole('banner');

    expect(header).toHaveClass('Header');
  });

  it('should have bottom divider classname', () => {
    render(<Header hasBottomDivider>Content</Header>);

    const header = screen.getByRole('banner');

    expect(header).toHaveClass('Header');
    expect(header).toHaveClass('Header--bottomDivider');
  });
});
