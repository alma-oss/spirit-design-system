import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useCallback, useState } from 'react';
import { type TabId, type TabPaneProps } from '../../../types';
import { TabContent, TabItem, TabList, TabPane, Tabs } from '..';

const meta: Meta<typeof TabPane> = {
  title: 'Components/Tabs',
  component: TabPane,
};

export default meta;
type Story = StoryObj<typeof TabPane>;

const TabsWithHooks = (args: TabPaneProps) => {
  const [selectedId, setState] = useState<TabId>(1);

  const selectTab = useCallback((id: TabId) => {
    setState(id);
  }, []);

  return (
    <Tabs selectedTab={selectedId} toggle={selectTab}>
      <TabList>
        <TabItem forTabPane={1}>Item Selected</TabItem>
        <TabItem forTabPane={2}>Item</TabItem>
      </TabList>
      <TabContent>
        <TabPane {...args} id={1}>
          Pane 1
        </TabPane>
        <TabPane id={2}>Pane 2</TabPane>
      </TabContent>
    </Tabs>
  );
};

export const TabPanePlayground: Story = {
  name: 'TabPane',
  render: (args) => <TabsWithHooks {...args} />,
};
