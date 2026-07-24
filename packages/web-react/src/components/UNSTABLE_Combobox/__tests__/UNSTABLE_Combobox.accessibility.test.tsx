import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Label } from '../..';
import { UNSTABLE_Combobox, UNSTABLE_ComboboxOption } from '..';

jest.mock('../../../hooks/useIcon');

describe('UNSTABLE_Combobox accessibility', () => {
  it('should have accessible name and combobox pattern attributes', () => {
    render(
      <UNSTABLE_Combobox
        id="a11y"
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

    const input = screen.getByRole('combobox', { name: 'Languages' });

    expect(input).toHaveAttribute('aria-haspopup', 'grid');
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById('combobox-a11y-listbox')).toHaveAttribute('aria-multiselectable', 'true');
  });
});
