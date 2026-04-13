import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React, { type ComponentProps } from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  formFieldHelperTextContextPropsTest,
  formFieldLabelContextPropsTest,
  formFieldValidationTextContextPropsTest,
  restPropsTest,
  stylePropsTest,
  validationStatePropsTest,
} from '@local/tests';
import { useToggle } from '../../../hooks';
import {
  type SpiritUnstablePickerRef,
  UNSTABLE_Picker,
  UNSTABLE_PickerGroup,
  UNSTABLE_PickerItem,
  UNSTABLE_PickerTag,
} from '..';

jest.mock('../../../hooks/useIcon');

const defaultProps = {
  id: 'test-picker',
  label: 'Languages',
  selectedKeys: [] as string[],
  onSelectionChange: jest.fn(),
};

const TestPicker = (props: Partial<ComponentProps<typeof UNSTABLE_Picker>> = {}) => {
  const [isOpen, onToggle] = useToggle(false);

  return (
    <UNSTABLE_Picker {...defaultProps} {...props} isOpen={isOpen} onToggle={onToggle}>
      <UNSTABLE_PickerGroup label="Language">
        <UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>
        <UNSTABLE_PickerItem value="dk">Danish</UNSTABLE_PickerItem>
      </UNSTABLE_PickerGroup>
    </UNSTABLE_Picker>
  );
};

describe('UNSTABLE_Picker', () => {
  classNamePrefixProviderTest(TestPicker, 'UNSTABLE_Picker');

  stylePropsTest(TestPicker);

  restPropsTest(TestPicker, 'div');

  ariaAttributesTest(TestPicker);

  validationStatePropsTest(TestPicker, 'UNSTABLE_Picker--');

  formFieldLabelContextPropsTest({
    renderComponent: (props) => <TestPicker {...defaultProps} emptySelectionLabel="Select" {...props} />,
  });

  formFieldHelperTextContextPropsTest({
    renderComponent: (props) => <TestPicker {...defaultProps} {...props} />,
  });

  formFieldValidationTextContextPropsTest({
    renderComponent: (props) => <TestPicker {...defaultProps} {...props} />,
  });

  it('should render selected tags and toggle items', () => {
    const onSelectionChange = jest.fn();
    render(<TestPicker selectedKeys={['cs']} onSelectionChange={onSelectionChange} />);

    expect(screen.getByRole('row', { name: 'Czech' })).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Remove Czech'));

    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });

  it('should keep disabled selected tags out of tab order', () => {
    render(<TestPicker isDisabled selectedKeys={['cs']} />);

    expect(screen.getByRole('row', { name: 'Czech' })).toHaveAttribute('tabindex', '-1');
  });

  it('should render picker items inside popover', () => {
    render(<TestPicker />);
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getByRole('checkbox', { name: 'Czech' })).toBeInTheDocument();
  });

  it('should not move focus to selection tags while popover is open', () => {
    const onSelectionChange = jest.fn();
    const StatefulPicker = () => {
      const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

      return (
        <TestPicker
          selectedKeys={selectedKeys}
          onSelectionChange={(keys) => {
            onSelectionChange(keys);
            setSelectedKeys(keys);
          }}
        />
      );
    };

    render(<StatefulPicker />);
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    const czech = screen.getByRole('checkbox', { name: 'Czech' });
    czech.focus();
    fireEvent.click(czech);

    expect(onSelectionChange).toHaveBeenCalledWith(['cs']);
    expect(screen.getByRole('row', { name: 'Czech' })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: 'Czech' })).not.toHaveFocus();
    expect(czech).toHaveFocus();
  });

  it('should close popover and move focus to trigger when Tab leaves last focusable in popover', async () => {
    render(<TestPicker />);
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    const lastCheckbox = screen.getByRole('checkbox', { name: 'Danish' });

    await act(async () => {
      await Promise.resolve();
      lastCheckbox.focus();
      fireEvent.keyDown(lastCheckbox, { key: 'Tab' });
      await Promise.resolve();
    });

    expect(screen.getByRole('button', { name: 'Add' })).toHaveFocus();
  });

  it('should render custom tags when renderTags is provided', () => {
    render(<TestPicker selectedKeys={['cs']} renderTags={() => <div data-testid="custom-tags">Custom tags</div>} />);

    expect(screen.getByTestId('custom-tags')).toBeInTheDocument();
  });

  it('should move roving focus between custom tag rows with arrow keys', () => {
    render(
      <TestPicker
        selectedKeys={['cs', 'dk']}
        renderTags={({ getKeyboardGridRowProps, removeTagAtIndex }) => (
          <>
            <UNSTABLE_PickerTag
              key="cs"
              label="Custom Czech"
              tagKeyboardProps={getKeyboardGridRowProps(0)}
              onRemove={() => removeTagAtIndex(0)}
            />
            <UNSTABLE_PickerTag
              key="dk"
              label="Custom Danish"
              tagKeyboardProps={getKeyboardGridRowProps(1)}
              onRemove={() => removeTagAtIndex(1)}
            />
          </>
        )}
      />,
    );

    const czech = screen.getByRole('row', { name: 'Custom Czech' });
    const danish = screen.getByRole('row', { name: 'Custom Danish' });

    act(() => {
      danish.focus();
    });
    act(() => {
      fireEvent.keyDown(danish, { key: 'ArrowLeft' });
    });

    expect(czech).toHaveFocus();

    act(() => {
      fireEvent.keyDown(czech, { key: 'ArrowRight' });
    });

    expect(danish).toHaveFocus();
  });

  it('should expose imperative ref API', async () => {
    const ref = React.createRef<SpiritUnstablePickerRef>();
    render(<TestPicker ref={ref} selectedKeys={['cs']} />);

    expect(ref.current?.selectedKeys).toEqual(['cs']);

    const trigger = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(trigger);
    await act(async () => {
      ref.current?.close();
      await Promise.resolve();
    });

    expect(trigger).toHaveFocus();
  });

  it('should render custom empty selection label', () => {
    // Placeholders must be `{label}` — `{{label}}` is only partially replaced and leaves stray braces.
    render(<TestPicker emptySelectionLabel="Choose {label}" />);

    expect(screen.getByText('Choose Languages')).toBeInTheDocument();
  });

  it('should render aggregated tag and remove all selected items', () => {
    const onSelectionChange = jest.fn();
    render(
      <TestPicker
        isAggregated
        selectedKeys={['cs', 'dk']}
        onSelectionChange={onSelectionChange}
        removeAllLabel="Remove all"
      />,
    );

    expect(screen.getByRole('row', { name: 'Languages (2)' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Remove all' }));

    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });

  it('should only show the first tag in single mode when multiple keys are passed', () => {
    render(<TestPicker selectionMode="single" selectedKeys={['cs', 'dk']} onSelectionChange={jest.fn()} />);

    expect(screen.getByRole('row', { name: 'Czech' })).toBeInTheDocument();
    expect(screen.queryByRole('row', { name: 'Danish' })).not.toBeInTheDocument();
  });

  it('should support controlled open state via isOpen and onToggle (Dropdown contract)', () => {
    const ControlledOpenPicker = () => {
      const [open, onToggle] = useToggle(false);

      return (
        <UNSTABLE_Picker {...defaultProps} isOpen={open} onToggle={onToggle}>
          <UNSTABLE_PickerGroup label="Language">
            <UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>
            <UNSTABLE_PickerItem value="dk">Danish</UNSTABLE_PickerItem>
          </UNSTABLE_PickerGroup>
        </UNSTABLE_Picker>
      );
    };

    render(<ControlledOpenPicker />);

    expect(screen.getByRole('button', { name: 'Add' })).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(screen.getByRole('button', { name: 'Add' })).toHaveAttribute('aria-expanded', 'false');
  });
});
