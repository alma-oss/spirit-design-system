import React, { useState } from 'react';
import { ControlButton } from '../../ControlButton';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../Dropdown';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import { Label } from '../../Label';
import { Tag } from '../../Tag';
import { UNSTABLE_SPLIT_TAG_CONTROL_BUTTON_SIZE_MAP, UNSTABLE_SPLIT_TAG_DROPDOWN_ICON_SIZE_MAP } from '../constants';
import { type SpiritUnstableSplitTagProps } from '../types';
import UNSTABLE_SplitTag from '../UNSTABLE_SplitTag';
import { radiusOptions } from './constants';

export type SplitTagRemoveSegmentVariant = 'control-button' | 'tag-button';

export interface SplitTagPragueRadiusProps extends Pick<
  SpiritUnstableSplitTagProps,
  'color' | 'isDisabled' | 'isSubtle' | 'size'
> {
  id?: string;
  removeSegmentVariant?: SplitTagRemoveSegmentVariant;
}

const SplitTagPragueRadius = ({
  id = 'split-tag-prague-radius',
  removeSegmentVariant = 'tag-button',
  size = 'medium',
  ...splitTagProps
}: SplitTagPragueRadiusProps) => {
  const [selectedRadius, setSelectedRadius] = useState(radiusOptions[0]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <UNSTABLE_SplitTag
      {...splitTagProps}
      aria-label={`Prague distance filter, radius ${selectedRadius}`}
      id={id}
      role="group"
      size={size}
    >
      <Tag>Prague</Tag>
      <Dropdown
        id={`${id}-dropdown`}
        isOpen={isDropdownOpen}
        onToggle={() => setDropdownOpen((currentState) => !currentState)}
        placement="bottom-start"
      >
        <DropdownTrigger elementType={Tag}>
          {selectedRadius}
          <Icon name="chevron-down" boxSize={UNSTABLE_SPLIT_TAG_DROPDOWN_ICON_SIZE_MAP[size]} />
        </DropdownTrigger>
        <DropdownPopover>
          {radiusOptions.map((radiusOption) => (
            <Item
              key={radiusOption}
              elementType="button"
              isSelected={selectedRadius === radiusOption}
              onClick={() => {
                setSelectedRadius(radiusOption);
                setDropdownOpen(false);
              }}
              type="button"
            >
              <Label>{radiusOption}</Label>
            </Item>
          ))}
        </DropdownPopover>
      </Dropdown>
      {removeSegmentVariant === 'tag-button' ? (
        <Tag elementType="button" aria-label="Remove Prague distance filter">
          <ControlButton
            elementType="span"
            aria-hidden="true"
            isSymmetrical
            size={UNSTABLE_SPLIT_TAG_CONTROL_BUTTON_SIZE_MAP[size]}
          >
            <Icon name="close" />
          </ControlButton>
        </Tag>
      ) : (
        <Tag>
          <ControlButton
            aria-label="Remove Prague distance filter"
            isSymmetrical
            size={UNSTABLE_SPLIT_TAG_CONTROL_BUTTON_SIZE_MAP[size]}
          >
            <Icon name="close" />
          </ControlButton>
        </Tag>
      )}
    </UNSTABLE_SplitTag>
  );
};

export default SplitTagPragueRadius;
