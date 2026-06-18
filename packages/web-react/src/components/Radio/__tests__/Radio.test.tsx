import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  formFieldHelperTextContextPropsTest,
  formFieldLabelContextPropsTest,
  requiredPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { ValidationStates } from '../../../constants';
import Radio from '../Radio';

describe('Radio', () => {
  classNamePrefixProviderTest(Radio, 'Radio', { getByRole: 'radio' });

  stylePropsTest(Radio);

  restPropsTest(Radio, 'input');

  requiredPropsTest(Radio, 'radio', 'id', 'example-id');

  validHtmlAttributesTest(Radio);

  ariaAttributesTest(Radio);

  formFieldLabelContextPropsTest({
    renderComponent: (props) => <Radio id="radio-context" label="Label" {...props} />,
    includeRequired: false,
  });

  formFieldHelperTextContextPropsTest({
    renderComponent: (props) => <Radio id="radio-helper-context" label="Label" {...props} />,
  });

  it('should render inline layout', () => {
    render(<Radio id="radio" label="label" />);

    expect(screen.getByRole('radio').parentElement).toHaveClass('Flex', 'Flex--horizontal');
  });

  it('should have label', () => {
    render(<Radio id="radio" label="label" />);

    expect(screen.getByRole('radio', { name: 'label' })).toBeInTheDocument();
  });

  it('should have input classname', () => {
    render(<Radio id="radio" label="label" />);

    expect(screen.getByRole('radio')).toHaveClass('Radio');
  });

  it.each(Object.values(ValidationStates))('should have %s validation classname on input', (state) => {
    render(<Radio id="radio" label="label" validationState={state} />);

    expect(screen.getByRole('radio')).toHaveClass(`Radio--${state}`);
  });

  it('should render field as an Item', () => {
    render(<Radio id="radio-item" label="Label" isItem />);

    const input = screen.getByRole('radio', { name: 'Label' });

    expect(input).toHaveClass('Radio', 'Radio--item');
    expect(input.parentElement).toHaveClass('Item__slot');
    expect(input.parentElement?.parentElement).toHaveClass('Item');
  });

  it('should have helper text', () => {
    render(<Radio id="radio" label="Label" helperText="text" />);

    expect(screen.getByText('text')).toBeInTheDocument();
  });

  it('should register helper text id in aria-describedby', () => {
    render(<Radio id="radio-aria-describedby" label="Label" helperText="Helper" />);

    const input = screen.getByRole('radio', { name: 'Label' });

    expect(input.getAttribute('aria-describedby')).toContain('radio-aria-describedby-helper-text');
  });

  it('should render label with html tags', () => {
    render(
      <Radio
        id="radio"
        label={
          <>
            Radio <b>Label</b>
          </>
        }
      />,
    );

    expect(screen.getByRole('radio', { name: 'Radio Label' })).toBeInTheDocument();
  });
});
