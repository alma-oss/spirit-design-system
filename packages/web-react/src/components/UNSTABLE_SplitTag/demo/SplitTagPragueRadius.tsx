import React, { useState } from 'react';
import { useToggle } from '../../../hooks';
import { ControlButton } from '../../ControlButton';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../Dropdown';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import { Label } from '../../Label';
import { Stack } from '../../Stack';
import { Tag } from '../../Tag';
import { UNSTABLE_SPLIT_TAG_CONTROL_BUTTON_SIZE_MAP } from '../constants';
import { type SpiritUnstableSplitTagProps } from '../types';
import UNSTABLE_SplitTag from '../UNSTABLE_SplitTag';
import { radiusOptions } from './constants';

export interface SplitTagPragueRadiusProps extends Pick<
  SpiritUnstableSplitTagProps,
  'color' | 'isDisabled' | 'isSubtle' | 'size'
> {
  id?: string;
}

const SplitTagPragueRadius = ({
  id = 'split-tag-prague-radius',
  size = 'medium',
  ...splitTagProps
}: SplitTagPragueRadiusProps) => {
  const [selectedRadius, setSelectedRadius] = useState(radiusOptions[0]);
  const [isDropdownOpen, toggleDropdown] = useToggle(false);

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
        <DropdownPopover>
          <Stack spacing="space-300">
            {radiusOptions.map((radiusOption) => (
              <Item
                key={radiusOption}
                elementType="button"
                isSelected={selectedRadius === radiusOption}
                onClick={() => {
                  setSelectedRadius(radiusOption);
                  if (isDropdownOpen) {
                    toggleDropdown();
                  }
                }}
                type="button"
              >
                <Label>{radiusOption}</Label>
              </Item>
            ))}
          </Stack>
        </DropdownPopover>
      </Dropdown>
      <Tag elementType="button" aria-label="Remove Prague distance filter">
        <ControlButton
          elementType="span"
          aria-hidden="true"
          isStretched
          isSymmetrical
          size={UNSTABLE_SPLIT_TAG_CONTROL_BUTTON_SIZE_MAP[size]}
        >
          <Icon name="close" />
        </ControlButton>
      </Tag>
    </UNSTABLE_SplitTag>
  );
};

export default SplitTagPragueRadius;
