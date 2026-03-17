import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { PropsProvider } from '../../../context';
import { FormFieldVariants } from '../../../types';
import Label from '../Label';

describe('Label', () => {
  stylePropsTest(Label);

  restPropsTest(Label, 'label');

  validHtmlAttributesTest(Label);

  ariaAttributesTest(Label);

  elementTypePropsTest(Label);

  it('should render children', () => {
    const label = 'Label';
    render(<Label data-testid="test">{label}</Label>);

    expect(screen.getByTestId('test')).toHaveTextContent(label);
  });

  describe('prop priority (direct props override context, then defaults)', () => {
    it('should use default formFieldVariant when no context and no direct prop', () => {
      render(<Label data-testid="l">Text</Label>);

      const el = screen.getByTestId('l');
      expect(el.className).toMatch(/^Label\b/);
      expect(el.className).not.toContain('Label--inline');
      expect(el.className).not.toContain('Label--item');
    });

    it('should use context formFieldVariant when no direct prop', () => {
      render(
        <PropsProvider value={{ formFieldVariant: FormFieldVariants.INLINE }}>
          <Label data-testid="l">Text</Label>
        </PropsProvider>,
      );

      expect(screen.getByTestId('l').className).toContain('Label--inline');
    });

    it('should use direct formFieldVariant over context', () => {
      render(
        <PropsProvider value={{ formFieldVariant: FormFieldVariants.ITEM }}>
          <Label data-testid="l" formFieldVariant={FormFieldVariants.INLINE}>
            Text
          </Label>
        </PropsProvider>,
      );

      const el = screen.getByTestId('l');
      expect(el.className).toContain('Label--inline');
      expect(el.className).not.toContain('Label--item');
    });

    it('should use context isDisabled when no direct prop', () => {
      render(
        <PropsProvider value={{ isDisabled: true }}>
          <Label data-testid="l">Text</Label>
        </PropsProvider>,
      );

      expect(screen.getByTestId('l').className).toContain('Label--disabled');
    });

    it('should use context isRequired and isLabelHidden when no direct prop', () => {
      render(
        <PropsProvider value={{ isRequired: true, isLabelHidden: true }}>
          <Label data-testid="l">Text</Label>
        </PropsProvider>,
      );

      const el = screen.getByTestId('l');
      expect(el.className).toContain('Label--required');
      expect(el.className).toMatch(/accessibility-hidden/);
    });
  });
});
