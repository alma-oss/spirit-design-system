'use client';

import React from 'react';
import { type UncontrolledTabsProps } from '../../types';
import { TabsProvider } from './TabContext';
import { useTab } from './useTabs';

const UncontrolledTabs = ({
  children,
  defaultSelectedTab,
  onSelectionChange,
  spacing,
}: UncontrolledTabsProps): React.JSX.Element => {
  const { selectedId, selectTab } = useTab(defaultSelectedTab);

  return <TabsProvider value={{ selectedId, selectTab, onSelectionChange, spacing }}>{children}</TabsProvider>;
};

UncontrolledTabs.spiritComponent = 'UncontrolledTabs';

export default UncontrolledTabs;
