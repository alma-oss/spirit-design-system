import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React, { type ComponentProps } from 'react';
import { ariaAttributesTest, classNamePrefixProviderTest, restPropsTest, stylePropsTest } from '@local/tests';
import UNSTABLE_PickerGroup from '../UNSTABLE_PickerGroup';
import UNSTABLE_PickerItem from '../UNSTABLE_PickerItem';
import UNSTABLE_UncontrolledPicker from '../UNSTABLE_UncontrolledPicker';
import type { SpiritUnstablePickerRef } from '..';

jest.mock('../../../hooks/useIcon');

const defaultProps = { id: 'test-picker', label: 'Languages' };

const TestUncontrolledPicker = (props: Partial<ComponentProps<typeof UNSTABLE_UncontrolledPicker>> = {}) => (
  <UNSTABLE_UncontrolledPicker {...defaultProps} {...props}>
    <UNSTABLE_PickerGroup label="Languages">
      <UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>
      <UNSTABLE_PickerItem value="dk">Danish</UNSTABLE_PickerItem>
    </UNSTABLE_PickerGroup>
  </UNSTABLE_UncontrolledPicker>
);

describe('UNSTABLE_UncontrolledPicker', () => {
  classNamePrefixProviderTest(TestUncontrolledPicker, 'UNSTABLE_Picker');

  stylePropsTest(TestUncontrolledPicker);

  restPropsTest(TestUncontrolledPicker, 'div');

  ariaAttributesTest(TestUncontrolledPicker);

  it('should manage selection internally', () => {
    render(<TestUncontrolledPicker />);

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Czech' }));

    expect(screen.getByRole('row', { name: 'Czech' })).toBeInTheDocument();
  });

  it('should support simple API with PickerGroup and PickerItem', () => {
    render(<TestUncontrolledPicker id="test-picker-simple" />);

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Czech' }));

    expect(screen.getByRole('row', { name: 'Czech' })).toBeInTheDocument();
  });

  it('should expose selectedKeys and close via ref', () => {
    const ref = React.createRef<SpiritUnstablePickerRef>();
    render(<TestUncontrolledPicker ref={ref} defaultSelectedKeys={['cs']} />);

    expect(ref.current?.selectedKeys).toEqual(['cs']);

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    act(() => {
      ref.current?.close();
    });

    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('should call onSelectionChange when internal selection changes', () => {
    const onSelectionChange = jest.fn();
    render(<TestUncontrolledPicker onSelectionChange={onSelectionChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Czech' }));

    expect(onSelectionChange).toHaveBeenCalledWith(['cs']);
  });

  it('should respect defaultIsOpen for internal popover state', () => {
    render(<TestUncontrolledPicker defaultIsOpen />);

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Czech' })).toBeInTheDocument();
  });
});
