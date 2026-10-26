import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  formFieldHelperTextContextPropsTest,
  formFieldLabelContextPropsTest,
  formFieldValidationTextContextPropsTest,
  requiredPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { Sizes, ValidationStates } from '../../../constants';
import { ContextPropsProvider } from '../../../context';
import Checkbox from '../Checkbox';

jest.mock('../../../hooks/useIcon');

describe('Checkbox', () => {
  classNamePrefixProviderTest(Checkbox, 'Checkbox', { getByRole: 'checkbox' });

  stylePropsTest(Checkbox);

  restPropsTest(Checkbox, 'input');

  requiredPropsTest(Checkbox, 'checkbox', 'id', 'test-checkbox');

  validHtmlAttributesTest(Checkbox);

  ariaAttributesTest(Checkbox);

  formFieldLabelContextPropsTest({
    renderComponent: (props) => <Checkbox id="checkbox-context" label="Label" {...props} />,
  });

  formFieldHelperTextContextPropsTest({
    renderComponent: (props) => <Checkbox id="checkbox-helper-context" label="Label" {...props} />,
  });

  formFieldValidationTextContextPropsTest({
    renderComponent: (props) => <Checkbox id="checkbox-validation-context" label="Label" {...props} />,
  });

  it('should render inline layout', () => {
    render(<Checkbox id="checkbox" label="Label" />);

    expect(screen.getByRole('checkbox').parentElement).toHaveClass('Flex', 'Flex--horizontal');
  });

  it('should have label', () => {
    render(<Checkbox id="checkbox" label="Label" />);

    expect(screen.getByRole('checkbox', { name: 'Label' })).toBeInTheDocument();
  });

  it('should have input classname', () => {
    render(<Checkbox id="checkbox" label="Label" />);

    expect(screen.getByRole('checkbox')).toHaveClass('Checkbox');
  });

  it.each(Object.values(ValidationStates))('should have %s validation classname on input', (state) => {
    render(<Checkbox id="checkbox" label="Label" validationState={state} />);

    expect(screen.getByRole('checkbox')).toHaveClass(`Checkbox--${state}`);
  });

  it('should render field as an Item', () => {
    render(<Checkbox id="checkbox-item" label="Label" isItem />);

    const input = screen.getByRole('checkbox', { name: 'Label' });

    expect(input).toHaveClass('Checkbox', 'Checkbox--item');
    expect(input.parentElement).toHaveClass('Item__slot');
    expect(input.parentElement?.parentElement).toHaveClass('Item');
    expect(input.parentElement?.parentElement).not.toHaveClass('py-500');
  });

  it('should apply py-500 padding on non-item wrapper', () => {
    render(<Checkbox id="checkbox" label="Label" />);

    expect(screen.getByRole('checkbox').parentElement).toHaveClass('py-500');
  });

  it('should keep py-500 padding when UNSAFE_className is provided', () => {
    render(<Checkbox id="checkbox" label="Label" UNSAFE_className="foo" />);

    expect(screen.getByRole('checkbox').parentElement).toHaveClass(
      'Flex',
      'Flex--horizontal',
      'Flex--inline',
      'py-500',
      'foo',
    );
  });

  it('should have helper text', () => {
    render(<Checkbox id="checkbox" label="Label" helperText="text" />);

    const element = screen.getByText('text');

    expect(element).toBeInTheDocument();
  });

  it('should render label with html tags', () => {
    render(
      <Checkbox
        id="checkbox"
        label={
          <>
            Label <b>Text</b>
          </>
        }
      />,
    );

    expect(screen.getByRole('checkbox', { name: 'Label Text' })).toBeInTheDocument();
  });

  it('should render validation icon when hasValidationIcon is set', () => {
    render(
      <Checkbox
        id="checkbox-validation-icon"
        label="Label"
        hasValidationIcon
        validationState="danger"
        validationText="Invalid"
      />,
    );

    const validationRoot = screen.getByText('Invalid').parentElement as HTMLElement;

    expect(validationRoot.querySelector('svg')).toBeInTheDocument();
  });

  it('should render details content', () => {
    const details = <button type="button">See terms</button>;
    render(<Checkbox id="checkbox" label="Label" details={details} />);

    expect(screen.getByRole('button', { name: 'See terms' })).toBeInTheDocument();
  });

  it('should set aria-details attribute', () => {
    const details = <span>Details content</span>;
    render(<Checkbox id="checkbox" label="Label" details={details} />);

    const input = screen.getByRole('checkbox');

    expect(input).toHaveAttribute('aria-details', 'checkbox-details');
  });

  it.each(Object.values(Sizes))('should set label size %s through context props', (size) => {
    render(<Checkbox id="checkbox-size" label="Label" size={size} />);

    expect(screen.getByText('Label')).toHaveClass(`Label--${size}`);
    expect(screen.getByRole('checkbox')).not.toHaveClass(`Checkbox--${size}`);
    expect(screen.getByRole('checkbox')).not.toHaveAttribute('size');
  });

  it('should keep the label size when the checkbox is an item', () => {
    render(<Checkbox id="checkbox-item-size" label="Label" size="small" isItem />);

    expect(screen.getByText('Label')).toHaveClass('Label--small');
    expect(screen.getByRole('checkbox')).not.toHaveClass('Checkbox--small');
  });

  it('should take the label size from the item context when the checkbox is an item', () => {
    render(
      <ContextPropsProvider value={{ item: { size: 'large' } }}>
        <Checkbox id="checkbox-item-context-size" label="Label" isItem />
      </ContextPropsProvider>,
    );

    expect(screen.getByText('Label')).toHaveClass('Label--large');
  });

  it('should prefer the size prop over the item context', () => {
    render(
      <ContextPropsProvider value={{ item: { size: 'large' } }}>
        <Checkbox id="checkbox-item-prop-size" label="Label" size="small" isItem />
      </ContextPropsProvider>,
    );

    expect(screen.getByText('Label')).toHaveClass('Label--small');
  });

  it('should ignore the item context when the checkbox is not an item', () => {
    render(
      <ContextPropsProvider value={{ item: { size: 'large' } }}>
        <Checkbox id="checkbox-no-item-size" label="Label" />
      </ContextPropsProvider>,
    );

    expect(screen.getByText('Label')).toHaveClass('Label--medium');
  });
});
