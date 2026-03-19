import { render, screen } from '@testing-library/react';
import React, { type ReactElement } from 'react';
import { PropsProvider } from '../../src/context';
import { FormFieldVariants } from '../../src/types';

interface FormFieldContextPropsTestConfig {
  renderComponent: (props?: Record<string, unknown>) => ReactElement;
  text: string;
  classNamePrefix: string;
}

export const formFieldContextPropsTest = ({
  renderComponent,
  text,
  classNamePrefix,
}: FormFieldContextPropsTestConfig) => {
  describe('prop priority (1. direct props, 2. context, 3. defaultProps)', () => {
    it('should use default formFieldVariant when no context and no direct prop', () => {
      render(renderComponent());

      const element = screen.getByText(text);

      expect(element.className).toMatch(new RegExp(`^${classNamePrefix}\\b`));
      expect(element.className).not.toContain(`${classNamePrefix}--inline`);
      expect(element.className).not.toContain(`${classNamePrefix}--item`);
    });

    it('should use context formFieldVariant when context provides it and no direct prop', () => {
      render(<PropsProvider value={{ formFieldVariant: FormFieldVariants.INLINE }}>{renderComponent()}</PropsProvider>);

      const element = screen.getByText(text);

      expect(element.className).toContain(`${classNamePrefix}--inline`);
    });

    it('should use direct formFieldVariant over context (direct props override context)', () => {
      render(
        <PropsProvider value={{ formFieldVariant: FormFieldVariants.ITEM }}>
          {renderComponent({ formFieldVariant: FormFieldVariants.INLINE })}
        </PropsProvider>,
      );

      const element = screen.getByText(text);

      expect(element.className).toContain(`${classNamePrefix}--inline`);
      expect(element.className).not.toContain(`${classNamePrefix}--item`);
    });

    it('should use context isDisabled when no direct prop', () => {
      render(<PropsProvider value={{ isDisabled: true }}>{renderComponent()}</PropsProvider>);

      const element = screen.getByText(text);

      expect(element.className).toContain(`${classNamePrefix}--disabled`);
    });

    it('should use direct isDisabled over context (direct props override context)', () => {
      render(<PropsProvider value={{ isDisabled: true }}>{renderComponent({ isDisabled: false })}</PropsProvider>);

      const element = screen.getByText(text);

      expect(element.className).not.toContain(`${classNamePrefix}--disabled`);
    });
  });
};
