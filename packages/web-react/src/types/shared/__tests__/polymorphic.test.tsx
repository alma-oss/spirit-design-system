import '@testing-library/jest-dom';
import React, { forwardRef } from 'react';
import { render, screen } from '@testing-library/react';
import type { PolymorphicComponentProps, PolymorphicRef } from '../polymorphic';

// Test component using the new polymorphic pattern
interface TestButtonBaseProps {
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  children?: React.ReactNode;
}

type TestButtonProps<T extends React.ElementType = 'button'> = PolymorphicComponentProps<
  T,
  TestButtonBaseProps
>;

const TestButtonInner = <T extends React.ElementType = 'button'>(
  props: TestButtonProps<T>,
  ref: PolymorphicRef<T>,
) => {
  const { elementType = 'button', color = 'primary', size = 'medium', children, ...restProps } = props;

  const Component = elementType as React.ElementType;

  return (
    <Component
      ref={ref}
      data-color={color}
      data-size={size}
      data-testid="test-button"
      {...restProps}
    >
      {children}
    </Component>
  );
};

const TestButton = forwardRef(TestButtonInner) as <T extends React.ElementType = 'button'>(
  props: TestButtonProps<T> & { ref?: PolymorphicRef<T> },
) => React.ReactElement;

describe('PolymorphicComponentProps', () => {
  describe('Type Safety', () => {
    it('should accept component-specific props', () => {
      render(<TestButton color="primary" size="small" />);

      const button = screen.getByTestId('test-button');
      expect(button).toHaveAttribute('data-color', 'primary');
      expect(button).toHaveAttribute('data-size', 'small');
    });

    it('should accept HTML button props when elementType is not specified', () => {
      render(
        <TestButton type="submit" disabled>
          Submit
        </TestButton>,
      );

      const button = screen.getByTestId('test-button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toBeDisabled();
    });

    it('should accept HTML anchor props when elementType is "a"', () => {
      render(
        <TestButton elementType="a" href="/test" target="_blank">
          Link
        </TestButton>,
      );

      const link = screen.getByTestId('test-button');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('should accept HTML div props when elementType is "div"', () => {
      render(
        <TestButton elementType="div" role="button" tabIndex={0}>
          Div Button
        </TestButton>,
      );

      const div = screen.getByTestId('test-button');
      expect(div.tagName).toBe('DIV');
      expect(div).toHaveAttribute('role', 'button');
      expect(div).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Default Element Rendering', () => {
    it('should render as button by default', () => {
      render(<TestButton>Default</TestButton>);

      const button = screen.getByTestId('test-button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('should apply default props correctly', () => {
      render(<TestButton>Test</TestButton>);

      const button = screen.getByTestId('test-button');
      expect(button).toHaveAttribute('data-color', 'primary');
      expect(button).toHaveAttribute('data-size', 'medium');
    });
  });

  describe('Polymorphic Rendering', () => {
    it('should render as anchor when elementType="a"', () => {
      render(
        <TestButton elementType="a" href="/link">
          Link
        </TestButton>,
      );

      const link = screen.getByTestId('test-button');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/link');
    });

    it('should render as div when elementType="div"', () => {
      render(<TestButton elementType="div">Div</TestButton>);

      const div = screen.getByTestId('test-button');
      expect(div.tagName).toBe('DIV');
    });

    it('should render as span when elementType="span"', () => {
      render(<TestButton elementType="span">Span</TestButton>);

      const span = screen.getByTestId('test-button');
      expect(span.tagName).toBe('SPAN');
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();

      render(<TestButton ref={ref}>Button</TestButton>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });

    it('should forward ref to anchor element when elementType="a"', () => {
      const ref = React.createRef<HTMLAnchorElement>();

      render(
        <TestButton elementType="a" ref={ref} href="/test">
          Link
        </TestButton>,
      );

      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref.current?.tagName).toBe('A');
      expect(ref.current?.href).toContain('/test');
    });

    it('should forward ref to div element when elementType="div"', () => {
      const ref = React.createRef<HTMLDivElement>();

      render(
        <TestButton elementType="div" ref={ref}>
          Div
        </TestButton>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.tagName).toBe('DIV');
    });
  });

  describe('Custom Components', () => {
    it('should render custom component when passed as elementType', () => {
      const CustomComponent = forwardRef<HTMLDivElement, { customProp?: string; children?: React.ReactNode }>(
        ({ customProp, children, ...props }, ref) => (
          <div ref={ref} data-custom={customProp} {...props}>
            {children}
          </div>
        ),
      );

      render(
        <TestButton elementType={CustomComponent} customProp="test">
          Custom
        </TestButton>,
      );

      const custom = screen.getByTestId('test-button');
      expect(custom).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('Props Merging', () => {
    it('should merge component props with element props', () => {
      render(
        <TestButton color="secondary" size="small" className="custom-class" data-custom="value">
          Button
        </TestButton>,
      );

      const button = screen.getByTestId('test-button');
      expect(button).toHaveAttribute('data-color', 'secondary');
      expect(button).toHaveAttribute('data-size', 'small');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveAttribute('data-custom', 'value');
    });

    it('should not have elementType prop on rendered element', () => {
      render(<TestButton elementType="a" href="/test">Link</TestButton>);

      const link = screen.getByTestId('test-button');
      // elementType should not appear as an attribute
      expect(link).not.toHaveAttribute('elementType');
      expect(link).not.toHaveAttribute('elementtype');
    });
  });
});

describe('PolymorphicRef', () => {
  it('should correctly type refs for different element types', () => {
    // This is primarily a type-level test
    // The actual runtime behavior is tested above in "Ref Forwarding"

    // TypeScript should allow these assignments
    const buttonRef: React.Ref<HTMLButtonElement> = React.createRef<HTMLButtonElement>();
    const anchorRef: React.Ref<HTMLAnchorElement> = React.createRef<HTMLAnchorElement>();
    const divRef: React.Ref<HTMLDivElement> = React.createRef<HTMLDivElement>();

    render(
      <>
        <TestButton ref={buttonRef}>Button</TestButton>
        <TestButton elementType="a" ref={anchorRef} href="/test">
          Link
        </TestButton>
        <TestButton elementType="div" ref={divRef}>
          Div
        </TestButton>
      </>,
    );

    expect(buttonRef).toBeDefined();
    expect(anchorRef).toBeDefined();
    expect(divRef).toBeDefined();
  });
});
