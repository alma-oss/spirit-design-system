import { fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { UNSTABLE_Combobox, UNSTABLE_ComboboxOption, UNSTABLE_ComboboxSplitTag } from '..';

const DISTANCES = ['+5 km', '+10 km'];

const TestComboboxWithSplitTags = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['prague']);
  const [distances, setDistances] = useState<Record<string, string>>({ prague: '+5 km' });

  return (
    <UNSTABLE_Combobox
      id="test-combobox-split-tag"
      label="Locations"
      isOpen={isOpen}
      onToggle={() => setIsOpen((current) => !current)}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      inputValue=""
      onInputChange={() => {}}
      renderTags={({ getKeyboardGridRowProps, removeTagAtIndex, selectedItems }) =>
        selectedItems.map((item, index) => (
          <UNSTABLE_ComboboxSplitTag
            key={item.value}
            label={item.label}
            onRemove={() => removeTagAtIndex(index)}
            tagKeyboardProps={getKeyboardGridRowProps(index)}
            select={{
              value: distances[item.value] ?? '+5 km',
              options: DISTANCES,
              onChange: (next) => setDistances((current) => ({ ...current, [item.value]: next })),
              'aria-label': `Select distance, selected ${distances[item.value] ?? '+5 km'}`,
              listboxLabel: 'Distance',
            }}
          />
        ))
      }
    >
      <UNSTABLE_ComboboxOption value="prague" label="Praha">
        Praha
      </UNSTABLE_ComboboxOption>
    </UNSTABLE_Combobox>
  );
};

describe('UNSTABLE_ComboboxSplitTag', () => {
  it('should render label and select segments for a selected item', () => {
    render(<TestComboboxWithSplitTags />);

    expect(screen.getByRole('row', { name: 'Praha, +5 km' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select distance, selected +5 km' })).toBeInTheDocument();
  });

  it('should open the nested select on ArrowDown from the distance trigger', () => {
    render(<TestComboboxWithSplitTags />);

    const distanceTrigger = screen.getByRole('button', { name: 'Select distance, selected +5 km' });

    expect(distanceTrigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.focus(distanceTrigger);
    fireEvent.keyDown(distanceTrigger, { key: 'ArrowDown' });

    expect(distanceTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox', { name: 'Distance' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '+5 km' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '+10 km' })).toBeInTheDocument();
  });
});
