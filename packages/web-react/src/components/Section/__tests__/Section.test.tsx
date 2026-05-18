import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  textAlignmentPropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { type SizeExtendedDictionaryType, type SpiritSectionProps } from '../../../types';
import Section from '../Section';

const sizePaddingClasses = {
  xsmall: 'py-900 py-tablet-1000',
  small: 'py-1000 py-tablet-1100',
  medium: 'py-1100 py-tablet-1300',
  large: 'py-1200 py-tablet-1400',
  xlarge: 'py-1400 py-tablet-1600',
};

const SectionPrefixTestComponent = ({ children }: SpiritSectionProps) => (
  <Section backgroundColor="primary">{children}</Section>
);

describe('Section', () => {
  classNamePrefixProviderTest(SectionPrefixTestComponent, 'bg-primary');

  stylePropsTest(Section);

  restPropsTest(Section, 'section');

  textAlignmentPropsTest(Section);

  validHtmlAttributesTest(Section);

  ariaAttributesTest(Section);

  elementTypePropsTest(Section);

  it('should render children', () => {
    render(<Section>Content</Section>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should render with background color', () => {
    render(
      <Section backgroundColor="primary" data-testid="section">
        Content
      </Section>,
    );

    expect(screen.getByTestId('section')).toHaveClass('bg-primary');
  });

  it('should render with Container', () => {
    render(<Section data-testid="section">Content</Section>);

    expect(screen.getByTestId('section').firstChild).toHaveClass('Container');
  });

  it('should render without Container', () => {
    render(
      <Section hasContainer={false} data-testid="section">
        Content
      </Section>,
    );

    expect(screen.getByTestId('section').firstElementChild).not.toBeInTheDocument();
  });

  it('should pass Container props', () => {
    render(
      <Section data-testid="section" containerProps={{ 'data-testid': 'container' }}>
        Content
      </Section>,
    );

    expect(screen.getByTestId('container')).toBeInTheDocument();
  });

  it('should pass Container size prop', () => {
    render(
      <Section data-testid="section" containerProps={{ size: 'large', 'data-testid': 'container' }}>
        Content
      </Section>,
    );

    expect(screen.getByTestId('container')).toHaveClass('Container--large');
  });

  it('should render with padding', () => {
    render(
      <Section paddingY="space-200" data-testid="section">
        Content
      </Section>,
    );

    expect(screen.getByTestId('section')).toHaveClass('py-200');
  });

  it('should render with responsive padding', () => {
    render(
      <Section paddingY={{ mobile: 'space-200', tablet: 'space-300' }} data-testid="section">
        Content
      </Section>,
    );

    expect(screen.getByTestId('section')).toHaveClass('py-200 py-tablet-300');
  });

  it.each(Object.entries(sizePaddingClasses))('should render with %s size padding', (size, padding) => {
    render(
      <Section size={size as SizeExtendedDictionaryType} data-testid="section">
        Content
      </Section>,
    );

    expect(screen.getByTestId('section')).toHaveClass(padding);
  });

  it('should render with size and padding', () => {
    const size = 'large';
    render(
      <Section size={size} paddingTop="space-200" data-testid="section">
        Content
      </Section>,
    );

    expect(screen.getByTestId('section')).toHaveClass(sizePaddingClasses[size], 'pt-200');
  });

  it('should render with overridden paddingY', () => {
    const size = 'large';
    render(
      <Section size={size} paddingY="space-200" data-testid="section">
        Content
      </Section>,
    );

    expect(screen.getByTestId('section')).not.toHaveClass(sizePaddingClasses[size]);
    expect(screen.getByTestId('section')).toHaveClass('py-200');
  });
});
