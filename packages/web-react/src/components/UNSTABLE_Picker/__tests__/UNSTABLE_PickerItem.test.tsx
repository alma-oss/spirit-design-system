import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React, { type ComponentProps } from 'react';
import { ariaAttributesTest, restPropsTest, stylePropsTest, validHtmlAttributesTest } from '@local/tests';
import { MULTIPLE_SELECTION_MODE } from '../../../constants';
import { PickerPopoverContextProvider } from '../PickerPopoverContext';
import UNSTABLE_PickerItem from '../UNSTABLE_PickerItem';

jest.mock('../../../hooks/useIcon');

const defaultPopoverContextValue = {
  id: 'test-picker',
  isDisabled: false,
  onSelectionChange: jest.fn(),
  selectedKeys: [] as string[],
  selectionMode: MULTIPLE_SELECTION_MODE,
};

const PickerItemTest = (props: Partial<ComponentProps<typeof UNSTABLE_PickerItem>>) => {
  const { children, value = 'cs', ...rest } = props;

  return (
    <PickerPopoverContextProvider value={defaultPopoverContextValue}>
      <UNSTABLE_PickerItem value={value} {...rest}>
        {children ?? 'Czech'}
      </UNSTABLE_PickerItem>
    </PickerPopoverContextProvider>
  );
};

describe('UNSTABLE_PickerItem', () => {
  stylePropsTest(PickerItemTest);

  restPropsTest(PickerItemTest, 'input');

  validHtmlAttributesTest(PickerItemTest);

  ariaAttributesTest(PickerItemTest);

  it('should render checkbox with label in default popover context', () => {
    render(<UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>);

    expect(screen.getByRole('checkbox', { name: 'Czech' })).toBeInTheDocument();
  });

  it('should render radio in single mode and call onSelectionChange with selected value', () => {
    const onSelectionChange = jest.fn();
    render(
      <PickerPopoverContextProvider
        value={{ ...defaultPopoverContextValue, onSelectionChange, selectionMode: 'single' }}
      >
        <UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>
      </PickerPopoverContextProvider>,
    );

    fireEvent.click(screen.getByRole('radio', { name: 'Czech' }));

    expect(onSelectionChange).toHaveBeenCalledWith(['cs']);
  });

  it('should render checked checkbox in multiple mode and toggle selected item', () => {
    const onSelectionChange = jest.fn();
    render(
      <PickerPopoverContextProvider
        value={{
          ...defaultPopoverContextValue,
          onSelectionChange,
          selectedKeys: ['cs'],
          selectionMode: 'multiple',
        }}
      >
        <UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>
      </PickerPopoverContextProvider>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Czech' });

    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });

  it('should pass disabled state from popover context', () => {
    render(
      <PickerPopoverContextProvider
        value={{
          ...defaultPopoverContextValue,
          isDisabled: true,
        }}
      >
        <UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>
      </PickerPopoverContextProvider>,
    );

    expect(screen.getByRole('checkbox', { name: 'Czech' })).toBeDisabled();
  });

  it('should set radio id and name from popover context id', () => {
    const onSelectionChange = jest.fn();
    render(
      <PickerPopoverContextProvider
        value={{
          ...defaultPopoverContextValue,
          id: 'picker-test',
          onSelectionChange,
          selectionMode: 'single',
        }}
      >
        <UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>
      </PickerPopoverContextProvider>,
    );
    const radio = screen.getByRole('radio', { name: 'Czech' });

    expect(radio).toHaveAttribute('id', 'picker-test-cs');
    expect(radio).toHaveAttribute('name', 'picker-test');
  });

  it('should set checkbox id from value and popover context id', () => {
    render(
      <PickerPopoverContextProvider
        value={{
          ...defaultPopoverContextValue,
          id: 'picker-test',
        }}
      >
        <UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>
        <UNSTABLE_PickerItem value="dk">Danish</UNSTABLE_PickerItem>
      </PickerPopoverContextProvider>,
    );

    expect(screen.getByRole('checkbox', { name: 'Czech' })).toHaveAttribute('id', 'picker-test-cs');
    expect(screen.getByRole('checkbox', { name: 'Danish' })).toHaveAttribute('id', 'picker-test-dk');
  });
});
