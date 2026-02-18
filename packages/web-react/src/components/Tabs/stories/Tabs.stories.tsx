import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useCallback, useState } from 'react';
import { type TabId, type TabsProps } from '../../../types';
import ReadMe from '../README.md?raw';
import { TabContent, TabItem, TabList, TabPane, Tabs } from '..';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    spacing: {
      control: 'object',
    },
  },
  args: {
    spacing: {
      desktop: 'space-700',
      mobile: 'space-500',
      tablet: 'space-600',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const TabsWithHooks = (args: TabsProps) => {
  const [selectedId, setState] = useState<TabId>(1);

  const selectTab = useCallback((id: TabId) => {
    setState(id);
  }, []);

  return (
    <Tabs {...args} selectedTab={selectedId} toggle={selectTab}>
      <TabList>
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

export const Playground: Story = {
  name: 'Tabs',
  render: (args) => <TabsWithHooks {...args} />,
};
