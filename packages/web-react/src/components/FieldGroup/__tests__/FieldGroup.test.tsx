import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  formFieldHelperTextContextPropsTest,
  formFieldLabelContextPropsTest,
  formFieldValidationTextContextPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { Sizes } from '../../../constants';
import { Select } from '../../Select';
import { TextField } from '../../TextField';
import FieldGroup from '../FieldGroup';

jest.mock('../../../hooks/useIcon');

describe('FieldGroup', () => {
  const itemList = (
    <>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
    </>
  );

  classNamePrefixProviderTest(FieldGroup, 'border-0');

  stylePropsTest(
    (props) => <FieldGroup {...props} label="Label" id="field-group-example" data-testid="field-group" />,
    'field-group',
  );

  restPropsTest((props) => <FieldGroup {...props} label="Label" />, 'fieldset');

  validHtmlAttributesTest(FieldGroup);

  ariaAttributesTest(FieldGroup);

  formFieldLabelContextPropsTest({
    includeHidden: false,
    renderComponent: (props) => (
      <FieldGroup id="field-group-label-context" label="Label" {...props}>
        {itemList}
      </FieldGroup>
    ),
    resolveFieldElement: () => screen.getByRole('group').querySelector('div.Label') as HTMLElement,
  });

  formFieldHelperTextContextPropsTest({
    renderComponent: (props) => (
      <FieldGroup id="field-group-helper-context" label="Label" {...props}>
        {itemList}
      </FieldGroup>
    ),
  });

  formFieldValidationTextContextPropsTest({
    renderComponent: (props) => (
      <FieldGroup id="field-group-validation-context" label="Label" {...props}>
        {itemList}
      </FieldGroup>
    ),
  });

  it('should render items as children', () => {
    render(
      <FieldGroup id="example-field-group" label="Label">
        {itemList}
      </FieldGroup>,
    );

    const fieldGroup = screen.getByRole('group');

    expect(fieldGroup).toHaveClass('border-0');

    const label = fieldGroup.querySelector('legend') as HTMLElement;

    expect(label).toHaveTextContent('Label');

    const list = fieldGroup.querySelector('.Flex') as HTMLElement;
    const items = list.querySelectorAll('div');

    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent('Item');
  });

  it('should have className isDisabled', () => {
    render(
      <FieldGroup id="example-field-group" label="Label" isDisabled>
        {itemList}
      </FieldGroup>,
    );

    expect(screen.getByRole('group')).toHaveAttribute('disabled');
  });

  it('should not have visible label', () => {
    render(
      <FieldGroup id="example-field-group" label="Label" isLabelHidden>
        {itemList}
      </FieldGroup>,
    );

    expect(screen.getAllByText('Label')[1]).toBeUndefined();
  });

  it('should have correct id', () => {
    render(
      <FieldGroup id="example-field-group" label="Label" helperText="helper text">
        {itemList}
      </FieldGroup>,
    );

    expect(screen.getByText('helper text')).toHaveAttribute('id', 'example-field-group-helper-text');
  });

  it('should use distinct ids for helper and validation text and compose aria-describedby', () => {
    render(
      <FieldGroup
        id="field-group-aria-describedby"
        label="Label"
        helperText="Helper text"
        validationState="danger"
        validationText="Validation message"
      >
        {itemList}
      </FieldGroup>,
    );

    const helperEl = screen.getByText('Helper text');
    const validationEl = screen.getByText('Validation message');

    expect(helperEl).toHaveAttribute('id', 'field-group-aria-describedby-helper-text');
    expect(validationEl).toHaveAttribute('id', 'field-group-aria-describedby-validation-text');

    const fieldset = screen.getByRole('group');

    expect(fieldset).toHaveAttribute(
      'aria-describedby',
      'field-group-aria-describedby-helper-text field-group-aria-describedby-validation-text',
    );
  });

  it('should render with html tags', () => {
    render(
      <FieldGroup
        id="field-group-html"
        label={
          <>
            Label <b>Text</b>
          </>
        }
      >
        {itemList}
      </FieldGroup>,
    );

    const element = screen.getAllByText('Text')[1].parentElement as HTMLElement;

    expect(element.innerHTML).toBe('Label <b>Text</b>');
  });

  it('should render validation icon when hasValidationIcon is set', () => {
    render(
      <FieldGroup
        id="field-group-validation-icon"
        label="Label"
        hasValidationIcon
        validationState="danger"
        validationText="Invalid"
      >
        {itemList}
      </FieldGroup>,
    );

    const validationRoot = screen.getByText('Invalid').parentElement as HTMLElement;

    expect(validationRoot.querySelector('svg')).toBeInTheDocument();
  });

  it.each(Object.values(Sizes))('should set label size %s through context props', (size) => {
    render(
      <FieldGroup id="field-group-size" label="Group label" size={size}>
        {itemList}
      </FieldGroup>,
    );

    expect(screen.getByText('Group label', { selector: '.Label' })).toHaveClass(`Label--${size}`);
  });

  it('should not override nested form field label sizes', () => {
    render(
      <FieldGroup id="field-group-nested-sizes" label="Group label" size="large">
        <TextField id="nested-text-field-small" label="Small text field" size="small" />
        <Select id="nested-select-small" label="Small select" size="small">
          <option value="1">Option 1</option>
        </Select>
      </FieldGroup>,
    );

    expect(screen.getByText('Group label', { selector: '.Label' })).toHaveClass('Label--large');
    expect(screen.getByText('Small text field', { selector: '.Label' })).toHaveClass('Label--small');
    expect(screen.getByText('Small select', { selector: '.Label' })).toHaveClass('Label--small');
  });
});
