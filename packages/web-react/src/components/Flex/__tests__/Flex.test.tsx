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
import Flex from '../Flex';

describe('Flex', () => {
  const text = 'Hello world';
  const testId = 'flex-test-id';

  classNamePrefixProviderTest(Flex, 'Flex');

  stylePropsTest(Flex);

  restPropsTest(Flex, 'div');

  validHtmlAttributesTest(Flex);

  ariaAttributesTest(Flex);

  elementTypePropsTest(Flex);

  it('should render text children', () => {
    render(<Flex data-testid={testId}>{text}</Flex>);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).toHaveClass(
      'Flex Flex--noWrap Flex--horizontal Flex--alignmentXStretch Flex--alignmentYStretch',
    );
  });

  it('should have direction class name', () => {
    render(<Flex direction="vertical" data-testid={testId} />);

    expect(screen.getByTestId(testId)).toHaveClass('Flex--vertical');
  });

  it('should have responsive direction class name', () => {
    render(<Flex direction={{ mobile: 'horizontal', tablet: 'vertical', desktop: 'vertical' }} data-testid={testId} />);

    expect(screen.getByTestId(testId)).toHaveClass('Flex--horizontal Flex--tablet--vertical Flex--desktop--vertical');
  });

  it('should have alignmentX class name', () => {
    render(<Flex alignmentX="left" data-testid={testId} />);

    expect(screen.getByTestId(testId)).toHaveClass('Flex--alignmentXLeft');
  });

  it('should have responsive alignmentX class name', () => {
    render(<Flex alignmentX={{ mobile: 'left', tablet: 'center', desktop: 'right' }} data-testid={testId} />);

    expect(screen.getByTestId(testId)).toHaveClass(
      'Flex--alignmentXLeft Flex--tablet--alignmentXCenter Flex--desktop--alignmentXRight',
    );
  });

  it('should have alignmentY class name', () => {
    render(<Flex alignmentY="top" data-testid={testId} />);

    expect(screen.getByTestId(testId)).toHaveClass('Flex--alignmentYTop');
  });

  it('should have responsive alignmentY class name', () => {
    render(<Flex alignmentY={{ mobile: 'top', tablet: 'center', desktop: 'bottom' }} data-testid={testId} />);

    expect(screen.getByTestId(testId)).toHaveClass(
      'Flex--alignmentYTop Flex--tablet--alignmentYCenter Flex--desktop--alignmentYBottom',
    );
  });

  it('should have both alignmentX and alignmentY class name', () => {
    render(<Flex alignmentX="left" alignmentY="top" data-testid={testId} />);

    expect(screen.getByTestId(testId)).toHaveClass('Flex--alignmentYTop Flex--alignmentYTop');
  });

  it('should have responsive both alignmentX and alignmentY class name', () => {
    render(
      <Flex
        alignmentX={{ mobile: 'left', tablet: 'center', desktop: 'right' }}
        alignmentY={{ mobile: 'top', tablet: 'center', desktop: 'bottom' }}
        data-testid={testId}
      />,
    );

    expect(screen.getByTestId(testId)).toHaveClass(
      'Flex--alignmentXLeft Flex--tablet--alignmentXCenter Flex--desktop--alignmentXRight Flex--alignmentYTop Flex--tablet--alignmentYCenter Flex--desktop--alignmentYBottom',
    );
  });

  it('should have wrapping class name', () => {
    render(<Flex isWrapping data-testid={testId} />);

    expect(screen.getByTestId(testId)).toHaveClass('Flex--wrap');
  });

  it('should have responsive wrapping class name', () => {
    render(<Flex isWrapping={{ mobile: true, tablet: false, desktop: true }} data-testid={testId} />);

    expect(screen.getByTestId(testId)).toHaveClass('Flex--wrap Flex--tablet--noWrap Flex--desktop--wrap');
  });

  it('should have inline class name', () => {
    render(<Flex isInline data-testid={testId} />);

    expect(screen.getByTestId(testId)).toHaveClass('Flex--inline');
  });

  it('should have custom elementType', () => {
    render(<Flex elementType="ul" />);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should render with custom spacing', () => {
    render(<Flex spacing="space-600" data-testid={testId} />);

    expect(screen.getByTestId(testId)).toHaveStyle({ '--flex-spacing-x': 'var(--spirit-space-600)' });
    expect(screen.getByTestId(testId)).toHaveStyle({ '--flex-spacing-y': 'var(--spirit-space-600)' });
  });

  it('should render with custom spacingX and spacingY', () => {
    render(<Flex spacingX="space-500" spacingY="space-1600" data-testid={testId} />);

    expect(screen.getByTestId(testId)).toHaveStyle({ '--flex-spacing-x': 'var(--spirit-space-500)' });
    expect(screen.getByTestId(testId)).toHaveStyle({ '--flex-spacing-y': 'var(--spirit-space-1600)' });
  });

  it('should render with custom spacing for each breakpoint', () => {
    render(
      <Flex spacing={{ mobile: 'space-100', tablet: 'space-1000', desktop: 'space-1200' }} data-testid={testId} />,
    );

    const element = screen.getByTestId(testId) as HTMLElement;

    expect(element).toHaveStyle({ '--flex-spacing-x': 'var(--spirit-space-100)' });
    expect(element).toHaveStyle({ '--flex-spacing-y': 'var(--spirit-space-100)' });
    expect(element).toHaveStyle({ '--flex-spacing-x-tablet': 'var(--spirit-space-1000)' });
    expect(element).toHaveStyle({ '--flex-spacing-y-tablet': 'var(--spirit-space-1000)' });
    expect(element).toHaveStyle({ '--flex-spacing-x-desktop': 'var(--spirit-space-1200)' });
    expect(element).toHaveStyle({ '--flex-spacing-y-desktop': 'var(--spirit-space-1200)' });
  });

  it('should render with custom spacingX and spacingY for each breakpoint', () => {
    render(
      <Flex
        spacingX={{ mobile: 'space-100', tablet: 'space-1000', desktop: 'space-1200' }}
        spacingY={{ mobile: 'space-200', tablet: 'space-1100', desktop: 'space-1600' }}
        data-testid={testId}
      />,
    );

    const element = screen.getByTestId(testId) as HTMLElement;

    expect(element).toHaveStyle({ '--flex-spacing-x': 'var(--spirit-space-100)' });
    expect(element).toHaveStyle({ '--flex-spacing-y': 'var(--spirit-space-200)' });
    expect(element).toHaveStyle({ '--flex-spacing-x-tablet': 'var(--spirit-space-1000)' });
    expect(element).toHaveStyle({ '--flex-spacing-y-tablet': 'var(--spirit-space-1100)' });
    expect(element).toHaveStyle({ '--flex-spacing-x-desktop': 'var(--spirit-space-1200)' });
    expect(element).toHaveStyle({ '--flex-spacing-y-desktop': 'var(--spirit-space-1600)' });
  });
});
