import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Label } from '../..';
import { UNSTABLE_ComboboxOption, UNSTABLE_UncontrolledCombobox } from '..';

jest.mock('../../../hooks/useIcon');

describe('UNSTABLE_UncontrolledCombobox', () => {
  it('should manage selection internally', () => {
    const onSelectionChange = jest.fn();

    render(
      <UNSTABLE_UncontrolledCombobox
        id="uncontrolled"
        label="Languages"
        optionKeys={['cs', 'en']}
        onSelectionChange={onSelectionChange}
      >
        <UNSTABLE_ComboboxOption value="cs">
          <Label>Czech</Label>
        </UNSTABLE_ComboboxOption>
        <UNSTABLE_ComboboxOption value="en">
          <Label>English</Label>
        </UNSTABLE_ComboboxOption>
      </UNSTABLE_UncontrolledCombobox>,
    );

    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.mouseDown(screen.getByText('Czech'));

    expect(onSelectionChange).toHaveBeenCalledWith(['cs']);
    expect(screen.getAllByRole('row', { name: 'Czech' }).length).toBeGreaterThanOrEqual(1);
  });

  it('should open initially when defaultIsOpen is true', () => {
    render(
      <UNSTABLE_UncontrolledCombobox id="uncontrolled-open" label="Languages" defaultIsOpen optionKeys={['cs']}>
        <UNSTABLE_ComboboxOption value="cs">
          <Label>Czech</Label>
        </UNSTABLE_ComboboxOption>
      </UNSTABLE_UncontrolledCombobox>,
    );

    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('row', { name: 'Czech' })).toBeInTheDocument();
  });
});
