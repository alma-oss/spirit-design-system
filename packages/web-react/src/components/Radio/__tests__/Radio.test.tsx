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
import { Sizes, ValidationStates } from '../../../constants';
import { ContextPropsProvider } from '../../../context';
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
    expect(input.parentElement?.parentElement).not.toHaveClass('py-500');
  });

  it('should apply py-500 padding on non-item wrapper', () => {
    render(<Radio id="radio" label="Label" />);

    expect(screen.getByRole('radio').parentElement).toHaveClass('py-500');
  });

  it('should keep py-500 padding when UNSAFE_className is provided', () => {
    render(<Radio id="radio" label="Label" UNSAFE_className="foo" />);

    expect(screen.getByRole('radio').parentElement).toHaveClass(
      'Flex',
      'Flex--horizontal',
      'Flex--inline',
      'py-500',
      'foo',
    );
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

  it.each(Object.values(Sizes))('should set label size %s through context props', (size) => {
    render(<Radio id="radio-size" label="Label" size={size} />);

    expect(screen.getByText('Label')).toHaveClass(`Label--${size}`);
    expect(screen.getByRole('radio')).not.toHaveClass(`Radio--${size}`);
    expect(screen.getByRole('radio')).not.toHaveAttribute('size');
  });

  it('should keep the label size when the radio is an item', () => {
    render(<Radio id="radio-item-size" label="Label" size="large" isItem />);

    expect(screen.getByText('Label')).toHaveClass('Label--large');
    expect(screen.getByRole('radio')).not.toHaveClass('Radio--large');
  });

  it('should take the label size from the item context when the radio is an item', () => {
    render(
      <ContextPropsProvider value={{ item: { size: 'small' } }}>
        <Radio id="radio-item-context-size" label="Label" isItem />
      </ContextPropsProvider>,
    );

    expect(screen.getByText('Label')).toHaveClass('Label--small');
  });

  it('should prefer the size prop over the item context', () => {
    render(
      <ContextPropsProvider value={{ item: { size: 'small' } }}>
        <Radio id="radio-item-prop-size" label="Label" size="large" isItem />
      </ContextPropsProvider>,
    );

    expect(screen.getByText('Label')).toHaveClass('Label--large');
  });

  it('should ignore the item context when the radio is not an item', () => {
    render(
      <ContextPropsProvider value={{ item: { size: 'small' } }}>
        <Radio id="radio-no-item-size" label="Label" />
      </ContextPropsProvider>,
    );

    expect(screen.getByText('Label')).toHaveClass('Label--medium');
  });
});
