'use client';

import React, { useMemo, useState } from 'react';
import { useDisclosureState } from '../../../hooks';
import { Box } from '../../Box';
import { Label } from '../../Label';
import { UNSTABLE_Combobox, UNSTABLE_ComboboxOption, UNSTABLE_ComboboxSplitTag, UNSTABLE_ComboboxTag } from '..';
import { COMBOBOX_LOCATION_DISTANCES } from './ComboboxLocationItems';

const LONG_TEXT_OPTIONS = [
  {
    id: 'long-multi-word',
    label: 'International business administration and intercultural communication studies',
  },
  {
    id: 'longtextwithoutspaces',
    label: 'longtextwithoutspaceslongtextwithoutspaceslongtextwithoutspaces',
  },
  { id: 'split-multi-word', label: 'Horní Rokytnice, Rokytnice nad Jizerou', isSplitTag: true },
  {
    id: 'split-longtextwithoutspaces',
    label: 'longtextwithoutspaceslongtextwithoutspaceslongtextwithoutspaces',
    isSplitTag: true,
  },
] as const;

const LONG_TEXT_OPTION_KEYS = LONG_TEXT_OPTIONS.map((option) => option.id);
const SPLIT_TAG_KEYS: readonly string[] = LONG_TEXT_OPTIONS.filter(
  (option): option is Extract<(typeof LONG_TEXT_OPTIONS)[number], { isSplitTag: true }> => 'isSplitTag' in option,
).map((option) => option.id);

const ComboboxLongText = () => {
  const { isExpanded: isOpen, toggle: onToggle } = useDisclosureState({ defaultExpanded: false });
  const [selectedKeys, setSelectedKeys] = useState<string[]>([...LONG_TEXT_OPTION_KEYS]);
  const [openSelectKey, setOpenSelectKey] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const filteredOptions = useMemo(() => {
    const normalised = inputValue.trim().toLowerCase();

    if (!normalised) {
      return [...LONG_TEXT_OPTIONS];
    }

    return LONG_TEXT_OPTIONS.filter((option) => option.label.toLowerCase().includes(normalised));
  }, [inputValue]);

  return (
    <Box UNSAFE_style={{ maxWidth: '18rem' }}>
      <UNSTABLE_Combobox
        dropdownProps={{ fullWidthMode: 'mobile-only' }}
        hasEmptyState
        id="demo-combobox-long-text"
        inputValue={inputValue}
        isOpen={isOpen}
        label="Skills"
        onInputChange={setInputValue}
        onSelectionChange={setSelectedKeys}
        onToggle={onToggle}
        optionKeys={LONG_TEXT_OPTION_KEYS}
        selectedKeys={selectedKeys}
        renderTags={({ getKeyboardGridRowProps, removeTagAtIndex, selectedItems }) =>
          selectedItems.map((item, index) =>
            SPLIT_TAG_KEYS.includes(item.value) ? (
              <UNSTABLE_ComboboxSplitTag
                key={item.value}
                label={item.label}
                onRemove={() => removeTagAtIndex(index)}
                select={{
                  id: `demo-combobox-long-text-distance-${item.value}`,
                  value: COMBOBOX_LOCATION_DISTANCES[0],
                  options: [...COMBOBOX_LOCATION_DISTANCES],
                  isOpen: openSelectKey === item.value,
                  onToggle: () => setOpenSelectKey((current) => (current === item.value ? null : item.value)),
                  // The distance is static in this visual demo; see the Locations demo for a changing distance.
                  onChange: () => {},
                  'aria-label': `Select distance, selected ${COMBOBOX_LOCATION_DISTANCES[0]}`,
                  listboxLabel: 'Distance',
                }}
                tagKeyboardProps={getKeyboardGridRowProps(index)}
              />
            ) : (
              <UNSTABLE_ComboboxTag
                key={item.value}
                label={item.label}
                onRemove={() => removeTagAtIndex(index)}
                tagKeyboardProps={getKeyboardGridRowProps(index)}
              />
            ),
          )
        }
      >
        {filteredOptions.map((option) => (
          <UNSTABLE_ComboboxOption key={option.id} value={option.id}>
            <Label>
              <span className="text-word-break-long-words">{option.label}</span>
            </Label>
          </UNSTABLE_ComboboxOption>
        ))}
      </UNSTABLE_Combobox>
    </Box>
  );
};

export default ComboboxLongText;
