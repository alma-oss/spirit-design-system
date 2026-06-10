import React from 'react';
import { Icon } from '../../Icon';
import { Pill } from '../../Pill';
import { Tag } from '../../Tag';
import Navigation from '../Navigation';
import NavigationAction from '../NavigationAction';
import NavigationItem from '../NavigationItem';

const NavigationVerticalWithBoxActionAndStartIcons = () => (
  <Navigation aria-label="Main Navigation with Start Icons" direction="vertical">
    <NavigationItem>
      <NavigationAction href="/" startSlot={<Icon name="profile" />} endSlot={<Pill color="informative">12</Pill>}>
        Link
      </NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction
        href="/"
        aria-current="page"
        isSelected
        startSlot={<Icon name="profile" />}
        endSlot={
          <Tag color="informative" size="small">
            New
          </Tag>
        }
      >
        Selected
      </NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction href="/" isDisabled startSlot={<Icon name="profile" />} endSlot={<Icon name="lock" />}>
        Disabled
      </NavigationAction>
    </NavigationItem>
  </Navigation>
);

export default NavigationVerticalWithBoxActionAndStartIcons;
