import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import React, { type ComponentProps } from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  formFieldHelperTextContextPropsTest,
  formFieldLabelContextPropsTest,
  formFieldValidationTextContextPropsTest,
  restPropsTest,
  stylePropsTest,
} from '@local/tests';
import { Label } from '../..';
import { FillVariants, ValidationStates } from '../../../constants';
import { useToggle } from '../../../hooks';
import { UNSTABLE_Combobox, UNSTABLE_ComboboxOption } from '..';

jest.mock('../../../hooks/useIcon');

beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn();
});

const defaultProps = {
  id: 'test-combobox',
  label: 'Languages',
  selectedKeys: [] as string[],
  onSelectionChange: jest.fn(),
  inputValue: '',
  onInputChange: jest.fn(),
  onToggle: jest.fn(),
  optionKeys: ['cs', 'en'],
};

const TestCombobox = (props: Partial<ComponentProps<typeof UNSTABLE_Combobox>> = {}) => {
  const [internalIsOpen, internalOnToggle] = useToggle(false);
  const isOpen = props.isOpen ?? internalIsOpen;
  const onToggle = props.onToggle ?? internalOnToggle;

  return (
    <UNSTABLE_Combobox {...defaultProps} {...props} isOpen={isOpen} onToggle={onToggle}>
      <UNSTABLE_ComboboxOption value="cs">
        <Label>Czech</Label>
      </UNSTABLE_ComboboxOption>
      <UNSTABLE_ComboboxOption value="en">
        <Label>English</Label>
      </UNSTABLE_ComboboxOption>
    </UNSTABLE_Combobox>
  );
};

describe('UNSTABLE_Combobox', () => {
  classNamePrefixProviderTest(TestCombobox, 'UNSTABLE_Combobox');

  stylePropsTest(TestCombobox);

  restPropsTest(TestCombobox, 'div');

  ariaAttributesTest(TestCombobox);

  it.each(Object.values(ValidationStates))('applies %s validation class to InputContainer', (state) => {
    render(<TestCombobox validationState={state} />);

    expect(screen.getByRole('group', { name: 'Languages' })).toHaveClass(`InputContainer--${state}`);
  });

  it('applies outline variant class to InputContainer', () => {
    render(<TestCombobox variant={FillVariants.OUTLINE} />);

    expect(screen.getByRole('group', { name: 'Languages' })).toHaveClass('InputContainer--outline');
  });

  formFieldLabelContextPropsTest({
    renderComponent: (props) => <TestCombobox {...defaultProps} {...props} />,
  });

  formFieldHelperTextContextPropsTest({
    renderComponent: (props) => <TestCombobox {...defaultProps} {...props} />,
  });

  formFieldValidationTextContextPropsTest({
    renderComponent: (props) => <TestCombobox {...defaultProps} {...props} />,
  });

  it('should expose combobox ARIA on the input', () => {
    render(<TestCombobox isOpen />);

    const input = screen.getByRole('combobox');

    expect(input).toHaveAttribute('aria-haspopup', 'grid');
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(input).toHaveAttribute('aria-controls', 'combobox-test-combobox-listbox');
  });

  it('should toggle selection on option mousedown', () => {
    const onSelectionChange = jest.fn();

    render(<TestCombobox onSelectionChange={onSelectionChange} isOpen />);

    fireEvent.mouseDown(screen.getByText('Czech'));

    expect(onSelectionChange).toHaveBeenCalledWith(['cs']);
  });

  it('should render selected tags', () => {
    render(<TestCombobox selectedKeys={['cs']} />);

    const selection = screen.getByLabelText('Selected Languages');

    expect(within(selection).getByRole('row', { name: 'Czech' })).toHaveClass('Tag');
  });

  it('should show clear button when hasClearButton and selection is non-empty', () => {
    const onSelectionChange = jest.fn();

    render(<TestCombobox selectedKeys={['cs']} hasClearButton onSelectionChange={onSelectionChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Remove all' }));

    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });

  it('should keep clear addon hidden when hasClearButton and selection is empty', () => {
    render(<TestCombobox selectedKeys={[]} hasClearButton />);

    expect(screen.getByRole('button', { name: 'Remove all', hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove all', hidden: true }).closest('[hidden]')).not.toBeNull();
  });

  it('should open on input focus', () => {
    const onToggle = jest.fn();

    render(<TestCombobox isOpen={false} onToggle={onToggle} />);

    fireEvent.focus(screen.getByRole('combobox'));

    expect(onToggle).toHaveBeenCalled();
  });

  it('should show loading slot when isLoading', () => {
    render(<TestCombobox isLoading isOpen />);

    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('should set aria-activedescendant on ArrowDown when open', () => {
    render(<TestCombobox isOpen />);

    const input = screen.getByRole('combobox');

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveAttribute('aria-activedescendant', 'combobox-test-combobox-cs');
  });

  it('should clear aria-activedescendant on Escape close', () => {
    const EscapeCloseCombobox = () => {
      const [isOpen, onToggle] = useToggle(true);

      return <TestCombobox isOpen={isOpen} onToggle={onToggle} />;
    };

    render(<EscapeCloseCombobox />);

    const input = screen.getByRole('combobox');

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveAttribute('aria-activedescendant', 'combobox-test-combobox-cs');

    fireEvent.keyDown(input, { key: 'Escape' });

    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).not.toHaveAttribute('aria-activedescendant');
  });

  it('should toggle selection on Enter when an option is active', () => {
    const onSelectionChange = jest.fn();

    render(<TestCombobox onSelectionChange={onSelectionChange} isOpen />);

    const input = screen.getByRole('combobox');

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    const activeOption = screen.getByRole('row', { name: 'Czech' });

    fireEvent.keyDown(activeOption, { key: 'Enter' });

    expect(onSelectionChange).toHaveBeenCalledWith(['cs']);
  });

  it('should point aria-controls at the popover when tip-only (no options or empty state)', () => {
    render(<UNSTABLE_Combobox {...defaultProps} isOpen auxiliaryContent={<p>Tip content</p>} />);

    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'combobox-test-combobox-popover');
  });

  it('should keep disabled surface on unselected options when Combobox is disabled', () => {
    render(<TestCombobox isDisabled isOpen selectedKeys={['cs']} />);

    const listbox = document.getElementById('combobox-test-combobox-listbox')!;
    const selected = within(listbox).getByRole('row', { name: 'Czech' });
    const unselected = within(listbox).getByRole('row', { name: 'English' });

    expect(selected).toHaveAttribute('aria-selected', 'true');
    expect(selected).toHaveClass('disabled', 'text-color-scheme', 'color-scheme-on-selected-subtle');
    expect(selected).not.toHaveClass('bg-color-scheme');

    expect(unselected).toHaveAttribute('aria-selected', 'false');
    expect(unselected).toHaveClass('disabled', 'text-color-scheme');
    expect(unselected).not.toHaveClass('color-scheme-on-selected-subtle', 'bg-color-scheme');
  });
});
