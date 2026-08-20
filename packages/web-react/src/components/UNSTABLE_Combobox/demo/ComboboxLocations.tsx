'use client';

import React, { useMemo, useState } from 'react';
import { type SelectionGridRowProps, useDisclosureState } from '../../../hooks';
import type { ComboboxSelectedItem } from '../useComboboxItems';
import { UNSTABLE_Combobox, UNSTABLE_ComboboxSplitTag } from '..';
import {
  COMBOBOX_LOCATION_DISTANCES,
  COMBOBOX_LOCATION_OPTION_KEYS,
  type ComboboxLocationDistance,
  DEFAULT_LOCATION_DISTANCE,
  filterComboboxLocationOptions,
  renderComboboxLocationItems,
} from './ComboboxLocationItems';

interface ComboboxLocationSplitTagRowProps {
  distance: ComboboxLocationDistance;
  item: ComboboxSelectedItem;
  onDistanceChange: (nextDistance: ComboboxLocationDistance) => void;
  onRemove: () => void;
  tagKeyboardProps: SelectionGridRowProps;
}

const ComboboxLocationSplitTagRow = ({
  distance,
  item,
  onDistanceChange,
  onRemove,
  tagKeyboardProps,
}: ComboboxLocationSplitTagRowProps) => {
  const { isExpanded: isSelectOpen, toggle: onSelectToggle } = useDisclosureState({ defaultExpanded: false });

  return (
    <UNSTABLE_ComboboxSplitTag
      label={item.label}
      onRemove={onRemove}
      select={{
        id: `demo-combobox-locations-distance-${item.value}`,
        value: distance,
        options: [...COMBOBOX_LOCATION_DISTANCES],
        isOpen: isSelectOpen,
        onToggle: onSelectToggle,
        onChange: (nextDistance) => onDistanceChange(nextDistance as ComboboxLocationDistance),
        'aria-label': `Select distance, selected ${distance}`,
        listboxLabel: 'Distance',
      }}
      tagKeyboardProps={tagKeyboardProps}
    />
  );
};

const ComboboxLocations = () => {
  const { isExpanded: isOpen, toggle: onToggle } = useDisclosureState({ defaultExpanded: false });
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [distances, setDistances] = useState<Record<string, ComboboxLocationDistance>>({});

  const filteredOptions = useMemo(() => filterComboboxLocationOptions(inputValue), [inputValue]);

  const handleSelectionChange = (keys: string[]) => {
    setSelectedKeys(keys);
    setDistances((current) => {
      const next: Record<string, ComboboxLocationDistance> = {};

      keys.forEach((key) => {
        next[key] = current[key] ?? DEFAULT_LOCATION_DISTANCE;
      });

      return next;
    });
  };

  return (
    <UNSTABLE_Combobox
      hasEmptyState
      id="demo-combobox-locations"
      inputValue={inputValue}
      isOpen={isOpen}
      label="Locations"
      onInputChange={setInputValue}
      onSelectionChange={handleSelectionChange}
      onToggle={onToggle}
      optionKeys={COMBOBOX_LOCATION_OPTION_KEYS}
      selectedKeys={selectedKeys}
      renderTags={({ getKeyboardGridRowProps, removeTagAtIndex, selectedItems }) =>
        selectedItems.map((item, index) => {
          const distance = distances[item.value] ?? DEFAULT_LOCATION_DISTANCE;

          return (
            <ComboboxLocationSplitTagRow
              key={item.value}
              distance={distance}
              item={item}
              onDistanceChange={(nextDistance) => {
                setDistances((current) => ({
                  ...current,
                  [item.value]: nextDistance,
                }));
              }}
              onRemove={() => removeTagAtIndex(index)}
              tagKeyboardProps={getKeyboardGridRowProps(index)}
            />
          );
        })
      }
    >
      {renderComboboxLocationItems(filteredOptions)}
    </UNSTABLE_Combobox>
  );
};

export default ComboboxLocations;
