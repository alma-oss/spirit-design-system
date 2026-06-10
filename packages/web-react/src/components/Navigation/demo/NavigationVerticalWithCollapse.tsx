import React from 'react';
import { Collapse, useCollapse } from '../../Collapse';
import { Icon } from '../../Icon';
import Navigation from '../Navigation';
import NavigationAction from '../NavigationAction';
import NavigationItem from '../NavigationItem';

const NavigationVerticalWithCollapse = () => {
  const { isOpen, toggleHandler } = useCollapse(true);

  return (
    <Navigation aria-label="Subnavigation Item States" direction="vertical">
      <NavigationItem>
        <NavigationAction href="/">Home</NavigationAction>
      </NavigationItem>
      <NavigationItem>
        <NavigationAction href="/">My projects</NavigationAction>
      </NavigationItem>
      <NavigationItem>
        <NavigationAction
          elementType="button"
          onClick={toggleHandler}
          aria-expanded={isOpen}
          endSlot={<Icon name={`chevron-${isOpen ? 'up' : 'down'}`} />}
        >
          My bucket
        </NavigationAction>
        <Collapse id="collapse-navigation" isOpen={isOpen}>
          <ul>
            <NavigationItem>
              <NavigationAction href="/">Webdesign 2026</NavigationAction>
            </NavigationItem>
            <NavigationItem>
              <NavigationAction href="/" aria-current="page" isSelected>
                Jobs.cz inspiration
              </NavigationAction>
            </NavigationItem>
            <NavigationItem>
              <NavigationAction href="/">Prace.cz illustrations</NavigationAction>
            </NavigationItem>
          </ul>
        </Collapse>
      </NavigationItem>
    </Navigation>
  );
};
export default NavigationVerticalWithCollapse;
