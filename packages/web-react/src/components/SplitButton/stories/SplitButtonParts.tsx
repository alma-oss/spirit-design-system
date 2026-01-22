import React, { useState } from 'react';
import { Button } from '../../Button';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../Dropdown';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import { Tooltip, TooltipPopover, TooltipTrigger } from '../../Tooltip';
import { VisuallyHidden } from '../../VisuallyHidden';
import { dropdownContent } from '../demo/constants';

export const DropdownContent = () => (
  <>
    {dropdownContent.map(({ icon, text }) => (
      <Item key={icon} label={text} elementType="a" iconName={icon} href={`#${icon}`} />
    ))}
  </>
);

export const SplitButtonWithButtons = () => (
  <>
    <Button>Button</Button>
    <Button>Button</Button>
  </>
);

export const SplitButtonWithIcons = () => (
  <>
    <Button>
      <VisuallyHidden>check-plain</VisuallyHidden>
      <Icon name="check-plain" />
    </Button>
    <Button>
      <VisuallyHidden>close</VisuallyHidden>
      <Icon name="close" />
    </Button>
    <Button>
      <VisuallyHidden>reload</VisuallyHidden>
      <Icon name="reload" />
    </Button>
  </>
);

export const SplitButtonWithDropdowns = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <>
      <Button>Button</Button>
      <Dropdown id="split-button-dropdown" isOpen={dropdownOpen} onToggle={toggleDropdown} placement="bottom-end">
        <DropdownTrigger elementType={Button}>
          More
          <Icon name="chevron-down" />
        </DropdownTrigger>
        <DropdownPopover>
          <DropdownContent />
        </DropdownPopover>
      </Dropdown>
    </>
  );
};

export const SplitButtonWithTooltip = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <>
      <Button>Button</Button>
      <Tooltip
        id="split-button-tooltip"
        isOpen={isTooltipOpen}
        onToggle={setIsTooltipOpen}
        trigger={['hover']}
        placement="top"
        flipFallbackPlacements={['bottom']}
      >
        <TooltipTrigger elementType={Button} aria-labelledby="split-button-tooltip">
          <VisuallyHidden>download</VisuallyHidden>
          <Icon name="download" />
        </TooltipTrigger>
        <TooltipPopover>Download</TooltipPopover>
      </Tooltip>
    </>
  );
};

export const SplitButtonWithEverything = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <>
      <Button>
        <Icon name="check-plain" /> Button
      </Button>
      <Button>Button</Button>
      <Tooltip
        id="split-button-tooltip"
        isOpen={isTooltipOpen}
        onToggle={setIsTooltipOpen}
        trigger={['hover']}
        placement="top"
        flipFallbackPlacements={['bottom']}
      >
        <TooltipTrigger elementType={Button}>
          <VisuallyHidden>download</VisuallyHidden>
          <Icon name="download" />
        </TooltipTrigger>
        <TooltipPopover>Download</TooltipPopover>
      </Tooltip>
      <Dropdown id="split-button-dropdown" isOpen={dropdownOpen} onToggle={toggleDropdown} placement="bottom-end">
        <DropdownTrigger elementType={Button}>
          More
          <Icon name="chevron-down" />
        </DropdownTrigger>
        <DropdownPopover>
          <DropdownContent />
        </DropdownPopover>
      </Dropdown>
    </>
  );
};
