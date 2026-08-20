import { act, fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { type SelectionGridRowProps, useDisclosureState } from '../../../hooks';
import { UNSTABLE_Combobox, UNSTABLE_ComboboxOption, UNSTABLE_ComboboxSplitTag } from '..';

const DISTANCES = ['+5 km', '+10 km'];

interface TestSplitTagRowProps {
  distance: string;
  item: { value: string; label: string };
  onDistanceChange: (next: string) => void;
  onRemove: () => void;
  tagKeyboardProps?: SelectionGridRowProps;
}

const TestSplitTagRow = ({ distance, item, onDistanceChange, onRemove, tagKeyboardProps }: TestSplitTagRowProps) => {
  const { isExpanded: isSelectOpen, toggle: onSelectToggle } = useDisclosureState({ defaultExpanded: false });

  return (
    <UNSTABLE_ComboboxSplitTag
      label={item.label}
      onRemove={onRemove}
      tagKeyboardProps={tagKeyboardProps}
      select={{
        value: distance,
        options: DISTANCES,
        isOpen: isSelectOpen,
        onToggle: onSelectToggle,
        onChange: onDistanceChange,
        'aria-label': `Select distance, selected ${distance}`,
        listboxLabel: 'Distance',
      }}
    />
  );
};

interface TestComboboxWithSplitTagsProps {
  isDisabled?: boolean;
  onSelectionChange?: (keys: string[]) => void;
  selectedKeys?: string[];
  withKeyboardGrid?: boolean;
}

const TestComboboxWithSplitTags = ({
  isDisabled = false,
  onSelectionChange,
  selectedKeys: selectedKeysProp = ['prague'],
  withKeyboardGrid = true,
}: TestComboboxWithSplitTagsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(selectedKeysProp);
  const [distances, setDistances] = useState<Record<string, string>>({
    prague: '+5 km',
    brno: '+10 km',
  });

  const handleSelectionChange = (keys: string[]) => {
    setSelectedKeys(keys);
    onSelectionChange?.(keys);
  };

  return (
    <UNSTABLE_Combobox
      id="test-combobox-split-tag"
      label="Locations"
      isDisabled={isDisabled}
      isOpen={isOpen}
      onToggle={() => setIsOpen((current) => !current)}
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
      inputValue=""
      onInputChange={() => {}}
      renderTags={({ getKeyboardGridRowProps, removeTagAtIndex, selectedItems }) =>
        selectedItems.map((item, index) => (
          <TestSplitTagRow
            key={item.value}
            distance={distances[item.value] ?? '+5 km'}
            item={{ value: item.value, label: String(item.label) }}
            onDistanceChange={(next) => setDistances((current) => ({ ...current, [item.value]: next }))}
            onRemove={() => removeTagAtIndex(index)}
            tagKeyboardProps={withKeyboardGrid ? getKeyboardGridRowProps(index) : undefined}
          />
        ))
      }
    >
      <UNSTABLE_ComboboxOption value="prague" label="Praha">
        Praha
      </UNSTABLE_ComboboxOption>
      <UNSTABLE_ComboboxOption value="brno" label="Brno">
        Brno
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

    const selectedOption = screen.getByRole('option', { name: '+5 km' });
    const unselectedOption = screen.getByRole('option', { name: '+10 km' });

    expect(selectedOption).toBeInTheDocument();
    expect(unselectedOption).toBeInTheDocument();
    expect(selectedOption.querySelector('.Icon--selected')).toBeInTheDocument();
    expect(unselectedOption.querySelector('.Icon--selected')).not.toBeInTheDocument();
  });

  it('should map medium Combobox size to Tag--small and ControlButton--xsmall on split segments', () => {
    const { container } = render(<TestComboboxWithSplitTags />);

    const row = screen.getByRole('row', { name: 'Praha, +5 km' });
    const tags = row.querySelectorAll('.Tag');
    const controlButtons = row.querySelectorAll('.ControlButton');

    expect(tags.length).toBeGreaterThanOrEqual(2);

    tags.forEach((tag) => {
      expect(tag).toHaveClass('Tag--small');
    });

    expect(controlButtons.length).toBeGreaterThanOrEqual(2);

    controlButtons.forEach((button) => {
      expect(button).toHaveClass('ControlButton--xsmall');
    });

    expect(container.querySelector('.ControlButton--small')).not.toBeInTheDocument();
  });

  it('should keep the split tag row out of tab order when Combobox is disabled', () => {
    render(<TestComboboxWithSplitTags isDisabled />);

    const row = screen.getByRole('row', { name: 'Praha, +5 km' });
    const distanceTrigger = screen.getByRole('button', { name: 'Select distance, selected +5 km' });
    const removeButton = screen.getByRole('button', { name: 'Remove Praha' });

    expect(row).toHaveAttribute('tabindex', '-1');
    expect(removeButton).toBeDisabled();
    expect(distanceTrigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.focus(distanceTrigger);
    fireEvent.keyDown(distanceTrigger, { key: 'ArrowDown' });

    expect(distanceTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should keep nested select and remove tabbable when tagKeyboardProps is omitted', () => {
    render(<TestComboboxWithSplitTags withKeyboardGrid={false} />);

    const distanceTrigger = screen.getByRole('button', { name: 'Select distance, selected +5 km' });
    const removeButton = screen.getByRole('button', { name: 'Remove Praha' });

    expect(distanceTrigger).toHaveAttribute('tabindex', '0');
    expect(removeButton).toHaveAttribute('tabindex', '0');
  });

  it('should move roving focus between split tag rows with arrow keys', () => {
    render(<TestComboboxWithSplitTags selectedKeys={['prague', 'brno']} />);

    const prague = screen.getByRole('row', { name: 'Praha, +5 km' });
    const brno = screen.getByRole('row', { name: 'Brno, +10 km' });

    act(() => {
      brno.focus();
    });
    act(() => {
      fireEvent.keyDown(brno, { key: 'ArrowLeft' });
    });

    expect(prague).toHaveFocus();

    act(() => {
      fireEvent.keyDown(prague, { key: 'ArrowRight' });
    });

    expect(brno).toHaveFocus();
  });

  it('should move focus between select and remove segments with ArrowRight and ArrowLeft', () => {
    render(<TestComboboxWithSplitTags />);

    const row = screen.getByRole('row', { name: 'Praha, +5 km' });
    const distanceTrigger = screen.getByRole('button', { name: 'Select distance, selected +5 km' });
    const removeButton = screen.getByRole('button', { name: 'Remove Praha' });

    act(() => {
      row.focus();
    });
    act(() => {
      distanceTrigger.focus();
    });
    act(() => {
      fireEvent.keyDown(distanceTrigger, { key: 'ArrowRight' });
    });

    expect(removeButton).toHaveFocus();

    act(() => {
      fireEvent.keyDown(removeButton, { key: 'ArrowLeft' });
    });

    expect(distanceTrigger).toHaveFocus();
  });

  it('should remove a split tag with Delete', () => {
    const onSelectionChange = jest.fn();

    render(<TestComboboxWithSplitTags selectedKeys={['prague', 'brno']} onSelectionChange={onSelectionChange} />);

    const prague = screen.getByRole('row', { name: 'Praha, +5 km' });
    const input = screen.getByRole('combobox');

    act(() => {
      prague.focus();
    });
    act(() => {
      fireEvent.keyDown(prague, { key: 'Delete' });
    });

    expect(onSelectionChange).toHaveBeenCalledWith(['brno']);
    expect(input).toHaveFocus();
    expect(screen.queryByRole('row', { name: 'Praha, +5 km' })).not.toBeInTheDocument();
  });

  it('should remove a split tag with Backspace', () => {
    const onSelectionChange = jest.fn();

    render(<TestComboboxWithSplitTags selectedKeys={['prague', 'brno']} onSelectionChange={onSelectionChange} />);

    const brno = screen.getByRole('row', { name: 'Brno, +10 km' });
    const input = screen.getByRole('combobox');

    act(() => {
      brno.focus();
    });
    act(() => {
      fireEvent.keyDown(brno, { key: 'Backspace' });
    });

    expect(onSelectionChange).toHaveBeenCalledWith(['prague']);
    expect(input).toHaveFocus();
    expect(screen.queryByRole('row', { name: 'Brno, +10 km' })).not.toBeInTheDocument();
  });
});
