import React, { type ElementType, forwardRef, useState } from 'react';
import { type PolymorphicRef, type SpiritNavigationActionProps } from '../../../types';
import { Button } from '../../Button';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../Dropdown';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import { Label } from '../../Label';
import { Navigation, NavigationAction, NavigationItem } from '../../Navigation';
import { Tooltip, TooltipPopover, TooltipTrigger } from '../../Tooltip';

interface ToolbarItemsProps {
  /** Keeps ids unique when more toolbars are rendered on one page */
  idPrefix: string;
}

const _NavigationActionAsButton = <E extends ElementType = 'a'>(
  props: SpiritNavigationActionProps<E>,
  ref: PolymorphicRef<E>,
) => <NavigationAction {...props} elementType="button" type="button" ref={ref} />;

const NavigationActionAsButton = forwardRef<HTMLButtonElement, SpiritNavigationActionProps<'a'>>(
  _NavigationActionAsButton as never,
);

const ToolbarItems = ({ idPrefix }: ToolbarItemsProps) => {
  const [isDownloadTooltipOpen, setIsDownloadTooltipOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Navigation>
      <NavigationItem>
        <NavigationAction href="#" variant="pill">
          Preview
        </NavigationAction>
      </NavigationItem>
      <NavigationItem>
        <Tooltip id={`${idPrefix}-download-tooltip`} isOpen={isDownloadTooltipOpen} onToggle={setIsDownloadTooltipOpen}>
          <TooltipTrigger elementType={NavigationActionAsButton} variant="pill">
            Download
          </TooltipTrigger>
          <TooltipPopover>Download the document as a PDF</TooltipPopover>
        </Tooltip>
      </NavigationItem>
      <NavigationItem>
        <NavigationAction href="#" variant="pill" isDisabled>
          Disabled
        </NavigationAction>
      </NavigationItem>
      <NavigationItem>
        <Button color="secondary">Share</Button>
      </NavigationItem>
      <NavigationItem>
        <Dropdown
          id={`${idPrefix}-dropdown`}
          isOpen={isDropdownOpen}
          onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <DropdownTrigger elementType={NavigationActionAsButton} variant="pill">
            More
            <Icon name={`chevron-${isDropdownOpen ? 'up' : 'down'}`} />
          </DropdownTrigger>
          <DropdownPopover aria-label="Options">
            <Item elementType="a" href="#">
              <Label>Rename</Label>
            </Item>
            <Item elementType="a" href="#">
              <Label>Duplicate</Label>
            </Item>
            <Item elementType="a" href="#">
              <Label>Delete</Label>
            </Item>
          </DropdownPopover>
        </Dropdown>
      </NavigationItem>
    </Navigation>
  );
};

export default ToolbarItems;
