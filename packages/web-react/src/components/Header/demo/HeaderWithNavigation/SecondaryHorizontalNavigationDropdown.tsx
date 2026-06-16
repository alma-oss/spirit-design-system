import React, { type ReactElement, useState } from 'react';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../../Dropdown';
import { Icon } from '../../../Icon';
import { NavigationAvatar } from '../../../Navigation';
import { DropdownPopoverContent } from '../HeaderWithNavigationAndNestedItems/MainHorizontalNavigationDropdown';

type SecondaryHorizontalNavigationDropdownProps = {
  id: string;
  isSquare?: boolean;
};

const SecondaryHorizontalNavigationDropdown = ({
  id,
  isSquare = false,
}: SecondaryHorizontalNavigationDropdownProps): ReactElement => {
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);

  return (
    <Dropdown
      alignmentX="center"
      alignmentY="center"
      id={id}
      isOpen={isAvatarDropdownOpen}
      onToggle={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
      placement="bottom-end"
    >
      <DropdownTrigger
        elementType={NavigationAvatar}
        avatarContent={<Icon name="profile" />}
        aria-label="Profile of Jiří Bárta"
        isSquare={isSquare}
      >
        My Account
        <Icon name={`chevron-${isAvatarDropdownOpen ? 'up' : 'down'}`} />
      </DropdownTrigger>
      <DropdownPopover>
        <DropdownPopoverContent />
      </DropdownPopover>
    </Dropdown>
  );
};

export default SecondaryHorizontalNavigationDropdown;
