import type { Meta, StoryObj } from '@storybook/react';
import React, { useCallback, useState } from 'react';
import { type TabId, type TabLinkProps } from '../../../types';
import { TabContent, TabItem, TabLink, TabList, TabPane, Tabs } from '..';

const meta: Meta<typeof TabLink> = {
  title: 'Components/Tabs',
  component: TabLink,
  argTypes: {
    href: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    href: 'https://www.example.com',
  },
};

export default meta;
type Story = StoryObj<typeof TabLink>;

const TabsWithHooks = (args: TabLinkProps) => {
  const [selectedId, setState] = useState<TabId>(1);

  const selectTab = useCallback((id: TabId) => {
    setState(id);
  }, []);

  return (
    <Tabs selectedTab={selectedId} toggle={selectTab}>
      <TabList {...args}>
        <TabItem forTabPane={1}>Item Selected</TabItem>
        <TabItem forTabPane={2}>Item</TabItem>
        <TabLink {...args}>Item Link</TabLink>
      </TabList>
      <TabContent>
        <TabPane id={1}>Pane 1</TabPane>
        <TabPane id={2}>Pane 2</TabPane>
      </TabContent>
    </Tabs>
  );
};

export const TabLinkPlayground: Story = {
  name: 'TabLink',
  render: (args) => <TabsWithHooks {...(args as TabLinkProps)} />,
};
