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
import { PropsProvider } from '../../../context';
import Label from '../Label';

describe('Label', () => {
  stylePropsTest(Label);

  restPropsTest(Label, 'label');

  validHtmlAttributesTest(Label);

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

  it('should use context isRequired and isLabelHidden when no direct prop', () => {
    render(
      <PropsProvider value={{ isRequired: true, isLabelHidden: true }}>
        <Label>Text</Label>
      </PropsProvider>,
    );

    const element = screen.getByText('Text');

    expect(element).toHaveClass('Label--required', 'accessibility-hidden');
  });
});
