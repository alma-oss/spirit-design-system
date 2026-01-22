import React, { useState } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { Sizes } from '../../../constants';
import { type SplitButtonColorType } from '../../../types';
import { Button } from '../../Button';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../Dropdown';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import { Tooltip, TooltipPopover, TooltipTrigger } from '../../Tooltip';
import { VisuallyHidden } from '../../VisuallyHidden';
import SplitButton from '../SplitButton';
import { dropdownContent } from './constants';

const DropdownContent = () => (
  <>
    {dropdownContent.map(({ icon, text }) => (
      <Item key={icon} label={text} elementType="a" iconName={icon} href={`#${icon}`} />
    ))}
  </>
);

const SplitButtonDemoFactory = <C extends void>(props: {
  color?: SplitButtonColorType<C>;
  isDisabled?: boolean;
  showColorInTitle?: boolean;
}) => {
  const { color, isDisabled, showColorInTitle = true } = props;
  const sizes = Object.values(Sizes);

  const [openDropdownStates, setOpenDropdownStates] = useState<Record<string, boolean>>({});
  const onToggleDropdown = (id: string) => {
    setOpenDropdownStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [openTooltipStates, setOpenTooltipStates] = useState<Record<string, boolean>>({});
  const onToggleTooltip = (id: string, isOpen: boolean) => {
    setOpenTooltipStates((prev) => ({
      ...prev,
      [id]: isOpen,
    }));
  };

  const titleColor = showColorInTitle ? `, color ${color}` : '';

  return (
    <>
      {sizes.map((size) => (
        <DocsSection key={size} title={`Size ${size}${titleColor}`} container="none" hasPadding={false}>
          <SplitButton color={color} size={size} isDisabled={isDisabled}>
            <Button>
              <Icon name="check-plain" />
              Button
            </Button>
            <Dropdown
              id={`split-button-dropdown-${color}-${size}-1`}
              isOpen={!!openDropdownStates[`${color}-${size}-1`]}
              onToggle={() => onToggleDropdown(`${color}-${size}-1`)}
              placement="bottom-end"
            >
              <DropdownTrigger elementType={Button}>
                More
                <Icon name="chevron-down" />
              </DropdownTrigger>
              <DropdownPopover>
                <DropdownContent />
              </DropdownPopover>
            </Dropdown>
          </SplitButton>

          <SplitButton color={color} size={size} isDisabled={isDisabled}>
            <Button>
              <Icon name="check-plain" />
              Button
            </Button>
            <Button>Button</Button>
            <Dropdown
              id={`split-button-dropdown-${color}-${size}-2`}
              isOpen={!!openDropdownStates[`${color}-${size}-2`]}
              onToggle={() => onToggleDropdown(`${color}-${size}-2`)}
              placement="bottom-end"
            >
              <DropdownTrigger elementType={Button}>
                <VisuallyHidden>More</VisuallyHidden>
                <Icon name="chevron-down" />
              </DropdownTrigger>
              <DropdownPopover>
                <DropdownContent />
              </DropdownPopover>
            </Dropdown>
          </SplitButton>

          <SplitButton color={color} size={size} isDisabled={isDisabled}>
            <Button>
              <Icon name="check-plain" />
              Button
            </Button>
            <Dropdown
              id={`split-button-dropdown-${color}-${size}-3`}
              isOpen={!!openDropdownStates[`${color}-${size}-3`]}
              onToggle={() => onToggleDropdown(`${color}-${size}-3`)}
              placement="bottom-end"
            >
              <DropdownTrigger elementType={Button}>
                <VisuallyHidden>More</VisuallyHidden>
                <Icon name="chevron-down" />
              </DropdownTrigger>
              <DropdownPopover>
                <DropdownContent />
              </DropdownPopover>
            </Dropdown>
          </SplitButton>

          <SplitButton color={color} size={size} isDisabled={isDisabled}>
            <Button>
              <VisuallyHidden>download</VisuallyHidden>
              <Icon name="download" />
            </Button>
            <Button>
              <VisuallyHidden>edit</VisuallyHidden>
              <Icon name="edit" />
            </Button>
            <Button>
              <VisuallyHidden>link</VisuallyHidden>
              <Icon name="link" />
            </Button>
          </SplitButton>

          <SplitButton color={color} size={size} isDisabled={isDisabled}>
            <Tooltip
              id={`tooltip-${color}-${size}-1`}
              isOpen={!!openTooltipStates[`${color}-${size}-1`]}
              onToggle={(isOpen) => onToggleTooltip(`${color}-${size}-1`, isOpen)}
              placement="top"
              trigger={['hover']}
              flipFallbackPlacements={['bottom']}
            >
              <TooltipTrigger elementType={Button}>
                <VisuallyHidden>download</VisuallyHidden>
                <Icon name="download" />
              </TooltipTrigger>
              <TooltipPopover>Hello there!</TooltipPopover>
            </Tooltip>
            <Tooltip
              id={`tooltip-${color}-${size}-2`}
              isOpen={!!openTooltipStates[`${color}-${size}-2`]}
              onToggle={(isOpen) => onToggleTooltip(`${color}-${size}-2`, isOpen)}
              trigger={['hover']}
              placement="top"
              flipFallbackPlacements={['bottom']}
            >
              <TooltipTrigger elementType={Button}>
                <VisuallyHidden>link</VisuallyHidden>
                <Icon name="link" />
              </TooltipTrigger>
              <TooltipPopover>Hello there!</TooltipPopover>
            </Tooltip>
          </SplitButton>
        </DocsSection>
      ))}
    </>
  );
};

export default SplitButtonDemoFactory;
