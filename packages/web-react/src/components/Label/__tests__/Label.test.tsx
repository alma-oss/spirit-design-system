import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  elementTypePropsTest,
  formFieldContextPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { ContextPropsProvider } from '../../../context';
import Label from '../Label';

describe('Label', () => {
  stylePropsTest(Label);

  restPropsTest(Label, 'label');

  validHtmlAttributesTest(Label, {}, { globalProps: { isRequired: true, validationState: 'danger' } });

  ariaAttributesTest(Label);

  elementTypePropsTest(Label);

  formFieldContextPropsTest({
    renderComponent: (props) => <Label {...props}>Text</Label>,
    text: 'Text',
    classNamePrefix: 'Label',
  });

  it('should render children', () => {
    const label = 'Label';
    render(<Label>{label}</Label>);

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('should use context elementType when no direct prop', () => {
    render(
      <ContextPropsProvider value={{ label: { elementType: 'span' } }}>
        <Label>Text</Label>
      </ContextPropsProvider>,
    );

    expect(screen.getByText('Text').localName).toBe('span');
  });

  it('should use direct elementType over context', () => {
    render(
      <ContextPropsProvider value={{ label: { elementType: 'span' } }}>
        <Label elementType="strong">Text</Label>
      </ContextPropsProvider>,
    );

    expect(screen.getByText('Text').localName).toBe('strong');
  });

  it('should use context isRequired and isLabelHidden when no direct prop', () => {
    render(
      <ContextPropsProvider value={{ isRequired: true, label: { isLabelHidden: true } }}>
        <Label>Text</Label>
      </ContextPropsProvider>,
    );

    const element = screen.getByText('Text');

    expect(element).toHaveClass('Label--required', 'accessibility-hidden');
  });
});
