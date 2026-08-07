import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Label } from '../..';
import { UNSTABLE_Combobox, UNSTABLE_ComboboxOption } from '..';

jest.mock('../../../hooks/useIcon');

describe('UNSTABLE_Combobox accessibility', () => {
  it('should have accessible name and closed combobox pattern attributes by default', () => {
    render(
      <UNSTABLE_Combobox
        id="a11y"
        label="Languages"
        isOpen={false}
        onToggle={jest.fn()}
        selectedKeys={[]}
        onSelectionChange={jest.fn()}
        inputValue=""
        onInputChange={jest.fn()}
        optionKeys={['cs']}
      >
        <UNSTABLE_ComboboxOption value="cs">
          <Label>Czech</Label>
        </UNSTABLE_ComboboxOption>
      </UNSTABLE_Combobox>,
    );

    const input = screen.getByRole('combobox', { name: 'Languages' });

    expect(input).toHaveAttribute('aria-haspopup', 'listbox');
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('should set multiselectable attribute on open listbox', () => {
    render(
      <UNSTABLE_Combobox
        id="a11y-open"
        label="Languages"
        isOpen
        onToggle={jest.fn()}
        selectedKeys={[]}
        onSelectionChange={jest.fn()}
        inputValue=""
        onInputChange={jest.fn()}
        optionKeys={['cs']}
      >
        <UNSTABLE_ComboboxOption value="cs">
          <Label>Czech</Label>
        </UNSTABLE_ComboboxOption>
      </UNSTABLE_Combobox>,
    );

    expect(screen.getByRole('listbox', { name: 'Languages' })).toHaveAttribute('aria-multiselectable', 'true');
  });
});
