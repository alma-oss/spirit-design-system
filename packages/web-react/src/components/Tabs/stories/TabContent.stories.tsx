import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useCallback, useState } from 'react';
import { type TabContentProps, type TabId } from '../../../types';
import { TabContent, TabItem, TabList, TabPane, Tabs } from '..';

const meta: Meta<typeof TabContent> = {
  title: 'Components/Tabs',
  component: TabContent,
};

export default meta;
type Story = StoryObj<typeof TabContent>;

const TabsWithHooks = (args: TabContentProps) => {
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
      <TabContent {...args}>
        <TabPane id={1}>Pane 1</TabPane>
        <TabPane id={2}>Pane 2</TabPane>
      </TabContent>
    </Tabs>
  );
};

export const TabContentPlayground: Story = {
  name: 'TabContent',
  render: (args) => <TabsWithHooks {...args} />,
};
