import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useCallback, useState } from 'react';
import { type TabId, type TabListProps } from '../../../types';
import { TabContent, TabItem, TabList, TabPane, Tabs } from '..';

const meta: Meta<typeof TabList> = {
  title: 'Components/Tabs',
  component: TabList,
};

export default meta;
type Story = StoryObj<typeof TabList>;

const TabsWithHooks = (args: TabListProps) => {
  const [selectedId, setState] = useState<TabId>(1);

  const selectTab = useCallback((id: TabId) => {
    setState(id);
  }, []);

  return (
    <Tabs selectedTab={selectedId} toggle={selectTab}>
      <TabList {...args}>
        <TabItem forTabPane={1}>Item Selected</TabItem>
        <TabItem forTabPane={2}>Item</TabItem>
      </TabList>
      <TabContent>
        <TabPane id={1}>Pane 1</TabPane>
        <TabPane id={2}>Pane 2</TabPane>
      </TabContent>
    </Tabs>
  );
};

export const TabListPlayground: Story = {
  name: 'TabList',
  render: (args) => <TabsWithHooks {...args} />,
};
