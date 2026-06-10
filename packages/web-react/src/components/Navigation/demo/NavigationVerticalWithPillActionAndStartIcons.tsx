import React from 'react';
import { Icon } from '../../Icon';
import { Pill } from '../../Pill';
import { Tag } from '../../Tag';
import Navigation from '../Navigation';
import NavigationAction from '../NavigationAction';
import NavigationItem from '../NavigationItem';

const NavigationVerticalWithPillActionAndStartIcons = () => (
  <Navigation aria-label="Main Navigation with Start Icons and Pill Action" direction="vertical">
    <NavigationItem>
      <NavigationAction
        href="/"
        variant="pill"
        startSlot={<Icon name="profile" />}
        endSlot={
          <Tag color="informative" size="small">
            Team
          </Tag>
        }
      >
        Link
      </NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction
        href="/"
        variant="pill"
        aria-current="page"
        isSelected
        startSlot={<Icon name="profile" />}
        endSlot={<Pill color="informative">3</Pill>}
      >
        Selected
      </NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction
        href="/"
        variant="pill"
        isDisabled
        startSlot={<Icon name="profile" />}
        endSlot={<Icon name="lock" />}
      >
        Disabled
      </NavigationAction>
    </NavigationItem>
  </Navigation>
);

export default NavigationVerticalWithPillActionAndStartIcons;
