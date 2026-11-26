'use client';

import React from 'react';
import { type TabsProps } from '../../types';
import { TabsProvider } from './TabContext';

const Tabs = ({
  children,
  selectedTab,
  toggle: selectTab,
  onSelectionChange,
  spacing,
}: TabsProps): React.JSX.Element => (
  <TabsProvider value={{ selectedId: selectedTab, selectTab, onSelectionChange, spacing }}>{children}</TabsProvider>
);

Tabs.spiritComponent = 'Tabs';

export default Tabs;
