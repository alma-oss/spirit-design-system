import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import React, { type CSSProperties, type ComponentProps, createRef, useState } from 'react';
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
import { COMBOBOX_INPUT_MIN_WIDTH_CSS_VAR } from '../constants';
import type { SpiritUnstableComboboxRef } from '../types';
import { UNSTABLE_Combobox, UNSTABLE_ComboboxOption, UNSTABLE_ComboboxTag } from '..';

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

const StatefulSelectionCombobox = ({ initialSelectedKeys }: { initialSelectedKeys: string[] }) => {
  const [selectedKeys, setSelectedKeys] = useState(initialSelectedKeys);

  return <TestCombobox selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} />;
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

    expect(input).toHaveAttribute('aria-haspopup', 'listbox');
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(input).toHaveAttribute('aria-controls', 'combobox-test-combobox-listbox');
  });

  it('should use grid popup roles when optionsRole is grid', () => {
    render(<TestCombobox isOpen optionsRole="grid" />);

    const input = screen.getByRole('combobox');

    expect(input).toHaveAttribute('aria-haspopup', 'grid');
    expect(screen.getByRole('grid', { name: 'Languages' })).toHaveAttribute('aria-multiselectable', 'true');
    expect(screen.getByRole('row', { name: 'Czech' })).toBeInTheDocument();
  });

  it('should omit aria-haspopup when optionsRole is null', () => {
    render(<TestCombobox isOpen optionsRole={null} optionKeys={[]} />);

    expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-haspopup');
    expect(document.getElementById('combobox-test-combobox-listbox')).not.toBeInTheDocument();
  });

  it('should toggle selection on option mousedown', () => {
    const onSelectionChange = jest.fn();

    render(<TestCombobox onSelectionChange={onSelectionChange} isOpen />);

    fireEvent.mouseDown(screen.getByText('Czech'));

    expect(onSelectionChange).toHaveBeenCalledWith(['cs']);
  });

  it('should not toggle selection on disabled option mousedown', () => {
    const onSelectionChange = jest.fn();

    render(
      <UNSTABLE_Combobox {...defaultProps} onSelectionChange={onSelectionChange} isOpen onToggle={jest.fn()}>
        <UNSTABLE_ComboboxOption value="cs" isDisabled>
          <Label>Czech</Label>
        </UNSTABLE_ComboboxOption>
      </UNSTABLE_Combobox>,
    );

    fireEvent.mouseDown(screen.getByText('Czech'));

    expect(onSelectionChange).not.toHaveBeenCalled();
  });

  it('should render selected tags', () => {
    render(<TestCombobox selectedKeys={['cs']} />);

    const selection = screen.getByLabelText('Selected Languages');

    expect(selection).toHaveAttribute('role', 'grid');
    expect(within(selection).getByRole('row', { name: 'Czech' })).toHaveClass('Tag');
  });

  it('should use role group on the selection area when nothing is selected', () => {
    render(<TestCombobox />);

    const selection = screen.getByLabelText('Selected Languages');

    expect(selection).toHaveAttribute('role', 'group');
  });

  it('should set aria-required on the filter input when isRequired', () => {
    render(<TestCombobox isRequired />);

    expect(screen.getByRole('combobox', { name: 'Languages' })).toHaveAttribute('aria-required', 'true');
    expect(screen.getByRole('combobox', { name: 'Languages' })).not.toHaveAttribute('required');
  });

  it('should not apply field label props to option labels', () => {
    render(<TestCombobox isRequired isLabelHidden isOpen />);

    const optionLabel = within(screen.getByRole('option', { name: 'Czech' })).getByText('Czech');

    expect(optionLabel).not.toHaveClass('Label--required');
    expect(optionLabel).not.toHaveClass('accessibility-hidden');
  });

  it('should show clear button when hasClearButton and selection is non-empty', () => {
    const onSelectionChange = jest.fn();

    render(<TestCombobox selectedKeys={['cs']} hasClearButton onSelectionChange={onSelectionChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Remove all' }));

    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });

  it('should keep clear addon hidden when hasClearButton and selection is empty', () => {
    render(<TestCombobox selectedKeys={[]} hasClearButton />);

    const clearButton = screen.getByRole('button', { name: 'Remove all', hidden: true });
    const clearAddon = clearButton.closest('[hidden]');

    expect(clearButton).toBeInTheDocument();
    expect(clearAddon).not.toBeNull();
    expect(clearAddon).toHaveClass('d-none');
  });

  it('should not open on keyboard focus alone', () => {
    const onToggle = jest.fn();

    render(<TestCombobox isOpen={false} onToggle={onToggle} />);

    fireEvent.focus(screen.getByRole('combobox'));

    expect(onToggle).not.toHaveBeenCalled();
  });

  it('should open on input click', () => {
    const onToggle = jest.fn();

    render(<TestCombobox isOpen={false} onToggle={onToggle} />);

    fireEvent.click(screen.getByRole('combobox'));

    expect(onToggle).toHaveBeenCalled();
  });

  it('should open on typing', () => {
    const onToggle = jest.fn();

    render(<TestCombobox isOpen={false} onToggle={onToggle} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'c' } });

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

  it('should sync aria-activedescendant when an option receives focus from outside the keyboard hook', () => {
    render(<TestCombobox isOpen />);

    const input = screen.getByRole('combobox');

    fireEvent.focus(screen.getByRole('option', { name: 'English' }));

    expect(input).toHaveAttribute('aria-activedescendant', 'combobox-test-combobox-en');
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

  it('should close on Tab without blocking focus from moving on', () => {
    const TabOutCombobox = () => {
      const [isOpen, onToggle] = useToggle(true);

      return <TestCombobox isOpen={isOpen} onToggle={onToggle} />;
    };

    render(<TabOutCombobox />);

    const input = screen.getByRole('combobox');
    const isPrevented = !fireEvent.keyDown(input, { key: 'Tab' });

    expect(isPrevented).toBe(false);
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).not.toHaveAttribute('aria-activedescendant');
  });

  it('should prevent default on Escape close', () => {
    const EscapeCombobox = () => {
      const [isOpen, onToggle] = useToggle(true);

      return <TestCombobox isOpen={isOpen} onToggle={onToggle} />;
    };

    render(<EscapeCombobox />);

    const isPrevented = !fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });

    expect(isPrevented).toBe(true);
  });

  it('should toggle selection on Enter when an option is active', () => {
    const onSelectionChange = jest.fn();

    render(<TestCombobox onSelectionChange={onSelectionChange} isOpen />);

    const input = screen.getByRole('combobox');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSelectionChange).toHaveBeenCalledWith(['cs']);
    expect(input).toHaveFocus();
  });

  it('should activate a nested link on Enter when the option row is active', () => {
    const onSelectionChange = jest.fn();
    const handleLinkClick = jest.fn((event: React.MouseEvent) => event.preventDefault());

    render(
      <UNSTABLE_Combobox
        {...defaultProps}
        optionsRole="grid"
        isOpen
        onToggle={jest.fn()}
        onSelectionChange={onSelectionChange}
      >
        <UNSTABLE_ComboboxOption value="cs" label="Czech">
          <a href="#czech" onClick={handleLinkClick}>
            Czech
          </a>
        </UNSTABLE_ComboboxOption>
      </UNSTABLE_Combobox>,
    );

    const input = screen.getByRole('combobox');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleLinkClick).toHaveBeenCalledTimes(1);
    expect(onSelectionChange).not.toHaveBeenCalled();
    expect(input).toHaveFocus();
  });

  it('should activate an option via ref.activateOption and clear with null', () => {
    const comboboxRef = createRef<SpiritUnstableComboboxRef>();

    render(
      <UNSTABLE_Combobox {...defaultProps} ref={comboboxRef} isOpen onToggle={jest.fn()}>
        <UNSTABLE_ComboboxOption value="cs">
          <Label>Czech</Label>
        </UNSTABLE_ComboboxOption>
        <UNSTABLE_ComboboxOption value="en">
          <Label>English</Label>
        </UNSTABLE_ComboboxOption>
      </UNSTABLE_Combobox>,
    );

    const input = screen.getByRole('combobox');

    act(() => {
      comboboxRef.current?.activateOption('en');
    });

    expect(input).toHaveAttribute('aria-activedescendant', 'combobox-test-combobox-en');
    expect(screen.getByRole('option', { name: 'English' })).toHaveClass('is-active');
    expect(input).toHaveFocus();

    act(() => {
      comboboxRef.current?.activateOption(null);
    });

    expect(input).not.toHaveAttribute('aria-activedescendant');
    expect(screen.getByRole('option', { name: 'English' })).not.toHaveClass('is-active');
    expect(input).toHaveFocus();
  });

  it('should clear nested cell-control highlight when activateOption restores a neighbour row', () => {
    const comboboxRef = createRef<SpiritUnstableComboboxRef>();

    render(
      <UNSTABLE_Combobox
        {...defaultProps}
        ref={comboboxRef}
        optionsRole="grid"
        isOpen
        onToggle={jest.fn()}
        optionKeys={['cs', 'en']}
      >
        <UNSTABLE_ComboboxOption
          value="cs"
          label="Czech"
          endSlot={
            <span role="gridcell">
              <button type="button" tabIndex={-1}>
                Remove Czech
              </button>
            </span>
          }
        >
          <Label>Czech</Label>
        </UNSTABLE_ComboboxOption>
        <UNSTABLE_ComboboxOption
          value="en"
          label="English"
          endSlot={
            <span role="gridcell">
              <button type="button" tabIndex={-1}>
                Remove English
              </button>
            </span>
          }
        >
          <Label>English</Label>
        </UNSTABLE_ComboboxOption>
      </UNSTABLE_Combobox>,
    );

    const input = screen.getByRole('combobox');
    const removeCzech = screen.getByRole('button', { name: 'Remove Czech' });
    const englishRow = screen.getByRole('row', { name: /English/ });
    const removeEnglish = screen.getByRole('button', { name: 'Remove English' });

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowRight' });

    expect(removeCzech).toHaveClass('is-active');

    act(() => {
      comboboxRef.current?.activateOption('en');
    });

    expect(englishRow).toHaveClass('is-active');
    expect(removeEnglish).not.toHaveClass('is-active');
    expect(removeCzech).not.toHaveClass('is-active');
    expect(input).toHaveFocus();
  });

  it('should open and activate the first option on ArrowDown when closed without moving DOM focus', () => {
    render(<TestCombobox />);

    const input = screen.getByRole('combobox');

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveFocus();
    expect(input).toHaveAttribute('aria-activedescendant', 'combobox-test-combobox-cs');
    expect(screen.getByRole('option', { name: 'Czech' })).toHaveClass('is-active');
    expect(screen.getByRole('option', { name: 'Czech' })).not.toHaveFocus();
  });

  it('should activate the option row instead of its nested control when opening from closed', () => {
    const GridCombobox = () => {
      const [isOpen, onToggle] = useToggle(false);

      return (
        <UNSTABLE_Combobox {...defaultProps} optionsRole="grid" isOpen={isOpen} onToggle={onToggle}>
          <UNSTABLE_ComboboxOption
            value="cs"
            label="Czech"
            endSlot={
              <span role="gridcell">
                <button type="button" tabIndex={-1}>
                  Remove Czech
                </button>
              </span>
            }
          >
            <Label>Czech</Label>
          </UNSTABLE_ComboboxOption>
        </UNSTABLE_Combobox>
      );
    };

    render(<GridCombobox />);

    const input = screen.getByRole('combobox');

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveFocus();
    expect(screen.getByRole('row', { name: /Czech/ })).toHaveClass('is-active');
    expect(screen.getByRole('button', { name: 'Remove Czech' })).not.toHaveClass('is-active');
  });

  it('should skip nested links and activate a remove button with ArrowRight', () => {
    render(
      <UNSTABLE_Combobox {...defaultProps} optionsRole="grid" isOpen onToggle={jest.fn()}>
        <UNSTABLE_ComboboxOption
          value="cs"
          label="Czech"
          endSlot={
            <span role="gridcell">
              <button type="button" tabIndex={-1}>
                Remove Czech
              </button>
            </span>
          }
        >
          <a href="#czech">Czech</a>
        </UNSTABLE_ComboboxOption>
      </UNSTABLE_Combobox>,
    );

    const input = screen.getByRole('combobox');
    const row = screen.getByRole('row', { name: /Czech/ });
    const link = screen.getByRole('link', { name: 'Czech' });
    const removeButton = screen.getByRole('button', { name: 'Remove Czech' });

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(row).toHaveClass('is-active');

    fireEvent.keyDown(input, { key: 'ArrowRight' });

    expect(removeButton).toHaveClass('is-active');
    expect(link).not.toHaveClass('is-active');
    expect(row).not.toHaveClass('is-active');
    expect(input).toHaveFocus();
  });

  it('should visually activate a nested cell control with ArrowRight and back with ArrowLeft', () => {
    render(
      <UNSTABLE_Combobox {...defaultProps} optionsRole="grid" isOpen onToggle={jest.fn()}>
        <UNSTABLE_ComboboxOption
          value="cs"
          label="Czech"
          endSlot={
            <span role="gridcell">
              <button type="button" tabIndex={-1}>
                Remove Czech
              </button>
            </span>
          }
        >
          <Label>Czech</Label>
        </UNSTABLE_ComboboxOption>
      </UNSTABLE_Combobox>,
    );

    const input = screen.getByRole('combobox');
    const row = screen.getByRole('row', { name: /Czech/ });
    const removeButton = screen.getByRole('button', { name: 'Remove Czech' });

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(row).toHaveClass('is-active');
    expect(input).toHaveFocus();

    fireEvent.keyDown(input, { key: 'ArrowRight' });

    expect(removeButton).toHaveClass('is-active');
    expect(row).not.toHaveClass('is-active');
    expect(input).toHaveAttribute('aria-activedescendant', 'combobox-test-combobox-cs');
    expect(input).toHaveFocus();

    fireEvent.keyDown(input, { key: 'ArrowLeft' });

    expect(row).toHaveClass('is-active');
    expect(removeButton).not.toHaveClass('is-active');
    expect(input).toHaveFocus();
  });

  it('should keep ArrowDown row navigation when a nested cell control is visually active', () => {
    render(
      <UNSTABLE_Combobox {...defaultProps} optionsRole="grid" isOpen onToggle={jest.fn()} optionKeys={['cs', 'en']}>
        <UNSTABLE_ComboboxOption
          value="cs"
          label="Czech"
          endSlot={
            <span role="gridcell">
              <button type="button" tabIndex={-1}>
                Remove Czech
              </button>
            </span>
          }
        >
          <Label>Czech</Label>
        </UNSTABLE_ComboboxOption>
        <UNSTABLE_ComboboxOption value="en" label="English">
          <Label>English</Label>
        </UNSTABLE_ComboboxOption>
      </UNSTABLE_Combobox>,
    );

    const input = screen.getByRole('combobox');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowRight' });

    expect(screen.getByRole('button', { name: 'Remove Czech' })).toHaveClass('is-active');

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(screen.getByRole('row', { name: /English/ })).toHaveClass('is-active');
    expect(input).toHaveFocus();
  });

  it('should open and activate the last option on ArrowUp when closed', () => {
    render(<TestCombobox />);

    const input = screen.getByRole('combobox');

    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input).toHaveFocus();
    expect(screen.getByRole('option', { name: 'English' })).toHaveClass('is-active');
    expect(input).toHaveAttribute('aria-activedescendant', 'combobox-test-combobox-en');
  });

  it('should wrap ArrowDown from the last option to the first while keeping input focus', () => {
    render(<TestCombobox isOpen />);

    const input = screen.getByRole('combobox');

    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(screen.getByRole('option', { name: 'English' })).toHaveClass('is-active');
    expect(input).toHaveAttribute('aria-activedescendant', 'combobox-test-combobox-en');

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(screen.getByRole('option', { name: 'Czech' })).toHaveClass('is-active');
    expect(input).toHaveAttribute('aria-activedescendant', 'combobox-test-combobox-cs');
    expect(input).toHaveFocus();
  });

  it('should wrap ArrowUp from the first option to the last while keeping input focus', () => {
    render(<TestCombobox isOpen />);

    const input = screen.getByRole('combobox');

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(screen.getByRole('option', { name: 'Czech' })).toHaveClass('is-active');

    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(screen.getByRole('option', { name: 'English' })).toHaveClass('is-active');
    expect(input).toHaveAttribute('aria-activedescendant', 'combobox-test-combobox-en');
    expect(input).toHaveFocus();
  });

  describe('disabled options', () => {
    const DisabledOptionCombobox = () => (
      <UNSTABLE_Combobox {...defaultProps} isOpen onToggle={jest.fn()} optionKeys={['cs', 'de', 'en']}>
        <UNSTABLE_ComboboxOption value="cs">
          <Label>Czech</Label>
        </UNSTABLE_ComboboxOption>
        <UNSTABLE_ComboboxOption value="de" isDisabled>
          <Label>German</Label>
        </UNSTABLE_ComboboxOption>
        <UNSTABLE_ComboboxOption value="en">
          <Label>English</Label>
        </UNSTABLE_ComboboxOption>
      </UNSTABLE_Combobox>
    );

    it('should skip a disabled option on ArrowDown', () => {
      render(<DisabledOptionCombobox />);

      const input = screen.getByRole('combobox');

      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });

      expect(screen.getByRole('option', { name: 'English' })).toHaveClass('is-active');
      expect(input).toHaveAttribute('aria-activedescendant', 'combobox-test-combobox-en');
      expect(input).toHaveFocus();
    });

    it('should skip a disabled option on ArrowUp', () => {
      render(<DisabledOptionCombobox />);

      const input = screen.getByRole('combobox');

      fireEvent.keyDown(input, { key: 'ArrowUp' });
      fireEvent.keyDown(input, { key: 'ArrowUp' });

      expect(screen.getByRole('option', { name: 'Czech' })).toHaveClass('is-active');
      expect(input).toHaveFocus();
    });

    it('should skip a trailing disabled option on ArrowUp from the input and on End', () => {
      render(
        <UNSTABLE_Combobox {...defaultProps} isOpen onToggle={jest.fn()}>
          <UNSTABLE_ComboboxOption value="cs">
            <Label>Czech</Label>
          </UNSTABLE_ComboboxOption>
          <UNSTABLE_ComboboxOption value="en" isDisabled>
            <Label>English</Label>
          </UNSTABLE_ComboboxOption>
        </UNSTABLE_Combobox>,
      );

      const input = screen.getByRole('combobox');
      const firstOption = screen.getByRole('option', { name: 'Czech' });

      fireEvent.keyDown(input, { key: 'ArrowUp' });

      expect(firstOption).toHaveClass('is-active');

      fireEvent.keyDown(input, { key: 'End' });

      expect(firstOption).toHaveClass('is-active');
      expect(input).toHaveFocus();
    });

    it('should keep input focus when every option is disabled', () => {
      render(
        <UNSTABLE_Combobox {...defaultProps} isOpen onToggle={jest.fn()}>
          <UNSTABLE_ComboboxOption value="cs" isDisabled>
            <Label>Czech</Label>
          </UNSTABLE_ComboboxOption>
        </UNSTABLE_Combobox>,
      );

      const input = screen.getByRole('combobox');

      fireEvent.keyDown(input, { key: 'ArrowDown' });

      expect(screen.getByRole('option', { name: 'Czech' })).not.toHaveClass('is-active');
      expect(input).not.toHaveAttribute('aria-activedescendant');
    });
  });

  it('should omit aria-controls when tip-only (no options or empty state)', () => {
    render(<UNSTABLE_Combobox {...defaultProps} isOpen auxiliaryContent={<p>Tip content</p>} />);

    expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-controls');
  });

  it('should keep disabled surface on unselected options when Combobox is disabled', () => {
    render(<TestCombobox isDisabled isOpen selectedKeys={['cs']} />);

    const listbox = document.getElementById('combobox-test-combobox-listbox')!;
    const selected = within(listbox).getByRole('option', { name: 'Czech' });
    const unselected = within(listbox).getByRole('option', { name: 'English' });

    expect(selected).toHaveAttribute('aria-selected', 'true');
    expect(selected).toHaveClass('disabled', 'text-color-scheme', 'color-scheme-on-selected-subtle');
    expect(selected).not.toHaveClass('bg-color-scheme');

    expect(unselected).toHaveAttribute('aria-selected', 'false');
    expect(unselected).toHaveClass('disabled', 'text-color-scheme');
    expect(unselected).not.toHaveClass('color-scheme-on-selected-subtle', 'bg-color-scheme');
  });

  it('should set input min-width from the empty-selection placeholder length', () => {
    const { container } = render(<TestCombobox emptySelectionLabel="Languages" />);

    expect(container.firstChild).toHaveStyle({ [COMBOBOX_INPUT_MIN_WIDTH_CSS_VAR]: '9ch' });
  });

  it('should set input min-width from the add-more placeholder when items are selected', () => {
    const { container } = render(<TestCombobox selectedKeys={['cs']} addMoreLabel="+ Add more…" />);

    expect(container.firstChild).toHaveStyle({ [COMBOBOX_INPUT_MIN_WIDTH_CSS_VAR]: '11ch' });
  });

  it('should not set input min-width when every option is selected', () => {
    const { container } = render(<TestCombobox selectedKeys={['cs', 'en']} />);

    expect((container.firstChild as HTMLElement).style.getPropertyValue(COMBOBOX_INPUT_MIN_WIDTH_CSS_VAR)).toBe('');
  });

  it('should respect a consumer override of the input min-width CSS variable', () => {
    const { container } = render(
      <TestCombobox
        emptySelectionLabel="Languages"
        UNSAFE_style={{ [COMBOBOX_INPUT_MIN_WIDTH_CSS_VAR]: '18ch' } as CSSProperties}
      />,
    );

    expect(container.firstChild).toHaveStyle({ [COMBOBOX_INPUT_MIN_WIDTH_CSS_VAR]: '18ch' });
  });

  it('should render custom tags when renderTags is provided', () => {
    render(<TestCombobox selectedKeys={['cs']} renderTags={() => <div data-testid="custom-tags">Custom tags</div>} />);

    expect(screen.getByTestId('custom-tags')).toBeInTheDocument();
    expect(screen.queryByRole('row', { name: 'Czech' })).not.toBeInTheDocument();
  });

  it('should move roving focus between custom tag rows with arrow keys via getKeyboardGridRowProps', () => {
    render(
      <TestCombobox
        selectedKeys={['cs', 'en']}
        renderTags={({ getKeyboardGridRowProps, removeTagAtIndex }) => (
          <>
            <UNSTABLE_ComboboxTag
              key="cs"
              label="Custom Czech"
              tagKeyboardProps={getKeyboardGridRowProps(0)}
              onRemove={() => removeTagAtIndex(0)}
            />
            <UNSTABLE_ComboboxTag
              key="en"
              label="Custom English"
              tagKeyboardProps={getKeyboardGridRowProps(1)}
              onRemove={() => removeTagAtIndex(1)}
            />
          </>
        )}
      />,
    );

    const czech = screen.getByRole('row', { name: 'Custom Czech' });
    const english = screen.getByRole('row', { name: 'Custom English' });

    act(() => {
      english.focus();
    });
    act(() => {
      fireEvent.keyDown(english, { key: 'ArrowLeft' });
    });

    expect(czech).toHaveFocus();

    act(() => {
      fireEvent.keyDown(czech, { key: 'ArrowRight' });
    });

    expect(english).toHaveFocus();
  });

  it('should remove a selected tag with Delete', () => {
    const onSelectionChange = jest.fn();

    render(<TestCombobox selectedKeys={['cs', 'en']} onSelectionChange={onSelectionChange} />);

    const czech = screen.getByRole('row', { name: 'Czech' });
    const input = screen.getByRole('combobox');

    act(() => {
      czech.focus();
    });
    act(() => {
      fireEvent.keyDown(czech, { key: 'Delete' });
    });

    expect(onSelectionChange).toHaveBeenCalledWith(['en']);
    expect(input).toHaveFocus();
  });

  it('should focus the last selected tag with Backspace on an empty filter input', () => {
    const onSelectionChange = jest.fn();

    render(<TestCombobox selectedKeys={['cs', 'en']} onSelectionChange={onSelectionChange} />);

    const input = screen.getByRole('combobox');

    act(() => {
      input.focus();
    });
    act(() => {
      fireEvent.keyDown(input, { key: 'Backspace' });
    });

    expect(onSelectionChange).not.toHaveBeenCalled();
    expect(screen.getByRole('row', { name: 'English' })).toHaveFocus();
  });

  it('should remove the focused last tag with a second Backspace and return focus to the input', () => {
    const onSelectionChange = jest.fn();

    render(<TestCombobox selectedKeys={['cs', 'en']} onSelectionChange={onSelectionChange} />);

    const input = screen.getByRole('combobox');

    act(() => {
      input.focus();
    });
    act(() => {
      fireEvent.keyDown(input, { key: 'Backspace' });
    });

    const english = screen.getByRole('row', { name: 'English' });

    expect(english).toHaveFocus();

    act(() => {
      fireEvent.keyDown(english, { key: 'Backspace' });
    });

    expect(onSelectionChange).toHaveBeenCalledWith(['cs']);
    expect(input).toHaveFocus();
  });

  it('should keep removing tags with repeated Backspace from the filter input', () => {
    render(<StatefulSelectionCombobox initialSelectedKeys={['cs', 'en']} />);

    const input = screen.getByRole('combobox');

    act(() => {
      input.focus();
    });
    act(() => {
      fireEvent.keyDown(input, { key: 'Backspace' });
    });
    act(() => {
      fireEvent.keyDown(screen.getByRole('row', { name: 'English' }), { key: 'Backspace' });
    });

    expect(screen.queryByRole('row', { name: 'English' })).not.toBeInTheDocument();
    expect(input).toHaveFocus();

    act(() => {
      fireEvent.keyDown(input, { key: 'Backspace' });
    });

    const czech = screen.getByRole('row', { name: 'Czech' });

    expect(czech).toHaveFocus();

    act(() => {
      fireEvent.keyDown(czech, { key: 'Backspace' });
    });

    expect(screen.queryByRole('row', { name: 'Czech' })).not.toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it('should not focus a selected tag with Backspace when the filter has text', () => {
    const onSelectionChange = jest.fn();

    render(<TestCombobox selectedKeys={['cs', 'en']} inputValue="cze" onSelectionChange={onSelectionChange} />);

    const input = screen.getByRole('combobox');

    act(() => {
      input.focus();
    });
    act(() => {
      fireEvent.keyDown(input, { key: 'Backspace' });
    });

    expect(onSelectionChange).not.toHaveBeenCalled();
    expect(input).toHaveFocus();
  });

  it('should not remove a selected tag with Delete on the filter input', () => {
    const onSelectionChange = jest.fn();

    render(<TestCombobox selectedKeys={['cs', 'en']} onSelectionChange={onSelectionChange} />);

    const input = screen.getByRole('combobox');

    act(() => {
      input.focus();
    });
    act(() => {
      fireEvent.keyDown(input, { key: 'Delete' });
    });

    expect(onSelectionChange).not.toHaveBeenCalled();
  });
});
