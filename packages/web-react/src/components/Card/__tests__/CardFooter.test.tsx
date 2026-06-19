import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  alignmentXPropsTest,
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import CardFooter from '../CardFooter';

describe('CardFooter', () => {
  classNamePrefixProviderTest(CardFooter, 'CardFooter');

  stylePropsTest(CardFooter);

  restPropsTest(CardFooter, '.CardFooter');

  alignmentXPropsTest(CardFooter, 'CardFooter');

  validHtmlAttributesTest(CardFooter);

  ariaAttributesTest(CardFooter);

  it('should render footer card component and have default class names', () => {
    render(<CardFooter />);

    expect(screen.getByRole('contentinfo')).toHaveClass('CardFooter CardFooter--alignmentXLeft');
  });

  it('should render text children', () => {
    render(<CardFooter>Hello World</CardFooter>);

    expect(screen.getByRole('contentinfo')).toHaveTextContent('Hello World');
  });

  it('should render divider div when hasDivider is true', () => {
    const { container } = render(<CardFooter hasDivider />);

    expect(container.querySelector('.CardFooterDivider')).toBeInTheDocument();
  });

  it('should apply hasDivider class to footer when hasDivider is true', () => {
    render(<CardFooter hasDivider />);

    expect(screen.getByRole('contentinfo')).toHaveClass('CardFooter--hasDivider');
  });
});
