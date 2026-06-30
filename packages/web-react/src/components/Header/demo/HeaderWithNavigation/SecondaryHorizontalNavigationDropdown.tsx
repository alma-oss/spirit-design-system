import React, { type ReactElement, forwardRef, useState } from 'react';
import { type PolymorphicRef, type SpiritNavigationAvatarProps } from '../../../../types';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../../Dropdown';
import { Icon } from '../../../Icon';
import { NavigationAvatar } from '../../../Navigation';
import { DropdownPopoverContent } from '../HeaderWithNavigationAndNestedItems/MainHorizontalNavigationDropdown';

const _NavigationAvatarAsDropdownTrigger = (
  props: SpiritNavigationAvatarProps<'button'>,
  ref: PolymorphicRef<'button'>,
) => <NavigationAvatar {...props} elementType="button" ref={ref} />;

const NavigationAvatarAsDropdownTrigger = forwardRef<HTMLButtonElement, SpiritNavigationAvatarProps<'button'>>(
  _NavigationAvatarAsDropdownTrigger,
);

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
        elementType={NavigationAvatarAsDropdownTrigger}
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
