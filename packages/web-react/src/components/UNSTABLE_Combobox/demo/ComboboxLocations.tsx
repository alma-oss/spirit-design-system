'use client';

import React, { useMemo, useState } from 'react';
import { useDisclosureState } from '../../../hooks';
import { UNSTABLE_Combobox, UNSTABLE_ComboboxSplitTag } from '..';
import {
  COMBOBOX_LOCATION_DISTANCES,
  COMBOBOX_LOCATION_OPTION_KEYS,
  type ComboboxLocationDistance,
  DEFAULT_LOCATION_DISTANCE,
  filterComboboxLocationOptions,
  renderComboboxLocationItems,
} from './ComboboxLocationItems';

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
          const cityLabel = String(item.label);
          const distance = distances[item.value] ?? DEFAULT_LOCATION_DISTANCE;

          return (
            <UNSTABLE_ComboboxSplitTag
              key={item.value}
              label={cityLabel}
              onRemove={() => removeTagAtIndex(index)}
              select={{
                id: `demo-combobox-locations-distance-${item.value}`,
                value: distance,
                options: [...COMBOBOX_LOCATION_DISTANCES],
                onChange: (nextDistance) => {
                  setDistances((current) => ({
                    ...current,
                    [item.value]: nextDistance as ComboboxLocationDistance,
                  }));
                },
                'aria-label': `Select distance, selected ${distance}`,
                listboxLabel: 'Distance',
              }}
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
