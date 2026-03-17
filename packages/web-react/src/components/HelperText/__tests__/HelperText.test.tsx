import { render, screen } from '@testing-library/react';
import React from 'react';
import { validHtmlAttributesTest } from '@local/tests';
import '@testing-library/jest-dom';
import { PropsProvider } from '../../../context';
import { FormFieldVariants } from '../../../types';
import HelperText from '../HelperText';

describe('HelperText', () => {
  const helperText = 'Helper Text';

  validHtmlAttributesTest(HelperText);

  describe('prop priority (1. direct props, 2. context, 3. defaultProps)', () => {
    it('should use default formFieldVariant when no context and no direct prop', () => {
      render(<HelperText helperText={helperText} />);

      const element = screen.getByText(helperText);

      expect(element.className).toMatch(/^HelperText\b/);
      expect(element.className).not.toContain('HelperText--inline');
      expect(element.className).not.toContain('HelperText--item');
    });

    it('should use context formFieldVariant when context provides it and no direct prop', () => {
      render(
        <PropsProvider value={{ formFieldVariant: FormFieldVariants.INLINE }}>
          <HelperText helperText={helperText} />
        </PropsProvider>,
      );

      const element = screen.getByText(helperText);

      expect(element.className).toContain('HelperText--inline');
    });

    it('should use direct formFieldVariant over context (direct props override context)', () => {
      render(
        <PropsProvider value={{ formFieldVariant: FormFieldVariants.ITEM }}>
          <HelperText helperText={helperText} formFieldVariant={FormFieldVariants.INLINE} />
        </PropsProvider>,
      );

      const element = screen.getByText(helperText);

      expect(element.className).toContain('HelperText--inline');
      expect(element.className).not.toContain('HelperText--item');
    });

    it('should use context isDisabled when no direct prop', () => {
      render(
        <PropsProvider value={{ isDisabled: true }}>
          <HelperText helperText={helperText} />
        </PropsProvider>,
      );

      const element = screen.getByText(helperText);

      expect(element.className).toContain('HelperText--disabled');
    });

    it('should use direct isDisabled over context (direct props override context)', () => {
      render(
        <PropsProvider value={{ isDisabled: true }}>
          <HelperText helperText={helperText} isDisabled={false} />
        </PropsProvider>,
      );

      const element = screen.getByText(helperText);

      expect(element.className).not.toContain('HelperText--disabled');
    });
  });

  it('should render helper text', () => {
    render(<HelperText helperText={helperText} />);

    const element = screen.getByText(helperText);

    expect(element.textContent).toBe(helperText);
  });

  it('should render with custom element type', () => {
    render(<HelperText elementType="span" helperText={helperText} />);

    const element = screen.getByText(helperText);

    expect(element.localName).toBe('span');
  });

  it('should render with className and id', () => {
    const helperTextId = 'test-helper-text-id';
    const helperTextClass = 'custom-class';

    render(
      <HelperText UNSAFE_className={helperTextClass} id={helperTextId} helperText={helperText} data-testid="test" />,
    );

    const element = screen.getByText(helperText);

    expect(element.getAttribute('id')).toBe(helperTextId);
    expect(element).toHaveClass(helperTextClass);
  });

  it('should render with html tags', () => {
    render(
      <HelperText
        id="test"
        helperText={
          <>
            Helper <b>Text</b>
          </>
        }
      />,
    );

    const element = document.querySelector('#test') as HTMLElement;

    expect(element).toHaveTextContent('Helper Text');
    expect(element.innerHTML).toBe('Helper <b>Text</b>');
  });

  it('should render with id and registerAria for aria-describedby', () => {
    const id = 'helper-aria-id';
    const register = jest.fn();

    const { unmount } = render(<HelperText id={id} registerAria={register} helperText={helperText} />);

    const element = screen.getByText(helperText);
    expect(element).toHaveAttribute('id', id);
    expect(register).toHaveBeenCalledWith({ add: id });

    unmount();
    expect(register).toHaveBeenCalledWith({ remove: id });
  });
});
