import React, { useCallback, useRef, useState } from 'react';
import { useToggle } from '../../../hooks';
import { ControlButton } from '../../ControlButton';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../Dropdown';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import { Stack } from '../../Stack';
import { Tag } from '../../Tag';
import { VisuallyHidden } from '../../VisuallyHidden';
import { UNSTABLE_SPLIT_TAG_CONTROL_BUTTON_SIZE_MAP } from '../constants';
import { type SpiritUnstableSplitTagProps } from '../types';
import UNSTABLE_SplitTag from '../UNSTABLE_SplitTag';
import { radiusOptions } from './constants';
import { useSplitTagListboxKeyboard } from './useSplitTagListboxKeyboard';

export interface SplitTagLocationRadiusProps extends Pick<
  SpiritUnstableSplitTagProps,
  'color' | 'isDisabled' | 'isSubtle' | 'size'
> {
  id?: string;
}

const SplitTagLocationRadius = ({
  id = 'split-tag-location-radius',
  size = 'medium',
  ...splitTagProps
}: SplitTagLocationRadiusProps) => {
  const [selectedRadius, setSelectedRadius] = useState(radiusOptions[0]);
  const [isDropdownOpen, toggleDropdown] = useToggle(false);
  const listboxRef = useRef<HTMLDivElement>(null);
  const getOptionId = useCallback(
    (radiusOption: string) => `${id}-option-${radiusOptions.indexOf(radiusOption)}`,
    [id],
  );
  const handleSelect = useCallback(
    (radiusOption: string) => {
      setSelectedRadius(radiusOption);

      if (isDropdownOpen) {
        toggleDropdown();
      }
    },
    [isDropdownOpen, toggleDropdown],
  );
  const { getOptionProps } = useSplitTagListboxKeyboard({
    getOptionId,
    isDisabled: splitTagProps.isDisabled,
    listboxRef,
    onSelect: handleSelect,
    optionValues: radiusOptions,
    selectedValue: selectedRadius,
  });

  return (
    <UNSTABLE_SplitTag
      {...splitTagProps}
      aria-label={`Prague distance filter, radius ${selectedRadius}`}
      id={id}
      role="group"
      size={size}
    >
      <Tag>Prague</Tag>
      <Dropdown id={`${id}-dropdown`} isOpen={isDropdownOpen} onToggle={toggleDropdown} placement="bottom-start">
        <DropdownTrigger elementType={Tag} aria-label={`Select distance, selected ${selectedRadius}`}>
          {selectedRadius}
          <ControlButton
            elementType="span"
            aria-hidden="true"
            isStretched
            isSymmetrical
            size={UNSTABLE_SPLIT_TAG_CONTROL_BUTTON_SIZE_MAP[size]}
          >
            <Icon name="chevron-down" />
          </ControlButton>
        </DropdownTrigger>
        <DropdownPopover aria-label="Distance options">
          <Stack ref={listboxRef} role="listbox" aria-label="Distance" spacing="space-300">
            {radiusOptions.map((radiusOption) => {
              const isSelected = selectedRadius === radiusOption;

              return (
                <Item
                  {...getOptionProps(radiusOption)}
                  key={radiusOption}
                  isSelected={isSelected}
                  endSlot={isSelected ? <Icon name="check-plain" boxSize={20} /> : undefined}
                >
                  {radiusOption}
                </Item>
              );
            })}
          </Stack>
        </DropdownPopover>
      </Dropdown>
      <Tag elementType="button">
        <ControlButton
          elementType="span"
          aria-hidden="true"
          isStretched
          isSymmetrical
          size={UNSTABLE_SPLIT_TAG_CONTROL_BUTTON_SIZE_MAP[size]}
        >
          <Icon name="close" />
        </ControlButton>
        <VisuallyHidden>Remove Prague distance filter</VisuallyHidden>
      </Tag>
    </UNSTABLE_SplitTag>
  );
};

export default SplitTagLocationRadius;
