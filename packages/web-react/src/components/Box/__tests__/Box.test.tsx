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
import { type SpiritBoxProps } from '../../../types';
import Box from '../Box';

const dataProvider = [
  {
    prop: 'backgroundColor',
    value: 'primary',
    className: 'bg-primary',
    description: 'background color',
  },
  {
    prop: 'backgroundGradient',
    value: 'primary',
    className: 'bg-gradient-primary',
    description: 'background gradient',
  },
  {
    prop: 'backgroundGradient',
    value: { mobile: 'primary', tablet: 'secondary', desktop: 'secondary' },
    className: 'bg-gradient-primary bg-gradient-tablet-secondary bg-gradient-desktop-secondary',
    description: 'responsive background gradient',
  },
  {
    prop: 'borderColor',
    value: 'basic',
    className: 'border-basic',
    description: 'border color',
  },
  {
    prop: 'borderWidth',
    value: '100',
    className: 'border-100',
    description: 'border width',
  },
  {
    prop: 'padding',
    value: 'space-800',
    className: 'p-800',
    description: 'padding',
  },
  {
    prop: 'paddingX',
    value: 'space-800',
    className: 'px-800',
    description: 'horizontal padding',
  },
  {
    prop: 'paddingY',
    value: 'space-800',
    className: 'py-800',
    description: 'vertical padding',
  },
  {
    prop: 'paddingTop',
    value: 'space-800',
    className: 'pt-800',
    description: 'padding top',
  },
  {
    prop: 'paddingBottom',
    value: 'space-800',
    className: 'pb-800',
    description: 'padding bottom',
  },
  {
    prop: 'paddingLeft',
    value: 'space-800',
    className: 'pl-800',
    description: 'padding left',
  },
  {
    prop: 'paddingRight',
    value: 'space-800',
    className: 'pr-800',
    description: 'padding right',
  },
  {
    prop: 'padding',
    value: { mobile: 'space-600', tablet: 'space-800', desktop: 'space-1000' },
    className: 'p-600 p-tablet-800 p-desktop-1000',
    description: 'responsive padding',
  },
  {
    prop: 'textColor',
    value: 'primary',
    className: 'text-primary',
    description: 'text color',
  },
];

const BoxPrefixTestComponent = ({ children }: SpiritBoxProps) => <Box backgroundColor="primary">{children}</Box>;

describe('Box', () => {
  classNamePrefixProviderTest(BoxPrefixTestComponent, 'bg-primary');

  stylePropsTest(Box);

  restPropsTest(Box, 'div');

  validHtmlAttributesTest(Box);

  ariaAttributesTest(Box);

  elementTypePropsTest(Box);

  staticPropsTest(Box, 'Box');

  it('should render children', () => {
    render(<Box>Content</Box>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should render with background color', () => {
    render(<Box backgroundColor="primary">Content</Box>);

    expect(screen.getByText('Content')).toHaveClass('bg-primary');
  });

  it('should render with border radius and width', () => {
    render(
      <Box borderRadius="200" borderWidth="100" data-testid="Box">
        Content
      </Box>,
    );

    expect(screen.getByTestId('Box')).toHaveClass('rounded-200');
  });

  it('should render with responsive border radius', () => {
    render(
      <Box borderRadius={{ mobile: '100', tablet: '200', desktop: '400' }} borderWidth="100" data-testid="Box">
        Content
      </Box>,
    );

    expect(screen.getByTestId('Box')).toHaveClass('rounded-100 rounded-tablet-200 rounded-desktop-400');
  });

  it('should render border style', () => {
    render(
      <Box borderStyle="dashed" borderWidth="100" data-testid="Box">
        Content
      </Box>,
    );

    expect(screen.getByTestId('Box')).toHaveClass('border-dashed');
  });

  it.each(dataProvider)('should render with $description', ({ prop, value, className }) => {
    render(
      <Box {...{ [prop]: value }} data-testid="Box">
        Content
      </Box>,
    );

    expect(screen.getByTestId('Box')).toHaveClass(className);
  });
});
