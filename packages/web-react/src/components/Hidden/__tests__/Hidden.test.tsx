import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  staticPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { type SpiritHiddenProps } from '../../../types';
import Hidden from '../Hidden';

const dataProvider = [
  {
    prop: 'on',
    value: 'mobile',
    className: 'd-only-mobile-none',
    description: 'hide on mobile using on prop',
  },
  {
    prop: 'on',
    value: ['mobile', 'tablet'],
    className: 'd-only-mobile-none d-only-tablet-none',
    description: 'hide on multiple breakpoints using on prop',
  },
  {
    prop: 'from',
    value: 'tablet',
    className: 'd-tablet-none',
    description: 'hide from tablet using from prop',
  },
  {
    prop: 'margin',
    value: 'space-600',
    className: 'm-600',
    description: 'margin via StyleProps',
  },
  {
    prop: 'marginBottom',
    value: 'space-400',
    className: 'mb-400',
    description: 'margin bottom via StyleProps',
  },
];

const HiddenPrefixTestComponent = ({ children }: SpiritHiddenProps) => <Hidden on="mobile">{children}</Hidden>;

describe('Hidden', () => {
  classNamePrefixProviderTest(HiddenPrefixTestComponent, 'd-only-mobile-none');

  stylePropsTest(Hidden);

  restPropsTest(Hidden, 'span');

  validHtmlAttributesTest(Hidden);

  ariaAttributesTest(Hidden);

  elementTypePropsTest(Hidden);

  staticPropsTest(Hidden, 'Hidden');

  it('should render children', () => {
    render(<Hidden>Content</Hidden>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should render as default span element', () => {
    render(<Hidden data-testid="hidden">Content</Hidden>);

    expect(screen.getByTestId('hidden').tagName).toBe('SPAN');
  });

  it.each(dataProvider)('should render with $description', ({ prop, value, className }) => {
    render(
      <Hidden {...{ [prop]: value }} data-testid="hidden">
        Content
      </Hidden>,
    );

    expect(screen.getByTestId('hidden')).toHaveClass(className);
  });

  it('should map on prop to hideOn', () => {
    render(
      <Hidden on="tablet" data-testid="hidden">
        Content
      </Hidden>,
    );

    expect(screen.getByTestId('hidden')).toHaveClass('d-only-tablet-none');
  });

  it('should map from prop to hideFrom', () => {
    render(
      <Hidden from="desktop" data-testid="hidden">
        Content
      </Hidden>,
    );

    expect(screen.getByTestId('hidden')).toHaveClass('d-desktop-none');
  });

  it('should support both on and from props together', () => {
    render(
      <Hidden on="mobile" from="desktop" data-testid="hidden">
        Content
      </Hidden>,
    );

    const element = screen.getByTestId('hidden');

    expect(element).toHaveClass('d-only-mobile-none');
    expect(element).toHaveClass('d-desktop-none');
  });
});
